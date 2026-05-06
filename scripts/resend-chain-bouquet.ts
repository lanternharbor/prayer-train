/**
 * One-off: send the spiritual bouquet email to every active member
 * of a closed PrayerChain.
 *
 * Why this exists: PR #40 wired the bouquet-ready email into the
 * close path for organizers, but it explicitly did not send a
 * member-facing variant ("the bouquet is for the organizer to share
 * with the recipient family, not for every member to have"). After
 * Benji's novena closed William wanted every member of the chain
 * to also receive the bouquet, so they could see the artifact their
 * prayers helped create. This script handles that ask for any
 * COMPLETED chain — Benji today, possibly Spina or Denis when those
 * close in the weeks ahead, possibly the standard close-flow if
 * we decide to make this default behavior later.
 *
 * What it does:
 *   1. Looks up the chain by slug
 *   2. Pre-flight: must exist, must be COMPLETED, must have members
 *   3. For each member with unsubscribedAt === null, sends
 *      sendChainBouquetForMembers (the gracious-thank-you variant
 *      added alongside this script)
 *   4. Logs a summary of sent / failed / skipped to stdout
 *
 * What it does NOT do:
 *   - Touch the database. Pure read + email send. Cannot delete or
 *     mutate any rows.
 *   - Send to the organizer. The organizer-facing bouquet email
 *     fired on close (PR #40 onward) or, for chains closed before
 *     PR #40 shipped, can be triggered by re-running the close
 *     manually OR by hitting the bouquet endpoint directly.
 *   - Send to unsubscribed members. unsubscribedAt: null is the
 *     gate.
 *
 * Auth phrase: "yes resend bouquet to chain members"
 *
 * Run with one of:
 *   npx tsx scripts/resend-chain-bouquet.ts <slug>
 *     (interactive — prompts for auth phrase)
 *   npx tsx scripts/resend-chain-bouquet.ts <slug> "yes resend bouquet to chain members"
 *     (CLI arg — used when the agent has received explicit auth in chat)
 *
 * Idempotency: not enforced. Re-running fan-outs again. Each
 * member receives a duplicate email if the script runs twice
 * against the same chain. Don't run twice.
 */

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { sendChainBouquetForMembers } from "../src/lib/email";
import { getBaseUrl } from "../src/lib/url";

const AUTH_PHRASE = "yes resend bouquet to chain members";

function usage(): never {
  console.error(
    `\nUsage:\n  npx tsx scripts/resend-chain-bouquet.ts <slug>\n  npx tsx scripts/resend-chain-bouquet.ts <slug> "${AUTH_PHRASE}"\n`,
  );
  process.exit(1);
}

async function isAuthorized(slug: string): Promise<boolean> {
  const cliArg = process.argv[3];
  if (cliArg === AUTH_PHRASE) return true;
  if (!process.stdin.isTTY) return false;
  process.stdout.write(
    `\nAbout to fan out the spiritual bouquet email to every active member of chain '${slug}'.\n` +
      `Type the auth phrase exactly to proceed:\n  ${AUTH_PHRASE}\n> `,
  );
  const line = await new Promise<string>((resolve) => {
    process.stdin.once("data", (data) => resolve(data.toString().trim()));
  });
  return line === AUTH_PHRASE;
}

async function main() {
  const slug = process.argv[2];
  if (!slug) usage();
  if (!(await isAuthorized(slug))) {
    console.error(
      "\nABORT: auth phrase missing or incorrect. No emails sent.",
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
      organizerAnonymous: true,
      recipientName: true,
      organizer: { select: { name: true } },
      prayerType: { select: { name: true } },
      members: {
        where: { unsubscribedAt: null },
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!chain) {
    console.error(`ABORT: chain '${slug}' not found.`);
    process.exit(1);
  }

  if (chain.status !== "COMPLETED") {
    console.error(
      `ABORT: chain '${slug}' has status='${chain.status}', expected COMPLETED. Member bouquet emails should only fan out after the prayer is complete.`,
    );
    process.exit(1);
  }

  if (chain.members.length === 0) {
    console.error(
      `ABORT: chain '${slug}' has no active (non-unsubscribed) members. Nothing to send.`,
    );
    process.exit(1);
  }

  const baseUrl = getBaseUrl();
  const bouquetUrl = `${baseUrl}/api/bouquet/chain/${chain.slug}`;
  const chainUrl = `${baseUrl}/chain/${chain.slug}`;
  // null = anonymous OR no User.name; render helper drops "with [name]"
  // from the thank-you sentence.
  const organizerName =
    chain.organizerAnonymous || !chain.organizer?.name
      ? null
      : chain.organizer.name;

  console.log(
    `Found chain '${chain.slug}' (${chain.prayerType.name}` +
      (chain.recipientName ? ` for ${chain.recipientName})` : ")") +
      ` with ${chain.members.length} active members.`,
  );
  console.log(`  bouquet URL: ${bouquetUrl}`);
  console.log(`  chain URL:   ${chainUrl}`);
  console.log(``);

  let sent = 0;
  let failed = 0;
  for (const member of chain.members) {
    if (!member.email) {
      console.warn(`  - skip member ${member.id}: no email on row`);
      continue;
    }
    try {
      await sendChainBouquetForMembers({
        to: member.email,
        memberName: member.name,
        organizerName,
        prayerName: chain.prayerType.name,
        recipientName: chain.recipientName,
        bouquetUrl,
        chainUrl,
      });
      sent++;
      console.log(`  + ${member.email}`);
    } catch (e) {
      failed++;
      console.error(`  ! ${member.email} — ${e}`);
    }
  }

  console.log(
    `\nDone. sent=${sent} failed=${failed} skipped=${chain.members.length - sent - failed}`,
  );

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
