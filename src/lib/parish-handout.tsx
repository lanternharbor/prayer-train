/**
 * Parish promotion artifacts — printable PDFs William can leave at the
 * back of St Paul (or any parish) at the end of a healing Mass.
 *
 * Two documents share this module:
 *
 *   ParishHandoutDocument
 *     A single-page 8.5x11 letter-size handout with the meal-train-but-
 *     for-prayers framing, a how-it-works section, and a thank-you
 *     paragraph addressed to St Paul parishioners. The community
 *     already knows the family's story; the handout's job is to name
 *     the project, show how to use it, and acknowledge the village.
 *
 *   ParishCardSheetDocument
 *     A 10-up sheet of 3.5x2 inch pocket cards (standard business-card
 *     dimensions). Minimal design: cross-bouquet emblem, wordmark,
 *     tagline, QR, URL. For the parishioner who just wants to grab
 *     the URL on the way out.
 *
 * Both share the same brand palette as the Spiritual Bouquet PDF
 * (cream parchment, navy ink, antique gold), and lazy-load the same
 * cross-bouquet emblem from /public so the artifact lineage is
 * visually consistent.
 */

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Lazy-load and cache the bouquet emblem buffer. Same pattern and
// asset as src/lib/bouquet-pdf.tsx so the parish artifacts inherit
// the same illustrated mark the spiritual bouquet uses.
let _emblemBuffer: Buffer | null | undefined;
function getEmblemBuffer(): Buffer | null {
  if (_emblemBuffer !== undefined) return _emblemBuffer;
  try {
    _emblemBuffer = readFileSync(
      join(process.cwd(), "public", "bouquet-emblem.png"),
    );
  } catch {
    _emblemBuffer = null;
  }
  return _emblemBuffer;
}

// Smaller pre-resized emblem (200×200) used by the 10-up card sheet.
// Embedding the full 3MB emblem ten times produced a 30MB PDF; this
// drops it to a few hundred KB without visible quality loss at the
// 64pt render size on the cards.
let _emblemSmallBuffer: Buffer | null | undefined;
function getEmblemSmallBuffer(): Buffer | null {
  if (_emblemSmallBuffer !== undefined) return _emblemSmallBuffer;
  try {
    _emblemSmallBuffer = readFileSync(
      join(process.cwd(), "public", "bouquet-emblem-sm.png"),
    );
  } catch {
    // Fall back to the full-size emblem if the small variant is missing
    // (lets the script keep working in environments where the asset
    // hasn't been generated yet — at the cost of a larger PDF).
    _emblemSmallBuffer = getEmblemBuffer();
  }
  return _emblemSmallBuffer;
}

const PALETTE = {
  navy: "#1a2142",
  navyDark: "#11152c",
  gold: "#947324",
  goldLight: "#d4a843",
  cream: "#fefdfb",
  text: "#1a2142",
  muted: "#6e6150",
  border: "#e8e0d5",
};

// ─── Handout (8.5x11, single-sided) ─────────────────────────

