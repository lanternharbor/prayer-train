/**
 * English email dictionary.
 *
 * Canonical shape — the EnglishEmailDictionary type below is exported
 * and used as the type of every other locale's email dictionary. A
 * missing key in es.ts fails at build time.
 *
 * Strings use {placeholder} substitution. The email helpers in
 * src/lib/email.ts call `interpolate()` (from src/i18n/format.ts) to
 * inject runtime values. Patterns chosen so a translator can rearrange
 * sentence order without touching code.
 *
 * The "Named" / "Anon" variants exist because the organizer may have
 * opted into per-train anonymity. Named forms inject {orgFirst}; anon
 * forms drop the possessive construction entirely (e.g. "Day 5 of the
 * Surrender Novena" rather than "Day 5 of the's Surrender Novena" —
 * see firstNameOrNull and PR #36's commentary).
 *
 * Plain-text alternates are NOT kept here — the helper generates them
 * by stripping HTML from the structured fields. If a future language
 * has fundamentally different sentence order between HTML and text
 * versions, split this dict.
 */
// Widening type — without this, `as const` would make each leaf a
// literal string type, and the Spanish dictionary would have to use
// the exact same English string. We want structural shape parity
// (same keys, same shape) but the leaf values are free-text strings.
type EmailDictionaryShape = {
  brandFooter: string;
  trainDaily: {
    subject: string;
    h1: string;
    greeting: string;
    howToPrayLabel: string;
    customPrayerHeadingNamed: string;
    customPrayerHeadingAnon: string;
    /**
     * Reassurance shown directly above the "I prayed" button. Reframes
     * the click as adding an optional gold seal on top of the slot
     * (which is already on the bouquet by virtue of having been
     * claimed), rather than as a required "mark complete" step. See
     * the May 2026 Greens thread + plans/bit-of-a-debate-tranquil-wand.md
     * for the product reframe.
     */
    ctaLead: string;
    cta: string;
    viewLink: string;
    footer: string;
    textGreeting: string;
    textCTA: string;
    textViewLink: string;
  };
  chainDaily: {
    subjectNamed: string;
    subjectAnon: string;
    dayLabel: string;
    h1Named: string;
    h1Anon: string;
    greeting: string;
    dayReflectionLabel: string;
    customPrayerHeadingNamed: string;
    customPrayerHeadingAnon: string;
    otherMembersNamedSingular: string;
    otherMembersNamedPlural: string;
    otherMembersAnonSingular: string;
    otherMembersAnonPlural: string;
    cta: string;
    visitPrayer: string;
    unsubscribe: string;
    textHeaderNamed: string;
    textHeaderAnon: string;
    textReflectionLabel: string;
    textCustomFromNamed: string;
    textCustomFromAnon: string;
    textCTA: string;
    textVisitPrayer: string;
    textUnsubscribe: string;
  };
  recipientPhrasePrefix: string;
};

export const en: EmailDictionaryShape = {
  // Brand footer text shared by both templates (kept stable across
  // locales for trademark reasons — "PrayerTrain" is a brand name).
  brandFooter: "PrayerTrain · A Lantern Harbor project",

  // Train daily reminder. Sent once per claimed slot on its `date`.
  trainDaily: {
    subject: "Prayer reminder: {prayerName} for {recipientName}",
    h1: "Today's Prayer for {recipientName}",
    greeting: "Hi {claimerName}, here's your prayer commitment for today.",
    howToPrayLabel: "How to pray:",
    customPrayerHeadingNamed: "A prayer from {organizerName}",
    customPrayerHeadingAnon: "A personal prayer included",
    ctaLead:
      "Your slot is already on the bouquet. When you've prayed today, you can add a small gold seal below.",
    cta: "I prayed",
    viewLink: "View the prayer train",
    footer: "PrayerTrain — Organized prayer for those in need",
    textGreeting: "Today's prayer for {recipientName}",
    textCTA: "I prayed:",
    textViewLink: "View the prayer train:",
  },

  // Chain daily reminder. Sent once per active member per day from
  // chain.startDate through chain.endDate.
  chainDaily: {
    subjectNamed: "Day {day} of {orgFirst}'s {prayerName} {phrase}",
    subjectAnon: "Day {day} of the {prayerName} {phrase}",
    dayLabel: "Day {day} of {total}",
    h1Named: "{orgFirst}'s {prayerName} {phrase}",
    h1Anon: "{prayerName} {phrase}",
    greeting: "Take a moment, {memberName}. The prayer for today is below.",
    dayReflectionLabel: "Day {day} reflection",
    customPrayerHeadingNamed: "A prayer from {orgFirst}",
    customPrayerHeadingAnon: "A personal prayer included",
    otherMembersNamedSingular:
      "{count} other person is praying with {orgFirst} today.",
    otherMembersNamedPlural:
      "{count} other people are praying with {orgFirst} today.",
    otherMembersAnonSingular: "{count} other person is praying today.",
    otherMembersAnonPlural: "{count} other people are praying today.",
    cta: "I prayed today",
    visitPrayer: "Visit the prayer",
    unsubscribe: "Unsubscribe",
    textHeaderNamed: "Day {day} of {total} — {orgFirst}'s {prayerName} {phrase}",
    textHeaderAnon: "Day {day} of {total} — {prayerName} {phrase}",
    textReflectionLabel: "Day {day} reflection:",
    textCustomFromNamed: "A prayer from {orgFirst}:",
    textCustomFromAnon: "A personal prayer included:",
    textCTA: "I prayed today:",
    textVisitPrayer: "Visit the prayer page:",
    textUnsubscribe: "Unsubscribe:",
  },

  // "for {name}" / "for {intentionFragment}" prefix used by
  // recipientPhrase(). Localized so Spanish gets "para" etc. Renders
  // inside subjects and headers; should be lowercase + grammatically
  // joinable to a name or noun phrase.
  recipientPhrasePrefix: "for",
};

// Re-export the shape under a name that reads natural at callsites,
// even though the type is now structural (not derived from `en`).
export type EnglishEmailDictionary = EmailDictionaryShape;
