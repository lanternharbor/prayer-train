/**
 * Locale configuration.
 *
 * Supported locales for PrayerTrain's UI shell. The first entry is the
 * default; everything else is opt-in via the LocaleSwitcher (writes
 * NEXT_LOCALE cookie) or browser Accept-Language negotiation.
 *
 * Spanish (es) was prioritized first per the May 2026 i18n roadmap —
 * largest worldwide Catholic population, large underserved US Hispanic
 * Catholic audience. Variant choice (es-MX vs es-ES) is deferred; for
 * now we ship a single Latin-American-flavored Spanish under the macro-
 * tag "es" and stage variants in Phase 3.
 *
 * Adding a new locale:
 *   1. Add the code to `locales` below
 *   2. Add the human-readable label to LOCALE_LABELS
 *   3. Create `src/i18n/messages/<code>.json` mirroring en.json's shape
 *   4. The dictionary loader picks it up automatically
 *
 * URL-based locale routing (e.g. /es/prayers/…) is intentionally NOT
 * implemented here — see docs/internationalization-roadmap.md Phase 1b.
 * This phase keeps URLs stable so live shared links (parish bulletins,
 * iMessage threads, pocket cards) don't break.
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export function isLocale(value: string | undefined | null): value is Locale {
  if (!value) return false;
  return (locales as readonly string[]).includes(value);
}

/**
 * The cookie name. Standardized to `NEXT_LOCALE` so it matches the
 * convention used by next-intl, next-i18n-router, and similar libs —
 * a future migration to one of those doesn't require a cookie rename.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";
