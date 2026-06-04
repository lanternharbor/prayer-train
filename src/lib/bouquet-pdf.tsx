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
  Font,
} from "@react-pdf/renderer";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Embed EB Garamond (OFL) so the bouquet can render the whole Latin
 * alphabet, not just WinAnsi/CP1252.
 *
 * The 14 built-in PDF fonts (Times-Roman et al.) are CP1252-encoded and
 * cover ~256 Latin characters — fine for English/Spanish/Portuguese
 * accents (é, ñ, ç, ã …) but NOT Latin Extended-A. PrayerTrain ships
 * Polish (pl) as a live locale, and recipient names, claimer names, and
 * guestbook / completion notes flow into the bouquet verbatim. Under
 * Times, a recipient named "Łukasz" or a Polish note rendered as
 * mojibake on the family's keepsake — ł ę ą ś ć ż ź ń all live outside
 * CP1252. (Emoji are a separate problem, handled upstream by
 * sanitizeBouquetText; EB Garamond has no emoji glyphs either, so we
 * keep stripping them.)
 *
 * EB Garamond is the brand serif (see the holy-card visual identity), so
 * the swap fixes the glyphs AND tightens the typography. We embed four
 * STATIC instances keyed by fontWeight/fontStyle — variable fonts don't
 * let react-pdf resolve a discrete weight/style, and each static face
 * carries the full glyph set (latin + latin-ext) in one file.
 *
 * The .ttf files live in /public/fonts (same readable-at-runtime root as
 * the emblem) and are force-included in the serverless trace via
 * next.config's outputFileTracingIncludes. react-pdf reads each face
 * lazily with fontkit.open(path) at render time, so the file must exist
 * in the deployed lambda — registering here (module load) only records
 * the path; nothing is read until renderToBuffer runs.
 */
const FONT_DIR = join(process.cwd(), "public", "fonts");
Font.register({
  family: "EB Garamond",
  fonts: [
    {
      src: join(FONT_DIR, "EBGaramond-Regular.ttf"),
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: join(FONT_DIR, "EBGaramond-Bold.ttf"),
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: join(FONT_DIR, "EBGaramond-Italic.ttf"),
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: join(FONT_DIR, "EBGaramond-BoldItalic.ttf"),
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

/**
 * Lazy-load the bouquet emblem from /public/bouquet-emblem.png. Cached
 * after first read so a busy completion run doesn't re-read the file
 * for every PDF rendered. Returns null if the file is missing — the
 * template renders cleanly without the emblem in that case (graceful
 * fallback for dev environments where the asset hasn't been added).
 *
 * The emblem is a hand-illustrated wooden cross set above a bouquet
 * of white roses and lilies bound with a gold ribbon, backed by a
 * radiant halo. Designed to match the navy + antique gold + parchment
 * holy-card aesthetic of the rest of the bouquet PDF. See
 * public/bouquet-emblem.png.
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
  /**
   * Free-form encouragement-wall posts (guestbook entries) left for
   * the recipient and family. Unlike `notes`, these aren't tied to a
   * prayer slot — they're general messages of support. Optional;
   * empty/undefined renders nothing. The caller filters out
   * organizer-hidden posts and passes the rest; rendered in their own
   * "With Love and Encouragement" section, attributed by author name +
   * the date the post was left.
   */
  messages?: Array<{ name: string; date: Date; message: string }>;
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
    fontFamily: "EB Garamond",
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
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontSize: 28,
    color: PALETTE.navyDark,
    marginBottom: 4,
  },
  recipientName: {
    fontFamily: "EB Garamond",
    fontWeight: "bold",
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
    fontFamily: "EB Garamond",
    fontStyle: "italic",
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
    fontFamily: "EB Garamond",
    fontStyle: "italic",
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
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontSize: 10.5,
    lineHeight: 1.55,
    color: PALETTE.text,
    marginBottom: 3,
  },
  noteAttribution: {
    fontSize: 9,
    color: PALETTE.muted,
    fontFamily: "EB Garamond",
  },
  total: {
    fontSize: 12,
    fontFamily: "EB Garamond",
    fontStyle: "italic",
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
    fontFamily: "EB Garamond",
    fontStyle: "italic",
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
            the recipient family receives. Italic EB Garamond at
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

        {/* Encouragement-wall posts. Same italic-quote treatment as the
            prayer notes above, but a distinct section so attribution
            stays honest: these are general messages of support, not tied
            to a claimed prayer slot. Hidden posts are filtered upstream
            by the route via isGuestbookEntryIncludedInBouquet. */}
        {data.messages && data.messages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>With Love and Encouragement</Text>
            {data.messages.map((m, i) => (
              <View
                style={i === data.messages!.length - 1
                  ? { ...styles.noteRow, borderBottomWidth: 0 }
                  : styles.noteRow}
                key={`${m.name}-${m.date.toISOString()}-${i}`}
              >
                <Text style={styles.noteText}>&ldquo;{m.message}&rdquo;</Text>
                <Text style={styles.noteAttribution}>
                  — {m.name},{" "}
                  {m.date.toLocaleDateString("en-US", {
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
