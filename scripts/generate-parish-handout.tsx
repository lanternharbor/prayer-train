/**
 * Generate the parish promotion artifacts as PDFs in /tmp.
 *
 *   /tmp/parish-handout.pdf      — single-page 8.5x11 handout
 *   /tmp/parish-cards.pdf        — 10-up sheet of pocket cards
 *
 * Run with: npx tsx scripts/generate-parish-handout.tsx
 *
 * Both PDFs share the cross-bouquet emblem from public/bouquet-emblem.png
 * and a generated QR code targeting prayertrains.com. The QR is rendered
 * locally with the existing `qrcode` dependency — no external API.
 *
 * The script writes to /tmp because the artifacts aren't committed —
 * they're regenerated on demand from the React-PDF templates so any
 * copy change in src/lib/parish-handout.tsx flows through to the
 * printed output without anyone hand-editing a static file.
 */

import "dotenv/config";
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from "node:fs";
import QRCode from "qrcode";
import {
  ParishCardSheetDocument,
  ParishHandoutDocument,
} from "../src/lib/parish-handout";

const QR_TARGET = "https://prayertrains.com";

async function main() {
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

  const handoutBuf = await renderToBuffer(
    <ParishHandoutDocument qrPngBuffer={qrBuffer} />,
  );
  writeFileSync("/tmp/parish-handout.pdf", handoutBuf);
  console.log(
    `  /tmp/parish-handout.pdf      ${(handoutBuf.length / 1024).toFixed(0)} KB`,
  );

  const cardsBuf = await renderToBuffer(
    <ParishCardSheetDocument qrPngBuffer={qrBuffer} />,
  );
  writeFileSync("/tmp/parish-cards.pdf", cardsBuf);
  console.log(
    `  /tmp/parish-cards.pdf        ${(cardsBuf.length / 1024).toFixed(0)} KB  (10 cards on one letter sheet)`,
  );
  console.log("");
}

main().catch((err) => {
  console.error("\n  Render failed:", err);
  process.exit(1);
});
