/**
 * Type for per-locale prayer-translation seed entries. Each entry in
 * a locale file (es.ts, pt-BR.ts, fil.ts, pl.ts) takes this shape and
 * the seed runner upserts it into the PrayerTypeTranslation table.
 *
 * Keyed by `prayerSlug` (the base PrayerType.slug — e.g.,
 * "novena-sacred-heart") so authors don't have to carry around raw
 * cuid PrayerType IDs. The runner resolves slugs to IDs once at
 * startup and skips rows whose slug doesn't match any existing
 * prayer (logged as a warning, not a hard error).
 *
 * All translatable fields are optional. Partial translations are
 * supported by design: a translator can ship `name + description`
 * first and the prayer body falls back to English until that's
 * also translated. The merge logic in src/lib/prayer-localization.ts
 * applies this field-by-field at read time.
 *
 * `source` is REQUIRED. Catholic content provenance matters; an
 * entry without a citation can't be reviewed responsibly. Cite the
 * approved Catholic source (USCCB Spanish, CNBB, CBCP, KEP,
 * Vatican.va) with a retrieval date so audit is trivial.
 *
 * `reviewedAt` is the editorial gate. Default null (unreviewed —
 * the entry persists in the DB but the helper falls back to English
 * at read time). The reviewer sets it to a Date when they sign off;
 * after that the translation goes live for every visitor in the
 * matching locale.
 */
export interface PrayerTranslationSeed {
  /**
   * The base PrayerType.slug this translation overlays. Must match
   * a row in PrayerType (case-sensitive). Misses are logged + skipped.
   */
  prayerSlug: string;

  /** Translated prayer name (e.g., "Novena al Sagrado Corazón"). */
  name?: string | null;
  /** Translated description paragraph. */
  description?: string | null;
  /** Translated prayer text — the words the prayer warrior recites. */
  prayerText?: string | null;
  /** Translated "How to pray" instructions. */
  instructions?: string | null;
  /**
   * Per-day meditations (Surrender Novena, Divine Mercy, etc.).
   * Empty array = not translated; the helper falls back to base.
   * When provided, length should match the prayer's `daysRequired`.
   */
  dailyReflections?: string[];
  /** Translated patron-saint name. */
  patronSaint?: string | null;
  /** Translated feast-day reference. */
  feastDay?: string | null;

  /**
   * Required. Human-readable citation to the approved Catholic
   * source. Format suggestion:
   *   "USCCB Spanish materials,
   *    https://www.usccb.org/es/prayers/novena-sagrado-corazon,
   *    retrieved 2026-05-14"
   * Vatican.va, USCCB, CNBB, CBCP, KEP, and established Catholic
   * publishers (Editorial Verbo Divino, Ediciones Paulinas, Paulus,
   * Pauline Books & Media) are the approved tiers.
   */
  source: string;

  /**
   * Free-form note from the bilingual Catholic reviewer. Editorial
   * decisions, alternate phrasings considered, regional-variant
   * questions, etc. Stays in the DB for audit.
   */
  reviewerNote?: string | null;

  /**
   * The editorial gate. Null = unreviewed → falls back to English at
   * read time. Set to a Date when the reviewer signs off — after
   * that the translation goes live.
   *
   * Convention: use an ISO date matching the day of review. The
   * bilingual reviewer's name + role should appear in the seed file's
   * top-of-file comment so attribution survives git history.
   */
  reviewedAt?: Date | null;
}
