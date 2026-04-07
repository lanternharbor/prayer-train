import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  formatSituation,
  formatDate,
  calculateFillRate,
} from "@/lib/utils";
import {
  Search,
  Heart,
  CalendarDays,
  Users,
  Clock,
  ArrowRight,
  HandHeart,
} from "lucide-react";
import { SituationCategory } from "@/generated/prisma/client";
import { RecipientAvatar, PrayingHandsIcon, CrossIcon } from "@/components/ui/catholic-icons";

export const metadata: Metadata = {
  title: "Find a FaithTrain",
  description:
    "Browse active prayer trains and sign up to pray for someone in need. No account required.",
};

const SITUATIONS = Object.values(SituationCategory);

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; situation?: string }>;
}) {
  const { q, situation } = await searchParams;

  const where: Record<string, unknown> = {
    isPublic: true,
    status: "ACTIVE",
  };

  if (situation && SITUATIONS.includes(situation as SituationCategory)) {
    where.situation = situation;
  }

  if (q && q.trim()) {
    where.OR = [
      { recipientName: { contains: q.trim(), mode: "insensitive" } },
      { intention: { contains: q.trim(), mode: "insensitive" } },
    ];
  }

  const trains = await prisma.prayerTrain.findMany({
    where,
    include: {
      slots: { select: { status: true } },
      organizer: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-3 gold-accent">
          Find a FaithTrain
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse active prayer trains and sign up to pray for someone in need.
          No account required &mdash; just your name and a willing heart.
        </p>
      </div>

      {/* Search */}
      <form action="/browse" method="GET" className="mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder="Search by name or intention..."
              className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-card text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>
          {situation && <input type="hidden" name="situation" value={situation} />}
          <button
            type="submit"
            className="px-6 py-3.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-navy-700 transition-colors text-lg"
          >
            Search
          </button>
        </div>
      </form>

      {/* Situation Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href={q ? `/browse?q=${encodeURIComponent(q)}` : "/browse"}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !situation
              ? "bg-navy-600 text-white"
              : "bg-cream-200 text-muted-foreground hover:bg-cream-300"
          }`}
        >
          All
        </Link>
        {SITUATIONS.filter((s) => s !== "OTHER").map((sit) => (
          <Link
            key={sit}
            href={
              q
                ? `/browse?q=${encodeURIComponent(q)}&situation=${sit}`
                : `/browse?situation=${sit}`
            }
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              situation === sit
                ? "bg-navy-600 text-white"
                : "bg-cream-200 text-muted-foreground hover:bg-cream-300"
            }`}
          >
            {formatSituation(sit)}
          </Link>
        ))}
      </div>

      {/* Results */}
      {trains.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trains.map((train) => {
            const total = train.slots.length;
            const claimed = train.slots.filter(
              (s) => s.status === "CLAIMED"
            ).length;
            const completed = train.slots.filter(
              (s) => s.status === "COMPLETED"
            ).length;
            const open = total - claimed - completed;
            const fill = calculateFillRate(total, claimed, completed);

            const daysLeft = Math.max(
              0,
              Math.ceil(
                (new Date(train.endDate).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              )
            );

            return (
              <Link
                key={train.id}
                href={`/p/${train.slug}`}
                className="prayer-card group flex flex-col"
              >
                {/* Situation badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-navy-100 text-navy-700">
                    {formatSituation(train.situation)}
                  </span>
                  {daysLeft <= 7 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-700">
                      {daysLeft} days left
                    </span>
                  )}
                </div>

                {/* Name & Intention */}
                <div className="flex items-center gap-3 mb-2">
                  <RecipientAvatar
                    imageUrl={train.recipientImageUrl}
                    name={train.recipientName}
                    size="sm"
                  />
                  <h2 className="font-heading text-xl font-semibold text-navy-800 group-hover:text-navy-600 transition-colors">
                    Prayers for {train.recipientName}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                  {train.intention}
                </p>

                {/* Progress */}
                <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gold-400 transition-all"
                    style={{ width: `${fill}%` }}
                  />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-gold-400" />
                    {fill}% covered
                  </span>
                  <span className="flex items-center gap-1 font-medium text-green-600">
                    {open} slots open
                  </span>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(train.startDate)} &mdash;{" "}
                    {formatDate(train.endDate)}
                  </span>
                </div>

                {/* CTA hint */}
                <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-gold-600 group-hover:text-gold-700">
                  Sign up to pray
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <PrayingHandsIcon className="w-14 h-14 text-gold-300 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-semibold text-navy-700 mb-3">
            {q || situation
              ? "No prayer trains match your search"
              : "No public prayer trains yet"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {q || situation
              ? "Try a different search or clear your filters."
              : "Be the first to create a prayer train and share it with your community."}
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Start a FaithTrain
          </Link>
        </div>
      )}
    </div>
  );
}
