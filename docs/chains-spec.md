# PrayerChain — Implementation Spec

> Status: **Spec written + initial implementation on `feature/chains` branch.** Schema migration awaits supervised execution.
>
> Renamed from "Prayer Circle" — `Train` + `Chain` is the two-noun product family, both already in Catholic vernacular ("meal train" + "prayer chain"). Each member is a *link* in the chain; the chain travels hand to hand.
>
> Trigger to merge to main: user awake to supervise the schema migration. See `docs/operational-safety.md` for the discipline.

## Why chains

PrayerTrain today supports one prayer pattern: **distributed coverage** ("a roster of different people each pray something different on different days for one recipient"). That's the train. The Spina family is using one right now.

There's a second, equally common Catholic prayer pattern PrayerTrain does *not* serve: **synchronized solidarity** ("I'm praying this novena. Want to join me?"). Same prayer, same days, group of people praying together. Krysta's iMessage about Benji's vocal cords was the canonical example — and she ended up using praymorenovenas.com because PrayerTrain didn't fit.

PrayerChain is the missing primitive.

| Pattern | Tool today | What we're shipping |
|---|---|---|
| Global wave (whole Church praying together on a calendar) | praymorenovenas.com | Out of scope |
| **Personal chain (small group + recipient + intention)** | **gap** | **PrayerChain ✓** |
| Distributed coverage (rotating volunteers covering slots) | PrayerTrain | Already shipped |

## Resolved decisions (this session)

1. **Invite scope**: open. Anyone with the link can join and re-share. Catholic prayer chains travel hand-to-hand by design.
2. **Joining**: email required. The daily reminder is the entire product value.
3. **Discovery**: public chains appear on `/browse` alongside public trains. **Default `isPublic = false`** at create time — most chains are intimate.
4. **Chain → Train conversion**: yes, but as a **future Phase D** after Chain basics ship cleanly. Adds a `Promote to Train` flow.

## Architectural ground truth — isolation from existing train code

PrayerChains live in **fully isolated** code paths. The Spina train is unaffected by anything in this spec.

| Concern | Train (untouched) | Chain (new) |
|---|---|---|
| URL | `/p/[slug]` | `/chain/[slug]` |
| Tables | `PrayerTrain`, `PrayerSlot` | `PrayerChain`, `PrayerChainMember` (additive) |
| Server actions | existing | new functions appended to `src/lib/actions.ts` |
| Daily reminder cron | `/api/cron/daily-reminders` (untouched logic) | `/api/cron/chain-reminders` (new file, fires at 11:05 UTC, 5 min after the train cron) |
| Bouquet PDF | `/api/bouquet/[slug]` | `/api/bouquet/chain/[slug]` |
| Email templates | existing | new functions appended to `src/lib/email.ts` |

Critical: **the cron is a separate handler in a separate file**. If chain-reminder code throws, train reminders already went out at 11:00 UTC and are unaffected.

See `docs/operational-safety.md` for the full list of files that must not be touched.

## User flow (Krysta's case as the canonical example)

1. Krysta visits `/prayers/novena-st-blaise` (or any other novena).
2. Sees a primary CTA: **"Pray with friends"**.
3. Clicks. One screen with three fields:
   - "Who is this for?" → "Benji"
   - "What's the intention?" → "Full healing of his throat and vocal cords"
   - "List on the public Browse page?" toggle, default OFF
