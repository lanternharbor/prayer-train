import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { LocaleLink as Link } from "@/components/locale-link";
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
import { SetNameCard } from "./set-name-card";
import { getDictionary } from "@/i18n/dictionaries";
import { t as interpolate } from "@/i18n/format";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return localizedMetadata({
    locale,
    path: "/dashboard",
    title: dict.meta.dashboardTitle,
    description: dict.meta.dashboardDescription,
    noindex: true,
  });
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.dashboard;
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
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-navy-800 mb-1">
              {t.h1}
            </h1>
            <p className="text-muted-foreground">
              {session.user.name
                ? interpolate(t.welcomeBackName, { name: session.user.name })
                : t.welcomeBack}
            </p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            {t.ctaStartTrain}
          </Link>
        </div>
        <div className="mt-3">
          <SignOutButton />
        </div>
      </div>

      {/* One-time backfill prompt for organizers whose User.name is
          still null. Renders only when name is missing; submitting
          revalidates the page so the card disappears. See PR #27 for
          the underlying bug this closes. */}
      {!session.user.name && <SetNameCard />}

      {/* Today's Commitments */}
      {todaySlots.length > 0 && (
        <div className="mb-10">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold-500" />
            {t.todaysPrayersHeading}
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
                      {interpolate(t.forRecipient, { recipientName: slot.train.recipientName })}
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
                    className="text-xs text-gold-700 hover:text-gold-800"
                  >
                    {t.viewTrain}
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

      {/* My PrayerTrains (Organizer) */}
      <div className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-gold-500" />
          {t.myTrainsHeading}
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
                        {interpolate(dict.publicTrain.h1PrayersFor, { recipientName: train.recipientName })}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {dict.situationLabels[train.situation] ?? formatSituation(train.situation)} &bull;{" "}
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
                      {train.status === "ACTIVE"
                        ? dict.publicTrain.statusActive
                        : train.status === "PAUSED"
                        ? dict.publicTrain.statusPaused
                        : train.status === "COMPLETED"
                        ? dict.publicTrain.statusCompleted
                        : dict.publicTrain.statusCancelled}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full bg-gold-400"
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {interpolate(t.coverageFooter, {
                      pct: fill,
                      filled: claimed + completed,
                      total,
                    })}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="prayer-card text-center py-10">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">
              {t.emptyStateBody}
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {t.emptyStateCTA}
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming Commitments */}
      {upcomingSlots.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-500" />
            {t.upcomingHeading}
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
                      {interpolate(t.forRecipient, { recipientName: slot.train.recipientName })} &bull;{" "}
                      {formatDate(new Date(slot.date))}
                    </p>
                  </div>
                  <Link
                    href={`/p/${slot.train.slug}`}
                    className="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1"
                  >
                    {t.viewLink}
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
