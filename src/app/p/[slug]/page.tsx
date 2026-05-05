import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { getBaseUrl } from "@/lib/url";
import {
  organizerDisplayName,
  organizerFirstName,
} from "@/lib/organizer-display";
import {
  formatSituation,
  formatDate,
  calculateFillRate,
} from "@/lib/utils";
import {
  CalendarDays,
  Users,
  Settings,
  Church,
  MapPin,
  HandHeart,
} from "lucide-react";
import Link from "next/link";
import { PrayerCalendar } from "./prayer-calendar";
import { Guestbook } from "./guestbook";
import { UpdatesFeed } from "./updates-feed";
import { ShareButton } from "./share-button";
import { AddWarriorButton } from "./add-warrior-button";
import { ExpandableText } from "./expandable-text";
import { InPageNav } from "./in-page-nav";
import { JumpToGuestbook } from "./jump-to-guestbook";
import { shouldShowNoteOnWall } from "@/lib/notes";
import type { WallEntry } from "./guestbook";
import { CrossIcon, CrossDivider, RecipientAvatar } from "@/components/ui/catholic-icons";

/**
 * Build the unified encouragement-wall feed by merging two sources:
 *  - GuestbookEntry rows (the explicit wall posts)
 *  - PrayerSlot completion notes where the claimer opted in via the
 *    shareWall checkbox (see src/lib/notes.ts for the predicate)
 *
 * Both sources share the same shape so the Guestbook component
 * renders them with identical chrome plus an optional source badge.
 * Sorted descending by createdAt; capped at 30 to balance the two
 * sources without runaway growth.
 */
