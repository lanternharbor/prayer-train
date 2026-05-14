/**
 * Prayer content localization.
 *
 * Phase ε of the i18n roadmap (May 2026). Reading sites + the daily-
 * reminder crons consume PrayerType rows. When a translated +
 * reviewed `PrayerTypeTranslation` row exists for the active locale,
 * its fields override the English base; otherwise the base shows
 * through. Fallback is field-by-field, NOT all-or-nothing — a
 * partially-translated row (name + description but not prayerText)
 * is useful.
 *
 * Editorial gate: `reviewedAt` MUST be non-null for the translation
 * to take effect. Unreviewed rows sit safely in the DB without going
 * live. This lets a translator commit + iterate without shipping
 * unreviewed prayer text to real users.
 *
 * See prisma/schema.prisma's PrayerTypeTranslation model for the
 * source-of-truth column comments.
 */

import type {
  PrayerType,
  PrayerTypeTranslation,
} from "@/generated/prisma/client";
import { prisma } from "./db";

/**
 * Fields a translation may override. All other PrayerType fields
 * (slug, category, duration, difficulty, daysRequired, situationTags,
 * imageUrl, sourceUrl, createdAt, id) are intrinsic to the prayer
 * and don't vary by locale.
 */
export type TranslatablePrayerFields = Pick<
  PrayerType,
  | "name"
  | "description"
  | "prayerText"
  | "instructions"
  | "dailyReflections"
  | "patronSaint"
  | "feastDay"
>;

/**
 * The shape returned after merge. Structurally identical to
 * PrayerType, plus a marker indicating which locale's translation
 * (if any) was applied. The marker is useful for QA + analytics:
 * "a Spanish visitor saw English content because no reviewed
 * translation existed for `surrender-novena`".
 */
export interface LocalizedPrayerType extends PrayerType {
  /**
   * Locale of the applied translation, or null when falling back to
   * the base English row. Even on the "en" path this is null — we
   * never tag the base row with a locale, only translation overlays.
   */
  _translationLocale: string | null;
}

/**
 * Pure merge. Takes a base PrayerType row + the candidate translation
 * rows (typically loaded via Prisma `include`), and returns the
 * localized shape for the active locale.
 *
 * Fallback contract:
 *   - locale === "en" or falsy → return base, `_translationLocale: null`
 *   - reviewed translation exists (locale matches AND reviewedAt is
 *     non-null) → each non-null field overrides the base;
 *     dailyReflections override only when length > 0;
 *     `_translationLocale` set to the active locale
 *   - no reviewed translation → return base, `_translationLocale: null`
 *
 * Permissive on partial translations: a translator can ship "name +
 * description" first, and prayerText falls back to English until it's
 * also translated. The marker on the return shape tells QA what
 * actually rendered.
 *
 * Pure — no DB calls — so it's trivially testable.
 */
export function localizePrayer(
  base: PrayerType,
  translations: PrayerTypeTranslation[],
  locale: string,
): LocalizedPrayerType {
  if (!locale || locale === "en") {
    return { ...base, _translationLocale: null };
  }
  const t = translations.find(
    (x) => x.locale === locale && x.reviewedAt !== null,
  );
  if (!t) {
    return { ...base, _translationLocale: null };
  }
  return {
    ...base,
    name: t.name ?? base.name,
    description: t.description ?? base.description,
    prayerText: t.prayerText ?? base.prayerText,
    instructions: t.instructions ?? base.instructions,
    // dailyReflections overrides only when populated. Length-zero
    // is "not translated" — same convention the base row uses.
    dailyReflections:
      t.dailyReflections.length > 0
        ? t.dailyReflections
        : base.dailyReflections,
    patronSaint: t.patronSaint ?? base.patronSaint,
    feastDay: t.feastDay ?? base.feastDay,
    _translationLocale: locale,
  };
}

/**
 * Prisma include argument for fetching a PrayerType (direct or
 * joined-through-slot/chain) with its reviewed translation for a
 * specific locale.
 *
 * Always returns an include shape so it composes cleanly in nested
 * queries:
 *
 *   const chain = await prisma.prayerChain.findUnique({
 *     where: { slug },
 *     include: {
 *       prayerType: { include: localizedPrayerInclude(locale) },
 *     },
 *   });
 *   const localized = localizePrayer(
 *     chain.prayerType,
 *     chain.prayerType.translations,
 *     locale,
 *   );
 *
 * For the English path the WHERE clause matches no rows (translations
 * are non-English by definition), so the JOIN payload is empty. The
 * direct helpers (`getLocalizedPrayerBySlug`, `getLocalizedPrayersMany`)
 * still skip the JOIN entirely on the English path; this is for nested
 * includes where conditional shape would complicate the call site.
 */
export function localizedPrayerInclude(locale: string) {
  return {
    translations: {
      where: {
        locale: locale || "en",
        reviewedAt: { not: null },
      },
    },
  } as const;
}

/**
 * Convenience: fetch a single localized prayer by slug.
 *
 * Used by /prayers/[slug] (direct fetch) and the prayer-detail
 * metadata helpers. For joined fetches (via slot / chain) prefer
 * the `localizedPrayerInclude` + `localizePrayer` pair so we don't
 * make a second DB roundtrip.
 *
 * Returns null when the slug doesn't exist (lets the caller emit
 * notFound()).
 */
export async function getLocalizedPrayerBySlug(
  slug: string,
  locale: string,
): Promise<LocalizedPrayerType | null> {
  if (!locale || locale === "en") {
    const row = await prisma.prayerType.findUnique({ where: { slug } });
    return row ? { ...row, _translationLocale: null } : null;
  }
  const row = await prisma.prayerType.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale, reviewedAt: { not: null } },
      },
    },
  });
  if (!row) return null;
  const { translations, ...base } = row;
  return localizePrayer(base, translations, locale);
}

/**
 * Convenience: fetch many prayers (by arbitrary `where` clause) with
 * each row localized to the active locale. Used by the library index,
 * the situations topic page, and the related-prayers section on the
 * prayer-detail page.
 *
 * Returns an array of LocalizedPrayerType (order matches caller's
 * orderBy). Each row is independently merged.
 *
 * NOTE: this helper is intentionally narrow — it accepts a where +
 * orderBy + take. Pages that need additional Prisma options (e.g.,
 * select) should fall back to inline `localizedPrayerInclude` +
 * `localizePrayer`. Keeping the surface area small makes future
 * refactors (e.g., adding a `select` projection) tractable.
 */
export async function getLocalizedPrayersMany(
  args: {
    where?: Parameters<typeof prisma.prayerType.findMany>[0] extends
      | infer P
      | undefined
      ? P extends { where?: infer W }
        ? W
        : never
      : never;
    orderBy?: Parameters<typeof prisma.prayerType.findMany>[0] extends
      | infer P
      | undefined
      ? P extends { orderBy?: infer O }
        ? O
        : never
      : never;
    take?: number;
  },
  locale: string,
): Promise<LocalizedPrayerType[]> {
  if (!locale || locale === "en") {
    const rows = await prisma.prayerType.findMany({
      where: args.where,
      orderBy: args.orderBy,
      take: args.take,
    });
    return rows.map((r) => ({ ...r, _translationLocale: null }));
  }
  const rows = await prisma.prayerType.findMany({
    where: args.where,
    orderBy: args.orderBy,
    take: args.take,
    include: {
      translations: {
        where: { locale, reviewedAt: { not: null } },
      },
    },
  });
  return rows.map((row) => {
    const { translations, ...base } = row;
    return localizePrayer(base, translations, locale);
  });
}
