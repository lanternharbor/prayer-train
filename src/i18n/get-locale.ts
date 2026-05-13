import "server-only";
import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  isLocale,
  locales,
  LOCALE_COOKIE,
  type Locale,
} from "./config";

/**
 * Resolve the active locale for the current request.
 *
 * Priority order:
 *   1. NEXT_LOCALE cookie — set by the LocaleSwitcher; explicit user
 *      choice trumps everything else.
 *   2. Accept-Language header — best-match against our supported set.
 *      Lets a first-time Spanish-speaking visitor see Spanish without
 *      having to find a switcher.
 *   3. defaultLocale (English).
 *
 * This is an `async` function because Next 16 made `cookies()` and
 * `headers()` async (params/searchParams/cookies/headers all return
 * Promises now). Callers in server components / actions / route
 * handlers should `await getLocale()`.
 *
 * Server-only by design — client components receive locale via prop
 * from their nearest server-component parent.
 */
export async function getLocale(): Promise<Locale> {
  // 1. Cookie wins.
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieValue)) return cookieValue;

  // 2. Accept-Language negotiation.
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  if (acceptLanguage) {
    const negotiated = negotiateFromAcceptLanguage(acceptLanguage);
    if (negotiated) return negotiated;
  }

  // 3. Default.
  return defaultLocale;
}

/**
 * Lightweight Accept-Language negotiation without pulling in a full
 * Negotiator/intl-localematcher dependency. The header format is:
 *
 *   en-US,en;q=0.9,es;q=0.8,fr-CA;q=0.7
 *
 * We split into entries, sort by q (defaults to 1.0), and check each
 * against our supported locales in order. Both exact match and macro-
 * tag match (e.g. "es-MX" → "es") count. Returns the first hit, or
 * null if nothing matches.
 *
 * This is deliberately not a full BCP 47 implementation. It's enough
 * for the macro-tags we support (en, es) and we can graduate to a
 * proper matcher when Phase 3 introduces regional variants
 * (es-MX vs es-ES, pt-BR vs pt-PT).
 */
function negotiateFromAcceptLanguage(header: string): Locale | null {
  const entries = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.split("=")[1] ?? "1") : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(q) ? 0 : q };
    })
    .filter((e) => e.tag.length > 0 && e.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    // Exact match: "es" === "es"
    if (isLocale(tag)) return tag;
    // Macro match: "es-MX" → "es"
    const macro = tag.split("-")[0];
    if (isLocale(macro)) return macro;
  }
  return null;
}

// Re-export the list so callers can iterate without a second import.
export { locales };
