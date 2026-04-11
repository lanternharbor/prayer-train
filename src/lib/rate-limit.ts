import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting via Upstash Redis (works with the free Vercel KV /
 * Upstash Redis tier).
 *
 * Required env vars (set in Vercel for prod, .env for dev):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * If those env vars are missing, every limit check returns
 * { success: true, remaining: Infinity } so the app never silently
 * blocks traffic before the user has wired up Upstash. Once the env
 * vars exist, real limits kick in automatically — no code change
 * required.
 *
 * Limiters are intentionally tight on the magic-link sign-in path
 * because that's the biggest abuse vector (an attacker could use it
 * as a free email-spam relay against arbitrary inboxes).
 */

const isConfigured =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = isConfigured ? Redis.fromEnv() : null;

function makeLimiter(
  prefix: string,
  limit: number,
  window: `${number} ${"s" | "m" | "h" | "d"}`
): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix: `prayertrain:${prefix}`,
  });
}

// Exported limiter "buckets". Tune these as the app's traffic profile
// evolves. The defaults below are conservative for a small Catholic
// prayer site, not a high-traffic SaaS.
export const limiters = {
  // Magic-link sign-in. Five attempts per IP per 10 minutes.
  // Strictest because abuse here = email spam in a stranger's inbox.
  signIn: makeLimiter("signin", 5, "10 m"),

  // Slot claim, guestbook entry — generous for legitimate users but
  // bounded enough to prevent obvious flooding from a single source.
  claim: makeLimiter("claim", 30, "1 h"),
  guestbook: makeLimiter("guestbook", 20, "1 h"),

  // Train creation. Reasonable cap for an authenticated user.
  createTrain: makeLimiter("create-train", 10, "1 h"),

  // Public read endpoints (e.g. /api/stats). Per-IP, fairly loose.
  publicApi: makeLimiter("public-api", 60, "1 m"),
} as const;

export type LimiterKey = keyof typeof limiters;

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const ALLOW_ALL: RateLimitResult = {
  success: true,
  limit: Infinity,
  remaining: Infinity,
  reset: 0,
};

/**
 * Check whether `identifier` is currently below the limit for the named
 * limiter. When Upstash isn't configured, always returns success — this
 * keeps the app working with zero external dependencies until the user
 * is ready to wire up Redis.
 */
export async function checkRateLimit(
  bucket: LimiterKey,
  identifier: string
): Promise<RateLimitResult> {
  const limiter = limiters[bucket];
  if (!limiter) return ALLOW_ALL;

  try {
    const result = await limiter.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    // If Redis is unreachable, prefer availability over correctness.
    // We log loudly so this can be picked up by monitoring later.
    console.error(`[rate-limit] ${bucket} check failed:`, error);
    return ALLOW_ALL;
  }
}

/**
 * Convenience wrapper that throws a friendly Error if the request is
 * over the limit. Use inside server actions where you want a single
 * line at the top: `await enforceRateLimit("claim", identifier)`.
 */
export async function enforceRateLimit(
  bucket: LimiterKey,
  identifier: string
): Promise<void> {
  const result = await checkRateLimit(bucket, identifier);
  if (!result.success) {
    const seconds = Math.max(
      1,
      Math.ceil((result.reset - Date.now()) / 1000)
    );
    throw new Error(
      `You're doing that too quickly. Please try again in ${seconds} seconds.`
    );
  }
}
