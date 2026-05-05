/**
 * Spiritual Bouquet — printable PDF.
 *
 * Generated on demand for completed prayer trains. Designed to look like a
 * Catholic prayer card, not a SaaS report: serif type, gold rule, restrained
 * layout, calligraphic title. The eventual letterpress-and-mailed version
 * inherits this design; for now the user prints at home or attaches to email.
 *
 * Vision pillar (4): physical artifact at completion. This is the software
 * MVP.
 *
 * The closing-blessing line is intentionally generic until Fr. Palladino
 * reviews it — see docs/theology-review.md item #9.
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

/**
 * Lazy-load the bouquet emblem from /public/bouquet-emblem.png. Cached
 * after first read so a busy completion run doesn't re-read the file
 * for every PDF rendered. Returns null if the file is missing — the
 * template renders cleanly without the emblem in that case (graceful
 * fallback for dev environments where the asset hasn't been added).
 *
 * The emblem is a hand-illustrated bouquet of white roses and lilies
 * with a gold halo and ribbon — designed to match the prayer-card
 * aesthetic of the bouquet itself. See public/bouquet-emblem.png.
 */
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

export type BouquetData = {
  recipientName: string;
  /**
   * Organizer's display name. Optional — if the User row has no name
   * populated (some auth flows leave it null), pass `null`/`undefined`
   * here and the bouquet omits the "Organized by ..." line entirely
   * rather than rendering the literal placeholder "the organizer".
   */
  organizerName: string | null;
  startDate: Date;
  endDate: Date;
  prayers: Array<{
    name: string;
    timesOffered: number;
    uniquePrayers: number;
  }>;
  prayerWarriors: string[]; // deduped, alphabetized claimer names
  /**
   * Names of additional prayer warriors who pledged via the
   * "Add yourself as a prayer warrior" overflow primitive — they
   * didn't claim a slot, but they prayed alongside. Optional;
   * empty/undefined when no additional warriors exist (e.g., for
   * chain bouquets, which use the chain-member roster instead).
   * Rendered in its own section below the slot-holders.
   */
  additionalWarriors?: string[];
  /**
   * Personal notes left by individual prayer warriors when marking
   * their slot complete. Optional; empty/undefined renders nothing.
   * The bouquet includes EVERY note regardless of the in-product
   * shareWall flag — this is the comprehensive private record the
   * recipient family receives. Each entry attributed by claimer
   * name + the date the slot was completed. Sort order is up to the
   * caller; the route currently passes ascending by completedAt.
   */
  notes?: Array<{ name: string; date: Date; note: string }>;
};

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

const styles = StyleSheet.create({
  page: {
    padding: 56,
    backgroundColor: PALETTE.cream,
    fontFamily: "Times-Roman",
    color: PALETTE.text,
  },
  header: {
    textAlign: "center",
    marginBottom: 28,
  },
  emblem: {
    width: 130,
    height: 130,
    marginHorizontal: "auto",
    marginBottom: 12,
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: PALETTE.gold,
    marginBottom: 12,
  },
  title: {
    fontFamily: "Times-Italic",
    fontSize: 28,
    color: PALETTE.navyDark,
    marginBottom: 4,
  },
  recipientName: {
    fontFamily: "Times-Bold",
    fontSize: 32,
    color: PALETTE.navyDark,
    marginBottom: 12,
  },
  rule: {
    width: 80,
    height: 1.5,
    backgroundColor: PALETTE.gold,
    marginVertical: 14,
    marginHorizontal: "auto",
  },
  organizerLine: {
    fontSize: 11,
    fontFamily: "Times-Italic",
    color: PALETTE.muted,
    marginBottom: 4,
  },
  dateLine: {
    fontSize: 10,
    color: PALETTE.muted,
  },
  section: {
    marginTop: 28,
  },
  sectionLabel: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: PALETTE.gold,
    marginBottom: 10,
  },
  prayerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: PALETTE.border,
  },
  prayerName: {
    fontSize: 11,
    color: PALETTE.text,
    flex: 1,
    paddingRight: 12,
  },
  prayerCount: {
    fontSize: 10,
    color: PALETTE.muted,
    fontFamily: "Times-Italic",
  },
  warriorsParagraph: {
    fontSize: 10,
    color: PALETTE.text,
    lineHeight: 1.6,
  },
  noteRow: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: PALETTE.border,
  },
  noteText: {
    fontFamily: "Times-Italic",
    fontSize: 10.5,
    lineHeight: 1.55,
    color: PALETTE.text,
    marginBottom: 3,
  },
  noteAttribution: {
    fontSize: 9,
    color: PALETTE.muted,
    fontFamily: "Times-Roman",
  },
  total: {
    fontSize: 12,
    fontFamily: "Times-Italic",
    color: PALETTE.navy,
    marginTop: 14,
    textAlign: "center",
  },
  blessing: {
    marginTop: 32,
    paddingTop: 18,
    borderTopWidth: 0.5,
    borderTopColor: PALETTE.border,
    fontSize: 11,
    fontFamily: "Times-Italic",
    color: PALETTE.text,
    textAlign: "center",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 56,
    right: 56,
    textAlign: "center",
    fontSize: 8,
    color: PALETTE.muted,
    letterSpacing: 1,
  },
});

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function totalPrayersOffered(prayers: BouquetData["prayers"]): number {
  return prayers.reduce((sum, p) => sum + p.timesOffered, 0);
}

