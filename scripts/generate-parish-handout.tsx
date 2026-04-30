/**
 * Generate the parish promotion artifacts as PDFs in ./printables/.
 *
 *   printables/parish-handout.pdf      single-page 8.5x11 handout
 *   printables/parish-cards.pdf        10-up sheet of pocket cards
 *
 * Run with: npx tsx scripts/generate-parish-handout.tsx
 *
 * Both PDFs share the cross-bouquet emblem from public/bouquet-emblem.png
 * and a generated QR code targeting prayertrains.com. The QR is rendered
 * locally with the existing `qrcode` dependency, no external API.
 *
 * Output lives in ./printables/ rather than /tmp so the files persist
 * between reboots and have a memorable location. The folder is in
 * .gitignore: the generators are committed; the generated PDFs
 * themselves regenerate from the React-PDF templates whenever the
 * script runs.
 */

import "dotenv/config";
import { renderToBuffer } from "@react-pdf/renderer";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import QRCode from "qrcode";
import {
  ParishCardSheetDocument,
  ParishHandoutDocument,
} from "../src/lib/parish-handout";

const QR_TARGET = "https://prayertrains.com";
const OUTPUT_DIR = join(process.cwd(), "printables");

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  // High error correction (H = 30%) so the QR survives a parish
  // photocopier's compression and small-printout pixel loss. Square
  // PNG; @react-pdf's Image accepts the buffer directly.
  const qrBuffer = await QRCode.toBuffer(QR_TARGET, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 400,
    color: {
      dark: "#11152c", // navyDark — matches the brand palette
      light: "#fefdfb", // cream parchment — blends into the page
    },
  });

  console.log("\n  Rendering PDFs (using bouquet emblem + brand palette)…\n");

  const handoutPath = join(OUTPUT_DIR, "parish-handout.pdf");
  const cardsPath = join(OUTPUT_DIR, "parish-cards.pdf");

  const handoutBuf = await renderToBuffer(
    <ParishHandoutDocument qrPngBuffer={qrBuffer} />,
  );
  writeFileSync(handoutPath, handoutBuf);
  console.log(
    `  ${handoutPath}    ${(handoutBuf.length / 1024).toFixed(0)} KB`,
  );

  const cardsBuf = await renderToBuffer(
    <ParishCardSheetDocument qrPngBuffer={qrBuffer} />,
  );
  writeFileSync(cardsPath, cardsBuf);
  console.log(
    `  ${cardsPath}      ${(cardsBuf.length / 1024).toFixed(0)} KB  (10 cards on one letter sheet)`,
  );
  console.log("");
}

main().catch((err) => {
  console.error("\n  Render failed:", err);
  process.exit(1);
});