4. Submits. Server creates a `PrayerChain` row, makes Krysta the organizer + first member, generates a slug like `benji-throat-healing-st-blaise-7f3a`, redirects to `/chain/[slug]`.
5. Lands on the chain detail page. Sees: "Day 1 of 9 — Krysta is praying the St. Blaise Novena for Benji's full healing." Big share button. Member roster shows herself.
6. Taps share. Opens iMessage with pre-filled text + URL. Rich OG preview shows in the recipient's chat: "Krysta's St. Blaise Novena for Benji — Day 1 of 9. Pray along."
7. Friend Carol clicks. Lands on `/chain/[slug]`. Sees the same context. CTA: **"Pray along with Krysta"**.
8. Carol enters her name + email. Server adds her as a `PrayerChainMember`. She gets the daily reminder for the next 9 days.
9. Each day at 11:05 UTC, the chain-reminder cron sends each active member an email: "Day 3 of Krysta's novena for Benji's healing. Today's prayer text below…"
10. Members can mark "I prayed today" via a link in the email — light-touch tracking, optional.
11. On Day 9, the closing-day email reads as a thank-you: "Today is the final day of Krysta's novena for Benji. Thank you for praying with her."
12. Krysta can mark the chain COMPLETED, leave a final note, and download a printable spiritual bouquet PDF.

## Schema

Append to `prisma/schema.prisma`. Two new models, one new enum. Zero changes to existing tables.

```prisma
enum ChainStatus {
  ACTIVE
  COMPLETED
  CANCELLED
  PROMOTED   // Phase D: chain was converted into a Train
}

model PrayerChain {
  id                String         @id @default(cuid())
  slug              String         @unique
  organizerId       String
  organizer         User           @relation(fields: [organizerId], references: [id])
  prayerTypeId      String
  prayerType        PrayerType     @relation(fields: [prayerTypeId], references: [id])

  recipientName     String?
  intention         String         @db.Text

  startDate         DateTime
  durationDays      Int
  endDate           DateTime

  isPublic          Boolean        @default(false)

  status            ChainStatus    @default(ACTIVE)
  closingNote       String?        @db.Text
  promotedToTrainId String?        // future Phase D linkage; soft reference (no FK constraint)

  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  members           PrayerChainMember[]

  @@index([organizerId])
  @@index([prayerTypeId])
  @@index([status, isPublic])
}

model PrayerChainMember {
  id               String       @id @default(cuid())
  chainId          String
  chain            PrayerChain  @relation(fields: [chainId], references: [id], onDelete: Cascade)

  userId           String?
  user             User?        @relation(fields: [userId], references: [id])
  name             String
  email            String

  lastDayCompleted Int?         // 1-indexed; null until they mark anything

  joinedAt         DateTime     @default(now())
  unsubscribedAt   DateTime?

  @@unique([chainId, email])
  @@index([chainId])
  @@index([email])
}
```

User and PrayerType models gain back-relations (`prayerChains`, `chainMemberships`) — additive only.

### Migration discipline

- Local: `npx prisma migrate dev --name add-prayer-chains` — creates migration file in `prisma/migrations/`.
- Production: **`npx prisma migrate deploy`** with the user awake, against prod DATABASE_URL, with smoke test before and after.
- Roll-forward only — if a problem surfaces, write a new migration that fixes it. Don't try to roll back schema changes manually.

## Server actions

Append to `src/lib/actions.ts`. All match existing patterns (`"use server"`, Zod-validated FormData via `parseFormData(...)`, `enforceRateLimit(...)`).

