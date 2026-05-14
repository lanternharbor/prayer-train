# Operational Safety

Why this doc exists: a real prayer train is now live on `prayertrains.com` (the Spina family, 36 prayer warriors, daily reminder cron firing every morning). Future code changes must protect that. This doc captures the mechanical guardrails — smoke tests, monitoring, and the workflow rules that prevent us from accidentally breaking what's live.

## The smoke test

`scripts/smoke-test-spina.ts` hits the live train detail page and asserts the page renders the elements 36 people rely on (recipient name, status, slot grid, JSON-LD, footer attribution). Runs in ~1 second. Run it before every deploy that touches shared code paths.

```bash
# Test against production
npm run smoke

# Test against a Vercel preview deploy
PRAYER_TRAIN_URL=https://prayer-train-feature-chains-xyz.vercel.app npm run smoke
```

Exits 0 on success, non-zero on any failure. Each check prints a green ✓ or red ✗ with detail. Add new checks to the script as new critical components ship.

## Cron monitoring with Healthchecks.io

The daily-reminder cron at 11:00 UTC is the most fragile thing in the system — if it stops invoking, **the Spina family's daily emails just stop and we have no signal**. Healthchecks.io fixes that.

### Setup (5 minutes, one-time)

1. Go to https://healthchecks.io and create a free account (`william@lanternharbor.co`).
2. Create a check named "PrayerTrain · Daily Reminders". Schedule: cron `0 11 * * *`. Grace: 30 minutes.
3. Copy the unique ping URL — looks like `https://hc-ping.com/<UUID>`.
4. Vercel → prayer-train project → Settings → Environment Variables → add:
   - Name: `HEALTHCHECKS_DAILY_REMINDERS_URL`
   - Value: the ping URL from step 3
   - Environments: **Production only** (we don't need this for previews)
5. Configure email notifications: Healthchecks → Integrations → Email → add `william@lanternharbor.co`.
6. Trigger a redeploy so the env var ships. Or wait — the next deploy that lands will pick it up.

### What it gives you

- Email/SMS alert if the cron doesn't ping within ~25 hours of the previous one. Catches: Vercel cron disabled, `CRON_SECRET` rotated and missed, the route 500'ing, the deployment stopped working.
- Dashboard view of recent runs with the slot count, sent count, error count from each run.
- 90 days of history for free.

### What it doesn't catch

- Individual reminder send failures (those are logged but don't fail the cron run).
- Resend API down (cron still pings as long as it ran).
- Wrong-content emails (e.g., new bug in the email template). Manual testing covers this.

For tighter monitoring later: the Resend dashboard shows delivery rates per email; check it weekly.

## Branch-based workflow

After the Spina train went live, every change to shared code paths goes through a feature branch + Vercel preview before merging to `main`.

### When to branch

- Anything modifying the database schema.
- Anything touching `/api/cron/*`, `/api/auth/*`, or `src/lib/actions.ts`.
- Any new top-level route directory (e.g., `src/app/chain/`).
- Major refactors to existing pages.

### When `main` is fine

- Pure additive docs (`docs/*.md`).
- Pure additive static assets (`public/*` outside of files referenced by manifest/og).
- New unit tests.
- Localized fixes to non-critical pages.

### Branch flow

```bash
# Off latest main
git checkout main && git pull
git checkout -b feature/<name>

# Push to branch — Vercel auto-creates preview deploy
git push -u origin feature/<name>

# After every commit on the branch:
PRAYER_TRAIN_URL=<preview-url> npm run smoke

# When ready to merge:
git checkout main
git merge feature/<name>
git push
npm run smoke   # against production
```

## Files that must not be touched without supervision

These code paths are what the live Spina train exercises every day. Modifications need review + smoke test + (if schema-related) supervised migration.

### Untouchable except for the explicit Healthchecks ping at the end

- `src/app/api/cron/daily-reminders/route.ts` — the daily reminder dispatcher

### Untouchable in their entirety

- `src/app/p/[slug]/**` — train detail, manage, claim modal, guestbook, share button, prayer calendar, post-update form
- `src/app/api/bouquet/[slug]/route.tsx` — train bouquet PDF endpoint
- The five existing train server actions in `src/lib/actions.ts`:
  - `createPrayerTrain`
  - `claimPrayerSlot`
  - `markSlotComplete`
  - `postGuestbookEntry`
  - `postTrainUpdate`

### Schema rules

- Existing tables in `prisma/schema.prisma` (`PrayerTrain`, `PrayerSlot`, `User`, `Account`, `Session`, `GuestbookEntry`, `PrayerType`) — **no column changes, no type changes, no removed columns, no removed indexes**. Only adding new columns is acceptable, and only with a default value or `?` (optional) marker so the migration doesn't break existing rows.
- New tables are fine — they're additive.
- Migrations: use `npx prisma migrate dev --name <descriptive>` for the audit trail. **Do not run `prisma migrate deploy` against production unless the user is awake.** `prisma db push` is acceptable for local dev only.

## Spina-specific watch list (current real-world train)

- **Slug**: `the-spina-family-dlmm`
- **Status**: ACTIVE (as of 2026-04-26)
- **Schedule**: 30 days, started Sat Apr 25, ends Sun May 24
- **Coverage**: 7 open / 77 claimed / 6 completed / 36 unique prayer warriors at last check
- **Critical date**: **May 24** — the last day of the train. The status will transition to COMPLETED some time around then (manually or via a future status job). When it does, the bouquet PDF flow (`/api/bouquet/[slug]`) becomes the primary completion experience for the family. Test the bouquet generation against this train's data BEFORE that day so we don't have a 500 on the last day.

When the train ends:
1. Verify the bouquet PDF generates correctly for `the-spina-family-dlmm`. Open it locally before any user does.
2. If the closing-blessing line in the PDF still hasn't been theology-reviewed by Fr. Palladino, decide whether to ship the generic version or hold the bouquet feature back from the Spina family until reviewed. (See `docs/theology-review.md` item #9.)

## What "broke the live train" looks like

Practical signals that something has gone wrong:

| Signal | What it probably means | First action |
|---|---|---|
| Healthchecks.io alert at ~12:00 UTC | The 11:00 cron didn't run | Check Vercel cron dashboard + deployment logs |
| Smoke test fails on `/p/the-spina-family-dlmm` | Train detail page broken | Check Vercel deployment logs for the most recent deploy; consider rollback |
| Resend dashboard shows zero sends after a deploy | Email integration broken | Check `RESEND_API_KEY` is still set; check `sendDailyReminder` logs |
| User reports "I'm not getting reminders" | Could be cron, could be Resend, could be Spam | First check Healthchecks.io → if green, problem is downstream |

Default rollback: `git revert <bad-commit> && git push`. Vercel auto-redeploys.

## Pending DB schema updates (run before deploy)

This project has no Prisma migration files — `prisma/schema.prisma`
is the source of truth and prod is synced via `prisma db push`. Any
schema-affecting branch needs an explicit `db push` against the prod
Neon connection string **before** the matching app code reaches prod
traffic; otherwise the new columns / models referenced by the deploy
don't exist yet and reads/writes fail at runtime.

The current outstanding pushes, in merge order:

| Branch / PR | Schema delta | DB op needed |
|---|---|---|
| **#56 audit pass** (merged) | `PrayerTrain.isPublic` and `PrayerChain.isPublic` defaults flipped from `true` → `false` (column type unchanged) | `DATABASE_URL=<prod> npx prisma db push` — safe; existing rows untouched, default only affects new INSERTs that omit the column |
| **#60 i18n Phase 2** (open at time of writing) | New columns: `PrayerTrain.language String @default("en")` and `PrayerChain.language String @default("en")` | `DATABASE_URL=<prod> npx prisma db push` BEFORE merge lands traffic. Safe: column is non-null but has a default, so existing rows get `"en"` on push; new INSERTs from the server actions set it explicitly. |

Steps for each:
1. Confirm William is awake.
2. Smoke test prod first: `./scripts/smoke.sh https://prayertrains.com` (or equivalent).
3. Run `DATABASE_URL="<prod Neon URL>" npx prisma db push` from local.
4. Smoke test again immediately after.
5. Then merge the matching PR — Vercel auto-deploys the app code that uses the new column.

If a deploy somehow lands BEFORE `db push`, app code that references
the new column will fail with `Unknown column` errors at the Prisma
level. Mitigation: `db push` immediately resolves it; no rollback
needed.

## Changelog

- **2026-04-26 — Initial version.** Smoke test + Healthchecks ping + workflow rules documented after the Spina family train demonstrated the product is now real.
- **2026-05-13 — Pending DB schema updates section.** PR #60's `language` column addition (and PR #56's lingering default flip) require `prisma db push` against prod before the merge takes effect for new rows.
