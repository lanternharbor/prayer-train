import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Edge proxy:
 *  1. Auth gate for /dashboard and /create — redirect to /signin
 *     when no NextAuth session cookie is present.
 *  2. Rate limit the magic-link sign-in endpoint and /api/stats.
 *     Magic link is the most-abusable surface (it sends an email
 *     to any address an attacker types in), so it's the tightest
 *     bucket. /api/stats is public read-only and just needs basic
 *     flood protection.
 *
 * Rate limiting is a no-op until UPSTASH_REDIS_REST_URL/TOKEN are set.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Rate limit: NextAuth magic-link sign-in (POST only) ──
  // The Auth.js Resend provider posts to /api/auth/signin/resend
  // (the provider id, not "email"). We also catch /callback variants
  // as belt-and-suspenders.
  if (
    request.method === "POST" &&
    (pathname === "/api/auth/signin/resend" ||
      pathname.startsWith("/api/auth/signin/"))
  ) {
    const ip = clientIp(request);
    const result = await checkRateLimit("signIn", `ip:${ip}`);
    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many sign-in attempts. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "content-type": "application/json",
            "retry-after": String(
              Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))
            ),
          },
        }
      );
    }
  }

  // ── Rate limit: public stats endpoint ──
  if (pathname === "/api/stats") {
    const ip = clientIp(request);
    const result = await checkRateLimit("publicApi", `ip:${ip}`);
    if (!result.success) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded." }),
        {
          status: 429,
          headers: {
            "content-type": "application/json",
            "retry-after": String(
              Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))
            ),
          },
        }
      );
    }
  }

  // ── Auth gate: protect /dashboard and /create ──
  const protectedPaths = ["/dashboard", "/create"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const hasSession =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  if (isProtected && !hasSession) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim() || "unknown";
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create/:path*",
    "/api/auth/signin/:path*",
    "/api/stats",
  ],
};
