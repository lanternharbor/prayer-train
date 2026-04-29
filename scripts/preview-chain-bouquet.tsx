/**
 * One-off render of a synthetic PrayerChain bouquet to verify the
 * shared BouquetDocument component works for chain data shape (with
 * the emblem loaded, additionalWarriors omitted, organizerName null-
 * safe). No live chains exist in prod yet so this is the only way
 * to actually exercise the chain bouquet rendering path.
 *
 * Run with: npx tsx scripts/preview-chain-bouquet.tsx
 */

import "dotenv/config";
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from "node:fs";
import { BouquetDocument, type BouquetData } from "../src/lib/bouquet-pdf";

async function main() {
  // Synthetic data shaped exactly like /api/bouquet/chain/[slug] would
  // build it. Two scenarios: organizer with name, organizer without.
  const scenarios: Array<{ label: string; data: BouquetData }> = [
    {
      label: "with-organizer",
      data: {
        recipientName: "Test Recipient",
        organizerName: "Maria Sample",
        startDate: new Date("2026-04-21"),
        endDate: new Date("2026-04-29"),
        prayers: [
          {
            name: "Novena to St. Blaise",
            timesOffered: 27,
            uniquePrayers: 5,
          },
        ],
        prayerWarriors: ["Anne", "Beth", "Carol", "David", "Eve"].sort(),
      },
    },
    {
      label: "no-organizer-name",
      data: {
        recipientName: "Another Family",
        organizerName: null, // simulates a User row without name set
        startDate: new Date("2026-04-21"),
        endDate: new Date("2026-04-29"),
        prayers: [
          {
            name: "The Holy Rosary",
            timesOffered: 18,
            uniquePrayers: 3,
          },
        ],
        prayerWarriors: ["Frank", "Grace", "Henry"].sort(),
      },
    },
  ];

  for (const { label, data } of scenarios) {
    const buf = await renderToBuffer(<BouquetDocument data={data} />);
    const path = `/tmp/chain-bouquet-${label}.pdf`;
    writeFileSync(path, buf);
    console.log(
      `  ${label.padEnd(20)} → ${path}  (${buf.length.toLocaleString()} bytes)`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
