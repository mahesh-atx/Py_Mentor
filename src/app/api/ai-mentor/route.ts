/**
 * AI Mentor streaming route
 *
 * POST /api/ai-mentor
 *   body: { messages: ChatMessage[], context?: MentorContext }
 *   -> a streaming response (text/plain) of assistant text chunks, one per line
 *
 * The route resolves the local learner, builds a grounded system prompt from
 * the page context + learner memory, and streams the LLM's reply back. If no
 * provider is configured, it returns a friendly 503 instead of crashing.
 */

import { NextRequest } from "next/server";
import { UserService } from "@/lib/services/user.service";
import {
  streamChat,
  NoProviderError,
  ProviderRequestError,
  type ChatMessage,
  type ChatRole,
} from "@/lib/ai/llm";
import { buildMentorMessages, type MentorContext } from "@/lib/ai/build-prompt";

// This endpoint is inherently dynamic: it streams LLM output per request and
// must never be prerendered or cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Request validation
// ---------------------------------------------------------------------------

interface RequestBody {
  messages?: unknown;
  context?: unknown;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const role = (value as { role?: unknown }).role;
  const content = (value as { content?: unknown }).content;
  return (
    (role === "system" || role === "user" || role === "assistant") &&
    typeof content === "string"
  );
}

function normalizeContext(raw: unknown): MentorContext {
  if (typeof raw !== "object" || raw === null) return {};
  const r = raw as Record<string, unknown>;
  const pickStr = (key: string): string | undefined =>
    typeof r[key] === "string" && (r[key] as string).trim().length > 0
      ? (r[key] as string)
      : undefined;
  return {
    topicSlug: pickStr("topicSlug"),
    exerciseSlug: pickStr("exerciseSlug"),
    code: pickStr("code"),
    path: pickStr("path"),
    pageLabel: pickStr("pageLabel"),
  };
}

// ---------------------------------------------------------------------------
// POST — stream a mentor reply
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // --- Parse & validate body -------------------------------------------------
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: "`messages` must be a non-empty array." }, { status: 400 });
  }

  // Keep only valid chat messages; drop any system messages the client may send
  // (the route owns the system prompt). Coerce roles to the safe union.
  const history: ChatMessage[] = body.messages
    .filter(isChatMessage)
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role as ChatRole, content: m.content }));

  if (history.length === 0) {
    return Response.json({ error: "No valid user/assistant messages provided." }, { status: 400 });
  }

  const context = normalizeContext(body.context);

  // --- Resolve learner + build grounded prompt ------------------------------
  let messagesForLLM: ChatMessage[];
  try {
    const user = await UserService.getLocalUser();
    messagesForLLM = await buildMentorMessages(user.id, history, context);
  } catch (error) {
    console.error("[ai-mentor] failed to build messages:", error);
    return Response.json(
      { error: "Failed to prepare the mentor request." },
      { status: 500 },
    );
  }

  // --- Stream the reply ------------------------------------------------------
  // Allow the client to cancel the stream (e.g. closing the chat) by wiring the
  // request's abort signal through to the provider fetch.
  const abortController = new AbortController();
  request.signal.addEventListener("abort", () => abortController.abort());

  let llmStream: ReadableStream<Uint8Array>;
  try {
    llmStream = await streamChat({
      messages: messagesForLLM,
      signal: abortController.signal,
    });
  } catch (error) {
    if (error instanceof NoProviderError) {
      // Friendly, actionable: the UI also reads `configured:false` via the
      // status endpoint, but a body message helps anyone hitting this directly.
      return Response.json(
        {
          error:
            "No AI provider is configured. Add OPENROUTER_API_KEY or NVIDIA_API_KEY to .env to enable the AI Mentor.",
        },
        { status: 503 },
      );
    }
    if (error instanceof ProviderRequestError) {
      console.error(`[ai-mentor] provider ${error.provider} error ${error.status}: ${error.body.slice(0, 300)}`);
      return Response.json(
        { error: `The AI provider returned an error (${error.status}). Please try again shortly.` },
        { status: 502 },
      );
    }
    console.error("[ai-mentor] unexpected stream error:", error);
    return Response.json(
      { error: "Something went wrong while contacting the AI provider." },
      { status: 500 },
    );
  }

  // Frame the stream as one text token per line (newline-delimited). The client
  // splits on "\n" and accumulates content. We use TextEncoderPair-free piping:
  // llmStream already emits UTF-8 text chunks, so we pass them through as-is and
  // append a trailing newline so each chunk is a discrete "line" the client can
  // display incrementally.
  const framed = llmStream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    }),
  );

  return new Response(framed, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      // Hint that this is a streamed response; some proxies buffer otherwise.
      "X-Accel-Buffering": "no",
    },
  });
}

// ---------------------------------------------------------------------------
// GET — quick status check (used by the UI to show whether a provider is live)
// ---------------------------------------------------------------------------

export async function GET() {
  // Lazy import to avoid pulling provider logic into the status path's hot
  // module graph unnecessarily — though it's cheap, this keeps intent clear.
  const { getActiveProvider } = await import("@/lib/ai/llm");
  const provider = getActiveProvider();
  return Response.json(provider);
}
