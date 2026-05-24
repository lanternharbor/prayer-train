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

function statusBadgeClass(status: string): string {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "PAUSED":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "COMPLETED":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "CANCELLED":
      return "bg-stone-100 text-stone-700 border-stone-200";
    default:
      return "bg-stone-100 text-stone-700 border-stone-200";
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
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-stone-900">
            Admin · Trains
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            All prayer trains, public and private. {totalAll} total ·{" "}
            {totalActive} active · {totalPaused} paused · {totalCompleted}{" "}
            completed · {totalCancelled} cancelled.
          </p>
        </header>

        <div className="flex flex-wrap gap-4 mb-4 text-sm">
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

        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Recipient</th>
                <th className="text-left px-3 py-2 font-medium">Situation</th>
                <th className="text-left px-3 py-2 font-medium">Organizer</th>
                <th className="text-left px-3 py-2 font-medium">Status</th>
                <th className="text-left px-3 py-2 font-medium">Visibility</th>
                <th className="text-right px-3 py-2 font-medium">Slots</th>
                <th className="text-right px-3 py-2 font-medium">Warriors</th>
                <th className="text-left px-3 py-2 font-medium">Window</th>
                <th className="text-right px-3 py-2 font-medium">Actions</th>
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
                    className="border-t border-stone-200 hover:bg-stone-50"
                  >
                    <td className="px-3 py-2">
                      <Link
                        href={`/p/${train.slug}`}
                        className="text-navy-700 hover:underline font-medium"
                      >
                        {train.recipientName}
                      </Link>
                      {isProtectedTrain(train.slug) && (
                        <span
                          title="Protected slug — destructive actions blocked"
                          className="ml-2 text-xs text-amber-700"
                        >
                          ★
                        </span>
                      )}
                      <div className="text-xs text-stone-500 font-mono">
                        /{train.slug}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-stone-700">
                      {formatSituation(train.situation)}
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-stone-800">
                        {train.organizer?.name ?? "—"}
                      </div>
                      <div className="text-xs text-stone-500">
                        {train.organizer?.email ?? "—"}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded border ${statusBadgeClass(train.status)}`}
                      >
                        {train.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-stone-700">
                        {train.isPublic ? "Public" : "Private"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-stone-700">
                      {claimed}/{total}
                      <div className="text-xs text-stone-500">
                        {completedSlots} prayed · {fillPct}% claimed
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-stone-700">
                      {train._count.warriors}
                    </td>
                    <td className="px-3 py-2 text-xs text-stone-600">
                      {train.startDate.toISOString().slice(0, 10)} →{" "}
                      {train.endDate.toISOString().slice(0, 10)}
                    </td>
                    <td className="px-3 py-2 text-right">
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
                    className="px-3 py-8 text-center text-stone-500"
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
    <div className="flex items-center gap-2">
      <span className="text-stone-600">{label}:</span>
      <div className="flex flex-wrap gap-1">
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
                  ? "px-2 py-1 rounded bg-navy-700 text-white"
                  : "px-2 py-1 rounded border border-stone-200 bg-white hover:bg-stone-100"
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
