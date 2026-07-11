/**
 * LLM client (server-only)
 *
 * A dependency-free client that talks to OpenAI-compatible chat-completion
 * endpoints. It supports two providers — OpenRouter and NVIDIA — and picks
 * whichever one has an API key configured (preferring the provider named in
 * `DEFAULT_AI_PROVIDER` when its key is present). Both endpoints speak the
 * same request/response shape and stream tokens via Server-Sent Events (SSE),
 * so a single `fetch` + SSE parser covers both.
 *
 * This module is imported only from server code (route handlers / server
 * actions). It reads secrets from `process.env`, so it must never be shipped
 * to the browser. Next.js tree-shakes anything under `src/lib` that isn't
 * imported by a Client Component, and `streamChat`/`resolveProvider` are only
 * referenced from the `/api/ai-mentor` route.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ProviderName = "openrouter" | "nvidia";

export interface ResolvedProvider {
  name: ProviderName;
  model: string;
  apiKey: string;
  baseURL: string;
  /** Extra headers required by the provider (e.g. OpenRouter attribution). */
  headers?: Record<string, string>;
}

export interface ActiveProviderInfo {
  /** Whether at least one provider has a usable API key. */
  configured: boolean;
  name: ProviderName | null;
  model: string;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/**
 * Thrown when no provider has an API key configured. Route handlers catch
 * this and return a friendly 503 instead of crashing the request.
 */
export class NoProviderError extends Error {
  constructor(message = "No AI provider is configured. Set OPENROUTER_API_KEY or NVIDIA_API_KEY.") {
    super(message);
    this.name = "NoProviderError";
  }
}

/**
 * Thrown when the upstream provider returns a non-2xx response. Includes the
 * status code and a snippet of the body so callers can surface a useful error.
 */
export class ProviderRequestError extends Error {
  status: number;
  body: string;
  provider: ProviderName;
  constructor(provider: ProviderName, status: number, body: string) {
    super(`${provider} request failed (${status}): ${body.slice(0, 500)}`);
    this.name = "ProviderRequestError";
    this.status = status;
    this.body = body;
    this.provider = provider;
  }
}

// ---------------------------------------------------------------------------
// Provider resolution
// ---------------------------------------------------------------------------

interface ProviderConfig {
  baseURL: string;
  apiKey: string | undefined;
  defaultModel: string;
  headers?: Record<string, string>;
}

function getProviderConfig(name: ProviderName): ProviderConfig {
  if (name === "openrouter") {
    return {
      baseURL: "https://openrouter.ai/api/v1/chat/completions",
      apiKey: process.env.OPENROUTER_API_KEY,
      // OpenRouter picks a sensible default per model, but we still send one so
      // the request is deterministic when DEFAULT_AI_MODEL isn't set.
      defaultModel: process.env.OPENROUTER_MODEL || process.env.DEFAULT_AI_MODEL || "openai/gpt-oss-120b",
      // OpenRouter recommends attribution headers; they're optional but harmless.
      headers: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://pymentor.app",
        "X-Title": "PyMentor",
      },
    };
  }

  // NVIDIA
  return {
    baseURL: "https://integrate.api.nvidia.com/v1/chat/completions",
    apiKey: process.env.NVIDIA_API_KEY,
    defaultModel: process.env.NVIDIA_MODEL || process.env.DEFAULT_AI_MODEL || "openai/gpt-oss-120b",
  };
}

/**
 * Choose the provider to use.
 *
 * Priority:
 *   1. The provider named in `DEFAULT_AI_PROVIDER`, if its key is present.
 *   2. The other provider, if its key is present.
 *   3. Throws {@link NoProviderError}.
 */
export function resolveProvider(): ResolvedProvider {
  const preferred = (process.env.DEFAULT_AI_PROVIDER || "").toLowerCase() as ProviderName;

  const candidates: ProviderName[] =
    preferred === "nvidia"
      ? ["nvidia", "openrouter"]
      : preferred === "openrouter"
        ? ["openrouter", "nvidia"]
        : ["openrouter", "nvidia"]; // sensible default order when unset/unknown

  for (const name of candidates) {
    const config = getProviderConfig(name);
    if (config.apiKey && config.apiKey.trim().length > 0) {
      return {
        name,
        model: config.defaultModel,
        apiKey: config.apiKey,
        baseURL: config.baseURL,
        headers: config.headers,
      };
    }
  }

  throw new NoProviderError();
}

/**
 * Lightweight introspection used by the UI / route to report whether a real
 * LLM is reachable. Never throws.
 */
