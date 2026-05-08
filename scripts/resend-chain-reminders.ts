/**
 * One-off: resend missed daily reminder emails for a PrayerChain.
 *
 * Why this exists: on May 6 + May 7 2026 the chain-reminders cron
 * silently failed to dispatch any reminders for the Priscilla novena
 * (slug `priscilla-jhg4`) — and possibly other chains. The cron had
 * no DB audit trail, so the miss only surfaced when William noticed
 * his inbox was empty for 2 mornings in a row.
 *
 * The durable fix (PR adding `lastReminderSentForDay` to
 * PrayerChainMember + dedup-and-write-back in the cron) hardens the
 * pipeline going forward but does NOT backfill the missed days. This
 * script handles that backfill.
 *
 * What it does:
 *   1. Looks up the chain by slug
 *   2. Pre-flight: must exist, must be ACTIVE, must have members,
 *      requested days must be within [1, durationDays]
 *   3. For each (member, day) pair where the member is not
 *      unsubscribed AND the member's lastReminderSentForDay is less
 *      than the requested day, sends sendChainDailyReminder
 *   4. Updates lastReminderSentForDay / lastReminderSentAt for
 *      successful sends so the next cron firing won't double-send
 *      this day
 *   5. Logs a summary of sent / skipped / failed to stdout
 *
 * What it does NOT do:
 *   - Send to unsubscribed members. unsubscribedAt: null is the gate.
 *   - Send a duplicate to a member who already received that day's
 *     reminder. The lastReminderSentForDay >= day check is the gate.
 *     Use --force to override.
 *   - Send for days outside the chain's [1, durationDays] range.
 *   - Modify the chain or member records beyond the reminder-sent
 *     bookkeeping fields.
 *
 * Auth phrase: "yes resend chain reminders"
 *
 * Run:
 *   npx tsx scripts/resend-chain-reminders.ts <slug> <day1>[,<day2>,...]
 *     (interactive — prompts for auth phrase)
 *   npx tsx scripts/resend-chain-reminders.ts <slug> <day1>[,<day2>,...] "yes resend chain reminders"
 *     (CLI arg — used when the agent has received explicit auth)
 *
 * Examples:
 *   npx tsx scripts/resend-chain-reminders.ts priscilla-jhg4 1,2
 *     (resend Day 1 and Day 2 — the May 6/7 catch-up case)
 *   npx tsx scripts/resend-chain-reminders.ts priscilla-jhg4 3
 *     (single day)
 *
 * Idempotency: enforced via lastReminderSentForDay check. A second
 * run with the same args will skip every member who succeeded on
 * the first run.
 */

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { sendChainDailyReminder } from "../src/lib/email";
import { getBaseUrl } from "../src/lib/url";
import {
  signCompletionToken,
  chainDayTokenId,
} from "../src/lib/completion-tokens";
import { reflectionForDay } from "../src/lib/daily-reflections";

const AUTH_PHRASE = "yes resend chain reminders";

// Strip --force from argv at module init so the rest of the parse
// (positional slug + days + auth-phrase) keeps a stable layout
// regardless of whether the operator passed --force or not. Stored
// separately for the dedup gate below.
const argv = process.argv.filter((arg) => arg !== "--force");
const FORCE = process.argv.length !== argv.length;

function usage(): never {
  console.error(
    `\nUsage:\n` +
      `  npx tsx scripts/resend-chain-reminders.ts <slug> <day>[,<day>,...] [--force]\n` +
      `  npx tsx scripts/resend-chain-reminders.ts <slug> <day>[,<day>,...] [--force] "${AUTH_PHRASE}"\n\n` +
      `Examples:\n` +
      `  npx tsx scripts/resend-chain-reminders.ts priscilla-jhg4 1,2\n` +
      `  npx tsx scripts/resend-chain-reminders.ts priscilla-jhg4 3 "${AUTH_PHRASE}"\n` +
      `  npx tsx scripts/resend-chain-reminders.ts priscilla-jhg4 3 --force "${AUTH_PHRASE}"\n\n` +
      `--force overrides the lastReminderSentForDay >= day skip.\n` +
      `Use when the audit field was set by a phantom-success bug and you\n` +
      `need to re-dispatch that day's reminder regardless of audit state.\n`,
  );
  process.exit(1);
}

