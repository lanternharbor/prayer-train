import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  locales,
} from "@/i18n/config";

/**
 * Edge proxy:
 *  1. **Locale negotiation** — rewrites bare paths (`/browse`) to
 *     locale-prefixed internal paths (`/en/browse` or `/es/browse`)
 *     so the `app/[locale]/...` route tree resolves. The URL bar
 *     stays clean for the default locale; non-default locales see
 *     explicit prefixes (`/es/browse`) they can share. Internal
 *     rewrite (not redirect) — Google guidelines treat the cookie/
 *     Accept-Language → 3xx redirect pattern as cloaking-adjacent.
 *     Rendered HTML matches the URL the user sees.
 *  2. Auth gate for /dashboard and /create — redirect to /signin
 *     when no NextAuth session cookie is present.
 *  3. Rate limit the magic-link sign-in endpoint and /api/stats.
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

  // ── Auth gate ──
  // /create itself is a public Train-or-Chain chooser (the highest-
  // intent moment for a new organizer; we don't want to wall it off
  // before they understand the difference). Only the actual creation
  // flows are protected. /chain/new self-gates inside the page since
  // it accepts ?prayerType= and needs to round-trip the callback.
  //
  // Auth check is locale-aware: protected paths match with OR without
  // a locale prefix, since the rewrite below may not have happened
  // yet at this point in the request lifecycle (proxy runs once at
  // the edge; rewrites are applied to the response routing).
  const pathnameWithoutLocale = stripLocalePrefix(pathname);
  const protectedPaths = ["/dashboard", "/create/train"];
  const isProtected = protectedPaths.some(
    (p) =>
      pathnameWithoutLocale === p || pathnameWithoutLocale.startsWith(`${p}/`),
  );

  const hasSession =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  if (isProtected && !hasSession) {
    // Preserve the user's locale on the redirect. If they were on
    // /es/dashboard, send them to /es/signin?callbackUrl=/es/dashboard.
    const localeFromPath = extractLocaleFromPath(pathname) ?? defaultLocale;
    const signInUrl = new URL(`/${localeFromPath}/signin`, request.url);
    // Preserve the original query string on the callback. A logged-out
    // visitor clicking a growth-loop CTA (e.g. /create/train?from=
    // bouquet) is exactly the case we most want to attribute, and
    // `pathname` alone drops the query — so without `+ search` the
    // `?from=` (and any `?prayerType=` pre-fill) is lost before the
    // page ever runs and the new train records blank attribution.
    signInUrl.searchParams.set(
      "callbackUrl",
      pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  // ── Locale rewrite ──
  // Skip paths that should never be locale-prefixed:
  //   - /api/* (API routes are locale-agnostic)
  //   - Top-level files (sitemap.xml, robots.txt, manifest.json, favicon*)
  //   - Next internals (_next, _vercel)
  //
  // The matcher in `config` below ALREADY excludes /api and /_next, so
  // we only need to check the file-asset paths here as belt-and-suspenders.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/manifest.json" ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/apple-touch-icon") ||
    pathname === "/logo.png" ||
    // /admin lives outside the [locale] tree — it's an internal tool
    // for one person, English-only, and doesn't need locale routing.
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  ) {
    return NextResponse.next();
  }

  // If the path already starts with a known locale, pass through.
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Otherwise: rewrite (NOT redirect) to add the default locale
  // prefix internally. The URL bar stays clean for English visitors;
  // the routing layer sees `/{defaultLocale}/...` and resolves the
  // `app/[locale]/...` tree. A Spanish-cookie visitor's explicit
  // `/es/...` paths pass through above; an internal `Link` rendered
  // by a server component already uses `localizedHref(locale, path)`
  // to emit the correctly-prefixed URL, so the rewrite path mostly
  // catches first-visit bare-URL traffic + crawlers.
  //
  // The cookie is intentionally NOT honored here for choosing the
  // rewrite target (Google guidelines: render the language the URL
  // specifies). The cookie is consulted only INSIDE pages via the
  // LocaleSwitcher's navigation handler — that's intra-app, not the
  // first-request rewrite.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim() || "unknown";
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function extractLocaleFromPath(pathname: string): string | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg && isLocale(seg) ? seg : null;
}

function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

// The unused-but-helpful list of supported locales is exported so
// downstream developers can sanity-check it matches src/i18n/config.ts.
void locales;
void LOCALE_COOKIE;

export const config = {
  // Run the proxy on every path EXCEPT:
  //   - API routes (api/) — locale-agnostic
  //   - Next internals (_next/*, _vercel/*)
  //   - File extension lookups (sitemap.xml, robots.txt, *.png, etc.)
  //     — though our explicit-skip logic above already short-circuits
  //     these, the matcher exclusion saves an unnecessary edge function
  //     invocation per request.
  matcher: [
    "/((?!api/|_next/|_vercel/|.*\\.[\\w]+$).*)",
  ],
};