const handoutStyles = StyleSheet.create({
  page: {
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 36,
    backgroundColor: PALETTE.cream,
    fontFamily: "Times-Roman",
    color: PALETTE.text,
    // Flex column so flexGrow on the spacer below can push the footer
    // (QR + URL) to the bottom of page 1. Tighter padding + slightly
    // smaller emblem + tighter line-heights are required to keep
    // everything on one page; without that, the footer spills.
    flexDirection: "column",
  },
  emblem: {
    width: 88,
    height: 88,
    marginHorizontal: "auto",
    marginBottom: 6,
  },
  wordmark: {
    fontFamily: "Times-Bold",
    fontSize: 28,
    color: PALETTE.navyDark,
    textAlign: "center",
    marginBottom: 2,
  },
  tagline: {
    fontFamily: "Times-Italic",
    fontSize: 13,
    color: PALETTE.muted,
    textAlign: "center",
    marginBottom: 14,
  },
  rule: {
    width: 70,
    height: 1.5,
    backgroundColor: PALETTE.gold,
    marginVertical: 10,
    marginHorizontal: "auto",
  },
  body: {
    fontSize: 11.5,
    lineHeight: 1.5,
    color: PALETTE.text,
    marginBottom: 10,
  },
  bodyBold: {
    fontFamily: "Times-Bold",
  },
  sectionLabel: {
    fontSize: 9.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: PALETTE.gold,
    fontFamily: "Times-Bold",
    marginTop: 6,
    marginBottom: 8,
    textAlign: "center",
  },
  cta: {
    fontSize: 12.5,
    color: PALETTE.navyDark,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 8,
    fontFamily: "Times-Bold",
  },
  thankYouBlock: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 0.5,
    borderTopColor: PALETTE.border,
  },
  thankYouLabel: {
    fontSize: 9.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: PALETTE.gold,
    fontFamily: "Times-Bold",
    marginBottom: 6,
  },
  thankYouBody: {
    fontFamily: "Times-Italic",
    fontSize: 11.5,
    lineHeight: 1.55,
    color: PALETTE.text,
    marginBottom: 8,
  },
  signoff: {
    fontFamily: "Times-Italic",
    fontSize: 11.5,
    color: PALETTE.text,
    textAlign: "right",
  },
  // Spacer pushes the footer block to the very bottom of the page
  // when body content is shorter than the page. flexGrow:1 with no
  // children just expands.
  spacer: {
    flexGrow: 1,
    minHeight: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: PALETTE.border,
  },
  footerQrColumn: {
    alignItems: "center",
  },
  footerQr: {
    width: 64,
    height: 64,
  },
  footerText: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    color: PALETTE.muted,
    textAlign: "left",
  },
  footerUrl: {
    fontFamily: "Times-Bold",
    fontSize: 12.5,
    color: PALETTE.navyDark,
    marginBottom: 2,
  },
  footerProject: {
    fontFamily: "Times-Italic",
    fontSize: 9.5,
    color: PALETTE.muted,
    letterSpacing: 1,
    marginTop: 2,
  },
});

export function ParishHandoutDocument({
  qrPngBuffer,
}: {
  qrPngBuffer: Buffer;
}) {
  const emblem = getEmblemBuffer();

  return (
    <Document
      title="PrayerTrain — Parish Handout"
      author="PrayerTrain"
      creator="PrayerTrain"
    >
      <Page size="LETTER" style={handoutStyles.page}>
        {/* Header */}
        {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image is a PDF primitive */}
        {emblem && <Image src={emblem} style={handoutStyles.emblem} />}
        <Text style={handoutStyles.wordmark}>PrayerTrain</Text>
        <Text style={handoutStyles.tagline}>
          Like a meal train, but for prayers.
        </Text>

        <View style={handoutStyles.rule} />

        {/* Lead paragraph */}
        <Text style={handoutStyles.body}>
          When someone you love is walking through a serious diagnosis,
          surgery, grief, or any heavy season — friends and family often
          want to help but don&apos;t know how.{" "}
          <Text style={handoutStyles.bodyBold}>
            PrayerTrain organizes prayer the way a meal train organizes
            meals.
          </Text>{" "}
          A simple shared calendar. A community of people praying for one
          specific person or intention. One commitment at a time.
        </Text>

        <Text style={handoutStyles.sectionLabel}>How it works</Text>

        <Text style={handoutStyles.body}>
          Someone organizes a PrayerTrain for a person in need. Friends
          and family sign up for individual prayer slots — a Rosary on
          Tuesday, a Divine Mercy Chaplet on Thursday, a Mass intention
          for Saturday. Each volunteer receives a daily reminder with the
          prayer they committed to and a one-click way to mark it
          complete. When the train ends, everyone receives a printable
          Spiritual Bouquet listing every prayer offered for that family.
        </Text>

        <Text style={handoutStyles.cta}>
          It&apos;s free, simple, and Catholic.
        </Text>

        <Text style={[handoutStyles.body, { textAlign: "center" }]}>
          Visit{" "}
          <Text style={handoutStyles.bodyBold}>prayertrains.com</Text>{" "}
          to start one for someone you love.
        </Text>

        {/* Thank-you to the parish — written for an audience that
            includes terminal diagnoses, grief, and active suffering.
            Avoids any "we got through" / "came out on top" framing
            that would land badly in this room. Centers the audience,
            not the Keoughs' story. The "use it for yourself" line is
            deliberate: someone with their own diagnosis should know
            this is for them, not only for organizing prayer for
            other people. */}
        <View style={handoutStyles.thankYouBlock}>
          <Text style={handoutStyles.thankYouLabel}>Thank you, St Paul.</Text>
          <Text style={handoutStyles.thankYouBody}>
            Wherever this Mass finds you — in waiting, in grief, in hope,
            or just in faithful presence — PrayerTrain is one small way
            to gather prayer around someone walking through something
            hard. Use it for someone you love. Use it for yourself.
            Pass it along where it helps.
          </Text>
          <Text style={handoutStyles.signoff}>
            — With prayers, William and his family
          </Text>
        </View>

        {/* Pushes the footer to the bottom of the page regardless of
            how tall the body content above it ends up. */}
        <View style={handoutStyles.spacer} />

        {/* Footer with QR + URL */}
        <View style={handoutStyles.footer}>
          <View style={handoutStyles.footerQrColumn}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image */}
            <Image src={qrPngBuffer} style={handoutStyles.footerQr} />
          </View>
          <View>
            <Text style={handoutStyles.footerUrl}>prayertrains.com</Text>
            <Text style={handoutStyles.footerText}>
              Scan to start a PrayerTrain.
            </Text>
            <Text style={handoutStyles.footerProject}>
              A Lantern Harbor project
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── Card Sheet (10-up, 3.5x2 cards on letter) ──────────────

// 8.5x11" letter @ 72pt/inch = 612 x 792 pt. A 10-card 2x5 grid of
// 3.5x2" cards is 7" wide x 10" tall = 504 x 720 pt. That centers
// inside the page with ~54pt margins on each side and ~36pt top/bottom.
// Standard Avery 5371 / 8371 business-card cut layout.

const CARD_WIDTH_PT = 3.5 * 72; // 252
const CARD_HEIGHT_PT = 2 * 72; //  144

const cardStyles = StyleSheet.create({
  page: {
    backgroundColor: PALETTE.cream,
    fontFamily: "Times-Roman",
    color: PALETTE.text,
    padding: 0,
  },
  sheet: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 36,
    paddingBottom: 36,
  },
  row: {
    flexDirection: "row",
  },
  card: {
    width: CARD_WIDTH_PT,
    height: CARD_HEIGHT_PT,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    // Hairline crop guide so the cutter can see the boundary on the
    // printed sheet. Renders as a faint outline; legible on a
    // grayscale copier without overwhelming the design.
    borderWidth: 0.5,
    borderColor: PALETTE.border,
  },
  cardLeft: {
    width: 78,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmblem: {
    width: 64,
    height: 64,
  },
  cardRight: {
    flex: 1,
    paddingLeft: 8,
    justifyContent: "center",
  },
  cardWordmark: {
    fontFamily: "Times-Bold",
    fontSize: 16,
    color: PALETTE.navyDark,
    marginBottom: 1,
  },
  cardTagline: {
    fontFamily: "Times-Italic",
    fontSize: 8.5,
    color: PALETTE.muted,
    marginBottom: 6,
  },
  cardQrRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardQr: {
    width: 38,
    height: 38,
  },
  cardUrlBlock: {
    flex: 1,
  },
  cardUrl: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    color: PALETTE.navyDark,
    marginBottom: 1,
  },
  cardProject: {
    fontFamily: "Times-Italic",
    fontSize: 7,
    color: PALETTE.muted,
    letterSpacing: 0.5,
  },
});

