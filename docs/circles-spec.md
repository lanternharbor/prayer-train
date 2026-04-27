# Prayer Circles — Implementation Spec

> Status: **Spec written, awaiting execution.** Schema-heavy enough to require user supervision during the migration.
>
> Time estimate: 5–7 hours of focused work, broken into commit-sized chunks below.
>
> Trigger to execute: user says "execute docs/circles-spec.md" in a future session.

## Why circles

PrayerTrain today supports one prayer pattern: **distributed coverage** ("a roster of different people each pray something different on different days for one recipient"). That's the train.

There's a second, equally common Catholic prayer pattern that PrayerTrain does *not* serve: **synchronized solidarity** ("I'm praying this novena. Want to join me?"). Same prayer, same days, group of people, all praying together. This is what people do when they say "let's pray a novena for X" — Krysta's iMessage about Benji is the exemplar use case.

praymorenovenas.com partially serves this with global communal novenas, but they lack the personalization (recipient, intention, organizer, small group) that's central to the actual practice. PrayerTrain's wedge is *personal + small group + tradition-respecting*.

Circles is the missing primitive.

| Pattern | Tool today | What we're shipping |
|---|---|---|
| Global wave (whole Church praying together on a calendar) | praymorenovenas.com | Out of scope |
| **Personal circle (small group + recipient + intention)** | **gap** | **Circles ✓** |
| Distributed coverage (rotating volunteers covering slots) | PrayerTrain Trains | Already shipped |

## User flow (Krysta's case as the canonical example)