async function isAuthorized(slug: string, days: number[]): Promise<boolean> {
  const cliArg = argv[4];
  if (cliArg === AUTH_PHRASE) return true;
  if (!process.stdin.isTTY) return false;
  const forceNote = FORCE
    ? ` (--force: bypassing lastReminderSentForDay dedup gate)`
    : "";
  process.stdout.write(
    `\nAbout to resend daily reminder emails for chain '${slug}', day(s) ${days.join(", ")}${forceNote}.\n` +
      `Type the auth phrase exactly to proceed:\n  ${AUTH_PHRASE}\n> `,
  );
  const line = await new Promise<string>((resolve) => {
    process.stdin.once("data", (data) => resolve(data.toString().trim()));
  });
  return line === AUTH_PHRASE;
}

function parseDays(arg: string | undefined): number[] {
  if (!arg) usage();
  const days = arg
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const n = parseInt(s, 10);
      if (!Number.isFinite(n) || n < 1) {
        console.error(`Invalid day: '${s}' (must be a positive integer)`);
        process.exit(1);
      }
      return n;
    });
  if (days.length === 0) usage();
  return days;
}

async function main() {
  const slug = argv[2];
  const days = parseDays(argv[3]);

  if (!slug) usage();
  if (!(await isAuthorized(slug, days))) {
    console.error("\nABORT: auth phrase missing or incorrect. No emails sent.");
    process.exit(1);
  }

  // Localhost guard — same defensive check as resend-chain-bouquet.
  // PR #43 history: a stale NEXTAUTH_URL=http://localhost:3000 sent
  // 6 broken-link emails before the guard existed. Don't repeat it.
  const baseUrl = getBaseUrl();
  const isLocalUrl =
    /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(
      baseUrl,
    );
  if (isLocalUrl) {
    console.error(
      `\nABORT: getBaseUrl() returned '${baseUrl}', which looks like a\n` +
        `local dev URL. Recipients would see broken links.\n\n` +
        `Re-run with NEXTAUTH_URL overridden, e.g.:\n` +
        `  NEXTAUTH_URL=https://prayertrains.com npx tsx scripts/resend-chain-reminders.ts ${slug} ${days.join(",")} "${AUTH_PHRASE}"\n`,
    );
    process.exit(1);
  }

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      status: true,
      durationDays: true,
      organizerAnonymous: true,
      customPrayerText: true,
      recipientName: true,
      intention: true,
      organizer: { select: { name: true } },
      prayerType: {
        select: {
          name: true,
          prayerText: true,
          instructions: true,
          dailyReflections: true,
        },
      },
      members: {
        where: { unsubscribedAt: null },
        select: {
          id: true,
          name: true,
          email: true,
          lastReminderSentForDay: true,
        },
      },
    },
  });

  if (!chain) {
    console.error(`ABORT: chain '${slug}' not found.`);
    process.exit(1);
  }
  if (chain.status !== "ACTIVE") {
    console.error(
      `ABORT: chain '${slug}' has status='${chain.status}', expected ACTIVE. Catch-up reminders only make sense for live chains.`,
    );
    process.exit(1);
  }
  if (chain.members.length === 0) {
    console.error(`ABORT: chain '${slug}' has no active members.`);
    process.exit(1);
  }
  for (const day of days) {
    if (day > chain.durationDays) {
      console.error(
        `ABORT: day ${day} is past chain.durationDays=${chain.durationDays}.`,
      );
      process.exit(1);
    }
  }

  const organizerName =
    chain.organizerAnonymous || !chain.organizer?.name
      ? null
      : chain.organizer.name;

  console.log(
    `Found chain '${chain.slug}' (${chain.prayerType.name}` +
      (chain.recipientName ? ` for ${chain.recipientName})` : ")") +
      ` with ${chain.members.length} active members.`,
  );
  console.log(`  durationDays: ${chain.durationDays}`);
  console.log(`  resending day(s): ${days.join(", ")}`);
  console.log(``);

  let sent = 0;
  let skippedAlready = 0;
  let failed = 0;

  // For each requested day, walk every member and dispatch unless
  // they're already past that day in the audit trail. Sequential
  // sends keep log output ordered and limit blast radius if Resend
  // starts rate-limiting mid-run; speed isn't critical for a one-off
  // catch-up of < 100 emails.
  for (const day of days) {
    console.log(`-- Day ${day} --`);
    for (const member of chain.members) {
      const last = member.lastReminderSentForDay ?? 0;
      // Dedup gate. Skipped when --force is passed: that bypass exists
      // for the case where the audit field was advanced by a phantom-
      // success cron run (the May 8 priscilla regression — Resend
      // rejected the API call but the legacy try/catch swallowed the
      // error and the cron wrote lastReminderSentForDay anyway). In
      // that scenario the audit field is lying and we need to retry
      // the day regardless.
      if (!FORCE && last >= day) {
        console.log(
          `  - skip ${member.email}: lastReminderSentForDay=${last} >= ${day} (use --force to override)`,
        );
        skippedAlready++;
        continue;
      }

      // CRON_SECRET availability gates the completion-token flow.
      // Vercel marks the secret Sensitive (write-only after creation),
      // so a local catch-up run typically does NOT have it. We
      // gracefully degrade: when the secret is unset, substitute the
      // chain detail page as the "I prayed today" link target. Email
      // body content (prayer text + day-N reflection) still arrives
      // intact; the one-click mark-complete button just routes to
      // the chain page rather than the tokenized handler.
      const haveSecret = Boolean(process.env.CRON_SECRET);
      const markCompleteUrl = haveSecret
        ? `${baseUrl}/chain/${chain.slug}/complete?day=${day}&memberId=${encodeURIComponent(member.id)}&token=${encodeURIComponent(
            signCompletionToken(
              "chain-day",
              chainDayTokenId(member.id, day),
            ),
          )}`
        : `${baseUrl}/chain/${chain.slug}`;
      const unsubscribeUrl = `${baseUrl}/api/chain/unsubscribe?id=${member.id}`;
      const otherCount = chain.members.length - 1;

      const result = await sendChainDailyReminder({
        to: member.email,
        memberName: member.name,
        organizerName,
        prayerName: chain.prayerType.name,
        prayerText: chain.prayerType.prayerText,
        prayerInstructions: chain.prayerType.instructions,
        dailyReflection: reflectionForDay(
          chain.prayerType.dailyReflections,
          day,
        ),
        customPrayerText: chain.customPrayerText,
        recipientName: chain.recipientName,
        intention: chain.intention,
        day,
        durationDays: chain.durationDays,
        chainUrl: `${baseUrl}/chain/${chain.slug}`,
        markCompleteUrl,
        unsubscribeUrl,
        otherMembersCount: otherCount,
      });

      // Critical: only advance audit field on verified Resend success.
      // Pre-PR #52, sendChainDailyReminder returned void on both
      // success and failure (Resend API errors come back as
      // `{ data: null, error }` body, not thrown). The script wrote
      // lastReminderSentForDay unconditionally — same phantom-success
      // pattern that broke the cron. New contract: { ok: true, id }
      // on success, { ok: false, error } on either API rejection or
      // thrown exception. Audit-write only fires when ok === true.
      if (!result.ok) {
        failed++;
        console.error(`  ! ${member.email} — ${String(result.error)}`);
        continue;
      }

      await prisma.prayerChainMember.update({
        where: { id: member.id },
        data: {
          lastReminderSentForDay: day,
          lastReminderSentAt: new Date(),
        },
      });
      // Mutate in-memory member.lastReminderSentForDay so the next
      // iteration of the outer day loop sees the update without
      // re-querying.
      member.lastReminderSentForDay = day;
      sent++;
      console.log(`  + ${member.email} (id=${result.id})`);
    }
  }

  console.log(
    `\nDone. sent=${sent} skippedAlready=${skippedAlready} failed=${failed}`,
  );

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
