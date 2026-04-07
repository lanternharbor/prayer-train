import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDate, formatSituation, calculateFillRate } from "@/lib/utils";
import {
  Heart,
  Plus,
  CalendarDays,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { MarkCompleteButton } from "./mark-complete-button";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const userId = session.user.id;

  // Get trains I organized
  const organizedTrains = await prisma.prayerTrain.findMany({
    where: { organizerId: userId },
    include: {
      slots: { select: { status: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Get my claimed/active slots
  const mySlots = await prisma.prayerSlot.findMany({
    where: {
      claimedById: userId,
      status: { in: ["CLAIMED", "COMPLETED"] },
    },
    include: {
      train: { select: { slug: true, recipientName: true } },
      prayerType: { select: { name: true, duration: true } },
    },
    orderBy: { date: "asc" },
  });

  // Today's commitments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todaySlots = mySlots.filter((slot) => {
    const slotDate = new Date(slot.date);
    return slotDate >= today && slotDate < tomorrow;
  });

  const upcomingSlots = mySlots.filter((slot) => {
    const slotDate = new Date(slot.date);
    return slotDate >= tomorrow && slot.status === "CLAIMED";
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-800 mb-1">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400 text-navy-900 font-medium rounded-lg hover:bg-gold-300 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New FaithTrain
          </Link>
          <SignOutButton />
        </div>
      </div>

      {/* Today's Commitments */}
      {todaySlots.length > 0 && (
        <div className="mb-10">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold-500" />
            Today&apos;s Prayers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaySlots.map((slot) => (
              <div
                key={slot.id}
                className={`prayer-card ${
                  slot.status === "COMPLETED"
                    ? "bg-slot-completed border-slot-completed-border"
                    : "bg-gold-50 border-gold-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-navy-800 text-sm">
                      {slot.prayerType.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      For {slot.train.recipientName}
                    </p>
                  </div>
                  {slot.status === "COMPLETED" ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-gold-500" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Link
                    href={`/p/${slot.train.slug}`}
                    className="text-xs text-gold-600 hover:text-gold-700"
                  >
                    View train &rarr;
                  </Link>
                  {slot.status === "CLAIMED" && (
                    <MarkCompleteButton slotId={slot.id} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My FaithTrains (Organizer) */}
      <div className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-gold-500" />
          My FaithTrains
        </h2>
        {organizedTrains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organizedTrains.map((train) => {
              const total = train.slots.length;
              const claimed = train.slots.filter(
                (s) => s.status === "CLAIMED"
              ).length;
              const completed = train.slots.filter(
                (s) => s.status === "COMPLETED"
              ).length;
              const fill = calculateFillRate(total, claimed, completed);

              return (
                <Link
                  key={train.id}
                  href={`/p/${train.slug}`}
                  className="prayer-card group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy-800 group-hover:text-navy-600 transition-colors">
                        Prayers for {train.recipientName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatSituation(train.situation)} &bull;{" "}
                        {formatDate(train.startDate)} &mdash;{" "}
                        {formatDate(train.endDate)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        train.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {train.status}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full bg-gold-400"
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {fill}% covered &bull; {claimed + completed}/{total} slots
                    filled
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="prayer-card text-center py-10">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              You haven&apos;t created any prayer trains yet.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Start Your First FaithTrain
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming Commitments */}
      {upcomingSlots.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-500" />
            Upcoming Prayer Commitments
          </h2>
          <div className="prayer-card">
            <div className="divide-y divide-border">
              {upcomingSlots.slice(0, 10).map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-700">
                      {slot.prayerType.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      For {slot.train.recipientName} &bull;{" "}
                      {formatDate(new Date(slot.date))}
                    </p>
                  </div>
                  <Link
                    href={`/p/${slot.train.slug}`}
                    className="text-xs text-gold-600 hover:text-gold-700 flex items-center gap-1"
                  >
                    View
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
