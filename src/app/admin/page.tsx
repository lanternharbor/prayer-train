import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatSituation } from "@/lib/utils";
import { isProtectedTrain } from "@/lib/train-protection";
import type { Prisma } from "@/generated/prisma/client";
import { TrainRowActions } from "./train-row-actions";

export const metadata: Metadata = {
  title: "Admin · PrayerTrain",
  robots: { index: false, follow: false },
};

// Server-only. Hits the live DB on every request so the view is always
// fresh; admin volume is tiny so caching adds no value and only risks
// staleness during incident-response.
export const dynamic = "force-dynamic";

type StatusFilter = "all" | "active" | "paused" | "completed" | "cancelled";
type VisibilityFilter = "all" | "public" | "private";

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const VISIBILITY_FILTERS: { key: VisibilityFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

// Status badges use the project's existing slot-state palette where it
// fits (COMPLETED → blue slot-completed token) plus navy/gold/cream for
// the rest. Sticking to defined tokens keeps the page looking like the
// rest of the site.
function statusBadgeClass(status: string): string {
  switch (status) {
    case "ACTIVE":
      return "bg-gold-100 text-gold-800 border-gold-300";
    case "PAUSED":
      return "bg-cream-300 text-cream-800 border-cream-400";
    case "COMPLETED":
      return "bg-slot-completed border-slot-completed-border text-navy-800";
    case "CANCELLED":
      return "bg-cream-200 text-cream-700 border-cream-300";
    default:
      return "bg-cream-200 text-cream-700 border-cream-300";
  }
}

export default async function AdminTrainsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; visibility?: string }>;
}) {
  const sp = await searchParams;
  const statusFilter: StatusFilter =
    sp.status === "active" ||
    sp.status === "paused" ||
    sp.status === "completed" ||
    sp.status === "cancelled"
      ? sp.status
      : "all";
  const visibilityFilter: VisibilityFilter =
    sp.visibility === "public" || sp.visibility === "private"
      ? sp.visibility
      : "all";

  const where: Prisma.PrayerTrainWhereInput = {};
  if (statusFilter !== "all") {
    where.status = statusFilter.toUpperCase() as Prisma.PrayerTrainWhereInput["status"];
  }
  if (visibilityFilter !== "all") {
    where.isPublic = visibilityFilter === "public";
  }

  const trains = await prisma.prayerTrain.findMany({
    where,
    include: {
      organizer: { select: { name: true, email: true } },
      _count: { select: { warriors: true, updates: true } },
      slots: { select: { status: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totals = await prisma.prayerTrain.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const totalActive =
    totals.find((t) => t.status === "ACTIVE")?._count._all ?? 0;
  const totalPaused =
    totals.find((t) => t.status === "PAUSED")?._count._all ?? 0;
  const totalCompleted =
    totals.find((t) => t.status === "COMPLETED")?._count._all ?? 0;
  const totalCancelled =
    totals.find((t) => t.status === "CANCELLED")?._count._all ?? 0;
  const totalAll =
    totalActive + totalPaused + totalCompleted + totalCancelled;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-navy-800 mb-1">
            Admin · Trains
          </h1>
          <p className="text-sm text-muted-foreground">
            All prayer trains, public and private. {totalAll} total ·{" "}
            <span className="text-navy-700 font-medium">
              {totalActive} active
            </span>{" "}
            · {totalPaused} paused · {totalCompleted} completed ·{" "}
            {totalCancelled} cancelled.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3 mb-5 text-sm">
          <FilterGroup
            label="Status"
            options={STATUS_FILTERS}
            current={statusFilter}
            paramKey="status"
            otherParams={{ visibility: visibilityFilter }}
          />
          <FilterGroup
            label="Visibility"
            options={VISIBILITY_FILTERS}
            current={visibilityFilter}
            paramKey="visibility"
            otherParams={{ status: statusFilter }}
          />
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream-200 text-navy-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">
                    Recipient
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Situation
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Organizer
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Visibility
                  </th>
                  <th className="text-right px-4 py-3 font-semibold">Slots</th>
                  <th className="text-right px-4 py-3 font-semibold">
                    Warriors
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">Window</th>
                  <th className="text-right px-4 py-3 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train) => {
                  const total = train.slots.length;
                  const claimed = train.slots.filter(
                    (s) => s.status === "CLAIMED" || s.status === "COMPLETED",
                  ).length;
                  const completedSlots = train.slots.filter(
                    (s) => s.status === "COMPLETED",
                  ).length;
                  const fillPct =
                    total === 0 ? 0 : Math.round((claimed / total) * 100);
                  return (
                    <tr
                      key={train.id}
                      className="border-t border-border align-top hover:bg-cream-100/60"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/p/${train.slug}`}
                          className="text-navy-700 hover:text-navy-900 hover:underline font-semibold"
                        >
                          {train.recipientName}
                        </Link>
                        {isProtectedTrain(train.slug) && (
                          <span
                            title="Protected — destructive actions blocked"
                            className="ml-1 text-gold-500"
                            aria-label="Protected train"
                          >
                            ★
                          </span>
                        )}
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">
                          /{train.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-navy-800">
                        {formatSituation(train.situation)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-navy-800">
                          {train.organizer?.name ?? (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {train.organizer?.email ?? "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${statusBadgeClass(train.status)}`}
                        >
                          {train.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-navy-800">
                        {train.isPublic ? (
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full border border-gold-300 bg-gold-50 text-gold-800">
                            Public
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full border border-cream-400 bg-cream-100 text-cream-800">
                            Private
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-navy-800">
                        <div className="font-medium">
                          {claimed}/{total}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {completedSlots} prayed · {fillPct}%
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-navy-800">
                        {train._count.warriors}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {train.startDate.toISOString().slice(0, 10)}
                        <div>→ {train.endDate.toISOString().slice(0, 10)}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <TrainRowActions
                          trainId={train.id}
                          slug={train.slug}
                          recipientName={train.recipientName}
                          status={train.status}
                          isPublic={train.isPublic}
                          isProtected={isProtectedTrain(train.slug)}
                        />
                      </td>
                    </tr>
                  );
                })}
                {trains.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-10 text-center text-muted-foreground"
                    >
                      No trains match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  current,
  paramKey,
  otherParams,
}: {
  label: string;
  options: readonly { key: T; label: string }[];
  current: T;
  paramKey: string;
  otherParams: Record<string, string>;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-muted-foreground font-medium">{label}:</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const params = new URLSearchParams();
          for (const [k, v] of Object.entries(otherParams)) {
            if (v && v !== "all") params.set(k, v);
          }
          if (opt.key !== "all") params.set(paramKey, opt.key);
          const href = `/admin${params.toString() ? `?${params}` : ""}`;
          const active = opt.key === current;
          return (
            <Link
              key={opt.key}
              href={href}
              className={
                active
                  ? "px-3 py-1 rounded-full bg-navy-700 text-white text-xs font-medium"
                  : "px-3 py-1 rounded-full border border-border bg-card text-navy-700 text-xs font-medium hover:bg-cream-100"
              }
            >
              {opt.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
