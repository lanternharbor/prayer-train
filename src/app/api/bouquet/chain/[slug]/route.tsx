import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BouquetDocument, type BouquetData } from "@/lib/bouquet-pdf";

/**
 * GET /api/bouquet/chain/[slug]
 *
 * Sibling endpoint to /api/bouquet/[slug] (the train version). Generates a
 * Spiritual Bouquet PDF for a completed PrayerChain. Reuses the same
 * BouquetDocument component — chain data is reshaped into the same
 * BouquetData type so both primitives produce visually-identical artifacts.
 *
 * Access model:
 *   - Standard download (no `?preview=1`): NO auth required. The PDF
 *     exposes nothing that isn't already on the public /chain/[slug]
 *     page (recipient name, organizer name, date range, prayer types,
 *     and the member roster). Members of the chain receive the bouquet
 *     URL directly via email after close (PR #40 organizer email,
 *     PR #42 member email); requiring sign-in to view it broke those
 *     emails for every recipient who wasn't the signed-in organizer.
 *     Status === COMPLETED is the only gate.
 *   - Preview (`?preview=1`): organizer-only, signed-in. Preview lets
 *     the organizer see the current artifact BEFORE COMPLETED so they
 *     can verify what'll go to the family. The auth check stays for
 *     this branch because preview bypasses the COMPLETED gate, and we
 *     don't want a logged-out third party generating preview PDFs of
 *     in-flight chains.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const isPreview = new URL(req.url).searchParams.get("preview") === "1";

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true } },
      prayerType: { select: { name: true } },
      members: {
        orderBy: { name: "asc" },
        select: { name: true, lastDayCompleted: true, email: true },
      },
    },
  });

  if (!chain) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Preview is organizer-only and requires sign-in (it bypasses the
  // COMPLETED gate, so we don't want it to leak to anyone with the URL).
  if (isPreview) {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Sign in to preview a spiritual bouquet." },
        { status: 401 },
      );
    }
    if (chain.organizerId !== session.user.id) {
      return NextResponse.json(
        { error: "Only the organizer can preview the bouquet." },
        { status: 403 },
      );
    }
  } else if (chain.status !== "COMPLETED") {
    // Standard (non-preview) download requires the prayer to be closed.
    // Anyone with the slug can download once it is — no sign-in needed.
    return NextResponse.json(
      {
        error: "The spiritual bouquet is available once the prayer is closed.",
      },
      { status: 403 },
    );
  }

  // For chains, every member prays the same prayer every day. Each member
  // who marked at least one day complete contributed at least one prayer;
  // if they never marked anything, we conservatively count their member-
  // ship as 1 day of prayer (joining is itself a commitment to pray). The
  // organizer can read this however they want — the artifact's purpose is
  // gratitude, not bookkeeping.
  const totalPrayers = chain.members.reduce((sum, m) => {
    return sum + Math.max(1, m.lastDayCompleted ?? 1);
  }, 0);

  const data: BouquetData = {
    recipientName: chain.recipientName ?? chain.intention,
    // Pass null (not "the organizer") when the User row has no name
    // OR when the organizer chose anonymity. BouquetDocument omits
    // the line entirely rather than rendering a placeholder.
    organizerName: chain.organizerAnonymous
      ? null
      : (chain.organizer?.name ?? null),
    startDate: chain.startDate,
    endDate: chain.endDate,
    prayers: [
      {
        name: chain.prayerType.name,
        timesOffered: totalPrayers,
        uniquePrayers: chain.members.length,
      },
    ],
    prayerWarriors: Array.from(
      new Set(chain.members.map((m) => m.name)),
    ).sort((a, b) => a.localeCompare(b)),
  };

  const pdfBuffer = await renderToBuffer(<BouquetDocument data={data} />);

  const filenameSlug = (chain.recipientName ?? chain.slug)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Inline disposition for previews so the organizer can view the PDF
  // in the browser instead of downloading. Final (COMPLETED) download
  // keeps attachment semantics. Cache shorter for previews since the
  // underlying data changes as more members join and complete days.
  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${
        isPreview ? "inline" : "attachment"
      }; filename="spiritual-bouquet-${filenameSlug}${
        isPreview ? "-preview" : ""
      }.pdf"`,
      "Cache-Control": isPreview
        ? "private, no-store"
        : "private, max-age=300",
    },
  });
}
