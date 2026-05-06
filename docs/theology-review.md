# Theology Review

PrayerTrain is a Catholic prayer coordination tool. Anything user-facing that touches prayer, sacrament, doctrine, or how the Church teaches Catholics to pray — should pass under the eyes of someone serious about the faith before it ships. This file tracks that review process.

## Reviewer

**Fr. W. Chris Palladino** — friend of the operator. Not formally engaged, no contract, no obligation. Items below are queued for friendly review when he has time. Contact details are intentionally not in this repo (private to the operator). Until Fr. Palladino has bandwidth to engage, items stay in "queued" state and ship at the operator's discretion. Items that have shipped without review are flagged below; the goal is to get them retroactively reviewed when possible.

If Fr. Palladino is ever unavailable for a particular question, fallback options:
- A serious lay theologian friend the operator trusts
- A Dominican / Jesuit / Franciscan with a teaching role
- A diocesan office (e.g., Office of Worship) for liturgical questions
- The user's own pastor

## What gets reviewed

**Should be reviewed:**
- Any prayer text added to the library (`src/app/api/seed/...`, `prisma/seed.ts`)
- Daily reminder email copy and subject lines
- Sign-in / claim-confirmation email copy
- Public-facing landing copy that touches faith concepts (homepage hero, /our-story, the religious-language portion of /privacy and /terms, the operator description)
- New prayer categories or situation taxonomies
- Closing-day blessings on completed trains and (future) circles
- Any "spiritual bouquet" / completion-artifact text that gets sent to or printed for users
- Any localization copy when it lands (Spanish, etc.)

**Should NOT be reviewed (not theology):**
- UI/UX, layout, button text, accessibility copy
- Server actions, schema, API routes, infrastructure
- SEO metadata that doesn't make doctrinal claims
- Build, deploy, billing, vendor decisions

## Review process

1. Operator opens an item below in the queue, with a link or quoted text.
2. Forwards the relevant section to Fr. Palladino with a short note: "no rush — when you have a few minutes, would you take a look at this for anything that reads off?"
3. Fr. Palladino replies with one of: approved as-is / suggested edits / changes-required / "talk to someone closer to liturgy" / etc.
4. Operator implements his feedback (if any), updates the row to "shipped" with the reviewed version, and closes the loop with him.
5. Items shipped before review are flagged "shipped — pending retroactive review" so we can revisit.

## Queue (ordered by priority)

| # | Item | Type | Status | Notes |
|---|---|---|---|---|
| 1 | Daily reminder email body | Email copy | **Queued** | `src/lib/email.ts` — currently a single message that goes out at 11 AM UTC. Tone, theology, scriptural basis. |
| 2 | Sign-in (magic link) email body | Email copy | **Queued** | `src/lib/email.ts` — first impression for a Catholic user. |
| 3 | Claim-confirmation email body | Email copy | **Queued** | `src/lib/email.ts` — sets expectation for the volunteer. |
| 4 | Homepage hero + How-It-Works copy | Landing copy | **Shipped — pending retroactive review** | `src/app/page.tsx`. Calls PrayerTrain "like a meal train, but for prayers." Watch for therapeutic-deism phrasing. |
| 5 | /our-story copy | Landing copy | **Shipped — pending retroactive review** | `src/app/our-story/page.tsx`. Personal narrative; theological framing of suffering and intercessory prayer. |
| 6 | Privacy/Terms religious-language sections | Legal-adjacent | **Shipped — pending retroactive review** | `src/app/privacy/page.tsx` line 25 ("a small Catholic prayer coordination tool"), `src/app/terms/page.tsx`. |
| 7 | The 43 prayer texts in the library | Prayer texts | **Queued** | `prisma/seed.ts`. Big batch — Fr. could spot-check a sample if he wants. |
| 8 | Patron-saint mapping correctness | Devotional accuracy | **Queued** | `src/lib/saint-art.ts` (added in vision pass 1). Are the patron-saint attributions correct? Are the linked images theologically appropriate? |
| 9 | Spiritual bouquet PDF closing blessing | Devotional copy | **Queued** | `src/lib/bouquet-pdf.tsx` (added in vision pass 1). Single blessing line at the bottom of the printable certificate. |
| 10 | Circles email reminder template (when it lands) | Email copy | **Future** | Per `docs/circles-spec.md` — draft text included there. Needs review before Circles ships. |
| 11 | "Pray along" CTA wording on Circles (when it lands) | UI copy | **Future** | Per `docs/circles-spec.md`. |
| 12 | "Offer up suffering" sidecar primitive | New primitive + devotional copy | **Future** | Pattern raised by James Green (operator's brother in law) in late-April-2026 text thread. A Catholic publicly offers up their own suffering for a named intention, either standalone or attached to an existing train ("Theresa in MA offers up suffering from lung cancer for X"). Real Catholic devotion (redemptive suffering / Col 1:24). Needs Fr. Palladino review on framing AND a UX design pass (verification, spam-resistance, theological tone) before it's a build. Likely Q3+ 2026. |
| 13 | Defensive copy sweep across all public surfaces | Landing copy / cross-cutting | **Queued** | ~30-minute focused read of homepage, /create chooser, parish handout, bouquet PDF, completion emails, /our-story, /chain landing. Look for instrumentalist or presumptuous framing ("we got through," "prayer works," outcome-promising language) that an unsympathetic reader could call therapeutic-deism or works-based. Triggered by parish distribution starting late April 2026 (RCA families via Krysta + James Green). Output: punch list of softer alternatives. |
| 14 | Surrender Novena per-day meditations (9 days) | Devotional copy / prayer text | **Queued — content needed** | `prisma/seed.ts` — the Surrender Novena currently ships only the refrain ("O Jesus, I surrender myself to You, take care of everything!") repeated as `prayerText`, but the novena's distinguishing feature is nine day-specific meditations from Don Dolindo Ruotolo (Italian original 1930s, English translation widely circulated). End-user feedback (Jilu Chengat, May 6 2026) flagged the gap: the seed `instructions` field even promises "Each day has a unique meditation on a different aspect of surrender" — a promise the data doesn't currently keep. PR adds `PrayerType.dailyReflections` schema + render code (empty-gated no-op until populated). Need Fr. Palladino's eyes on the nine meditations before populating — both for translation fidelity (multiple English translations exist) and for any framing he wants to soften. Once approved: a separate seed-update PR populates `dailyReflections` and the render code lights up automatically. Other novenas with day-by-day structure (Divine Mercy especially) are candidates for the same treatment in follow-up rounds. |

## Log (chronological)

Empty so far. As items get reviewed, append a short note here:

```
2026-XX-XX — Item #N (description). Reviewer feedback: ___. Status: ___.
```

## Principle

The version of PrayerTrain that wins is the one that reads like the *bulletin from a thoughtful, well-loved priest*, not like a SaaS product that happens to be Catholic-flavored. Theology review is what bridges the two.
