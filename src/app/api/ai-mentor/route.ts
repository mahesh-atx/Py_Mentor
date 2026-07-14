/**
 * AI Mentor streaming route
 *
 * POST /api/ai-mentor
 *   body: { messages: ChatMessage[], context?: MentorContext }
 *   -> a streaming response (text/plain) of assistant text chunks
 *
 * Rate-limited to 20 requests/minute per user with a global fallback of
 * 60 req/min across all users to protect against API cost overruns.
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
import { aiMentorLimiter, aiMentorGlobalLimiter } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Route config
// ---------------------------------------------------------------------------

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Derive a stable rate-limit key from the request headers. */
function rateLimitKey(request: NextRequest): string {
  // Prefer x-forwarded-for (proxies/Vercel), fall back to direct IP.
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return `ai-mentor:${ip}`;
}

/** Return a 429 Too Many Requests with standard RateLimit headers. */
function tooManyRequests(resetAt: number): Response {
  return Response.json(
    { error: "Too many requests. Please slow down and try again shortly." },
    {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
      },
    },
  );
}

// ---------------------------------------------------------------------------
// Request validation (same as before)
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
// POST — stream a mentor reply (with rate limiting)
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────────────────
  const key = rateLimitKey(request);

  const [userLimit, globalLimit] = await Promise.all([
    aiMentorLimiter.check(key),
    aiMentorGlobalLimiter.check("global"),
  ]);

  const effective = !userLimit.allowed || !globalLimit.allowed
    ? { allowed: false, remaining: 0, resetAt: Math.max(userLimit.resetAt, globalLimit.resetAt) }
    : { allowed: true, remaining: Math.min(userLimit.remaining, globalLimit.remaining), resetAt: Math.max(userLimit.resetAt, globalLimit.resetAt) };

  if (!effective.allowed) {
    return tooManyRequests(effective.resetAt);
  }

  // ── Parse & validate body ──────────────────────────────────────────────
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json(
      { error: "`messages` must be a non-empty array." },
      { status: 400 },
    );
  }

  const history: ChatMessage[] = body.messages
    .filter(isChatMessage)
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role as ChatRole, content: m.content }));

  if (history.length === 0) {
    return Response.json(
      { error: "No valid user/assistant messages provided." },
      { status: 400 },
    );
  }

  const context = normalizeContext(body.context);

  // ── Build grounded prompt ──────────────────────────────────────────────
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

  // ── Stream the reply ───────────────────────────────────────────────────
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
      return Response.json(
        {
          error:
            "No AI provider is configured. Add OPENROUTER_API_KEY or NVIDIA_API_KEY to .env to enable the AI Mentor.",
        },
        { status: 503 },
      );
    }
    if (error instanceof ProviderRequestError) {
      console.error(
        `[ai-mentor] provider ${error.provider} error ${error.status}: ${error.body.slice(0, 300)}`,
      );
      return Response.json(
        {
          error: `The AI provider returned an error (${error.status}). Please try again shortly.`,
        },
        { status: 502 },
      );
    }
    console.error("[ai-mentor] unexpected stream error:", error);
    return Response.json(
      { error: "Something went wrong while contacting the AI provider." },
      { status: 500 },
    );
  }

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
      "X-Accel-Buffering": "no",
      // Rate-limit headers so the client can throttle itself.
      "X-RateLimit-Remaining": String(effective.remaining),
      "X-RateLimit-Reset": String(Math.ceil(effective.resetAt / 1000)),
    },
  });
}

// ---------------------------------------------------------------------------
// GET — quick status check
// ---------------------------------------------------------------------------

export async function GET() {
  const { getActiveProvider } = await import("@/lib/ai/llm");
  const provider = getActiveProvider();
  return Response.json(provider);
}
