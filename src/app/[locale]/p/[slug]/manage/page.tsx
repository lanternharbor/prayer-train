import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  formatDate,
  formatDateLocale,
  calculateFillRate,
  formatSituation,
} from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
  FileDown,
  Pencil,
} from "lucide-react";
import { PostUpdateForm } from "./post-update-form";
import { TrainStatusControls } from "./train-status-controls";
import { VisibilityToggle } from "./visibility-toggle";
import { DangerZone } from "./danger-zone";
import { isProtectedTrain } from "@/lib/train-protection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    select: { recipientName: true },
  });
  return {
    title: train ? `Manage: ${train.recipientName}` : "Manage PrayerTrain",
    // Belt-and-suspenders: route is already disallowed in robots.ts, but a
    // meta tag protects against bots that ignore robots.txt.
    robots: { index: false, follow: false },
  };
}

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
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
        <Link
          href={`/p/${slug}/manage/edit`}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-gold-700 hover:text-gold-800 border border-gold-300 hover:border-gold-400 rounded-lg transition-colors self-start sm:self-auto shrink-0"
        >
          <Pencil className="w-4 h-4" />
          Edit details
        </Link>
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

      {/* Spiritual Bouquet — final downloadable artifact when the train
          is COMPLETED. The PDF endpoint matches the same organizer-only
          auth pattern as this page. */}
      {train.status === "COMPLETED" && (
        <div className="prayer-card mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold text-navy-800 mb-1 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-gold-500" />
              Spiritual Bouquet
            </h2>
            <p className="text-sm text-muted-foreground">
              A printable record of every prayer offered for{" "}
              {train.recipientName} — names, prayers, dates. Print at home or
              share with the family.
            </p>
          </div>
          <a
            href={`/api/bouquet/${train.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
          >
            <FileDown className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      )}

      {/* Preview bouquet — surfaced for ACTIVE/PAUSED trains so the
          organizer can see what the final artifact will look like
          before delivery day. The route honors ?preview=1 only for
          authenticated organizers; the auth gate is the same. The
          rendered PDF will keep updating as more slots get claimed
          and completed. Cancelled trains intentionally hide this
          (no bouquet generated for cancelled trains). */}
      {(train.status === "ACTIVE" || train.status === "PAUSED") && (
        <div className="prayer-card mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-cream-50 border-cream-300">
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold text-navy-800 mb-1 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-gold-500" />
              Preview the spiritual bouquet
            </h2>
            <p className="text-sm text-muted-foreground">
              See what {train.recipientName}&apos;s spiritual bouquet will
              look like with the prayers offered so far. Updates as more
              slots are completed; the final downloadable version unlocks
              when the train ends.
            </p>
          </div>
          <a
            href={`/api/bouquet/${train.slug}?preview=1`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 text-navy-800 text-sm font-medium rounded-lg hover:bg-cream-200 border border-cream-300 transition-colors shrink-0"
          >
            <FileDown className="w-4 h-4" />
            Preview PDF
          </a>
        </div>
      )}

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

      {/* Danger zone — three modes by state: ACTIVE/PAUSED show
          delete or cancel (with confirm-by-typing); CANCELLED shows
          a Reactivate button; COMPLETED hides the section entirely.
          Server-side guards in src/lib/actions.ts enforce organizer-
          auth, protected-slug rejection (Spina), and the recipient-
          name confirmation match. */}
      {train.status !== "COMPLETED" && (
        <DangerZone
          trainId={train.id}
          recipientName={train.recipientName}
          status={train.status}
          hasClaimedSlots={claimedSlots > 0 || completedSlots > 0}
          isProtected={isProtectedTrain(train.slug)}
        />
      )}

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
                  {formatDateLocale(new Date(update.createdAt), {
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
