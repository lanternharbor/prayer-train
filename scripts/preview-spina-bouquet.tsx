/**
 * Preview the spiritual-bouquet PDF for the live Spina train.
 *
 * Read-only against prod — pulls the train + slots + warriors and feeds
 * the same BouquetDocument React-PDF component that /api/bouquet/[slug]
 * uses. Bypasses the COMPLETED-status gate so we can preview a bouquet
 * for a train that's still ACTIVE.
 *
 * Generates two files in /tmp:
 *   spina-bouquet-current.pdf    — only slots already marked COMPLETED
 *   spina-bouquet-projected.pdf  — projection if everyone marks "I prayed"
 *                                  (CLAIMED + COMPLETED treated as offered)
 *
 * Run with: npx tsx scripts/preview-spina-bouquet.ts
 */

import "dotenv/config";
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from "node:fs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { BouquetDocument, type BouquetData } from "../src/lib/bouquet-pdf";

const SLUG = "the-spina-family-dlmm";

async function main() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  const train = await prisma.prayerTrain.findUnique({
    where: { slug: SLUG },
    include: {
      organizer: { select: { name: true } },
      slots: {
        include: { prayerType: { select: { name: true } } },
      },
    },
  });

  if (!train) {
    console.error(`Train not found: ${SLUG}`);
    process.exit(1);
  }

  // PrayerWarrior table doesn't exist in prod yet (schema not pushed),
  // so we simulate an empty additionalWarriors list.
  const additionalWarriors: string[] = [];

  // Build two views of the bouquet:
  //   "current"   — only slots marked COMPLETED today
  //   "projected" — CLAIMED + COMPLETED both counted as offered
  const buildBouquet = (
    label: "current" | "projected",
  ): BouquetData => {
    const includedSlots =
      label === "current"
        ? train.slots.filter((s) => s.status === "COMPLETED")
        : train.slots.filter(
            (s) => s.status === "CLAIMED" || s.status === "COMPLETED",
          );

    const byPrayer = new Map<
      string,
      {
        name: string;
        timesOffered: number;
        uniquePrayerEmails: Set<string>;
      }
    >();
    for (const slot of includedSlots) {
      const name = slot.prayerType.name;
      if (!byPrayer.has(name)) {
        byPrayer.set(name, {
          name,
          timesOffered: 0,
          uniquePrayerEmails: new Set(),
        });
      }
      const entry = byPrayer.get(name)!;
      entry.timesOffered += 1;
      if (slot.claimerEmail) entry.uniquePrayerEmails.add(slot.claimerEmail);
    }
    const prayers = Array.from(byPrayer.values())
      .map((p) => ({
        name: p.name,
        timesOffered: p.timesOffered,
        uniquePrayers: p.uniquePrayerEmails.size,
      }))
      .sort((a, b) => b.timesOffered - a.timesOffered);

    const seenEmails = new Set<string>();
    const warriorNames: string[] = [];
    for (const slot of includedSlots) {
      const key = (slot.claimerEmail ?? slot.claimerName ?? "").toLowerCase();
      if (!key || seenEmails.has(key)) continue;
      seenEmails.add(key);
      if (slot.claimerName) warriorNames.push(slot.claimerName);
    }
    warriorNames.sort((a, b) => a.localeCompare(b));

    return {
      recipientName: train.recipientName,
      organizerName: train.organizer?.name ?? null,
      startDate: train.startDate,
      endDate: train.endDate,
      prayers,
      prayerWarriors: warriorNames,
      additionalWarriors,
    };
  };

  for (const label of ["current", "projected"] as const) {
    const data = buildBouquet(label);
    const buf = await renderToBuffer(<BouquetDocument data={data} />);
    const path = `/tmp/spina-bouquet-${label}.pdf`;
    writeFileSync(path, buf);
    const totalPrayers = data.prayers.reduce(
      (sum, p) => sum + p.timesOffered,
      0,
    );
    console.log(
      `  ${label.padEnd(10)} → ${path}  (${totalPrayers} prayers, ${data.prayerWarriors.length} warriors)`,
    );
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