1. Krysta visits `/prayers/novena-st-blaise` (or some other novena).
2. Sees a primary CTA: **"Pray this with friends"**.
3. Clicks. One screen with three fields:
   - "Who is this for?" → "Benji"
   - "What's the intention?" → "Full healing of his throat and vocal cords"
   - "Make this discoverable on /browse?" toggle, default OFF (most circles are private to the inviter's network)
4. Submits. Server creates a `PrayerCircle` row, makes Krysta the organizer + first member, generates a slug like `benji-throat-healing-st-blaise-7f3a`, redirects to `/circle/[slug]`.
5. Lands on the circle detail page. Sees: "Day 1 of 9 — Krysta is praying the St. Blaise Novena for Benji's full healing." Big share button. Member roster shows herself.
6. Taps share. Opens iMessage with pre-filled text + URL. Rich OG preview shows in the recipient's chat: "Krysta is praying St. Blaise Novena for Benji — Day 1 of 9. Pray along."
7. Friend Carol clicks. Lands on `/circle/[slug]`. Sees the same context. CTA: **"Pray along with Krysta"**.
8. Carol enters her name + email (no account needed). Server adds her as a `PrayerCircleMember`. She gets the daily reminder for the next 9 days.
9. Each day at 11 AM UTC, the existing reminder cron sends Carol an email: "Day 3 of Krysta's novena for Benji's healing. Today's prayer text below…" (with prayer.prayerText embedded).
10. Each member can mark "I prayed today" on the circle page or via a link in the email — light-touch tracking, optional.
11. On Day 9, the closing-day email is slightly different: "Today is the final day of Krysta's novena for Benji. Thank you for praying with her." No more reminders after.
12. Krysta can mark the circle COMPLETED, leave a final note, and download a printable spiritual bouquet PDF (reusing the bouquet system shipped in vision pass 1).

## Schema additions

Append to `prisma/schema.prisma`. Two new models, two new enums.

### `PrayerCircle`

```prisma
enum CircleStatus {
  ACTIVE
  COMPLETED
  CANCELLED
}

model PrayerCircle {
  id              String         @id @default(cuid())
  slug            String         @unique
  organizerId     String
  organizer       User           @relation(fields: [organizerId], references: [id])
  prayerTypeId    String
  prayerType      PrayerType     @relation(fields: [prayerTypeId], references: [id])

  // What the circle is praying for
  recipientName   String?        // optional; novenas for "discernment" or "the Church" have no recipient
  intention       String         @db.Text  // free-text: "Benji's full healing of throat/vocal cords"

  // Schedule
  startDate       DateTime
  durationDays    Int            // typically 9 for a novena, 33 for Marian consecration
  endDate         DateTime       // computed from startDate + durationDays - 1 at create time

  // Visibility
  isPublic        Boolean        @default(false)  // private by default — shared by URL, not browsable

  // State
  status          CircleStatus   @default(ACTIVE)
  closingNote     String?        @db.Text  // optional final message from organizer

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  members         PrayerCircleMember[]

  @@index([organizerId])
  @@index([prayerTypeId])
  @@index([status, isPublic])  // for /browse-circles query
}
```

### `PrayerCircleMember`

```prisma
model PrayerCircleMember {
  id              String         @id @default(cuid())
  circleId        String
  circle          PrayerCircle   @relation(fields: [circleId], references: [id], onDelete: Cascade)

  // Joiner identity (account optional — name+email is the minimum)
  userId          String?
  user            User?          @relation(fields: [userId], references: [id])
  name            String
  email           String

  // Tracking (optional — joiners don't have to mark days)
  lastDayCompleted Int?          // 1-indexed; null until they mark anything

  joinedAt        DateTime       @default(now())
  unsubscribedAt  DateTime?      // soft-leave: don't get more reminders, but stay in the roster

  @@unique([circleId, email])    // one membership per email per circle
  @@index([circleId])
  @@index([email])
}
```

### Migration

```bash
# Locally first:
npx prisma db push

# Verify with:
npx prisma studio
```

For production: SAME `npx prisma db push` against the production DATABASE_URL. The user has been using `db:push` (not migrations) throughout. Match that pattern.

### Open question for user before migration

> Does production share a Neon database with local dev, or are they separate branches? If separate, we need to push twice (once per branch). If shared, one push covers both.

## Server actions

Add to `src/lib/actions.ts`. All follow the existing pattern (`"use server"`, Zod-validated FormData via `parseFormData(...)`, `enforceRateLimit(...)`, eventually `revalidatePath`/`redirect`).

### `createPrayerCircle(formData)`

- Auth: requires session (organizer must be signed in).
- Input: `prayerTypeId`, `recipientName?`, `intention`, `durationDays?` (defaults to `prayer.daysRequired`), `isPublic`.
- Generates slug from recipientName + prayerType.slug + 4-char suffix (mirrors `generateSlug` in `src/lib/utils.ts`).
- Creates the circle row.
- Auto-creates organizer's `PrayerCircleMember` row.
- Sends "your circle is live" email to organizer (reuse `src/lib/email.ts` patterns).
- Redirects to `/circle/[slug]`.

### `joinPrayerCircle(formData)`

- Auth: NOT required (matches `claimPrayerSlot` precedent — joiners just provide name + email).
- Input: `circleId`, `name`, `email`.
- Rate-limited (existing `enforceRateLimit("claim", ...)` — extend to `"joinCircle"`).
- Validates circle is `ACTIVE` and not yet at endDate.
- Upserts member row (handles re-join after unsubscribe).
- Sends "you joined Krysta's novena for Benji" confirmation email (templated, mentions organizer + intention by name).
- Returns success state for client modal.

### `markCircleDayComplete(circleId, day)`

- Auth: required as the member (match by session.user.email or the email the joiner used).
- Updates `PrayerCircleMember.lastDayCompleted = max(current, day)`.
- Idempotent.

### `unsubscribeFromCircle(memberId, token)`

- Auth: not required (token-gated link from email footer).
- Sets `unsubscribedAt`. Future cron emails skip unsubscribed members.

### `closeCircle(circleId, closingNote?)`

- Auth: organizer only.
- Sets `status = COMPLETED`, stores `closingNote`.
- Triggers a "the novena is complete" email to all members.
- Bouquet PDF becomes downloadable for the organizer (extend the bouquet system from vision pass 1 to cover circles too).

## Routes

| Path | What it does |
|---|---|
| `/circle/[slug]` | Detail page (everyone). Day N of M, prayer text, member roster, "Pray along" CTA, guestbook. |
| `/circle/[slug]/manage` | Organizer-only. Close circle, add closing note, download bouquet, see member emails. |
| `/circle/new?prayerType=[slug]` | Quick-create flow when "Pray this with friends" clicked from a prayer detail page. |
| `/api/circle/unsubscribe?token=...` | Token-gated unsubscribe handler. |
| `/api/bouquet/circle/[slug]` | PDF endpoint, mirroring `/api/bouquet/[slug]` for trains. |

The `/prayers/[slug]/page.tsx` gets a new "Pray this with friends" button next to the existing CTAs.

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
> [I prayed today]({{markCompleteUrl}})  ·  [Visit the circle]({{circleUrl}})  ·  [Unsubscribe]({{unsubscribeUrl}})

Where `recipientPhrase` is:
- "for {{recipientName}}" if recipientName is set
- "for {{intention}}" otherwise (truncated to first 8 words if long)

### Closing-day email (Day N == durationDays)

Subject: `The {{prayerName}} is complete — thank you for praying with {{organizerFirstName}}`

Body different from daily — closer to a thank-you note. No call to action other than "[See the circle]" and (for the organizer only) "[Download the spiritual bouquet]".

### Confirmation when joining

Subject: `You're praying with {{organizerFirstName}} for {{recipientShort}}`

Body: warm, brief, reminds them they'll get an email each day for `durationDays` days.

**All three of these copy templates need theology review** before launch — flagged in `docs/theology-review.md` as items #10 and #11.

## OG metadata + JSON-LD

Extend `src/lib/schema.ts` with:

```ts
export function prayerCircleSchema(circle: {
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
OG image: the patron-saint portrait if available, else `/logo.png`.

This makes Krysta's iMessage preview look like:

> 🖼️ [St. Blaise saint image]
> **Krysta's St. Blaise Novena for Benji**
> Day 1 of 9. Pray along.
> www.ourfaithtrain.com

## Sitemap inclusion

Add public circles to `src/app/sitemap.ts` — same pattern as public trains. Private circles excluded.

## UI sketches

### `/prayers/[slug]` — new "Pray this with friends" CTA

```
┌─────────────────────────────────────────┐
│  [Saint portrait]    St. Blaise Novena  │
│                                         │
│  9 days · Beginner · Throat ailments    │
│                                         │
│  [Pray with friends]  [Add to a Train]  │
│                                         │
│  How to pray ▼                          │
│  Prayer text   ▼                        │
└─────────────────────────────────────────┘
```

`Pray with friends` is the new primary CTA (gold), `Add to a Train` is secondary (outline).

### `/circle/new?prayerType=novena-st-blaise` — quick-create

```
┌─────────────────────────────────────────┐
│  Start the St. Blaise Novena            │
│  with friends                           │
│                                         │
│  Who is this for? (optional)            │
│  [_______________]                      │
│                                         │
│  What's the intention?                  │
│  [_______________________]              │
│  [_______________________]              │
│                                         │
│  ☐ List on the public Browse page       │
│                                         │
│        [ Start the novena ]             │
└─────────────────────────────────────────┘
```

### `/circle/[slug]` — detail (active)

```
┌─────────────────────────────────────────┐
│  Krysta's St. Blaise Novena for Benji   │
│                                         │
│  Day 3 of 9                             │
│  ████████░░░░░░░  33%                   │
│                                         │
│  [Saint portrait]                       │
│                                         │
│  TODAY'S PRAYER                         │
│  ─────────────                          │
│  O Glorious Saint Blaise...             │
│  ...                                    │
│  Amen.                                  │
│                                         │
│  [ I prayed today ]                     │
│                                         │
│                                         │
│  PRAYING WITH KRYSTA · 12 people        │
│  ─────────────                          │
│  · Krysta (organizer)  Day 3 ✓          │
│  · Carol               Day 3 ✓          │
│  · Aunt Rose           Day 2            │
│  · Joseph              Day 1            │
│  · ... [show all]                       │
│                                         │
│  [ Pray along with Krysta ] (CTA when not yet joined)│
│  [ Share ] [ Open in Messages ]         │
│                                         │
│  ENCOURAGEMENT WALL                     │
│  (reuse existing guestbook)             │
└─────────────────────────────────────────┘
```

### Pray-along join (modal, no account required)

```
┌─────────────────────────────────────────┐
│  Pray along with Krysta                 │
│                                         │
│  9 days, starting today.                │
│  We'll send a daily email with the      │
│  prayer text. You can unsubscribe       │
│  anytime.                               │
│                                         │
│  Your name                              │
│  [_______________]                      │
│                                         │
│  Email                                  │
│  [_______________]                      │
│                                         │
│         [ I'll pray ]                   │
└─────────────────────────────────────────┘
```

## Theology review checkpoints

Per `docs/theology-review.md`, these specific items need Fr. Palladino's eye before Circles ships:

- Daily reminder email body (item #10 in review queue)
- "Pray along with {{organizer}}" CTA wording (item #11)
- Closing-day "the novena is complete" email
- The framing of "I prayed today" as a tracking state (avoid implying spiritual obligation/grace tied to checking a box)
- Any blessing line on the bouquet PDF when issued for a circle

## Sequenced execution plan (5 commits, 5–7 hours)

### Commit 1 — schema + server actions (90 min)

- Add `PrayerCircle` and `PrayerCircleMember` to `prisma/schema.prisma`.
- `npx prisma db push` (with user supervision on prod).
- Write `createPrayerCircle`, `joinPrayerCircle`, `markCircleDayComplete`, `unsubscribeFromCircle`, `closeCircle` in `src/lib/actions.ts`.
- Add Zod schemas to `src/lib/validation.ts`.
- Extend rate-limiter buckets to include `joinCircle`.

### Commit 2 — routes + UI shell (90 min)

- `/circle/[slug]/page.tsx` — server component, Prisma load, render shell.
- `/circle/[slug]/manage/page.tsx` — organizer auth, close + closing note + roster + bouquet link.
- `/circle/new/page.tsx` — quick-create form.
- `/prayers/[slug]/page.tsx` — add "Pray with friends" CTA.

### Commit 3 — joining flow (60 min)

- "Pray along" modal client component (mirrors `claim-modal.tsx`).
- Daily-completion button.
- Encouragement wall (reuse existing `Guestbook` component, add a `circleId` variant).

### Commit 4 — email templates + cron extension (90 min)

- Email templates in `src/lib/email.ts`.
- Extend `src/app/api/cron/daily-reminders/route.ts` to also iterate active circles and send circle-flavored emails.
- Unsubscribe token system.
- Token-signed `/api/circle/unsubscribe` handler.

### Commit 5 — share UX + OG/JSON-LD + sitemap + bouquet (60 min)

- Share screen on `/circle/[slug]` with iMessage button.
- `prayerCircleSchema()` builder in `src/lib/schema.ts`.
- Per-route OG metadata in the circle pages.
- Sitemap entries for public circles.
- Extend `src/lib/bouquet-pdf.tsx` and `/api/bouquet/[slug]/route.ts` to handle circles.

Each commit independently shippable. If we run out of time on a session, we ship 1–N and queue N+1 for next time.

## Open questions for user (need answers before commit 1)

1. **Should non-organizer joiners be able to invite *more* joiners, or is the invite list closed at the organizer's discretion?** Default proposed: yes, link is shareable beyond the original group. Catholic pattern is "let your friend's friend pray too." Switch to closed if user prefers.
2. **Should joining require a real email, or is name-only OK?** Default proposed: email required (so reminders work). Without email, the join is meaningless because daily reminders are the product.
3. **Should circles appear on `/browse` if `isPublic` is true?** Default proposed: yes — same model as public trains. But make `isPublic` default to FALSE on creation (most circles are personal).
4. **Should organizers be able to convert a Circle into a Train mid-stream**, e.g. if it grows and they want distributed prayer coverage? Default proposed: no — keep primitives clean. They can spin up a separate train if needed.

Update this doc with answers before starting commit 1. Open questions resolve into doc text, not deferred.

## Verification at end

- `npm run build` — all routes compile.
- `npm test` — existing 20 + new (target ~5 new for circle server actions and schema builder).
- Dev preview: create a test circle, join from a different browser, verify reminder email lands in Resend dashboard, mark a day complete, close the circle, download bouquet.
- Real-world: ship to Krysta as the first user. Watch what happens.

## What this spec deliberately does NOT include

- **Audio prayer reminders** — vision pillar, scoped separately, requires schema field on PrayerType.
- **Calendar-driven communal novenas** — different primitive (the praymorenovenas pattern). Don't fold into circles.
- **Member-to-member messaging** — out of scope; encouragement wall is enough.
- **Circle-to-circle "merging"** if two people start the same novena for the same person — punt; rare edge case.
- **Notifications beyond email** — push notifications, SMS, etc. are explicit non-goals per the vision.
