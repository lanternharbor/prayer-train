import { headers } from "next/headers";

/**
 * Best-effort client IP for use as a rate-limit key in server actions.
 *
 * Vercel sets `x-forwarded-for` (the first hop is the client). Falls
 * back to `x-real-ip` and finally a static "unknown" so a missing
 * header never crashes the request — instead all unknown clients
 * share a bucket, which still bounds abuse.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();

  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated chain. Take the first.
    return forwarded.split(",")[0].trim() || "unknown";
  }

  const realIp = h.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

/**
 * Build a stable rate-limit identifier. Prefers the authenticated user
 * id (so a single user across multiple devices/IPs counts as one
 * actor), falling back to the client IP for anonymous requests.
 */
export async function getRateLimitId(userId?: string | null): Promise<string> {
  if (userId) return `user:${userId}`;
  const ip = await getClientIp();
  return `ip:${ip}`;
}
