import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BouquetDocument, type BouquetData } from "@/lib/bouquet-pdf";

/**
 * GET /api/bouquet/[slug]
 *
 * Returns a printable Spiritual Bouquet PDF for a completed prayer train.
 * Auth pattern matches /p/[slug]/manage (organizer-only). The train must
 * be in COMPLETED status — otherwise we 403 with a small JSON message.
 *
 * Precedent: /api/qr/[slug]/route.ts (SVG response) and
 * /api/ics/[slotId]/route.ts (text/calendar response). This is the
 * application/pdf sibling.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Sign in to download a spiritual bouquet." },
      { status: 401 },
    );
  }

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true, email: true } },
      slots: {
        include: {
          prayerType: { select: { name: true } },
        },
      },
    },
  });

  if (!train) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Organizer-only — same gate as /p/[slug]/manage.
  if (train.organizerId !== session.user.id) {
    return NextResponse.json(
      { error: "Only the train organizer can download the bouquet." },
      { status: 403 },
    );
  }

  if (train.status !== "COMPLETED") {
    return NextResponse.json(
      {
        error:
          "The spiritual bouquet is available once the prayer train is marked complete.",
      },
      { status: 403 },
    );
  }

  // Build BouquetData from completed slots only. A "completed" slot is one
  // a volunteer actually prayed (not just claimed and abandoned).
  const completedSlots = train.slots.filter((s) => s.status === "COMPLETED");

  // Prayers offered, grouped by prayer-type name.
  const byPrayer = new Map<
    string,
    { name: string; timesOffered: number; uniquePrayerEmails: Set<string> }
  >();
  for (const slot of completedSlots) {
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

  // Deduped, alphabetized list of names. Match by email so the same person
  // claiming multiple slots doesn't appear twice. Fall back to claimerName
  // when email is missing (rare).
  const seenEmails = new Set<string>();
  const warriors: string[] = [];
  for (const slot of completedSlots) {
    const key = (slot.claimerEmail ?? slot.claimerName ?? "").toLowerCase();
    if (!key || seenEmails.has(key)) continue;
    seenEmails.add(key);
    if (slot.claimerName) warriors.push(slot.claimerName);
  }
  warriors.sort((a, b) => a.localeCompare(b));

  const data: BouquetData = {
    recipientName: train.recipientName,
    organizerName: train.organizer?.name ?? "the organizer",
    startDate: train.startDate,
    endDate: train.endDate,
    prayers,
    prayerWarriors: warriors,
  };

  const pdfBuffer = await renderToBuffer(
    <BouquetDocument data={data} />,
  );

  // Build a friendly filename: "spiritual-bouquet-john-smith.pdf"
  const filenameSlug = train.recipientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="spiritual-bouquet-${filenameSlug}.pdf"`,
      "Cache-Control": "private, max-age=300",
    },
  });
}
