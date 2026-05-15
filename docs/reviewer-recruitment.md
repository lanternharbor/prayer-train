# Native Catholic reviewer recruitment

Track H from the implementation plan ([`~/.claude/plans/...`](../.claude/plans/can-you-do-an-ethereal-cocke.md)). Used for sourcing native-bilingual-Catholic reviewers per locale so the drafted translations in [`messages/*.json`](../src/i18n/messages/) and the Track D situation content can be validated and shipped.

The strategic premise: Claude-drafted content is the **conversation-starter**, not the finished product. Reviewing concrete text is a smaller ask than translating from scratch. Most people will say no to "translate our site"; many will say yes to "we drafted this — does it read right?"

Each row records a candidate, their network/role, contact path, status, and the locale they cover. Status updates land in this file as outreach happens.

---

## Status legend

- **prospect** — identified, not contacted
- **contacted** — outreach sent, awaiting reply
- **active** — engaged, reviewing or has reviewed
- **declined** — declined or unresponsive after follow-up
- **committed** — has agreed to ongoing review, queued for future content batches

---

## Spanish (`es`)

**Reviewer profile**: Bilingual Catholic with US Hispanic Ministry exposure (parish staff, diocesan office, or laity actively involved in Spanish-language sacramental prep). Bonus if they have experience with Catholic publishing or catechetical writing. ~2 hours of review for the initial content batch.

**Confidence prior**: William can self-review at a high level — Spanish is a Romance language adjacent to English and the existing translations read naturally to a fluent-but-not-native reader. But "reads naturally" is not "Catholic-vocabulary correct" — a native reviewer should catch register issues, regional preference (peninsular vs. Latin American), and any subtle theological framing missteps.

| Candidate | Network / role | Contact path | Status |
|---|---|---|---|
| (open) | Hispanic Ministry office, Archdiocese of Boston | mailto:hispanicministry@bostoncatholic.org | prospect |
| (open) | St. Tarcisius Parish (Framingham, MA — Brazilian + Latino communities) | parish phone via website | prospect |
| (open) | Catholic Theological Union (Chicago) Hispanic Theology faculty | LinkedIn / dept email | prospect |
| (open) | William's own network — Carol Engel? Erica L.? | direct ask | prospect |

## Brazilian Portuguese (`pt-BR`)

**Reviewer profile**: Brazilian Catholic (1st or 2nd-gen US Brazilian counts), active in parish or movement. **Critical** that they have exposure to Brazilian Catholic media culture so they can speak to the `corrente de oração` concern + the São Peregrino positioning. Ideally Capuchin-adjacent (Comunidade Coração Fiel is Capuchin and well-organized in São Paulo + has US chapters).

**Strategic notes**:
- Boston Archdiocese has multiple Portuguese-language Masses (Cambridge — St. Anthony of Padua; Somerville — St. Anthony of Padua at Lower Mystic; Framingham — Padre Cícero / multiple). Outreach to the Brazilian apostolate at any of these is the highest-leverage path.
- pt-BR audit findings already flagged for cultural review (`corrente`, `coroinha` ambiguity, mutirão register) so the reviewer needs to handle nuance — not a literal-translation pass.

| Candidate | Network / role | Contact path | Status |
|---|---|---|---|
| (open) | Brazilian Apostolate, Archdiocese of Boston | https://www.bostoncatholic.org/offices-and-services/cultural-diversity | prospect |
| (open) | St. Anthony of Padua (Cambridge) Brazilian community lead | parish phone | prospect |
| (open) | Capuchin Franciscan Province (Coração Fiel mother house in São Paulo, US chapter via St. Bonaventure NY) | Province communications office | prospect |
| (open) | Canção Nova USA (Brazilian Catholic Charismatic Renewal, US presence) | https://us.cancaonova.com/contato | prospect |

## Filipino (`fil`)

**Reviewer profile**: Filipino Catholic (1st or 2nd-gen, ideally with Tagalog formal-register fluency, not just Taglish). Parish staff, deacon's wife, religious sister, or KofC councilman are typical. **Critical** for this locale because Claude's confidence is lowest — Tagalog register decisions (loanword vs. native, formal `panalangin` vs. colloquial `dasal`) need a native ear.

**Strategic notes**:
- Filipino Federation of Catholic Communities (FCC) has a Boston chapter; the Archdiocese of Boston Office of Cultural Diversity coordinates.
- Daughters of St. Paul (Pauline sisters) operate the largest English/Tagalog Catholic publishing house in the Philippines and have a US presence — high probability of finding a sister with the right exposure.
- Filipino American parishes are concentrated in San Diego, Honolulu, Daly City, Jersey City, and Boston area (Lowell, Lawrence, Lynn).

