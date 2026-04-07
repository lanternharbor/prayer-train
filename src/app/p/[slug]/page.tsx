import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  formatSituation,
  formatDate,
  formatDateLong,
  calculateFillRate,
} from "@/lib/utils";
import {
  Heart,
  CalendarDays,
  Users,
  Share2,
  Clock,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { PrayerCalendar } from "./prayer-calendar";
import { ClaimModal } from "./claim-modal";
import { Guestbook } from "./guestbook";
import { UpdatesFeed } from "./updates-feed";
import { ShareButton } from "./share-button";
import { CrossIcon, CrossDivider, RecipientAvatar, CandleIcon } from "@/components/ui/catholic-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const train = await prisma.prayerTrain.findUnique({ where: { slug } });
  if (!train) return { title: "Not Found" };
  return {
    title: `Prayers for ${train.recipientName}`,
    description: train.intention,
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
    },
  });

  if (!train) notFound();

  const totalSlots = train.slots.length;
  const claimedSlots = train.slots.filter((s) => s.status === "CLAIMED").length;
  const completedSlots = train.slots.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const fillRate = calculateFillRate(totalSlots, claimedSlots, completedSlots);

  const isOrganizer = session?.user?.id === train.organizerId;

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
        <div className="flex items-start gap-5 mb-4">
          <RecipientAvatar
            imageUrl={train.recipientImageUrl}
            name={train.recipientName}
            size="lg"
          />
          <div className="flex-1">
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
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {train.status}
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-2">
          Prayers for {train.recipientName}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          {train.intention}
        </p>
        {train.situationDetail && (
          <p className="text-sm text-muted-foreground bg-cream-50 rounded-lg p-3 border border-cream-300">
            {train.situationDetail}
          </p>
        )}

        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <span className="text-sm text-muted-foreground">
            Organized by{" "}
            <span className="font-medium text-navy-700">
              {train.organizer.name || "Anonymous"}
            </span>
          </span>
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
        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
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
          <span className="flex items-center gap-1.5 ml-auto">
            <Users className="w-3.5 h-3.5" />
            {warriors.size} prayer warriors
          </span>
        </div>
      </div>

      {/* Share */}
      <ShareButton slug={slug} recipientName={train.recipientName} />

      <CrossDivider />

      {/* Calendar */}
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <CrossIcon className="w-5 h-5 text-gold-400" />
          Prayer Calendar
        </h2>
        <PrayerCalendar slotsByDate={slotsByDate} trainStatus={train.status} />
      </div>

      {/* Two-column: Updates + Guestbook */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpdatesFeed updates={train.updates} />
        <Guestbook
          entries={train.guestbook}
          trainId={train.id}
        />
      </div>
    </div>
  );
}
