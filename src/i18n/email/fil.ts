import type { EnglishEmailDictionary } from "./en";

/**
 * Filipino (Tagalog) email dictionary. First-draft authoring (NOT
 * machine-translated). Bilingual Catholic reviewer required before
 * external launch — see docs/internationalization-roadmap.md Phase γ.
 *
 * Typed against EnglishEmailDictionary so a missing key fails the
 * TypeScript build.
 *
 * Editorial notes (fil specifically, vs es / pt-BR):
 *  - Filipino Catholic Tagalog NATURALLY code-switches with English.
 *    Words like "novena", "rosary", "chaplet", "PrayerTrain" stay
 *    English in everyday devotional speech — DON'T over-translate
 *    to "siyam-na-araw na panalangin" (technically correct but reads
 *    stiff/academic). Taglish flow is the right register.
 *  - The macro-tag "fil" covers Tagalog-based Filipino, the
 *    standardized national language. "tl" (Tagalog) macro-falls to
 *    "fil" via the Accept-Language negotiator — they're effectively
 *    the same surface for our purposes. Bisaya / Cebuano / Ilocano
 *    are NOT covered by this dict (defer to future regional variants
 *    only if adoption justifies).
 *  - "para kay {name}" reads natural in Catholic prayer register
 *    ("ipanalangin natin para kay X"). Same intuition as Spanish's
 *    "por" and pt-BR's "por" — devotional, not transactional. Used
 *    as the recipientPhrasePrefix so subjects render "Araw 5:
 *    Surrender Novena para kay Denis Wilson".
 *  - Subject + H1 patterns use colon-separated "Araw N: {prayerName}
 *    ng {orgFirst} para kay {name}" — same rationale as Spanish /
 *    pt-BR: avoids grammatical-gender agreement issues that would
 *    bite once Phase ε translates the prayer names too. Filipino
 *    doesn't have grammatical gender on nouns the way Spanish does,
 *    but the colon pattern still reads cleaner than a possessive
 *    juxtaposition.
 *  - Possessive renders as "ng {orgFirst}" — Tagalog's possessive
 *    particle. Natural in devotional context.
 *  - "Naidasal ko na" (perfective aspect) for "I prayed" — past
 *    completion, "I have prayed already." Standard Tagalog Catholic
 *    devotional speech.
 *
 * Cultural anchors NOT yet present (defer to Phase ε editorial pass):
 *  - Simbang Gabi (9-day Advent novena tradition) references
 *  - Santo Niño devotion (Cebu)
 *  - Black Nazarene (Quiapo)
 *  - Our Lady of Antipolo
 *  - CBCP (Catholic Bishops' Conference of the Philippines) approved
 *    translation sources — only matters once we ship translated
 *    prayer bodies in Phase ε
 */
export const fil: EnglishEmailDictionary = {
  brandFooter: "PrayerTrain · Isang proyekto ng Lantern Harbor",

  trainDaily: {
    subject: "Paalala sa panalangin: {prayerName} para kay {recipientName}",
    h1: "Panalangin para kay {recipientName} ngayong araw",
    greeting:
      "Kumusta {claimerName}, narito ang iyong commitment sa panalangin para sa araw na ito.",
    howToPrayLabel: "Paano manalangin:",
    customPrayerHeadingNamed: "Isang panalangin mula kay {organizerName}",
    customPrayerHeadingAnon: "May personal na panalanging kasama",
    cta: "Naidasal ko na",
    viewLink: "Tingnan ang PrayerTrain",
    footer: "PrayerTrain — Sama-samang panalangin para sa nangangailangan",
    textGreeting: "Panalangin para kay {recipientName} ngayong araw",
    textCTA: "Naidasal ko na:",
    textViewLink: "Tingnan ang PrayerTrain:",
  },

  chainDaily: {
    // Colon-separated to keep the pattern grammatical when Phase ε
    // translates the prayer names too. Tagalog doesn't have the same
    // gendered-article problem as Spanish, but the colon reads
    // cleaner than a long possessive juxtaposition.
    subjectNamed: "Araw {day}: {prayerName} ng {orgFirst} {phrase}",
    subjectAnon: "Araw {day}: {prayerName} {phrase}",
    dayLabel: "Araw {day} ng {total}",
    h1Named: "{prayerName} ng {orgFirst} {phrase}",
    h1Anon: "{prayerName} {phrase}",
    greeting:
      "Magpaglaan ng sandali, {memberName}. Nasa ibaba ang panalangin para sa araw na ito.",
    dayReflectionLabel: "Repleksyon ng araw {day}",
    customPrayerHeadingNamed: "Isang panalangin mula kay {orgFirst}",
    customPrayerHeadingAnon: "May personal na panalanging kasama",
    otherMembersNamedSingular:
      "{count} pang tao ang nagdadasal kasama ni {orgFirst} ngayon.",
    otherMembersNamedPlural:
      "{count} pang tao ang nagdadasal kasama ni {orgFirst} ngayon.",
    otherMembersAnonSingular: "{count} pang tao ang nagdadasal ngayon.",
    otherMembersAnonPlural: "{count} pang tao ang nagdadasal ngayon.",
    cta: "Naidasal ko na ngayon",
    visitPrayer: "Bisitahin ang panalangin",
    unsubscribe: "Mag-unsubscribe",
    // Plaintext mirrors HTML — colon-separated, code-switching natural.
    textHeaderNamed:
      "Araw {day} ng {total} — {prayerName} ng {orgFirst} {phrase}",
    textHeaderAnon: "Araw {day} ng {total} — {prayerName} {phrase}",
    textReflectionLabel: "Repleksyon ng araw {day}:",
    textCustomFromNamed: "Isang panalangin mula kay {orgFirst}:",
    textCustomFromAnon: "May personal na panalanging kasama:",
    textCTA: "Naidasal ko na ngayon:",
    textVisitPrayer: "Bisitahin ang pahina ng panalangin:",
    textUnsubscribe: "Mag-unsubscribe:",
  },

  // "para kay" reads natural in Tagalog Catholic prayer register
  // ("ipanalangin natin para kay X"). Renders inside subjects ("para
  // kay Maria Wilson") and H1s. Note Tagalog uses "kay" before
  // singular personal names; the existing recipientPhrase helper
  // joins with a name argument so the natural form falls out.
  recipientPhrasePrefix: "para kay",
};