| Candidate | Network / role | Contact path | Status |
|---|---|---|---|
| (open) | Filipino Apostolate, Archdiocese of Boston | https://www.bostoncatholic.org/offices-and-services/cultural-diversity | prospect |
| (open) | Daughters of St. Paul (Boston — Pauline Books & Media HQ) | https://www.paulinemedia.com/contact-us | prospect |
| (open) | Sto. Niño chapel @ National Shrine of the Immaculate Conception (DC) | shrine office | prospect |
| (open) | FCC (Filipino Federation of Catholic Communities) Boston chapter | http://www.fccusa.org/ | prospect |

## Polish (`pl`)

**Reviewer profile**: Polish Catholic (1st or 2nd-gen US Polish, or recent immigrant). Parish staff, deacon, religious. **Critical** for Biblia Tysiąclecia / Polish liturgical vocabulary precision (Koronka, Nowenna naming conventions, Faustyna register). Polish has rich Catholic devotional vocabulary that's hard to fake.

**Strategic notes**:
- Boston Archdiocese has multiple Polish parishes — Our Lady of Częstochowa (South Boston), St. Adalbert (Hyde Park), Our Lady of the Sacred Heart (Worcester area).
- Polish American Priests Association (PAPA) is a national network — they have a directory and many members serve in US parishes that retain a Polish-language Mass cycle.
- Częstochowa devotion + Divine Mercy (Faustyna) are the two pillars of Polish-American Catholic culture; a reviewer should be deeply formed in both.

| Candidate | Network / role | Contact path | Status |
|---|---|---|---|
| (open) | Our Lady of Częstochowa (South Boston) — Polish-language parish | parish phone via website | prospect |
| (open) | St. Adalbert (Hyde Park) — historic Polish parish | parish phone | prospect |
| (open) | Polish American Priests Association (PAPA) | http://polishpriests.org | prospect |
| (open) | Conventual Franciscan Friars (Polish province in US — Marytown / Libertyville, IL — they publish Polish devotional material in English) | https://marytown.com/contact-us | prospect |

---

## Outreach templates

Below are draft outreach emails per locale. Subject lines + body. Personalize the salutation before sending. Each one ~150-180 words; brief is essential since cold outreach is.

### Spanish (`es`) — outreach template

**Subject**: PrayerTrain — pregunta breve sobre nuestro español católico

