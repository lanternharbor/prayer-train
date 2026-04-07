import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, calculateFillRate, formatSituation } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
} from "lucide-react";
import { PostUpdateForm } from "./post-update-form";
import { TrainStatusControls } from "./train-status-controls";
import { VisibilityToggle } from "./visibility-toggle";

export const metadata: Metadata = {
  title: "Manage FaithTrain",
};

export default async function ManagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    include: {
      slots: {
        include: { prayerType: true },
        orderBy: [{ date: "asc" }, { slotIndex: "asc" }],
      },
      updates: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
      },
    },
  });

  if (!train) notFound();
  if (train.organizerId !== session.user.id) {
    redirect(`/p/${slug}`);
  }

  const totalSlots = train.slots.length;
  const claimedSlots = train.slots.filter((s) => s.status === "CLAIMED").length;
  const completedSlots = train.slots.filter(
    (s) => s.status === "COMPLETED"
  ).length;
  const openSlots = totalSlots - claimedSlots - completedSlots;
  const fillRate = calculateFillRate(totalSlots, claimedSlots, completedSlots);

  // Unique prayer warriors
  const warriors = new Map<string, { name: string; email: string | null; count: number }>();
  train.slots.forEach((slot) => {
    if (slot.claimerName) {
      const key = slot.claimerEmail || slot.claimerName;
      const existing = warriors.get(key);
      if (existing) {
        existing.count++;
      } else {
        warriors.set(key, {
          name: slot.claimerName,
          email: slot.claimerEmail,
          count: 1,
        });
      }
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/p/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Prayer Train
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-6 h-6 text-gold-500" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-800">
            Manage: Prayers for {train.recipientName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {formatSituation(train.situation)} &bull;{" "}
            {formatDate(train.startDate)} &mdash; {formatDate(train.endDate)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="prayer-card text-center py-4">
          <BarChart3 className="w-5 h-5 text-gold-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-navy-800">{fillRate}%</p>
          <p className="text-xs text-muted-foreground">Coverage</p>
        </div>
        <div className="prayer-card text-center py-4">
          <CalendarDays className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-navy-800">{openSlots}</p>
          <p className="text-xs text-muted-foreground">Open Slots</p>
        </div>
        <div className="prayer-card text-center py-4">
          <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-navy-800">{warriors.size}</p>
          <p className="text-xs text-muted-foreground">Prayer Warriors</p>
        </div>
        <div className="prayer-card text-center py-4">
          <CalendarDays className="w-5 h-5 text-purple-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-navy-800">{completedSlots}</p>
          <p className="text-xs text-muted-foreground">Prayers Prayed</p>
        </div>
      </div>

      {/* Visibility */}
      <VisibilityToggle trainId={train.id} currentlyPublic={train.isPublic} />

      {/* Status Controls */}
      <TrainStatusControls trainId={train.id} currentStatus={train.status} />

      {/* Post Update */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4">
          Post an Update
        </h2>
        <PostUpdateForm trainId={train.id} />
      </div>

      {/* Prayer Warriors List */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4">
          Prayer Warriors ({warriors.size})
        </h2>
        {warriors.size > 0 ? (
          <div className="prayer-card">
            <div className="divide-y divide-border">
              {Array.from(warriors.values()).map((warrior, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-navy-700">
                      {warrior.name}
                    </p>
                    {warrior.email && (
                      <p className="text-xs text-muted-foreground">
                        {warrior.email}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {warrior.count} {warrior.count === 1 ? "slot" : "slots"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No one has signed up yet. Share the link to get started!
          </p>
        )}
      </div>

      {/* Past Updates */}
      {train.updates.length > 0 && (
        <div>
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4">
            Past Updates
          </h2>
          <div className="space-y-3">
            {train.updates.map((update) => (
              <div key={update.id} className="prayer-card">
                <h3 className="font-medium text-navy-800 text-sm mb-1">
                  {update.title}
                </h3>
                <p className="text-sm text-muted-foreground">{update.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(update.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
