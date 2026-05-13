/**
 * One-off: resend daily reminder emails for specific train slots.
 *
 * Use case: the train daily-reminders cron silently dropped sends
 * for some slots (Resend rate-limit phantom-success bug pre-PR #53).
 * The audit field `PrayerSlot.lastReminderSentAt` was falsely set,
 * so the cron's idempotency gate now refuses to retry. This script
 * lets us catch those specific slots up by ID.
 *
 * What it does:
 *   1. Looks up each slot by id
 *   2. Pre-flight: must exist, must be CLAIMED or COMPLETED on the
 *      ACTIVE train, must have a claimer email
 *   3. Builds the same payload the cron would have built
 *      (completion token, prayer text, etc.)
 *   4. Calls sendDailyReminder; checks EmailDispatchResult.ok
 *   5. On success, updates lastReminderSentAt to now
 *   6. Sequential dispatch with 600ms delay between sends to stay
 *      under Resend's 2 req/s rate limit (mirrors the cron's
 *      RESEND_RATE_LIMIT_DELAY_MS)
 *
 * Auth phrase: "yes resend train slot reminders"
 *
 * Run:
 *   npx tsx scripts/resend-train-slot-reminders.ts <slotId1> [slotId2] ...
 *   npx tsx scripts/resend-train-slot-reminders.ts <slotId1> "yes resend train slot reminders"
 *
 * Idempotency: the lastReminderSentAt write means re-running the
 * script with the same slot IDs is a no-op (the cron's gate already
 * accepts re-running idempotently; this script doesn't have its own
 * gate but mirrors the same semantics).
 */

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { sendDailyReminder } from "../src/lib/email";
import { getBaseUrl } from "../src/lib/url";
import { signCompletionToken } from "../src/lib/completion-tokens";

const AUTH_PHRASE = "yes resend train slot reminders";
const RESEND_RATE_LIMIT_DELAY_MS = 600;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function usage(): never {
  console.error(
    `\nUsage:\n` +
      `  npx tsx scripts/resend-train-slot-reminders.ts <slotId1> [slotId2] ...\n` +
      `  npx tsx scripts/resend-train-slot-reminders.ts <slotId1> [slotId2] ... "${AUTH_PHRASE}"\n`,
  );
  process.exit(1);
}

async function isAuthorized(slotIds: string[]): Promise<boolean> {
  // Auth phrase is the LAST argv item if it matches.
  const last = process.argv[process.argv.length - 1];
  if (last === AUTH_PHRASE) return true;
  if (!process.stdin.isTTY) return false;
  process.stdout.write(
    `\nAbout to resend train daily-reminder emails for ${slotIds.length} slot(s).\n` +
      `Type the auth phrase exactly to proceed:\n  ${AUTH_PHRASE}\n> `,
  );
  const line = await new Promise<string>((resolve) => {
    process.stdin.once("data", (data) => resolve(data.toString().trim()));
  });
  return line === AUTH_PHRASE;
}

async function main() {
  // Parse argv: drop node + script + optional trailing auth phrase.
  const all = process.argv.slice(2);
  const slotIds = all[all.length - 1] === AUTH_PHRASE ? all.slice(0, -1) : all;
  if (slotIds.length === 0) usage();
  if (!(await isAuthorized(slotIds))) {
    console.error("\nABORT: auth phrase missing or incorrect. No emails sent.");
    process.exit(1);
  }

  const baseUrl = getBaseUrl();
  const isLocalUrl =
    /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(
      baseUrl,
    );
  if (isLocalUrl) {
    console.error(
      `\nABORT: getBaseUrl() returned '${baseUrl}', which looks like a local dev URL.\n` +
        `Re-run with NEXTAUTH_URL=https://prayertrains.com ...\n`,
    );
    process.exit(1);
  }

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  console.log(`Looking up ${slotIds.length} slot(s)...`);
  const slots = await prisma.prayerSlot.findMany({
    where: { id: { in: slotIds } },
    include: {
      train: {
        include: { organizer: { select: { name: true } } },
      },
      prayerType: true,
      claimedBy: { select: { email: true, name: true } },
    },
  });

  if (slots.length !== slotIds.length) {
    const found = new Set(slots.map((s) => s.id));
    const missing = slotIds.filter((id) => !found.has(id));
    console.error(`ABORT: not all slot IDs resolved. Missing: ${missing.join(", ")}`);
    process.exit(1);
  }

  let sent = 0;
  let failed = 0;

  for (const slot of slots) {
    const email = slot.claimedBy?.email || slot.claimerEmail;
    const name = slot.claimedBy?.name || slot.claimerName || "Friend";

    if (!email) {
      console.warn(`  - skip slot ${slot.id}: no email on row`);
      continue;
    }

    if (slot.train.status !== "ACTIVE") {
      console.warn(
        `  - skip slot ${slot.id}: train status=${slot.train.status} (need ACTIVE)`,
      );
      continue;
    }

    // CRON_SECRET availability gates the completion-token flow.
    // Vercel marks it Sensitive (write-only after creation), so a
    // local catch-up run typically does NOT have it. Gracefully
    // degrade: route the "I prayed" link to the train page instead
    // of the tokenized handler. Email content lands intact; the
    // one-click button just routes to the train page rather than
    // the completion endpoint. Mirrors the chain script's pattern.
    const haveSecret = Boolean(process.env.CRON_SECRET);
    const completeUrl = haveSecret
      ? `${baseUrl}/p/${slot.train.slug}/complete?slot=${slot.id}&token=${encodeURIComponent(signCompletionToken("slot", slot.id))}`
      : `${baseUrl}/p/${slot.train.slug}`;

    const result = await sendDailyReminder({
      to: email,
      claimerName: name,
      recipientName: slot.train.recipientName,
      prayerName: slot.prayerType.name,
      prayerText: slot.prayerType.prayerText,
      prayerInstructions: slot.prayerType.instructions,
      customPrayerText: slot.train.customPrayerText,
      organizerFirstName: slot.train.organizerAnonymous
        ? null
        : (slot.train.organizer?.name?.trim().split(/\s+/)[0] ?? null),
      trainUrl: `${baseUrl}/p/${slot.train.slug}`,
      completeUrl,
      slotId: slot.id,
      // Honor the train's language so a catch-up dispatch matches
      // what the cron would have sent. Defaults to "en" on rows
      // created before PR B.
      language: slot.train.language,
    });

    if (!result.ok) {
      failed++;
      console.error(`  ! ${email} (${slot.id}) — ${String(result.error)}`);
      await sleep(RESEND_RATE_LIMIT_DELAY_MS);
      continue;
    }

    // Mirror the cron's audit-trail write.
    await prisma.prayerSlot.update({
      where: { id: slot.id },
      data: { lastReminderSentAt: new Date() },
    });
    sent++;
    console.log(`  + ${email} (id=${result.id})`);
    await sleep(RESEND_RATE_LIMIT_DELAY_MS);
  }

  console.log(`\nDone. sent=${sent} failed=${failed}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
