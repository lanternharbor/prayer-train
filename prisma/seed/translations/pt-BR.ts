import type { PrayerTranslationSeed } from "./types";

/**
 * Brazilian Portuguese (pt-BR) translations of PrayerType content.
 *
 * Authoring guidelines (Phase ε editorial):
 *  - **Source tier**: CNBB (Conferência Nacional dos Bispos do Brasil)
 *    approved texts first. Vatican.va Portuguese as secondary. Paulus
 *    + Canção Nova + Aparecida (publisher) for published prayer
 *    collections. Cite source + retrieval date on every entry.
 *  - **Variant**: macro-tag "pt-BR" — Brazilian Portuguese register.
 *    "você" form, "e-mail" with hyphen. Avoid Portugal-specific
 *    phrasing ("vós", "telemóvel", "casa de banho"). pt-PT support
 *    is a future layer, not a current concern.
 *  - **Catholic register**: "rezar por" (devotional preposition);
 *    "por" prefix in the email dictionary mirrors this convention.
 *  - **Cultural anchors when warranted**: Nossa Senhora Aparecida
 *    (Padroeira do Brasil) in any Marian-Brazilian devotional
 *    context. Padre Marcelo Rossi register is warm but reverent —
 *    a useful tonal touchstone.
 *  - **Brand names stay English**: "PrayerTrain", "Surrender Novena".
 *
 * Reviewer attribution: <reviewer name + role pending>.
 *
 * Status: empty. Phase ε editorial work hasn't started. The seed
 * runner is idempotent — adding entries here and running
 * `npm run seed:translations` is safe at any time. Until
 * `reviewedAt` is set on each row, the helper falls back to English
 * at read time and nothing ships to real users.
 */
export const ptBRTranslations: PrayerTranslationSeed[] = [
  // Add entries here. Sample (commented):
  //
  // {
  //   prayerSlug: "novena-sacred-heart",
  //   name: "Novena ao Sagrado Coração de Jesus",
  //   description: "Uma devoção poderosa de nove dias ao Sagrado Coração …",
  //   prayerText: "Ó Sacratíssimo Coração de Jesus, fonte de toda bênção …",
  //   instructions: "Reze uma vez ao dia por nove dias consecutivos. …",
  //   patronSaint: "Santa Margarida Maria Alacoque",
  //   feastDay: "Sexta-feira depois de Corpus Christi",
  //   source:
  //     "CNBB / Canção Nova publicação, retrieved 2026-05-14",
  //   reviewedAt: null,
  // },
];
