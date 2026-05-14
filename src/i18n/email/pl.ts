import type { EnglishEmailDictionary } from "./en";

/**
 * Polish email dictionary. First-draft authoring (NOT machine-
 * translated). Bilingual Catholic reviewer required before external
 * launch — see docs/internationalization-roadmap.md Phase δ.
 *
 * Typed against EnglishEmailDictionary so a missing key fails the
 * TypeScript build.
 *
 * Editorial notes (pl specifically, vs es / pt-BR / fil):
 *  - Polish Catholic register is liturgically formal. Avoid the
 *    casual flow that works in pt-BR/fil. Use the polite/devotional
 *    register throughout — "modlitwa" (prayer), "nowenna" (novena),
 *    "różaniec" (rosary), "koronka" (chaplet, e.g., Koronka do
 *    Bożego Miłosierdzia).
 *  - "PrayerTrain" stays untranslated as a brand.
 *  - "za {name}" reads natural in Polish Catholic prayer register
 *    ("módlmy się za N"). Used as the recipientPhrasePrefix so
 *    subjects render "Dzień 5: Surrender Novena za Denis Wilson".
 *    "Dla" would sound transactional ("for the benefit of");
 *    "za" is the devotional preposition.
 *  - Subject + H1 patterns use colon-separated "Dzień N: {prayerName}
 *    {orgFirst}a za {name}" — Polish has noun cases (genitive,
 *    accusative, etc.), so a literal possessive "Jilu's Surrender
 *    Novena" becomes complex. The colon pattern sidesteps this:
 *    "Dzień 5: Surrender Novena {orgFirst}a" — the possessive
 *    suffix "-a" is the Polish genitive marker, but with English
 *    organizer names this is awkward. Simpler: use "od {orgFirst}"
 *    (from {orgFirst}) construction.
 *  - "od {orgFirst}" reads as "from {Name}" — natural for a prayer
 *    attribution. Spanish/pt-BR/Tagalog use "de"/"de"/"ng" similarly.
 *  - Plurals are complex in Polish (singular / few [2-4] / many [5+]).
 *    The current pluralization in the helper is binary (singular vs
 *    plural). For "X others praying" we use the many-form (5+) since
 *    it's a generic count phrase; a proper plural-rules
 *    implementation is a future polish (deferred — Intl.PluralRules
 *    via formatjs would be the clean path).
 *
 * Cultural anchors NOT yet present (defer to Phase ε editorial pass):
 *  - Matka Boża Częstochowska (Our Lady of Częstochowa) references
 *  - Św. Faustyna + Koronka do Bożego Miłosierdzia (Polish origin)
 *  - Św. Jan Paweł II
 *  - Konferencja Episkopatu Polski (KEP) approved prayer translations
 */
export const pl: EnglishEmailDictionary = {
  brandFooter: "PrayerTrain · Projekt Lantern Harbor",

  trainDaily: {
    subject: "Przypomnienie modlitewne: {prayerName} za {recipientName}",
    h1: "Dzisiejsza modlitwa za {recipientName}",
    greeting:
      "Witaj {claimerName}, oto twoje dzisiejsze zobowiązanie modlitewne.",
    howToPrayLabel: "Jak się modlić:",
    customPrayerHeadingNamed: "Modlitwa od {organizerName}",
    customPrayerHeadingAnon: "Dołączona osobista modlitwa",
    cta: "Pomodliłem się",
    viewLink: "Zobacz PrayerTrain",
    footer: "PrayerTrain — Zorganizowana modlitwa za potrzebujących",
    textGreeting: "Dzisiejsza modlitwa za {recipientName}",
    textCTA: "Pomodliłem się:",
    textViewLink: "Zobacz PrayerTrain:",
  },

  chainDaily: {
    // Colon-separated to sidestep Polish noun-case complexity that
    // a literal "{orgFirst}'s {prayerName}" possessive would
    // require. "od {orgFirst}" (from {orgFirst}) is a natural prayer
    // attribution and avoids declension issues with English
    // organizer names.
    subjectNamed: "Dzień {day}: {prayerName} od {orgFirst} {phrase}",
    subjectAnon: "Dzień {day}: {prayerName} {phrase}",
    dayLabel: "Dzień {day} z {total}",
    h1Named: "{prayerName} od {orgFirst} {phrase}",
    h1Anon: "{prayerName} {phrase}",
    greeting:
      "Poświęć chwilę, {memberName}. Dzisiejsza modlitwa znajduje się poniżej.",
    dayReflectionLabel: "Refleksja dnia {day}",
    customPrayerHeadingNamed: "Modlitwa od {orgFirst}",
    customPrayerHeadingAnon: "Dołączona osobista modlitwa",
    // Polish has three plural forms (singular / few [2-4] / many [5+]).
    // Helper is binary so we use the many-form ("osób") which is the
    // most common case for generic count phrases. A future
    // Intl.PluralRules upgrade would split this properly.
    otherMembersNamedSingular:
      "{count} inna osoba modli się dziś z {orgFirst}.",
    otherMembersNamedPlural:
      "{count} innych osób modli się dziś z {orgFirst}.",
    otherMembersAnonSingular: "{count} inna osoba modli się dziś.",
    otherMembersAnonPlural: "{count} innych osób modli się dziś.",
    cta: "Pomodliłem się dziś",
    visitPrayer: "Odwiedź modlitwę",
    unsubscribe: "Wypisz się",
    // Plaintext mirrors HTML — colon-separated, devotional register.
    textHeaderNamed:
      "Dzień {day} z {total} — {prayerName} od {orgFirst} {phrase}",
    textHeaderAnon: "Dzień {day} z {total} — {prayerName} {phrase}",
    textReflectionLabel: "Refleksja dnia {day}:",
    textCustomFromNamed: "Modlitwa od {orgFirst}:",
    textCustomFromAnon: "Dołączona osobista modlitwa:",
    textCTA: "Pomodliłem się dziś:",
    textVisitPrayer: "Odwiedź stronę modlitwy:",
    textUnsubscribe: "Wypisz się:",
  },

  // "za" reads as the devotional preposition in Polish Catholic
  // register ("módlmy się ZA X"). Renders inside subjects ("za
  // Maria Wilson") and H1s. Note Polish noun-case agreement would
  // technically apply (accusative case after "za" with motion verbs,
  // genitive elsewhere) — the current helper passes the bare name,
  // which is what Polish prayer email subjects normally do
  // (declining proper nouns in subject lines is uncommon).
  recipientPhrasePrefix: "za",
};
