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
 *  - "guerrero/a de oración" for "prayer warrior" stays in the public
 *    UI dict; emails use the warmer "está orando" / "rezar" verbs.
 *  - "PrayerTrain" stays untranslated as a brand. The English-language
 *    descriptor "Organized prayer for those in need" footer is kept
 *    English-flavored in the brand footer line; only the marketing
 *    footer translates.
 *  - {orgFirst}'s possessive (Latin Spanish doesn't have this) renders
 *    as "de {orgFirst}" — e.g., "Día 5 de la Novena de María por X".
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
    subjectNamed: "Día {day} de la {prayerName} de {orgFirst} {phrase}",
    subjectAnon: "Día {day} de la {prayerName} {phrase}",
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

  // "para" works in both subject ("Día 5 de la Novena al Sagrado Corazón
  // para María") and headers. For an intention-only phrase, "para que la
  // hermana se recupere" — same prefix.
  recipientPhrasePrefix: "para",
};
