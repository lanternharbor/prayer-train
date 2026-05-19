import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Build a locale-prefixed href.
 *
 * @example
 *   localizedHref("en", "/browse")          // "/en/browse"
 *   localizedHref("es", "/browse")          // "/es/browse"
 *   localizedHref("es", "/p/the-spina-fam") // "/es/p/the-spina-fam"
 *   localizedHref("en", "/")                // "/en"
 *
 * Special cases that bypass the prefix entirely:
 *   - API routes (`/api/...`) — they don't have locale variants
 *   - Anchor-only links (`#foo`) — same-page navigation
 *   - External absolute URLs (`https://...`, `mailto:`, `tel:`) — third party
 *   - Already-prefixed paths (`/en/foo`, `/es/foo`) — caller pre-resolved
 *
 * The function is intentionally synchronous + dependency-free so it
 * can run anywhere (server component, client component, route
 * handler, test).
 */
export function localizedHref(locale: Locale, path: string): string {
  // Bypass: external URLs, anchors, mailto/tel
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  // Bypass: API routes
  if (path.startsWith("/api/") || path === "/api") {
    return path;
  }

  // Already prefixed with a supported locale — assume caller knew
  // what they were doing. Check on path segment boundary so a path
  // like /en-route doesn't get mistaken for an /en/... prefix.
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return path;
  }

  // Normalize root: "/" → "/{locale}", not "/{locale}/"
  if (path === "/" || path === "") {
    return `/${locale}`;
  }

  // Standard case: prefix the locale.
  // Preserve leading "/" — if caller passed "/browse" return "/en/browse";
  // if they passed "browse" return "/en/browse" too.
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${trimmed}`;
}

/**
 * Locale-aware redirect target.
 *
 * Unlike `localizedHref`, this preserves the clean URL convention for
 * default-locale visitors: an English visitor redirected to /signin
 * sees `/signin` in the URL bar (the proxy rewrites internally to
 * `/en/signin`), while a Spanish visitor redirected to /signin sees
 * `/es/signin` so the locale stays sticky across the auth bounce.
 *
 * Use this for `redirect(...)` in server actions and server-component
 * pages that may receive non-default-locale visitors.
 *
 * @example
 *   pathForLocale("en", "/signin")    // "/signin"
 *   pathForLocale("es", "/signin")    // "/es/signin"
 *   pathForLocale("pl", "/dashboard") // "/pl/dashboard"
 */
export function pathForLocale(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${trimmed}`;
}

/**
 * Strip the locale prefix from a pathname, returning the bare route.
 * Useful for the LocaleSwitcher (it needs to know which page the user
 * is on regardless of current locale, so it can navigate the same
 * page in the new locale).
 *
 * @example
 *   stripLocale("/en/browse")          // "/browse"
 *   stripLocale("/es/p/some-slug")     // "/p/some-slug"
 *   stripLocale("/api/cron/x")         // "/api/cron/x" (no change)
 *   stripLocale("/")                   // "/"
 */
export function stripLocale(path: string): string {
  if (path.startsWith("/api/") || path === "/api") return path;
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return path;
}

/**
 * Default-locale wrapper for places where the caller doesn't have a
 * locale handy (rare — most server components have `params.locale`
 * available, and client components consume `useLocale()` from the
 * context). Falls back to defaultLocale.
 */
export function href(path: string, locale: Locale = defaultLocale): string {
  return localizedHref(locale, path);
}
