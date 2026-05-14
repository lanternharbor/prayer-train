import type { PrayerTranslationSeed } from "./types";

/**
 * Polish (pl) translations of PrayerType content.
 *
 * Authoring guidelines (Phase ε editorial):
 *  - **Source tier**: KEP (Konferencja Episkopatu Polski) approved
 *    texts first. Vatican.va Polish as secondary. Wydawnictwo M /
 *    Salwator / Pallottinum publications for published prayer
 *    collections. Cite source + retrieval date on every entry.
 *  - **Register**: liturgically formal. Polish Catholic devotional
 *    speech is more formal than pt-BR / fil; lean into that
 *    convention. Use "Pan" / "Pana" forms in addressing God where
 *    grammatical. Use "Ojcze nasz" / "Zdrowaś Maryjo" / "Chwała
 *    Ojcu" for the basic prayer fragments (don't reinvent).
 *  - **Catholic register**: "módlmy się za" — "za" is the
 *    devotional preposition (matches the email dictionary).
 *  - **Cultural anchors when warranted**: Matka Boża Częstochowska
 *    (Czarna Madonna), Św. Faustyna + Koronka do Bożego Miłosierdzia
 *    (Divine Mercy chaplet — Polish origin, important provenance
 *    note), Św. Jan Paweł II.
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
export const plTranslations: PrayerTranslationSeed[] = [
  // Add entries here. Sample (commented):
  //
  // {
  //   prayerSlug: "novena-divine-mercy",
  //   name: "Nowenna do Miłosierdzia Bożego",
  //   description: "Dana św. Faustynie przez Pana Jezusa …",
  //   prayerText: "Konałeś, Jezu, ale wytrysło z Twego Serca źródło życia …",
  //   instructions: "Modlić się raz dziennie przez dziewięć dni …",
  //   patronSaint: "Św. Faustyna Kowalska",
  //   feastDay: "Druga Niedziela Wielkanocna",
  //   source:
  //     "Dzienniczek św. Faustyny (Wydawnictwo Misericordia), retrieved 2026-05-14",
  //   reviewedAt: null,
  // },
];
