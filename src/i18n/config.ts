/**
 * Locale configuration.
 *
 * Supported locales for PrayerTrain's UI shell. The first entry is the
 * default; everything else is opt-in via the LocaleSwitcher (writes
 * NEXT_LOCALE cookie) or browser Accept-Language negotiation.
 *
 * Priority (Catholic-population-weighted, not US-diaspora-first):
 *   1. en — default + primary
 *   2. es — first non-English shell (largest worldwide Catholic
 *      population)
 *   3. pt-BR — Phase β (May 2026). Brazil is the world's largest
 *      Catholic country (~150M Catholics).
 *   4. fil — Phase γ (May 2026). The Philippines has ~80M Catholics
 *      and very high English literacy, so the UI lift is small; the
 *      big win is a localized brand presence + Catholic-vocabulary
 *      copy for Tagalog-speaking households + US Filipino diaspora
 *      parishes (CA/HI/NV/NY).
 *
 * Variant choice (es-MX vs es-ES, pt-PT vs pt-BR, tl vs fil) — macro-
 * tags first. pt-BR is shipped under its full BCP 47 tag rather than
 * a bare "pt" because Brazilian Portuguese and European Portuguese
 * diverge enough (vocabulary, devotional register, "você" vs "tu")
 * that a single "pt" copy would feel off in either market. pt-PT
 * (Portugal) can layer on top later without retro-coding pt-BR copy.
 *
 * For Filipino, the modern BCP 47 macrolanguage tag is "fil"
 * (Filipino, the standardized national language). "tl" (Tagalog)
 * macro-falls to "fil" through the negotiator so a browser sending
 * either lands on the same dictionary — they're effectively the same
 * surface for our purposes. Bisaya / Cebuano / Ilocano are deferred.
 *
 * Adding a new locale:
 *   1. Add the BCP 47 code to `locales` below (lowercase language,
 *      uppercase region — "pt-BR" not "pt-br")
 *   2. Add the human-readable label to LOCALE_LABELS (in the locale's
 *      own language: "Português" not "Portuguese")
 *   3. Create `src/i18n/messages/<code>.json` mirroring en.json's shape
 *   4. Create `src/i18n/email/<code>.ts` mirroring en.ts's shape
 *   5. Add the dictionary to dictionaries.ts and email/index.ts
 *   6. Bilingual Catholic reviewer signs off before public launch
 *
 * URL-based locale routing IS live as of Phase α (PR #61). The proxy
 * rewrites bare paths to `/{defaultLocale}` internally so the URL bar
 * stays clean for English visitors, and non-default locales see
 * explicit prefixes (`/es/...`, `/pt-BR/...`) they can share. Old
 * shared links (`/p/<slug>`) continue working via the same rewrite.
 */

export const locales = ["en", "es", "pt-BR", "fil"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  "pt-BR": "Português",
  fil: "Filipino",
};

/**
 * Strict locale check (exact case match). Used by the proxy + the
 * `isLocale` URL-segment guard. URL casing follows BCP 47 ("pt-BR",
 * not "pt-br"); the proxy doesn't currently normalize, so `/pt-br/`
 * → 404. Acceptable trade-off because all internal links emit the
 * canonical case; only manually-typed URLs hit this edge.
 */
export function isLocale(value: string | undefined | null): value is Locale {
  if (!value) return false;
  return (locales as readonly string[]).includes(value);
}

/**
 * Case-insensitive locale lookup. Returns the canonical-case locale
 * code if the input matches any supported locale ignoring case
 * differences. Useful for Accept-Language negotiation where browsers
 * may send "pt-br" or "PT-br" — we want both to resolve to "pt-BR".
 *
 * Does NOT do macro-tag matching ("pt" → "pt-BR"); that's a separate
 * concern handled in negotiateFromAcceptLanguage.
 */
export function findLocaleCaseInsensitive(
  value: string | undefined | null,
): Locale | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  for (const l of locales) {
    if (l.toLowerCase() === lower) return l;
  }
  return null;
}

/**
 * The cookie name. Standardized to `NEXT_LOCALE` so it matches the
 * convention used by next-intl, next-i18n-router, and similar libs —
 * a future migration to one of those doesn't require a cookie rename.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";