export function ParishCardSheetDocument({
  qrPngBuffer,
}: {
  qrPngBuffer: Buffer;
}) {
  const emblem = getEmblemSmallBuffer();

  // 5 rows × 2 cards = 10 per sheet, standard business-card layout.
  const rows = Array.from({ length: 5 });
  const cardsPerRow = Array.from({ length: 2 });

  return (
    <Document
      title="PrayerTrain — Parish Cards"
      author="PrayerTrain"
      creator="PrayerTrain"
    >
      <Page size="LETTER" style={cardStyles.page}>
        <View style={cardStyles.sheet}>
          {rows.map((_, rowIdx) => (
            <View key={rowIdx} style={cardStyles.row}>
              {cardsPerRow.map((_, colIdx) => (
                <View key={colIdx} style={cardStyles.card}>
                  <View style={cardStyles.cardLeft}>
                    {emblem && (
                      // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image
                      <Image src={emblem} style={cardStyles.cardEmblem} />
                    )}
                  </View>
                  <View style={cardStyles.cardRight}>
                    <Text style={cardStyles.cardWordmark}>PrayerTrain</Text>
                    <Text style={cardStyles.cardTagline}>
                      Like a meal train, but for prayers.
                    </Text>
                    <View style={cardStyles.cardQrRow}>
                      {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image */}
                      <Image src={qrPngBuffer} style={cardStyles.cardQr} />
                      <View style={cardStyles.cardUrlBlock}>
                        <Text style={cardStyles.cardUrl}>
                          prayertrains.com
                        </Text>
                        <Text style={cardStyles.cardProject}>
                          A Lantern Harbor project
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
