import type { PrayerTranslationSeed } from "./types";

/**
 * Spanish (es) translations of PrayerType content.
 *
 * Authoring guidelines (Phase ε editorial):
 *  - **Source tier**: USCCB Spanish materials (usccb.org/es) for
 *    US Hispanic Catholic register; Vatican.va Spanish for global
 *    Catholic register. Editorial Verbo Divino + Ediciones Paulinas
 *    + Editorial Católica for published prayer texts. Cite source +
 *    retrieval date on every entry.
 *  - **Variant**: macro-tag "es" ships first; "es-MX" / "es-ES"
 *    regional variants deferred unless adoption data justifies.
 *    Use neutral Latin American Spanish (avoid Spain-specific
 *    "vosotros", prefer "ustedes").
 *  - **Catholic register**: "rezar por" not "rezar para" (same
 *    rationale as the email dictionary).
 *  - **Brand names stay English**: "PrayerTrain", "Surrender Novena".
 *    Translate the descriptive name when warranted ("Novena al
 *    Sagrado Corazón") and keep both when an English title is
 *    canonical in the source ("Novena al Sagrado Corazón [Sacred
 *    Heart Novena]").
 *
 * Reviewer attribution: <reviewer name + role pending>.
 *
 * Status: empty. Phase ε editorial work hasn't started. The seed
 * runner is idempotent — adding entries here and running
 * `npm run seed:translations` is safe at any time. Until
 * `reviewedAt` is set on each row, the helper falls back to English
 * at read time and nothing ships to real users.
 */
export const esTranslations: PrayerTranslationSeed[] = [
  // Add entries here. Sample (commented):
  //
  // {
  //   prayerSlug: "novena-sacred-heart",
  //   name: "Novena al Sagrado Corazón de Jesús",
  //   description: "Una poderosa devoción de nueve días …",
  //   prayerText: "Oh, Sagradísimo Corazón de Jesús, fuente de toda bendición …",
  //   instructions: "Reza una vez al día durante nueve días consecutivos. …",
  //   patronSaint: "Santa Margarita María Alacoque",
  //   feastDay: "Viernes después del Corpus Christi",
  //   source:
  //     "USCCB Spanish materials, https://www.usccb.org/es/prayers/novena-sagrado-corazon, retrieved 2026-05-14",
  //   reviewedAt: null, // ← reviewer flips this to a Date on signoff
  // },
];