- **`createPrayerChain(formData)`** — auth required. Input: `prayerTypeId`, `recipientName?`, `intention`, `durationDays?` (defaults to `prayer.daysRequired`), `isPublic`. Generates slug from recipientName (or intention) + prayerType.slug + 4-char suffix. Creates the chain row. Auto-creates organizer's `PrayerChainMember` row. Sends "your chain is live" email. Redirects to `/chain/[slug]`.
- **`joinPrayerChain(formData)`** — auth NOT required (matches `claimPrayerSlot`). Input: `chainId`, `name`, `email`. Rate-limited. Validates chain is ACTIVE. Upserts member row (handles re-join after unsubscribe). Sends "you're praying with X for Y" confirmation email.
- **`markChainDayComplete(chainId, day)`** — token-or-session gated. Updates `PrayerChainMember.lastDayCompleted = max(current, day)`. Idempotent.
- **`unsubscribeFromChain(token)`** — token-gated link from email footer. Sets `unsubscribedAt`. Future cron emails skip unsubscribed members.
- **`closeChain(chainId, closingNote?)`** — organizer only. Sets `status = COMPLETED`, stores `closingNote`. Triggers closing email to all members.
- **`postChainGuestbookEntry(formData)`** — extends `GuestbookEntry` model with optional `chainId` (additive column with default null, doesn't affect existing train guestbook entries).

Append matching Zod schemas to `src/lib/validation.ts`.

## Routes

| Path | What it does |
|---|---|
| `/chain/[slug]` | Detail page (everyone). Day N of M, prayer text, member roster, "Pray along" CTA, encouragement wall. |
| `/chain/[slug]/manage` | Organizer-only. Close chain, add closing note, download bouquet, see member emails. |
| `/chain/new?prayerType=[slug]` | Quick-create flow when "Pray with friends" clicked from a prayer detail page. |
| `/api/chain/unsubscribe?token=...` | Token-gated unsubscribe handler. |
| `/api/bouquet/chain/[slug]` | PDF endpoint, mirroring `/api/bouquet/[slug]` for trains. |

The `/prayers/[slug]/page.tsx` gets a new "Pray with friends" button next to the existing CTAs (additive, no changes to existing behavior).

## Email templates

### Daily reminder (the differentiator vs. praymorenovenas)

Subject: `Day {{day}} of {{organizerFirstName}}'s {{prayerName}} {{recipientPhrase}}`

Body opening (must mention organizer + recipient by name every day):

> Today is **Day {{day}} of {{durationDays}}** of {{organizerFirstName}}'s {{prayerName}} {{recipientPhrase}}.
>
> Take a moment, wherever you are. The prayer for today is below.
>
> ---
>
> {{prayer.prayerText}}
>
> ---
>
> {{memberCount}} other people are praying with {{organizerFirstName}} today.
>
> [I prayed today]({{markCompleteUrl}})  ·  [Visit the chain]({{chainUrl}})  ·  [Unsubscribe]({{unsubscribeUrl}})

Where `recipientPhrase` is:
- "for {{recipientName}}" if recipientName is set
- "for {{intention}}" otherwise (truncated to first 8 words if long)

### Closing-day email (Day N == durationDays)

Subject: `The {{prayerName}} is complete — thank you for praying with {{organizerFirstName}}`

Body different from daily — closer to a thank-you note. No call to action other than "[See the chain]" and (for the organizer only) "[Download the spiritual bouquet]".

### Confirmation when joining

Subject: `You're praying with {{organizerFirstName}} for {{recipientShort}}`

Body: warm, brief, reminds them they'll get an email each day for `durationDays` days.

**All three of these copy templates need theology review** before launch — flagged in `docs/theology-review.md` as items #10 and #11.

## OG metadata + JSON-LD

Extend `src/lib/schema.ts` with:

```ts
export function prayerChainSchema(chain: {
  slug: string;
  prayerName: string;
  organizerName: string;
  recipientName: string | null;
  intention: string;
  startDate: Date;
  durationDays: number;
}): Record<string, unknown> { ... }
```

OG title format: `{{organizerFirstName}}'s {{prayerName}} {{recipientPhrase}}`
OG description: `Day {{day}} of {{durationDays}}. Pray along.`
OG image: the patron-saint portrait from `src/lib/saint-art.ts` if available, else `/logo.png`.

Krysta's iMessage preview becomes:

> 🖼️ [St. Blaise saint image]
> **Krysta's St. Blaise Novena for Benji**
> Day 1 of 9. Pray along.
> www.ourfaithtrain.com

## Sitemap inclusion

Add public chains to `src/app/sitemap.ts` — same pattern as public trains. Private chains excluded.

## Browse page integration

`src/app/browse/page.tsx` queries both public ACTIVE trains AND public ACTIVE chains, renders in a unified grid with a small visual indicator (chain icon vs train icon) showing which is which. This is the only existing-page modification beyond the prayer detail CTA — test carefully against preview deploys.

## Theology review checkpoints

Per `docs/theology-review.md`, these specific items need Fr. Palladino's eye before Chains launch:

- Daily reminder email body (item #10 in review queue)
- "Pray along with {{organizer}}" CTA wording (item #11)
- Closing-day "the chain is complete" email
- The framing of "I prayed today" as a tracking state — avoid implying spiritual obligation/grace tied to checking a box
- Any blessing line on the bouquet PDF when issued for a chain

## Sequenced execution plan

### Commit 1 — schema + server actions (~90 min)

- Add `PrayerChain`, `PrayerChainMember`, `ChainStatus` to `prisma/schema.prisma`.
- `npx prisma migrate dev --name add-prayer-chains` LOCALLY only.
- Write the six chain server actions in `src/lib/actions.ts`.
- Add Zod schemas to `src/lib/validation.ts`.
- Extend rate-limiter buckets to include `joinChain` + `createChain` in `src/lib/rate-limit.ts`.

### Commit 2 — routes + UI shell (~90 min)

- `/chain/[slug]/page.tsx` — server component, Prisma load, render shell.
- `/chain/[slug]/manage/page.tsx` — organizer auth, close + closing note + roster + bouquet link.
- `/chain/new/page.tsx` — quick-create form.
- `/prayers/[slug]/page.tsx` — add "Pray with friends" CTA (single additive button).

### Commit 3 — joining flow (~60 min)

- "Pray along" modal client component (mirrors `claim-modal.tsx`).
- Daily-completion button.
- Encouragement wall (extend existing `Guestbook` component to accept a `chainId` variant).

### Commit 4 — email templates + cron (~90 min)

- Email templates appended to `src/lib/email.ts`.
- New `src/app/api/cron/chain-reminders/route.ts` — entirely separate file from the train cron.
- Add second cron entry to `vercel.json` at `5 11 * * *`.
- Token-signed `/api/chain/unsubscribe` handler.

### Commit 5 — share UX + OG/JSON-LD + sitemap + bouquet + browse (~60 min)

- Share screen on `/chain/[slug]` with iMessage button.
- `prayerChainSchema()` builder in `src/lib/schema.ts`.
- Per-route OG metadata in the chain pages.
- Sitemap entries for public chains.
- New chain-flavored bouquet PDF + `/api/bouquet/chain/[slug]/route.tsx`.
- Browse page integration (unified train + chain grid).

Each commit independently shippable to the `feature/chains` branch. Smoke test against the preview deploy after every push to confirm `/p/the-spina-family-dlmm` still renders correctly.

## Phase D — Promote-to-Train (future, separate session)

Out of scope for the initial Chain build. When ready:

- New server action `promoteChainToTrain(chainId)` — organizer only.
- Creates a new `PrayerTrain` in ACTIVE status, copies recipientName + intention + startDate, generates a slot calendar based on `durationDays` and a default `slotsPerDay`.
- Members of the chain get a "your prayer chain has expanded into a full train — come claim slots" email.
- The chain's status becomes `PROMOTED`, `promotedToTrainId` populated, no further chain reminders fire.
- The new train's manage page shows a back-link to the originating chain.

## Verification

- `npm run build` — all routes compile.
- `npm test` — existing 20 + ~5 new (chain server actions, schema builder).
- `npm run smoke` — Spina train still rendering correctly on every commit.
- Manual on the preview deploy: create a test chain, join from a different browser, verify confirmation email lands in Resend, mark a day complete, close the chain, download bouquet.
- Real-world: ship to Krysta as the first user. Watch what happens.

## What this spec deliberately does NOT include

- **Audio prayer reminders** — vision pillar, scoped separately, requires schema field on PrayerType.
- **Calendar-driven communal novenas** — different primitive (the praymorenovenas pattern). Don't fold into chains.
- **Member-to-member messaging** — out of scope; encouragement wall is enough.
- **Chain-to-chain "merging"** if two people start the same novena for the same person — punt; rare edge case.
- **Notifications beyond email** — push notifications, SMS, etc. are explicit non-goals per the vision.