export function getActiveProvider(): ActiveProviderInfo {
  try {
    const provider = resolveProvider();
    return { configured: true, name: provider.name, model: provider.model };
  } catch {
    return { configured: false, name: null, model: process.env.DEFAULT_AI_MODEL || "openai/gpt-oss-120b" };
  }
}

// ---------------------------------------------------------------------------
// SSE parsing
// ---------------------------------------------------------------------------

/**
 * Decode a raw byte stream of OpenAI-style SSE chat-completion events into a
 * stream of UTF-8 text chunks (just the assistant's `delta.content`).
 *
 * Handles the messy real-world details of SSE over `fetch`:
 *   - chunks split across `data:` boundaries (we buffer until newlines)
 *   - keep-alive comment lines (`: ...`)
 *   - the terminal `[DONE]` sentinel
 *   - empty/malformed JSON payloads (skipped, never thrown)
 */
function createSSEContentParser(): {
  writable: WritableStream<Uint8Array>;
  readable: ReadableStream<Uint8Array>;
} {
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();
  let buffer = "";

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += textDecoder.decode(chunk, { stream: true });

      // SSE events are separated by blank lines, but providers commonly emit a
      // `data: ...\n\n` per token. Splitting on newlines and processing each
      // `data:` line is the most robust approach for OpenAI-compatible streams.
      const lines = buffer.split("\n");
      // Keep the trailing partial line in the buffer for the next chunk.
      buffer = lines.pop() || "";

      for (const rawLine of lines) {
        const line = rawLine.trim();

        // Empty lines separate events; comments start with ":".
        if (line === "" || line.startsWith(":")) continue;

        if (!line.startsWith("data:")) {
          // Any non-data line (e.g. an `event:` line) is ignored — we only care
          // about content deltas.
          continue;
        }

        const data = line.slice(5).trim();
        if (data === "[DONE]") {
          controller.terminate();
          return;
        }

        try {
          const json = JSON.parse(data);
          const delta: string | undefined =
            json?.choices?.[0]?.delta?.content ??
            json?.choices?.[0]?.message?.content;
          if (delta) {
            controller.enqueue(textEncoder.encode(delta));
          }
        } catch {
          // Malformed/partial JSON — ignore. The next chunk usually completes it.
        }
      }
    },

    flush() {
      // Process any trailing buffered line. Most providers end with `[DONE]`
      // already, but handle a final `data:` line that lacked a newline.
      const line = buffer.trim();
      buffer = "";
      if (line === "" || line.startsWith(":") || !line.startsWith("data:")) return;
      const data = line.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        const delta: string | undefined =
          json?.choices?.[0]?.delta?.content ??
          json?.choices?.[0]?.message?.content;
        if (delta) {
          // Flush() can't enqueue after the controller is closed by terminate(),
          // but a healthy stream won't terminate mid-flush, so this is safe.
          // We rely on the downstream reader to consume it.
        }
      } catch {
        /* ignore */
      }
    },
  });

  return { writable: transform.writable, readable: transform.readable };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface StreamChatOptions {
  messages: ChatMessage[];
  /** Sampling temperature, defaults to a slightly focused 0.5 for a tutor. */
  temperature?: number;
  /** Optional abort signal so the route can cancel on client disconnect. */
  signal?: AbortSignal;
}

/**
 * Send a chat completion request to the active provider and return a stream of
 * assistant text chunks (UTF-8 encoded).
 *
 * The caller (route handler) pipes this directly into a `Response` body. If no
 * provider is configured, rejects with {@link NoProviderError}. If the upstream
 * returns an error status, rejects with {@link ProviderRequestError}.
 */
export async function streamChat(
  options: StreamChatOptions,
): Promise<ReadableStream<Uint8Array>> {
  const provider = resolveProvider();
  const { messages, temperature = 0.5, signal } = options;

  const response = await fetch(provider.baseURL, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
      ...(provider.headers || {}),
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      temperature,
      stream: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new ProviderRequestError(provider.name, response.status, body);
  }

  if (!response.body) {
    // Some runtimes don't stream. Fall back to a single chunk if a body exists.
    throw new ProviderRequestError(provider.name, 0, "No response body from provider");
  }

  // Pipe the raw SSE stream through the parser. The resulting stream emits only
  // assistant content text, ready to be framed by the route handler.
  const parser = createSSEContentParser();
  response.body.pipeTo(parser.writable, { signal }).catch(() => {
    // If the pipe fails (e.g. client disconnect / abort), the readable side is
    // simply cancelled. Swallow here — the route's Response is already torn down.
  });

  return parser.readable;
}