export function BouquetDocument({ data }: { data: BouquetData }) {
  const total = totalPrayersOffered(data.prayers);
  const warriorCount = data.prayerWarriors.length;
  const emblem = getEmblemBuffer();

  return (
    <Document
      title={`Spiritual Bouquet for ${data.recipientName}`}
      author="PrayerTrain"
      creator="PrayerTrain"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {/* Devotional emblem — hand-illustrated bouquet of roses and
              lilies. Skipped silently if the asset is missing so the
              bouquet still renders in dev environments without the
              file. */}
          {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer's Image is a PDF primitive, not an HTML img; alt isn't a supported prop. */}
          {emblem && <Image src={emblem} style={styles.emblem} />}
          <Text style={styles.eyebrow}>A Spiritual Bouquet</Text>
          <Text style={styles.title}>for</Text>
          <Text style={styles.recipientName}>{data.recipientName}</Text>
          <View style={styles.rule} />
          {data.organizerName && (
            <Text style={styles.organizerLine}>
              Organized by {data.organizerName}
            </Text>
          )}
          <Text style={styles.dateLine}>
            {formatDate(data.startDate)} — {formatDate(data.endDate)}
          </Text>
        </View>

        {/* Prayers offered */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Prayers Offered</Text>
          {data.prayers.map((p) => (
            <View style={styles.prayerRow} key={p.name}>
              <Text style={styles.prayerName}>{p.name}</Text>
              <Text style={styles.prayerCount}>
                {p.timesOffered === 1
                  ? "1 time"
                  : `${p.timesOffered} times`}
                {p.uniquePrayers > 0 &&
                  ` · by ${p.uniquePrayers} ${
                    p.uniquePrayers === 1 ? "person" : "people"
                  }`}
              </Text>
            </View>
          ))}
          <Text style={styles.total}>
            {total} prayer{total === 1 ? "" : "s"} offered in total
          </Text>
        </View>

        {/* Names of those who prayed */}
        {warriorCount > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Lifted Up by</Text>
            <Text style={styles.warriorsParagraph}>
              {data.prayerWarriors.join(" · ")}
            </Text>
          </View>
        )}

        {/* Additional prayer warriors — people who pledged via the
            "no one is turned away" overflow primitive. Rendered as a
            separate section so the bouquet stays accurate about who
            took a slot vs. who simply pledged to pray. */}
        {data.additionalWarriors && data.additionalWarriors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Also Praying Alongside</Text>
            <Text style={styles.warriorsParagraph}>
              {data.additionalWarriors.join(" · ")}
            </Text>
          </View>
        )}

        {/* Personal notes left by individual prayer warriors. The
            bouquet includes EVERY note regardless of the in-product
            shareWall flag — this is the comprehensive private record
            the recipient family receives. Italic Times-Italic at
            slightly smaller size keeps the section reading as
            personal reflection rather than tabular data. */}
        {data.notes && data.notes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Notes from Those Who Prayed</Text>
            {data.notes.map((n, i) => (
              <View
                style={i === data.notes!.length - 1
                  ? { ...styles.noteRow, borderBottomWidth: 0 }
                  : styles.noteRow}
                key={`${n.name}-${n.date.toISOString()}-${i}`}
              >
                <Text style={styles.noteText}>&ldquo;{n.note}&rdquo;</Text>
                <Text style={styles.noteAttribution}>
                  — {n.name},{" "}
                  {n.date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Closing blessing — generic until theology-reviewed */}
        <Text style={styles.blessing}>
          May the prayers of this community walk with {data.recipientName}{" "}
          and with all who carried them. May the Lord bless and keep them.
        </Text>

        {/* Footer */}
        <Text style={styles.footer}>
          PrayerTrain · A Lantern Harbor project · prayertrains.com
        </Text>
      </Page>
    </Document>
  );
}
