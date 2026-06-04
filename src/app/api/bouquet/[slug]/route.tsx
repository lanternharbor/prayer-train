import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BouquetDocument, type BouquetData } from "@/lib/bouquet-pdf";
import { isGuestbookEntryIncludedInBouquet } from "@/lib/notes";
import { sanitizeBouquetText } from "@/lib/pdf-text";

/**
 * GET /api/bouquet/[slug]
 *
 * Returns a printable Spiritual Bouquet PDF for a completed prayer train.
 *
 * Access model:
 *   - Standard download (no `?preview=1`): NO auth required. The PDF
 *     exposes nothing that isn't already on the public /p/[slug] page
 *     (recipient name, organizer name, date range, prayer types,
 *     claimer + warrior names). The bouquet URL is sent to warriors
 *     in their closing email (sendPrayerWarriorClosing) and to the
 *     organizer via the bouquet-ready email shipped in PR #40 —
 *     requiring sign-in to view it broke those emails for every
 *     recipient who wasn't the signed-in organizer. Status ===
 *     COMPLETED is the only gate.
 *   - Preview (`?preview=1`): organizer-only, signed-in. Preview lets
 *     the organizer see the current artifact BEFORE COMPLETED so
 *     they can verify what'll go to the family. Auth stays for this
 *     branch because preview bypasses the COMPLETED gate, and we
 *     don't want a logged-out third party generating preview PDFs of
 *     in-flight trains.
 *
 * Precedent: /api/qr/[slug]/route.ts (SVG response) and
 * /api/ics/[slotId]/route.ts (text/calendar response). This is the
 * application/pdf sibling.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const isPreview = new URL(req.url).searchParams.get("preview") === "1";

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true, email: true } },
      slots: {
        include: {
          prayerType: { select: { name: true } },
        },
      },
      // PrayerWarrior pledges — additional people who prayed for this
      // recipient without claiming a calendar slot. Rendered as a
      // separate "Also Praying Alongside" section in the bouquet PDF
      // so attribution stays accurate.
      warriors: {
        select: { name: true, email: true },
      },
      // Encouragement-wall posts (GuestbookEntry) — free-form messages
      // of support, not tied to any prayer slot. Surfaced in the
      // bouquet's "With Love and Encouragement" section. Ordered
      // oldest-first to read chronologically alongside the notes
      // section; organizer-hidden posts are filtered out below.
      guestbook: {
        select: {
          authorName: true,
          message: true,
          createdAt: true,
          hiddenAt: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!train) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const reqUrl = new URL(req.url);

  // Preview is organizer-only and requires sign-in (it bypasses the
  // COMPLETED gate, so we don't want it to leak to anyone with the URL).
  if (isPreview) {
    const session = await auth();
    if (!session?.user?.id) {
      // Redirect to /signin with callbackUrl so the user lands back
      // here after auth. Mirrors the chain-bouquet fix from May 20 —
      // raw JSON 401 dead-ended a real organizer on DDG iOS.
      const signinUrl = new URL("/signin", reqUrl.origin);
      signinUrl.searchParams.set("callbackUrl", reqUrl.pathname + reqUrl.search);
      return NextResponse.redirect(signinUrl, 302);
    }
    if (train.organizerId !== session.user.id) {
      // Signed in but not the organizer. Send to the public train page.
      return NextResponse.redirect(new URL(`/p/${slug}`, reqUrl.origin), 302);
    }
  } else if (train.status !== "COMPLETED") {
    // Standard (non-preview) download requires the train to be marked
    // complete. Anyone with the slug can download once it is — no
    // sign-in needed. Redirect to the public train page so the visitor
    // sees the current status rather than a raw 403.
    return NextResponse.redirect(new URL(`/p/${slug}`, reqUrl.origin), 302);
  }

  // Build BouquetData from any slot a volunteer signed up for. Under
  // the presumed-prayed model (see /our-story copy + the May 2026
  // "Greens debate"), CLAIMED counts as filled on the bouquet just
  // like COMPLETED — the only difference is that COMPLETED slots have
  // an explicit "I prayed" confirmation tap behind them. We honor
  // everyone who signed up, not just the ones who tapped the email
  // link, since a faithful prayer warrior who prays from a wall planner
  // without ever opening the email is no less of a prayer warrior.
  // Notes still gate on COMPLETED below — notes only exist on COMPLETED
  // by schema (writing a note via submitSlotNoteByToken flips status).
  const prayedSlots = train.slots.filter(
    (s) => s.status === "CLAIMED" || s.status === "COMPLETED",
  );
  const completedSlots = train.slots.filter((s) => s.status === "COMPLETED");

  // Prayers offered, grouped by prayer-type name.
  const byPrayer = new Map<
    string,
    { name: string; timesOffered: number; uniquePrayerEmails: Set<string> }
  >();
  for (const slot of prayedSlots) {
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
      name: sanitizeBouquetText(p.name),
      timesOffered: p.timesOffered,
      uniquePrayers: p.uniquePrayerEmails.size,
    }))
    .sort((a, b) => b.timesOffered - a.timesOffered);

  // Deduped, alphabetized list of names. Match by email so the same person
  // claiming multiple slots doesn't appear twice. Fall back to claimerName
  // when email is missing (rare).
  const seenEmails = new Set<string>();
  const warriors: string[] = [];
  for (const slot of prayedSlots) {
    const key = (slot.claimerEmail ?? slot.claimerName ?? "").toLowerCase();
    if (!key || seenEmails.has(key)) continue;
    seenEmails.add(key);
    if (slot.claimerName) {
      const name = sanitizeBouquetText(slot.claimerName);
      if (name) warriors.push(name);
    }
  }
  warriors.sort((a, b) => a.localeCompare(b));

  // Build the additional-warriors list from PrayerWarrior pledges.
  // Dedupe on email vs. the slot-holder list so a person who claimed a
  // slot AND added themselves as a warrior is only attributed once
  // (under the slot-holder section, which represents the heavier
  // commitment). Sort alphabetically for the bouquet's calm aesthetic.
  const slotHolderEmails = new Set(
    prayedSlots
      .map((s) => s.claimerEmail?.toLowerCase())
      .filter((e): e is string => Boolean(e)),
  );
  const additionalWarriorEmails = new Set<string>();
  const additionalWarriors: string[] = [];
  for (const w of train.warriors) {
    const emailKey = w.email.toLowerCase();
    if (slotHolderEmails.has(emailKey)) continue;
    if (additionalWarriorEmails.has(emailKey)) continue;
    additionalWarriorEmails.add(emailKey);
    const name = sanitizeBouquetText(w.name);
    if (name) additionalWarriors.push(name);
  }
  additionalWarriors.sort((a, b) => a.localeCompare(b));

  // Personal notes left when claimers marked their slot complete.
  // The bouquet is the comprehensive record for the family, so we
  // include EVERY note regardless of the in-product shareWall flag —
  // EXCEPT entries the organizer soft-hid via wall moderation.
  // `completionNoteHiddenAt != null` flags content the organizer
  // chose to suppress; that shouldn't appear on the family's
  // memorial keepsake either. Hard-deleted notes are already gone
  // (completionNote = null) and drop out via the existing filter.
  const notes = completedSlots
    .filter(
      (s) =>
        s.completionNote &&
        s.claimerName &&
        s.completedAt &&
        !s.completionNoteHiddenAt,
    )
    .map((s) => ({
      name: sanitizeBouquetText(s.claimerName!),
      date: s.completedAt!,
      // Strip emoji the standard PDF font can't render. The length
      // filter below then drops any note that was emoji-only.
      note: sanitizeBouquetText(s.completionNote!),
    }))
    .filter((n) => n.note.length > 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Encouragement-wall posts for the family's keepsake. Same
  // comprehensive-record rule as notes (include everything EXCEPT what
  // the organizer soft-hid), enforced by the shared predicate so the
  // moderation guarantee is unit-tested. Already ordered oldest-first
  // by the query.
  const messages = train.guestbook
    .filter(isGuestbookEntryIncludedInBouquet)
    .map((g) => ({
      name: sanitizeBouquetText(g.authorName),
      // Strip emoji the standard PDF font can't render; the length
      // filter below drops posts that were emoji-only.
      message: sanitizeBouquetText(g.message),
      date: g.createdAt,
    }))
    .filter((m) => m.message.length > 0);

  const data: BouquetData = {
    recipientName: sanitizeBouquetText(train.recipientName),
    // Pass null (not "the organizer") when the User row has no name OR
    // when the organizer chose anonymity for this train — the
    // BouquetDocument omits the line entirely rather than printing
    // a placeholder. Prevents the bouquet header from reading
    // "Organized by the organizer" / "Organized by Anonymous" — both
    // of which look off on a personalized memorial PDF.
    organizerName: train.organizerAnonymous
      ? null
      : (sanitizeBouquetText(train.organizer?.name ?? "") || null),
    startDate: train.startDate,
    endDate: train.endDate,
    prayers,
    prayerWarriors: warriors,
    additionalWarriors,
    notes,
    messages,
  };

  const pdfBuffer = await renderToBuffer(
    <BouquetDocument data={data} />,
  );

  // Build a friendly filename: "spiritual-bouquet-john-smith.pdf"
  const filenameSlug = train.recipientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Inline disposition for previews so the organizer can view the PDF
  // in the browser instead of triggering a download. Final (COMPLETED)
  // download keeps attachment semantics. Cache shorter for previews
  // since the underlying data changes as more slots get claimed and
  // completed.
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
