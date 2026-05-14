import type { EnglishEmailDictionary } from "./en";

/**
 * Brazilian Portuguese email dictionary. First-draft authoring (NOT
 * machine-translated). Bilingual Catholic reviewer required before
 * external launch — see docs/internationalization-roadmap.md Phase β.
 *
 * Typed against EnglishEmailDictionary so a missing key fails the
 * TypeScript build.
 *
 * Editorial notes (pt-BR specifically, vs the es.ts conventions):
 *  - Brazilian register, NOT European Portuguese. Uses "você" rather
 *    than "tu"; "e-mail" with hyphen (CPLP norm); "celular" / "vocês"
 *    where Portugal would use "telemóvel" / "vós".
 *  - "PrayerTrain" stays untranslated as a brand.
 *  - "por" reads natural in Brazilian Catholic prayer contexts ("rezar
 *    POR alguém" — same intuition as Spanish "rezar POR"). Used as the
 *    recipientPhrasePrefix so subjects render "Dia 5: Surrender Novena
 *    por Denis Wilson". "Para" would sound like "for the benefit of"
 *    — less devotional.
 *  - Subject + H1 patterns avoid the gendered article "da {prayerName}"
 *    for the same reason as Spanish: at first launch the prayer names
 *    are still English (Phase ε translates them) and have no Portuguese
 *    grammatical gender to agree with. The colon-separated "Dia N:
 *    {prayerName}" pattern works in both directions: grammatical today
 *    with English prayer names, still grammatical after pt-BR prayer
 *    names land in Phase ε.
 *  - Possessive renders as "de {orgFirst}" — Portuguese has no
 *    apostrophe-S construction, same as Spanish.
 *  - "Coroinha(s)" is the standard Brazilian devotional term for what
 *    English calls "chaplet". Used in inline copy where relevant.
 *
 * Cultural anchors NOT yet present (defer to Phase ε editorial pass):
 *  - Nossa Senhora Aparecida (Padroeira do Brasil) references
 *  - Conferência Nacional dos Bispos do Brasil (CNBB) approved prayer
 *    texts — only matters once we ship translated prayer bodies
 */
export const ptBR: EnglishEmailDictionary = {
  brandFooter: "PrayerTrain · Um projeto da Lantern Harbor",

  trainDaily: {
    subject: "Lembrete de oração: {prayerName} por {recipientName}",
    h1: "Oração de hoje por {recipientName}",
    greeting:
      "Olá {claimerName}, este é o seu compromisso de oração para hoje.",
    howToPrayLabel: "Como rezar:",
    customPrayerHeadingNamed: "Uma oração de {organizerName}",
    customPrayerHeadingAnon: "Uma oração pessoal incluída",
    cta: "Já rezei",
    viewLink: "Ver o PrayerTrain",
    footer: "PrayerTrain — Oração organizada para quem precisa",
    textGreeting: "Oração de hoje por {recipientName}",
    textCTA: "Já rezei:",
    textViewLink: "Ver o PrayerTrain:",
  },

  chainDaily: {
    // Colon-separated to avoid gendered article ("da") that doesn't
    // agree with English prayer names ("Surrender Novena", "Memorare").
    // Once prayer names are translated (Phase ε), this pattern still
    // reads naturally: "Dia 5: Novena ao Sagrado Coração de Jesus
    // de Maria por X".
    subjectNamed: "Dia {day}: {prayerName} de {orgFirst} {phrase}",
    subjectAnon: "Dia {day}: {prayerName} {phrase}",
    dayLabel: "Dia {day} de {total}",
    h1Named: "{prayerName} de {orgFirst} {phrase}",
    h1Anon: "{prayerName} {phrase}",
    greeting:
      "Reserve um momento, {memberName}. A oração de hoje está abaixo.",
    dayReflectionLabel: "Reflexão do dia {day}",
    customPrayerHeadingNamed: "Uma oração de {orgFirst}",
    customPrayerHeadingAnon: "Uma oração pessoal incluída",
    otherMembersNamedSingular:
      "Mais {count} pessoa está rezando com {orgFirst} hoje.",
    otherMembersNamedPlural:
      "Mais {count} pessoas estão rezando com {orgFirst} hoje.",
    otherMembersAnonSingular: "Mais {count} pessoa está rezando hoje.",
    otherMembersAnonPlural: "Mais {count} pessoas estão rezando hoje.",
    cta: "Já rezei hoje",
    visitPrayer: "Visitar a oração",
    unsubscribe: "Cancelar inscrição",
    // Plaintext headers mirror the HTML subject/H1 — colon-separated,
    // gender-neutral. Same rationale as subjectNamed/subjectAnon above.
    textHeaderNamed:
      "Dia {day} de {total} — {prayerName} de {orgFirst} {phrase}",
    textHeaderAnon: "Dia {day} de {total} — {prayerName} {phrase}",
    textReflectionLabel: "Reflexão do dia {day}:",
    textCustomFromNamed: "Uma oração de {orgFirst}:",
    textCustomFromAnon: "Uma oração pessoal incluída:",
    textCTA: "Já rezei hoje:",
    textVisitPrayer: "Visitar a página da oração:",
    textUnsubscribe: "Cancelar inscrição:",
  },

  // "por" reads natural in Brazilian Catholic prayer register:
  // "rezar POR alguém" / "uma novena POR a saúde de X". "Para" sounds
  // like "for the benefit of" — less devotional. Renders inside
  // subjects ("por Maria Wilson") and H1s.
  recipientPhrasePrefix: "por",
};
