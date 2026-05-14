import "server-only";
import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  findLocaleCaseInsensitive,
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
  // 1. Cookie wins. Case-insensitive so a stale "pt-br" / "PT-BR"
  // cookie still resolves to the canonical "pt-BR" locale.
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE)?.value;
  const fromCookie = findLocaleCaseInsensitive(cookieValue);
  if (fromCookie) return fromCookie;
  // Defensive: if the cookie is set but unrecognized, ignore it.
  void isLocale;

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
 * against our supported locales in order. Three match modes attempted
 * per entry, in order of specificity:
 *
 *   1. Exact case-insensitive match: "pt-BR" tag against "pt-BR"
 *      locale (handles "pt-br" / "PT-BR" too).
 *   2. Region-tagged match against a region-tagged locale: "pt-PT"
 *      from the browser falls through to step 3 because we don't have
 *      a literal "pt-PT" locale. Step 3 then macro-falls to "pt-BR" —
 *      a Portugal visitor sees Brazilian Portuguese rather than
 *      English, which is a closer match than skipping the locale.
 *   3. Macro fallback: split on "-", take the language subtag. If any
 *      supported locale starts with that subtag (case-insensitive),
 *      return it. This is how "pt" → "pt-BR" works, and how a future
 *      "es-MX" browser tag would land on "es".
 *
 * Returns the first hit, or null if nothing matches.
 *
 * This is deliberately not a full BCP 47 implementation. Graduate to
 * @formatjs/intl-localematcher (or similar) when we ship multiple
 * regional variants per language (pt-BR + pt-PT, es-MX + es-ES, etc.)
 * — until then, this hand-rolled matcher is small and predictable.
 */
function negotiateFromAcceptLanguage(header: string): Locale | null {
  const entries = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.split("=")[1] ?? "1") : 1;
      // Preserve original casing — browsers send "pt-BR" with the
      // region in caps. We compare case-insensitively below.
      return { tag: tag.trim(), q: Number.isNaN(q) ? 0 : q };
    })
    .filter((e) => e.tag.length > 0 && e.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    // 1. Exact (case-insensitive) match: "pt-br" → "pt-BR"
    const exact = findLocaleCaseInsensitive(tag);
    if (exact) return exact;

    // 2/3. Macro fallback: "pt-PT" → "pt-BR" (closest supported)
    //      "es-MX" → "es"
    //      "en-GB" → "en"
    const macro = tag.split("-")[0]?.toLowerCase();
    if (!macro) continue;
    for (const l of locales) {
      if (l.toLowerCase().split("-")[0] === macro) return l;
    }

    // 4. Language-family aliases. Browsers may send "tl" (Tagalog,
    //    the ethnic language) when "fil" (Filipino, the standardized
    //    national language based on Tagalog) is what we ship. They
    //    cover effectively the same speaker population for our
    //    purposes. Pin the mapping explicitly rather than letting
    //    the user fall through to English.
    const alias = LANGUAGE_FAMILY_ALIASES[macro];
    if (alias) {
      const aliased = findLocaleCaseInsensitive(alias);
      if (aliased) return aliased;
    }
  }
  return null;
}

/**
 * Macro-tag-only aliases for browser language codes that don't match
 * any supported locale's language subtag but cover effectively the
 * same speaker population.
 *
 * Keep this list small and well-justified — a future graduation to
 * @formatjs/intl-localematcher (or similar) handles this properly.
 */
const LANGUAGE_FAMILY_ALIASES: Record<string, string> = {
  // Tagalog → Filipino. "fil" is the national-language standard based
  // on Tagalog; "tl" is the ISO 639-1 code for the ethnic language.
  // For UI/devotional copy our content reads identically in both.
  tl: "fil",
};


// Re-export the list so callers can iterate without a second import.
export { locales };
