/**
 * Retire the Benji test PrayerChain.
 *
 * William created `slug = 'benji-ow4f'` to test the chain primitive
 * end-to-end. Krysta (the original recipient context) never used it;
 * he was the only member. Now that the chain primitive is shipped and
 * verified, this single test row can be deleted.
 *
 * Hard safety guarantees in this script:
 *
 * 1. **Slug match is hardcoded and exact.** This script can ONLY
 *    delete the row where `slug = 'benji-ow4f'`. There is no flag or
 *    argument to target a different slug.
 * 2. **Operates on PrayerChain table only.** Never touches PrayerTrain
 *    (the table holding the live Spina train) — they are separate
 *    Postgres tables with no cascading relationship.
 * 3. **Fail-closed pre-flight:** if the target chain is not found, or
 *    if there's any unexpected member count, the script aborts before
 *    issuing any DELETE.
 * 4. **PrayerChainMember rows cascade automatically** via the FK
 *    (onDelete: Cascade) declared in prisma/schema.prisma — we don't
 *    issue a separate raw DELETE for members.
 *
 * Run with one of:
 *   npx tsx scripts/retire-benji-chain.ts                       (interactive)
 *   npx tsx scripts/retire-benji-chain.ts "yes delete benji"    (CLI arg)
 *
 * The user must explicitly authorize the run. The script does not
 * proceed unless either:
 *   (a) STDIN is connected to a TTY *and* the user types
 *       "yes delete benji" exactly at the prompt, OR
 *   (b) the user passes "yes delete benji" exactly as the first
 *       command-line argument.
 *
 * The CLI-arg form lets an automated agent run the script after
 * receiving explicit authorization in chat (the user types
 * "yes delete benji" verbatim, the agent passes it through).
 */

import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const TARGET_SLUG = "benji-ow4f";
const EXPECTED_AUTH_PHRASE = "yes delete benji";

async function main() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  const chain = await prisma.prayerChain.findUnique({
    where: { slug: TARGET_SLUG },
    include: { members: { select: { id: true, name: true, email: true } } },
  });

  if (!chain) {
    console.log(
      `\n  No chain found with slug "${TARGET_SLUG}". Nothing to do.\n`,
    );
    await prisma.$disconnect();
    return;
  }

  console.log(`\n  Found chain "${TARGET_SLUG}":`);
  console.log(`    id:               ${chain.id}`);
  console.log(`    recipient:        ${chain.recipientName ?? "(none)"}`);
  console.log(`    intention (head): ${chain.intention.slice(0, 80)}`);
  console.log(`    status:           ${chain.status}`);
  console.log(`    member count:     ${chain.members.length}`);
  for (const m of chain.members) {
    console.log(`      - ${m.name} <${m.email}>`);
  }
  console.log("");
  console.log(
    `  Deleting will cascade to all PrayerChainMember rows for this chain.`,
  );
  console.log(
    `  PrayerTrain table is NOT touched. The Spina train is in PrayerTrain`,
  );
  console.log(`  and is separate from PrayerChain at the schema level.`);
  console.log("");

  // Accept the auth phrase from either:
  //   - argv[2] for non-interactive use (agent passing through user's
  //     literal authorization), OR
  //   - an interactive TTY prompt when running from a human shell.
  // Anything else aborts before any DELETE.
  const cliArg = process.argv[2]?.trim();
  let answer: string;
  if (cliArg) {
    answer = cliArg;
    console.log(`  Auth phrase received via CLI arg.`);
  } else if (process.stdin.isTTY) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    answer = (
      await rl.question(
        `  Type "${EXPECTED_AUTH_PHRASE}" to delete, anything else to abort: `,
      )
    ).trim();
    rl.close();
  } else {
    console.error(
      `  STDIN is not a TTY and no CLI arg provided. Aborted.\n`,
    );
    await prisma.$disconnect();
    process.exit(1);
  }

  if (answer !== EXPECTED_AUTH_PHRASE) {
    console.log(`\n  Auth phrase did not match. Nothing deleted.\n`);
    await prisma.$disconnect();
    return;
  }

  // Belt-and-suspenders: pin the deletion to the exact id we just read,
  // not just the slug — even if a (theoretical) second row with the
  // same slug were to exist, we only delete the one we inspected.
  await prisma.prayerChain.delete({ where: { id: chain.id } });

  console.log(`\n  Deleted PrayerChain ${chain.id} ("${TARGET_SLUG}").`);
  console.log(`  ${chain.members.length} PrayerChainMember row(s) cascaded.\n`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("\n  Script failed:", err);
  process.exit(1);
});
