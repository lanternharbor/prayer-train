/**
 * Read-only verification of the abandonment-cleanup queries against
 * the live Neon database.
 *
 * Purpose: confirm that the new Prisma queries work, that the new
 * abandonmentPromptSentAt columns are reachable, and that the blast
 * radius of tomorrow's 11 UTC cron firing is what we expect (i.e., we
 * understand exactly which real trains/chains will receive the new
 * abandonment-prompt email).
 *
 * NO writes. NO side effects. Pure SELECT.
 *
 * Run from the repo root:
 *   npx tsx scripts/verify-abandonment-cleanup.ts
 *
 * Reads DATABASE_URL from the local .env (Prisma config does this).
 */

import { prisma } from "@/lib/db";
import {
  TRAIN_ABANDONMENT_PROMPT_DAYS,
  TRAIN_ABANDONMENT_GRACE_DAYS,
} from "@/lib/train-lifecycle";
import {
  CHAIN_ABANDONMENT_PROMPT_DAYS,
  CHAIN_ABANDONMENT_GRACE_DAYS,
} from "@/lib/chain-lifecycle";
import { PROTECTED_SLUGS, PROTECTED_CHAIN_SLUGS } from "@/lib/train-protection";

function ms(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function log(label: string, data?: unknown) {
  if (data !== undefined) {
    console.log(`\n[verify] ${label}`);
    console.dir(data, { depth: 4 });
  } else {
    console.log(`\n[verify] ${label}`);
  }
}

async function main() {
  const now = Date.now();

  // ─── Sanity: schema reachable ────────────────────────────────
  log("Schema check: probe abandonmentPromptSentAt columns");
  const probeTrain = await prisma.prayerTrain.findFirst({
    select: { id: true, abandonmentPromptSentAt: true },
  });
  const probeChain = await prisma.prayerChain.findFirst({
    select: { id: true, abandonmentPromptSentAt: true },
  });
  log("Train column reachable", { sampled: probeTrain !== null });
  log("Chain column reachable", { sampled: probeChain !== null });

  // ─── Train Pass 3: abandonment-prompt candidates ─────────────
  log(
    `Pass 3 (train abandonment-prompt) candidates — ACTIVE, >${TRAIN_ABANDONMENT_PROMPT_DAYS}d old, empty, prompt not yet sent`,
  );
  const trainPromptCandidates = await prisma.prayerTrain.findMany({
    where: {
      status: "ACTIVE",
      abandonmentPromptSentAt: null,
      createdAt: {
        lt: new Date(now - TRAIN_ABANDONMENT_PROMPT_DAYS * 24 * 60 * 60 * 1000),
      },
      slots: { none: { status: { in: ["CLAIMED", "COMPLETED"] } } },
      warriors: { none: {} },
    },
    select: {
      id: true,
      slug: true,
      createdAt: true,
      endDate: true,
      organizer: { select: { email: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  log(`Found ${trainPromptCandidates.length} train candidates`);
  for (const t of trainPromptCandidates) {
    const ageDays = Math.floor((now - t.createdAt.getTime()) / ms(1));
    const isProtected = PROTECTED_SLUGS.has(t.slug);
    const hasEmail = Boolean(t.organizer?.email);
    console.log(
      `  - ${t.slug}  age=${ageDays}d  endDate=${t.endDate.toISOString().slice(0, 10)}  protected=${isProtected}  organizerEmail=${hasEmail}`,
    );
  }

  // ─── Train Pass 4: auto-cancel candidates ────────────────────
  log(
    `Pass 4 (train auto-cancel) candidates — ACTIVE, prompt set >${TRAIN_ABANDONMENT_GRACE_DAYS}d ago, still empty`,
  );
  const trainCancelCandidates = await prisma.prayerTrain.findMany({
    where: {
      status: "ACTIVE",
      abandonmentPromptSentAt: {
        lt: new Date(now - TRAIN_ABANDONMENT_GRACE_DAYS * 24 * 60 * 60 * 1000),
      },
      slots: { none: { status: { in: ["CLAIMED", "COMPLETED"] } } },
      warriors: { none: {} },
    },
    select: { id: true, slug: true, abandonmentPromptSentAt: true },
  });
  log(`Found ${trainCancelCandidates.length} train auto-cancel candidates`);
  if (trainCancelCandidates.length > 0) {
    for (const t of trainCancelCandidates) {
      console.log(
        `  - ${t.slug}  abandonmentPromptSentAt=${t.abandonmentPromptSentAt?.toISOString()}`,
      );
    }
  }

  // ─── Chain Pass 3 + Pass 4 ───────────────────────────────────
  log(
    `Chain abandonment-prompt candidates — ACTIVE, >${CHAIN_ABANDONMENT_PROMPT_DAYS}d old, zero members, prompt not yet sent`,
  );
  const chainPromptCandidates = await prisma.prayerChain.findMany({
    where: {
      status: "ACTIVE",
      abandonmentPromptSentAt: null,
      createdAt: {
        lt: new Date(now - CHAIN_ABANDONMENT_PROMPT_DAYS * 24 * 60 * 60 * 1000),
      },
      members: { none: {} },
    },
    select: {
      id: true,
      slug: true,
      createdAt: true,
      endDate: true,
      organizer: { select: { email: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  log(`Found ${chainPromptCandidates.length} chain candidates`);
  for (const c of chainPromptCandidates) {
    const ageDays = Math.floor((now - c.createdAt.getTime()) / ms(1));
    const isProtected = PROTECTED_CHAIN_SLUGS.has(c.slug);
    const hasEmail = Boolean(c.organizer?.email);
    console.log(
      `  - ${c.slug}  age=${ageDays}d  endDate=${c.endDate.toISOString().slice(0, 10)}  protected=${isProtected}  organizerEmail=${hasEmail}`,
    );
  }

  log(
    `Chain auto-cancel candidates — ACTIVE, prompt set >${CHAIN_ABANDONMENT_GRACE_DAYS}d ago, zero members`,
  );
  const chainCancelCandidates = await prisma.prayerChain.findMany({
    where: {
      status: "ACTIVE",
      abandonmentPromptSentAt: {
        lt: new Date(now - CHAIN_ABANDONMENT_GRACE_DAYS * 24 * 60 * 60 * 1000),
      },
      members: { none: {} },
    },
    select: { id: true, slug: true, abandonmentPromptSentAt: true },
  });
  log(`Found ${chainCancelCandidates.length} chain auto-cancel candidates`);

  // ─── Inventory: how many trains/chains overall are empty ─────
  log("Inventory: total ACTIVE empty trains (regardless of age)");
  const emptyTrains = await prisma.prayerTrain.count({
    where: {
      status: "ACTIVE",
      slots: { none: { status: { in: ["CLAIMED", "COMPLETED"] } } },
      warriors: { none: {} },
    },
  });
  log("Inventory: total ACTIVE empty chains");
  const emptyChains = await prisma.prayerChain.count({
    where: { status: "ACTIVE", members: { none: {} } },
  });
  console.log(`  emptyTrains=${emptyTrains}  emptyChains=${emptyChains}`);

  // ─── Spot-check: Shaleen Wilson + Denis Wilson (protected) ──
  log("Spot-check: Shaleen Wilson + protected slugs");
  const shaleen = await prisma.prayerTrain.findFirst({
    where: { recipientName: { contains: "Shaleen" } },
    select: {
      slug: true,
      createdAt: true,
      status: true,
      abandonmentPromptSentAt: true,
      _count: { select: { slots: true, warriors: true } },
    },
  });
  const denis = await prisma.prayerTrain.findUnique({
    where: { slug: "denis-wilson-hn9g" },
    select: {
      slug: true,
      createdAt: true,
      status: true,
      abandonmentPromptSentAt: true,
      _count: { select: { slots: true, warriors: true } },
    },
  });
  const spina = await prisma.prayerTrain.findUnique({
    where: { slug: "the-spina-family-dlmm" },
    select: {
      slug: true,
      createdAt: true,
      status: true,
      abandonmentPromptSentAt: true,
      _count: { select: { slots: true, warriors: true } },
    },
  });
  log("Shaleen Wilson", shaleen);
  log("Denis Wilson (protected)", denis);
  log("Spina (protected)", spina);

  // ─── Verify protected slugs aren't accidentally in the candidate list ──
  log("Cross-check: any protected slugs in the train candidate list?");
  const protectedHits = trainPromptCandidates.filter((t) =>
    PROTECTED_SLUGS.has(t.slug),
  );
  if (protectedHits.length > 0) {
    console.error(
      `  ⚠ Protected slug found in candidate set: ${protectedHits.map((p) => p.slug).join(", ")}`,
    );
    console.error("  Predicate gate would still bypass, but flag for review.");
  } else {
    console.log("  ✓ No protected slugs in candidate set");
  }
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error("\n[verify] FATAL", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
