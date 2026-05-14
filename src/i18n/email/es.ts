import type { EnglishEmailDictionary } from "./en";

/**
 * Spanish email dictionary. Authored first draft — bilingual Catholic
 * reviewer required before any external launch (see
 * docs/internationalization-roadmap.md Phase 2).
 *
 * Typed against EnglishEmailDictionary so any missing key fails at
 * build time.
 *
 * Editorial notes:
 *  - "PrayerTrain" stays untranslated as a brand.
 *  - "por" reads more naturally than "para" in Catholic prayer
 *    contexts ("rezar POR alguien"). Used as the recipientPhrasePrefix
 *    so subjects render "Día 5: Surrender Novena por Denis Wilson"
 *    rather than "Día 5: Surrender Novena para Denis Wilson".
 *  - Subject + H1 patterns deliberately avoid the gendered article
 *    "de la {prayerName}" — at first launch the prayer names
 *    themselves (e.g. "Surrender Novena", "Sacred Heart Novena") are
 *    still English (Phase 3 / PR D translates them) and have no
 *    Spanish grammatical gender to agree with. The colon-separated
 *    "Día N: {prayerName}" pattern is grammatical in both directions:
 *    works today with English prayer names and continues to work
 *    once {prayerName} is translated.
 *  - {orgFirst}'s possessive renders as "de {orgFirst}" (Spanish
 *    has no apostrophe-S construction).
 */
export const es: EnglishEmailDictionary = {
  brandFooter: "PrayerTrain · Un proyecto de Lantern Harbor",

  trainDaily: {
    subject: "Recordatorio de oración: {prayerName} por {recipientName}",
    h1: "Oración de hoy por {recipientName}",
    greeting: "Hola {claimerName}, este es tu compromiso de oración para hoy.",
    howToPrayLabel: "Cómo rezar:",
    customPrayerHeadingNamed: "Una oración de {organizerName}",
    customPrayerHeadingAnon: "Una oración personal incluida",
    cta: "Ya recé",
    viewLink: "Ver el PrayerTrain",
    footer: "PrayerTrain — Oración organizada para quienes la necesitan",
    textGreeting: "Oración de hoy por {recipientName}",
    textCTA: "Ya recé:",
    textViewLink: "Ver el PrayerTrain:",
  },

  chainDaily: {
    // Colon-separated to avoid gendered article ("de la") that doesn't
    // agree with English prayer names ("Surrender Novena", "Memorare").
    // Once prayer names are translated (PR D), this pattern still
    // reads naturally: "Día 5: Novena al Sagrado Corazón de María por X".
    subjectNamed: "Día {day}: {prayerName} de {orgFirst} {phrase}",
    subjectAnon: "Día {day}: {prayerName} {phrase}",
    dayLabel: "Día {day} de {total}",
    h1Named: "{prayerName} de {orgFirst} {phrase}",
    h1Anon: "{prayerName} {phrase}",
    greeting: "Tómate un momento, {memberName}. La oración de hoy está abajo.",
    dayReflectionLabel: "Reflexión del día {day}",
    customPrayerHeadingNamed: "Una oración de {orgFirst}",
    customPrayerHeadingAnon: "Una oración personal incluida",
    otherMembersNamedSingular:
      "{count} otra persona está rezando con {orgFirst} hoy.",
    otherMembersNamedPlural:
      "{count} otras personas están rezando con {orgFirst} hoy.",
    otherMembersAnonSingular: "{count} otra persona está rezando hoy.",
    otherMembersAnonPlural: "{count} otras personas están rezando hoy.",
    cta: "Ya recé hoy",
    visitPrayer: "Visitar la oración",
    unsubscribe: "Cancelar suscripción",
    // Plaintext headers mirror the HTML subject/H1 — colon-separated,
    // gender-neutral. Same rationale as subjectNamed/subjectAnon above.
    textHeaderNamed:
      "Día {day} de {total} — {prayerName} de {orgFirst} {phrase}",
    textHeaderAnon: "Día {day} de {total} — {prayerName} {phrase}",
    textReflectionLabel: "Reflexión del día {day}:",
    textCustomFromNamed: "Una oración de {orgFirst}:",
    textCustomFromAnon: "Una oración personal incluida:",
    textCTA: "Ya recé hoy:",
    textVisitPrayer: "Visitar la página de oración:",
    textUnsubscribe: "Cancelar suscripción:",
  },

  // "por" reads more naturally than "para" in Catholic prayer
  // contexts: "rezar POR alguien" / "una novena POR la salud de X".
  // "Para" sounds like "for the benefit of" — less prayer-flavored.
  // Renders inside subjects ("por María Wilson") and H1s.
  recipientPhrasePrefix: "por",
};
