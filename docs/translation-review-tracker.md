# Translation review tracker

Every draft string in the locale message JSONs needs native-bilingual-Catholic-reviewer sign-off before public-facing copy goes live. This file tracks what's pending review per locale, by source PR.

Reviewer process per locale:
1. Read the draft strings listed below in the locale's `messages/<locale>.json`.
2. Check against three axes: (a) Catholic devotional register, (b) cultural-fit and naturalness vs. literal-translation smell, (c) accurate Catholic-vocabulary terminology (saint names, prayer types, scripture citation format).
3. Propose edits via PR comments or send revised JSON.
4. Once accepted, the row below is moved to a "Reviewed" subsection (or struck through).

Hard constraints (from [seo-international-ops.md:125-132](./seo-international-ops.md)):
- No machine-translated **canonical prayer text** — those use approved Catholic publishers only (USCCB / CNBB / CBCP / Vatican.va / Episkopat Polski). Drafts in this tracker are pastoral/marketing copy, not canonical liturgical text.
- American origin (Massachusetts founding story, Boston Children's Hospital) preserved across all locales — don't substitute a local equivalent.

---

## /our-story (PR forthcoming on `claude/seo-track-c-our-story`)

Author: Claude (Opus 4.7), 2026-05-15. All translations drafted from the English `ourStory.*` block in [src/i18n/messages/en.json](src/i18n/messages/en.json).

### Spanish (`es`) — direct draft, awaiting native reviewer

Drafted by Claude using direct multi-language ability. Confidence: medium-high (Spanish is well-supported). Specific things to verify:

- Scripture citation format `Mateo 18, 20` (Catholic comma format; Protestant uses colon). Confirm the scripture text matches the USCCB Spanish liturgical translation or a recognized Catholic Bible (Biblia de Jerusalén, Reina-Valera Católica, La Biblia Latinoamericana).
- "guerrero de oración" calque is NOT used (avoided per audit §5.1); used "comunidad" / "intercesión" / "voluntarios" patterns instead.
- "red de comidas" rendering of "meal train". Verify this idiom registers naturally for a Catholic Spanish-speaking reader, or propose alternative (`mutirão` doesn't exist in Spanish; could use `cadena de comidas` but that has the same chain-letter risk as `cadena de oración`).
- "Boston Children's Hospital" preserved as proper noun ✓
- "Massachusetts" preserved ✓

Strings to review:
- `ourStory.heading`
- `ourStory.subheading`
- `ourStory.openingParagraph`
- `ourStory.crisis1Title` through `ourStory.crisis3Body`
- `ourStory.graceLead` + `ourStory.graceBody`
- `ourStory.lossParagraph`
- `ourStory.villageParagraph`
- `ourStory.coordinationParagraph`
- `ourStory.midTagline`
- `ourStory.visionParagraph`
- `ourStory.scriptureLine1` + `ourStory.scriptureLine2` + `ourStory.scriptureCitation`
- `ourStory.ctaLead`
- `ourStory.ctaButton`

### Brazilian Portuguese (`pt-BR`) — direct draft, awaiting native reviewer

Confidence: medium (Portuguese is supported but Brazilian-specific Catholic register requires native ear). Specific things to verify:

- "**mutirão de refeições**" rendering of "meal train" — chosen over "corrente de refeições" to avoid the WhatsApp-spam association documented in audit §5.2. Verify `mutirão` reads as a positive collective-action word (it should — it's a Brazilian idiom from indigenous "motyrõ") and connects well to a religious context.
- Scripture text from Mateus matches the CNBB-recognized Brazilian Catholic Bible (Bíblia Pastoral or Tradução Oficial da CNBB).
- "UTI neonatal" used for NICU (Brazilian acronym).
- "centro cirúrgico" used for OR (Brazilian convention; Portuguese-Portugal uses "bloco operatório").
- Mass capitalization: "Missa" is correct in Brazilian Portuguese.
- Confirm "Pela graça de Deus" is the standard devotional opening (alternative: "Pela misericórdia de Deus").
- "Boston Children's Hospital" preserved ✓ (don't localize to "Hospital Infantil de Boston")
- "Massachusetts" preserved ✓

### Filipino (`fil`) — **native review required, do not ship without sign-off**

Confidence: **low to medium** for Catholic Tagalog idiom; structure should be correct but register precision needs a native Catholic Filipino reviewer (parish priest, parish secretary, or bilingual catechist).

Specific things to verify:

- Scripture text matches the Magandang Balita Biblia (Catholic Filipino Bible) or another CBCP-approved translation. Used "Sapagkat saan man may dalawa o tatlong nagtitipon sa pangalan ko, naroon ako sa gitna nila." — verify exact wording.
- `Mateo 18, 20` citation format (CBCP comma format; verify common Filipino Catholic convention).
- Heavy use of English/Spanish loanwords (NICU, OR, intubation, surgical team) is intentional — matches the Filipino Catholic register seen in existing JSON (`heroBadge: "Catholic Prayer Coordination"`). Native reviewer call on whether each loanword should be Tagalized or kept English.
- "Sa biyaya ng Diyos" used for "by the grace of God" — verify this is the natural Catholic register vs. alternatives like "Sa pamamagitan ng biyaya ng Diyos".
- "panalangin" (formal prayer) used throughout, consistent with existing fil.json choices.
- "komunidad" (community, Spanish loanword) used; standard.
- "ang aming mga anak ay nakaraos" for "our children came through" — verify `nakaraos` is the natural verb here vs. `nakaligtas` (survived) or `gumaling` (recovered).
- "Boston Children's Hospital" preserved ✓
- "Massachusetts" preserved ✓

### Polish (`pl`) — **native review required, do not ship without sign-off**

Confidence: **low to medium**. Polish has rich Catholic devotional vocabulary that a native reviewer should validate.

Specific things to verify:

- Scripture text matches the Biblia Tysiąclecia (standard Polish Catholic Bible — Wydanie V): "Bo gdzie są dwaj albo trzej zebrani w imię moje, tam jestem pośród nich." — verify exact wording per Tysiąclecia.
- `Mt 18, 20` citation format (Polish Catholic abbreviated format with comma; verify common convention).
- "Dzięki łasce Bożej" for "Through the grace of God" — verify register; alternative is "Z łaski Bożej".
- "OIOM-ie noworodkowym" for NICU — verify Polish hospital naming convention. Alternative: "oddziale intensywnej terapii noworodków" (used in subheading).
- Casing of "Wszystkie troje" — Polish grammatical convention for "all three" referring to children.
- "modlitwy skierowanych ku górze" for "prayers sent upward" — verify the devotional metaphor reads naturally; could also be "modlitw wzniesionych do nieba".
- "wojownik modlitwy" calque NOT used (avoided per audit §5.4); used "wspólnota" / "modlitwy" patterns instead.
- "Boston Children's Hospital" preserved ✓ (don't localize to "Szpital Dziecięcy w Bostonie")
- "Massachusetts" preserved ✓

---

## Reviewer recruitment status

Per the implementation plan Track H. No reviewer committed yet for any non-English locale. Strategic candidates:

- **pt-BR**: Brazilian American parishes in Boston Archdiocese (Cambridge, Somerville, Framingham); Capuchin friars (Coração Fiel community is Capuchin and well-organized in Brazil)
- **fil**: Filipino American parishes in Boston Archdiocese; Daughters of St. Paul (Pauline sisters — high Tagalog literacy); national networks (FCC = Filipino Federation of Catholic Communities)
- **pl**: Polish American parishes in Boston Archdiocese (Our Lady of Częstochowa in Boston, St. Adalbert in Worcester); Polish American Priests Association (PAPA)
- **es**: William may self-review or recruit through US Spanish-Catholic networks (most US dioceses have Hispanic Ministry offices)

When a reviewer is committed, add a row to this file with name + locale + status. Reviewers can submit edits via PR comments on the relevant content PR or send revised JSON for direct application.

---

## Reviewed

(Empty until first reviewer signs off.)

---

## Changelog

- **2026-05-15**: Initial tracker; first batch is `/our-story` strings drafted by Claude (Opus 4.7) on branch `claude/seo-track-c-our-story`.