function buildWallEntries(
  guestbook: Array<{
    id: string;
    createdAt: Date;
    authorName: string;
    message: string;
  }>,
  slots: Array<{
    id: string;
    completionNote: string | null;
    completionNoteShareWall: boolean;
    completedAt: Date | null;
    claimerName: string | null;
  }>,
): WallEntry[] {
  const fromGuestbook: WallEntry[] = guestbook.map((e) => ({
    id: `guestbook-${e.id}`,
    createdAt: e.createdAt,
    authorName: e.authorName,
    message: e.message,
    source: "guestbook" as const,
  }));
  const fromSlots: WallEntry[] = slots
    .filter((s) =>
      shouldShowNoteOnWall({
        completionNote: s.completionNote,
        completionNoteShareWall: s.completionNoteShareWall,
      }),
    )
    .filter((s) => s.completedAt && s.claimerName && s.completionNote)
    .map((s) => ({
      id: `slot-${s.id}`,
      createdAt: s.completedAt!,
      authorName: s.claimerName!,
      message: s.completionNote!,
      source: "prayer-note" as const,
    }));
  return [...fromGuestbook, ...fromSlots]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 30);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    select: {
      slug: true,
      recipientName: true,
      recipientImageUrl: true,
      intention: true,
      isPublic: true,
    },
  });

  if (!train) return { title: "Not Found" };

  const title = `Prayers for ${train.recipientName}`;
  const description = train.intention.slice(0, 200);
  const url = `${getBaseUrl()}/p/${train.slug}`;
  // Prefer the recipient photo for share previews; fall back to the
  // PrayerTrain logo so unfurls always have something to render.
  const ogImage = train.recipientImageUrl || `${getBaseUrl()}/logo.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    // Don't index private trains. Search engines and most social previews
    // will respect this.
    robots: train.isPublic
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "PrayerTrain",
      images: [{ url: ogImage, width: 1024, height: 1024, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PrayerTrainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true, email: true } },
      slots: {
        include: { prayerType: true },
        orderBy: [{ date: "asc" }, { slotIndex: "asc" }],
      },
      guestbook: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      updates: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
      },
      // PrayerWarrior pledges — additional people praying for this
      // recipient who didn't claim a calendar slot. Surfaced as a
      // primary CTA when slots are full and as an "also praying
      // alongside" roster whenever any pledges exist.
      warriors: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          message: true,
          createdAt: true,
        },
      },
    },
  });

  if (!train) notFound();

  const totalSlots = train.slots.length;
  const claimedSlots = train.slots.filter((s) => s.status === "CLAIMED").length;
  const completedSlots = train.slots.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const openSlots = train.slots.filter((s) => s.status === "OPEN").length;
  const fillRate = calculateFillRate(totalSlots, claimedSlots, completedSlots);

  const isOrganizer = session?.user?.id === train.organizerId;

  // Coverage state: when every slot is claimed AND the train is still
  // accepting prayer (status === ACTIVE), surface the "Add yourself as
  // a prayer warrior" CTA. The slot-based train remains the organizing
  // mechanism, but no one is ever turned away from praying.
  const isFullyCovered = openSlots === 0 && totalSlots > 0;
  const showWarriorCTA = isFullyCovered && train.status === "ACTIVE";

  // Group slots by date
  const slotsByDate = train.slots.reduce(
    (acc, slot) => {
      const dateKey = slot.date.toISOString().split("T")[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(slot);
      return acc;
    },
    {} as Record<string, typeof train.slots>
  );

  // Unique prayer warriors
  const warriors = new Set<string>();
  train.slots.forEach((slot) => {
    if (slot.claimerName) warriors.add(slot.claimerName);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        {/* Mobile: avatar stacks above content so the title, intention,
            and metadata strip use the full screen width (no squeeze
            into a 3/4-width right column). Desktop (sm+): avatar sits
            to the left of the content as before. */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-4">
          <RecipientAvatar
            imageUrl={train.recipientImageUrl}
            name={train.recipientName}
            size="lg"
          />
          <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-700">
            {formatSituation(train.situation)}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              train.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : train.status === "PAUSED"
                ? "bg-yellow-100 text-yellow-700"
                : train.status === "CANCELLED"
                ? "bg-cream-200 text-muted-foreground"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {train.status === "CANCELLED" ? "Cancelled" : train.status}
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-2">
          Prayers for {train.recipientName}
        </h1>
        <ExpandableText
          text={train.intention}
          className="text-lg text-muted-foreground leading-relaxed mb-4"
        />
        {train.situationDetail && (
          <ExpandableText
            text={train.situationDetail}
            className="text-sm text-muted-foreground bg-cream-50 rounded-lg p-3 border border-cream-300"
          />
        )}
        {/* Cancelled-state explanatory note. The badge already signals
            the state visually; this gives a one-sentence pastoral
            framing so anyone arriving from a shared link understands
            why the calendar is no longer accepting sign-ups. Soft
            cream styling, not error-red, since cancellation is the
            organizer's choice rather than a failure. */}
        {train.status === "CANCELLED" && (
          <p className="mt-4 text-sm text-muted-foreground bg-cream-50 rounded-lg p-3 border border-cream-300">
            This prayer train has been cancelled by the organizer. The
            prayer history below is preserved as a record of what was
            offered before it ended.
          </p>
        )}

        {/* Metadata strip — flex-col on mobile so each item gets its
            own row (avoids ragged-wrap of the parish + location + date
            chips). At sm+ we keep the original wrapping inline row. */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 mt-4">
          <span className="text-sm text-muted-foreground">
            Organized by{" "}
            <span className="font-medium text-navy-700">
              {organizerDisplayName(train)}
            </span>
          </span>
          {train.parish && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Church className="w-3.5 h-3.5 text-gold-500" />
              {train.parish}
            </span>
          )}
          {train.location && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              {train.location}
            </span>
          )}
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            {formatDate(train.startDate)} &mdash; {formatDate(train.endDate)}
          </span>
          {isOrganizer && (
            <Link
              href={`/p/${slug}/manage`}
              className="inline-flex items-center gap-1.5 text-sm text-gold-600 hover:text-gold-700 font-medium"
            >
              <Settings className="w-3.5 h-3.5" />
              Manage
            </Link>
          )}
        </div>
          </div>{/* close flex-1 */}
        </div>{/* close flex avatar row */}
      </div>

      {/* In-page navigation — sticky chip strip below the global site
          header. Anchors to Calendar / Prayer warriors / Updates /
          Encouragement. Conditional sections (warriors, updates) only
          surface a chip when the underlying section actually exists.
          Most useful on long-running trains where the calendar buries
          the secondary content. */}
      <InPageNav
        showWarriors={train.warriors.length > 0}
        showUpdates={train.updates.length > 0}
      />

      {/* Custom prayer card — when the organizer has provided a personal
          prayer (a family tradition, a prayer from a friend, or words of
          their own). Sits in its own card so it stays visually distinct
          from the situation detail and the prayer-type texts in the
          calendar below. */}
      {train.customPrayerText && (
        <div className="prayer-card mb-8 bg-cream-50 border-cream-300">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-3 flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-gold-500" />
            A prayer from {organizerFirstName(train)}
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Pray this alongside the prayers below.
          </p>
          <div className="bg-white border border-cream-300 rounded-lg p-5">
            <ExpandableText
              text={train.customPrayerText}
              className="font-heading text-base sm:text-lg leading-relaxed text-navy-700 italic"
            />
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="prayer-card mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-heading text-lg font-semibold text-navy-800">
            Prayer Coverage
          </h2>
          <span className="text-sm font-medium text-gold-600">
            {fillRate}% covered
          </span>
        </div>
        <div className="w-full h-3 bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${fillRate}%`,
              background:
                "linear-gradient(90deg, var(--gold-400), var(--gold-300))",
            }}
          />
        </div>
        {/* Stats row — wraps naturally onto multiple lines on narrow
            screens. Removed `ml-auto` from the warrior count because
            that combined with the wrap pushed the count past the
            card's right padding on mobile. Now everything flows in a
            single wrapping flex strip with a 2x2-ish layout. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slot-open-border" />
            {totalSlots - claimedSlots - completedSlots} open
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slot-claimed-border" />
            {claimedSlots} claimed
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slot-completed-border" />
            {completedSlots} completed
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {warriors.size} prayer warriors
          </span>
        </div>
      </div>

      {/* Share */}
      <ShareButton slug={slug} recipientName={train.recipientName} />

      {/* Pray-anyway CTA — surfaced only when every calendar slot is
          claimed and the train is still accepting prayer. The train
          stays the organizing mechanism; this affordance honors the
          spiritual truth that no one is ever turned away from praying. */}
      {showWarriorCTA && (
        <div className="prayer-card mt-6 mb-2 bg-gold-50 border-gold-300 text-center">
          <HandHeart className="w-8 h-8 text-gold-600 mx-auto mb-2" />
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-1">
            Every slot is filled — and you can still join.
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            The calendar is fully covered, but {train.recipientName} can never
            have too many people praying. Add yourself as a prayer warrior —
            pledge to pray, no specific slot.
          </p>
          <AddWarriorButton
            trainId={train.id}
            recipientName={train.recipientName}
          />
        </div>
      )}

      <CrossDivider />

      {/* Calendar */}
      <div id="calendar" className="mb-10 scroll-mt-32">
        <h2 className="font-heading text-2xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <CrossIcon className="w-5 h-5 text-gold-400" />
          Prayer Calendar
        </h2>
        <PrayerCalendar
          slotsByDate={slotsByDate}
          trainStatus={train.status}
          currentUserId={session?.user?.id ?? null}
        />
      </div>

      {/* Prayer-warrior roster — shown whenever any pledges exist,
          regardless of coverage state. Once a warrior pledges, their
          name belongs on the page from then on. */}
      {train.warriors.length > 0 && (
        <div id="prayer-warriors" className="mb-10 scroll-mt-32">
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-gold-500" />
            Also praying alongside ({train.warriors.length})
          </h2>
          <div className="prayer-card">
            <div className="flex flex-wrap gap-2">
              {train.warriors.map((w) => (
                <span
                  key={w.id}
                  title={w.message ?? undefined}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 text-navy-700 text-sm border border-cream-300"
                >
                  {w.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Two-column: Updates + Guestbook. Each gets an anchor wrapper
          so InPageNav can scroll to either independently. scroll-mt-32
          gives clearance below the sticky site header + in-page nav
          strip when an anchor lands. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div id="updates" className="scroll-mt-32">
          <UpdatesFeed updates={train.updates} />
        </div>
        <div id="guestbook" className="scroll-mt-32">
          <Guestbook
            entries={buildWallEntries(train.guestbook, train.slots)}
            trainId={train.id}
          />
        </div>
      </div>

      {/* Floating skip-to-encouragement button. Renders fixed at the
          bottom-right when the viewer has scrolled past the calendar
          and the guestbook isn't already in view. Self-managing —
          observes #calendar and #guestbook to decide visibility. */}
      <JumpToGuestbook />
    </div>
  );
}
