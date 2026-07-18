/**
 * Lightweight in-memory rate limiter.
 *
 * Uses a per-key sliding-window approach. Works out of the box with zero
 * dependencies. For multi-instance deployments (e.g. serverless), swap the
 * `store` implementation for Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`).
 *
 * @example
 * ```ts
 * const limiter = rateLimiter({ maxRequests: 20, windowMs: 60_000 });
 * const result = await limiter.check("user_abc123");
 * if (!result.allowed) return Response.json({ error: "Too many requests" }, { status: 429 });
 * ```
 */

export interface RateLimitConfig {
  /** Maximum requests allowed within the window. */
  maxRequests: number;
  /** Sliding window duration in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** How many requests remain in the current window. */
  remaining: number;
  /** Unix timestamp (ms) when the window resets. */
  resetAt: number;
}

interface WindowEntry {
  count: number;
  resetAt: number;
}

// ---------------------------------------------------------------------------
// Store — swap this object for a Redis-backed store in production.
// ---------------------------------------------------------------------------

const store = new Map<string, WindowEntry>();

/** Periodically purge expired entries so the map doesn't grow unbounded. */
const PURGE_INTERVAL_MS = 5 * 60_000; // every 5 minutes
let lastPurge = Date.now();

function purgeExpired() {
  const now = Date.now();
  if (now - lastPurge < PURGE_INTERVAL_MS) return;
  lastPurge = now;
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) store.delete(key);
  });
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function rateLimiter(config: RateLimitConfig) {
  const { maxRequests, windowMs } = config;

  return {
    /**
     * Check whether `key` is allowed to proceed. Returns metadata regardless
     * so callers can set `X-RateLimit-*` headers.
     */
    async check(key: string): Promise<RateLimitResult> {
      purgeExpired();

      const now = Date.now();
      let entry = store.get(key);

      // Start a fresh window if none exists or the current window has expired.
      if (!entry || entry.resetAt <= now) {
        entry = { count: 1, resetAt: now + windowMs };
        store.set(key, entry);
        return { allowed: true, remaining: maxRequests - 1, resetAt: entry.resetAt };
      }

      if (entry.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: entry.resetAt };
      }

      entry.count++;
      return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetAt: entry.resetAt,
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Pre-built limiters used by route handlers.
// ---------------------------------------------------------------------------

/** AI mentor: 20 requests per minute per user. */
export const aiMentorLimiter = rateLimiter({ maxRequests: 20, windowMs: 60_000 });

/** Global (IP-based) backup: 60 AI requests per minute across all users. */
export const aiMentorGlobalLimiter = rateLimiter({ maxRequests: 60, windowMs: 60_000 });
