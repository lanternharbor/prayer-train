import type { PrayerTranslationSeed } from "./types";

/**
 * Filipino / Tagalog (fil) translations of PrayerType content.
 *
 * Authoring guidelines (Phase ε editorial):
 *  - **Source tier**: CBCP (Catholic Bishops' Conference of the
 *    Philippines) approved texts first. Vatican.va Tagalog as
 *    secondary. Pauline Books & Media + Society of the Divine
 *    Word + Salesian missions publications for published prayer
 *    collections. Cite source + retrieval date on every entry.
 *  - **Variant**: macro-tag "fil" — Filipino, the standardized
 *    national language based on Tagalog. ISO "tl" (ethnic Tagalog)
 *    macro-falls to "fil" via the Accept-Language negotiator.
 *    Bisaya / Cebuano / Ilocano are NOT covered here.
 *  - **Catholic register**: "ipanalangin natin para kay [name]" is
 *    natural in Tagalog Catholic prayer speech. Code-switching
 *    with English is normal — "novena", "rosary", "PrayerTrain"
 *    stay English. Over-translation reads stiff.
 *  - **Cultural anchors when warranted**: Simbang Gabi (9-day
 *    Advent novena tradition), Santo Niño devotion (Cebu), Black
 *    Nazarene (Quiapo), Our Lady of Antipolo. These resonate
 *    strongly with Filipino Catholic audiences.
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
export const filTranslations: PrayerTranslationSeed[] = [
  // Add entries here. Sample (commented):
  //
  // {
  //   prayerSlug: "novena-sacred-heart",
  //   name: "Nobena sa Banal na Puso ni Hesus",
  //   description: "Isang makapangyarihang siyam-na-araw na debosyon …",
  //   prayerText: "O Banal na Puso ni Hesus, bukal ng lahat ng biyaya …",
  //   instructions: "Manalangin isang beses araw-araw sa loob ng siyam …",
  //   patronSaint: "Santa Margarita Maria Alacoque",
  //   feastDay: "Biyernes pagkatapos ng Corpus Christi",
  //   source:
  //     "CBCP-approved Tagalog prayer collection, retrieved 2026-05-14",
  //   reviewedAt: null,
  // },
];
