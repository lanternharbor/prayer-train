import type { PrayerTranslationSeed } from "./types";

/**
 * Pure data shape for a single PrayerTypeTranslation upsert. Extracted
 * from the seed runner so the column-mapping logic is unit-testable
 * without touching Prisma.
 *
 * Two consequential decisions baked in here:
 *
 *  1. **Nullable defaults**: an entry that omits a field is upserted
 *     as `null` (or `[]` for dailyReflections). Re-running the seed
 *     with a partial entry won't preserve a previously-set value —
 *     the entry IS the row. This is intentional: the seed file is
 *     the source of truth, and partial-overwrite semantics would
 *     mean a translator deleting a field from the seed wouldn't
 *     actually delete it from the DB.
 *
 *  2. **`source` is required by the type but defensively coerced**
 *     to a non-empty string here. A missing source would technically
 *     bypass TypeScript via `as PrayerTranslationSeed`, so the
 *     runner double-checks.
 */
export interface TranslationUpsertData {
  name: string | null;
  description: string | null;
  prayerText: string | null;
  instructions: string | null;
  dailyReflections: string[];
  patronSaint: string | null;
  feastDay: string | null;
  source: string;
  reviewerNote: string | null;
  reviewedAt: Date | null;
}

/**
 * Convert a seed entry to the Prisma upsert-data shape. Used in both
 * `create` and `update` arms of the upsert (the runner spreads in
 * the same data on either path).
 *
 * Throws on a missing `source` — the citation is a hard editorial
 * requirement, not just a type-system hint. Easier to fail loud at
 * seed time than to ship an unreviewable row.
 */
export function buildTranslationUpsertData(
  row: PrayerTranslationSeed,
): TranslationUpsertData {
  if (!row.source || row.source.trim().length === 0) {
    throw new Error(
      `Translation seed entry for slug "${row.prayerSlug}" is missing a source citation. ` +
        `Every translation must cite its approved Catholic source. ` +
        `Format: "<Publisher / Conference>, <URL>, retrieved <YYYY-MM-DD>".`,
    );
  }
  return {
    name: row.name ?? null,
    description: row.description ?? null,
    prayerText: row.prayerText ?? null,
    instructions: row.instructions ?? null,
    dailyReflections: row.dailyReflections ?? [],
    patronSaint: row.patronSaint ?? null,
    feastDay: row.feastDay ?? null,
    source: row.source.trim(),
    reviewerNote: row.reviewerNote ?? null,
    reviewedAt: row.reviewedAt ?? null,
  };
}