> Estimado/a [Padre / Hermana / Diácono / Sr./Sra. ___]:
>
> Soy William Keough, fundador de [PrayerTrain](https://prayertrains.com), una herramienta católica gratuita para organizar oración comunitaria por alguien en crisis (cirugía, cáncer, enfermedad grave, duelo). Nació de tres crisis médicas en mi propia familia católica en Massachusetts en 2025-2026. Es completamente gratis para los usuarios y no vendemos datos.
>
> Recientemente traducimos el sitio al español, pero los textos fueron redactados con apoyo de IA. Antes de promocionar la versión en español a parroquias de habla hispana, necesito que un católico bilingüe revise el registro devocional, la terminología (oración vs. rezo, novenas, coronillas) y la naturalidad del español.
>
> Sería aproximadamente 2 horas de lectura de un sitio que ya existe — no traducción desde cero. Honorario disponible, o lo ofrecemos como intención de Misa. ¿Hay alguien en su [parroquia / diócesis / comunidad] que podría echar un vistazo?
>
> Gracias por su tiempo y por todo el trabajo que ya hace al servicio de los fieles.
>
> William Keough
> Lantern Harbor LLC · [hello@prayertrains.com](mailto:hello@prayertrains.com) · Massachusetts

### Brazilian Portuguese (`pt-BR`) — outreach template

**Subject**: PrayerTrain — pergunta sobre nosso português católico (Brasil)

> Prezado/a [Padre / Irmã / Diácono / Sr./Sra. ___]:
>
> Sou William Keough, fundador do [PrayerTrain](https://prayertrains.com), uma ferramenta católica gratuita para organizar oração em comunidade por alguém em crise (cirurgia, câncer, doença grave, luto). Nasceu de três crises médicas na minha própria família católica em Massachusetts, entre 2025 e 2026. É totalmente gratuito para os usuários e não vendemos dados.
>
> Traduzimos recentemente o site para o português brasileiro, mas os textos foram redigidos com apoio de IA. Antes de promover a versão em português a paróquias de língua portuguesa nos EUA e no Brasil, preciso que um católico brasileiro bilíngue revise o registro devocional, a terminologia (oração vs. reza, novenas, terços, coroinhas), e a naturalidade — especialmente em relação ao tom dos termos "corrente de oração" e "mutirão" no contexto católico brasileiro.
>
> Seriam aproximadamente 2 horas de leitura de um site que já existe — não tradução do zero. Honorário disponível, ou oferecemos como intenção de Missa. Há alguém em sua [paróquia / diocese / comunidade] que poderia dar uma olhada?
>
> Obrigado por seu tempo e pelo trabalho que já faz no serviço dos fiéis.
>
> William Keough
> Lantern Harbor LLC · [hello@prayertrains.com](mailto:hello@prayertrains.com) · Massachusetts

### Filipino (`fil`) — outreach template

**Subject**: PrayerTrain — quick question about our Filipino Catholic copy

> Dear [Father / Sister / Deacon / Mr./Ms. ___]:
>
> I'm William Keough, founder of [PrayerTrain](https://prayertrains.com), a free Catholic tool for organizing community prayer for someone in crisis (surgery, cancer, serious illness, grief). It came from three medical crises in my own Catholic family in Massachusetts in 2025-2026. Completely free for users; we don't sell data.
>
> We recently translated the site to Filipino, but the copy was drafted with AI assistance. Before promoting the Filipino version to Filipino-American parishes and to friends in the Philippines, I need a native Filipino Catholic to review the devotional register, terminology (panalangin vs. dasal, novena loanwords, Tagalog vs. Taglish balance), and naturalness — especially for our cancer / sick child / grief landing pages.
>
> About 2 hours of reading a site that already exists — not translation from scratch. Honorarium available, or we offer it as a Mass intention. Is there someone in your [parish / community / order] who might take a look?
>
> Thank you for your time and for everything you already do in service to the faithful.
>
> William Keough
> Lantern Harbor LLC · [hello@prayertrains.com](mailto:hello@prayertrains.com) · Massachusetts

### Polish (`pl`) — outreach template

**Subject**: PrayerTrain — krótkie pytanie o nasz polski katolicki

> Szanowny/a [Księże / Siostro / Diakonie / Panie/Pani ___]:
>
> Jestem William Keough, założyciel [PrayerTrain](https://prayertrains.com), darmowego katolickiego narzędzia do organizowania wspólnotowej modlitwy za kogoś w kryzysie (operacja, rak, ciężka choroba, żałoba). Powstał z trzech kryzysów medycznych w mojej własnej katolickiej rodzinie w Massachusetts w latach 2025-2026. Jest całkowicie bezpłatny dla użytkowników; nie sprzedajemy danych.
>
> Niedawno przetłumaczyliśmy stronę na polski, ale teksty zostały zredagowane z pomocą sztucznej inteligencji. Zanim zacznę promować polską wersję wśród polskich parafii w USA i w Polsce, potrzebuję, aby polski katolik dwujęzyczny zweryfikował rejestr modlitewny, terminologię (modlitwa, nowenna, koronka, różaniec), oraz naturalność — zwłaszcza w odniesieniu do tradycji Bożego Miłosierdzia św. Faustyny i Matki Bożej Częstochowskiej.
>
> Około 2 godziny czytania istniejącej już strony — nie tłumaczenie od podstaw. Honorarium dostępne, lub oferujemy jako intencję Mszy świętej. Czy jest ktoś w [parafii / wspólnocie / zgromadzeniu] kto mógłby spojrzeć?
>
> Dziękuję za czas i za wszystko, co już Pan/Pani robi w służbie wiernym.
>
> William Keough
> Lantern Harbor LLC · [hello@prayertrains.com](mailto:hello@prayertrains.com) · Massachusetts

---

## Honorarium / Mass intention offer

Standard offer per locale per reviewer batch (single ~2hr pass on the current site content):
- **Honorarium**: $150 USD (Stripe / Venmo / check)
- **OR Mass intention**: Mass offered for an intention of their choosing at a US parish (~$10-15 stipend covered by PrayerTrain to whichever priest celebrates)
- **OR donation**: $150 to the candidate's parish or religious community in their name

Reviewers can pick. The Mass intention option is meaningful for many Catholic reviewers and avoids the "is this a paid endorsement" perception that a cash honorarium can imply when the reviewer is a religious or clergy.

---

## What to send the reviewer

Once they say yes:

1. Link to the live site in their locale (https://prayertrains.com/{locale}).
2. Link to [`docs/translation-review-tracker.md`](./translation-review-tracker.md) which lists every draft string with per-locale flags.
3. The specific PRs they should review (link by PR # — current cluster is #80, #82, #83, #84, #85, #86, #87).
4. Their preferred channel to leave feedback — direct edits to the JSON files via PR comments, a Google Doc, an email reply, whatever's easiest.

Expectation framing: "Catch what feels off; don't worry about catching everything. We'll iterate."

---

## Reviewer-pass review-tracker workflow

After a reviewer signs off on a batch:
1. Add their name + the date to the "Reviewed" section of [`translation-review-tracker.md`](./translation-review-tracker.md).
2. Apply their edits (either by direct PR or William's quick follow-up commit).
3. If they catch a systemic issue (e.g., "use Tagalog `panalangin` not Taglish `prayer`"), document it as a glossary entry in a new `docs/i18n-glossary-<locale>.md` so future drafts respect it.

---

## Changelog

- **2026-05-15**: Initial tracker, all rows `prospect`. Outreach templates per locale.
