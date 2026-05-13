"use client";

import { useState } from "react";
import {
  Clock,
  User,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Pencil,
} from "lucide-react";
import { ClaimModal } from "./claim-modal";
import { CompletionModal } from "./completion-modal";
import { dateKeyInTimezone, groupByWeek } from "@/lib/dates";
import { formatDateLocale } from "@/lib/utils";

type Slot = {
  id: string;
  date: Date;
  slotIndex: number;
  status: string;
  claimerName: string | null;
  /**
   * True when the current viewer is the authenticated claimer of this
   * slot. Computed server-side from session + slot.claimedById so the
   * claimer's User.id never ships to the client. Gates the "I prayed"
   * button and the note add/edit affordances; false for guest claims
   * (those complete via tokenized email link) and anonymous viewers.
   */
  viewerIsClaimer: boolean;
  completedAt: Date | null;
  /**
   * Optional short note left by the claimer when marking complete.
   * Null until they submit one. Shown via a comment icon on completed
   * slots; expanding the icon reveals the note text inline.
   */
  completionNote: string | null;
  /**
   * Whether the claimer opted to also surface their note on the
   * public encouragement wall. Doesn't affect display on the slot
   * card itself; passed through so the edit modal can pre-fill the
   * checkbox accurately.
   */
  completionNoteShareWall: boolean;
  prayerType: {
    id: string;
    name: string;
    duration: number;
    daysRequired: number;
    category: string;
  };
};

export function PrayerCalendar({
  slotsByDate,
  trainStatus,
}: {
  slotsByDate: Record<string, Slot[]>;
  trainStatus: string;
}) {
  const [claimingSlot, setClaimingSlot] = useState<Slot | null>(null);
  // Past days are collapsed by default so an organizer or volunteer
  // lands on today + upcoming dates without scrolling. Toggle expands
  // the past section in place above today.
  const [pastExpanded, setPastExpanded] = useState(false);

  const dates = Object.keys(slotsByDate).sort();
  // "Today" must reflect the viewer's calendar day, not the runtime's
  // UTC clock. toISOString() converts to UTC, so at 8:12 PM EDT May 3
  // it would land on May 4 and mark the wrong day as today. Using the
  // browser's resolved TZ keeps the highlight on the user's actual
  // calendar day. Slot dateKeys come from slot.date.toISOString() (UTC),
  // which matches because slot dates are stored as midnight UTC of the
  // intended calendar day.
  const today = dateKeyInTimezone(
    new Date(),
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC",
  );
  const pastDates = dates.filter((d) => d < today);
  const upcomingDates = dates.filter((d) => d >= today);

  // Week grouping: for long-running trains (90 days+), rendering every
  // upcoming day stacked vertically buries the rest of the page. Group
  // by Monday-start calendar week and collapse all but the current
  // week by default. Each collapsed week shows "Week of [date] — N of
  // M slots open" so far-out availability stays discoverable in one
  // tap. See src/lib/dates.ts for the grouping helper.
  const upcomingWeeks = groupByWeek(upcomingDates);
  // Initialize with the current week expanded (the week whose
  // [weekStart, weekEnd] contains today, regardless of whether today
  // itself is in the slot-date set). The earlier "today in week.dates"
  // check failed for trains that started mid-week — e.g., a train
  // beginning Tuesday May 5 has week-dates [May 5..May 10], so
  // `today === "2026-05-04"` (Monday) was missing from .dates and the
  // current week stayed collapsed. Date-range comparison fixes that.
  // Falls back to the first upcoming week if today is before the
  // train start (so the user sees something they can act on).
  // useState initializer runs once, so this default is stable for
  // the life of the component instance.
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(() => {
    const currentWeek =
      upcomingWeeks.find(
        (w) => today >= w.weekStart && today <= w.weekEnd,
      ) ?? upcomingWeeks[0];
    return new Set(currentWeek ? [currentWeek.weekStart] : []);
  });
  const toggleWeek = (weekStart: string) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(weekStart)) next.delete(weekStart);
      else next.add(weekStart);
      return next;
    });
  };

  /**
   * Inner renderer for a single day's card. Extracted so the past
   * section and the upcoming section render the exact same shape
   * without duplicated markup.
   */
  const renderDateCard = (dateKey: string) => {
    const slots = slotsByDate[dateKey];
    const date = new Date(dateKey + "T12:00:00");
    const isPast = dateKey < today;
    const isToday = dateKey === today;

    return (
      <div
        key={dateKey}
        className={`prayer-card ${
          isToday ? "ring-2 ring-gold-400 ring-offset-2" : ""
        } ${isPast ? "opacity-60" : ""}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`text-center min-w-[3.5rem] px-2 py-1 rounded-lg ${
              isToday
                ? "bg-gold-400 text-navy-900"
                : "bg-cream-200 text-navy-700"
            }`}
          >
            <div className="text-xs font-medium uppercase">
              {formatDateLocale(date, { weekday: "short" })}
            </div>
            <div className="text-lg font-bold leading-tight">
              {date.getDate()}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-navy-700">
              {formatDateLocale(date, {
                month: "long",
                day: "numeric",
              })}
            </p>
            {isToday && (
              <span className="text-xs text-gold-700 font-medium">Today</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              isPast={isPast}
              trainActive={trainStatus === "ACTIVE"}
              trainFrozen={trainStatus === "COMPLETED"}
              onClaim={() => setClaimingSlot(slot)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-3">
        {/* Past days — collapsed by default. Renders only when there
            actually are past dates so a brand-new train doesn't show
            an empty toggle. */}
        {pastDates.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setPastExpanded((v) => !v)}
              aria-expanded={pastExpanded}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-cream-300 bg-cream-50 text-sm text-muted-foreground hover:bg-cream-100 transition-colors"
            >
              <span>
                {pastExpanded ? "Hide" : "View"} {pastDates.length} past
                {" "}
                {pastDates.length === 1 ? "day" : "days"}
              </span>
              {pastExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {pastExpanded && (
              <div className="space-y-3 mt-3">
                {pastDates.map(renderDateCard)}
              </div>
            )}
          </div>
        )}

        {/* Upcoming days, grouped by Monday-start week. The current
            week (the one containing today) is auto-expanded; other
            weeks render as a collapsible header showing how many
            slots are still open. Trains shorter than two weeks
            effectively only have the current week, so the layout
            collapses to "exactly the same as before" for them. */}
        {upcomingWeeks.map((week) => {
          // "This week" label by date-range, matching the auto-expand
          // logic above. A train that starts Tue May 5 should still
          // label its May 4-10 week as THIS WEEK on Monday May 4 even
          // though no slot exists on May 4 itself.
          const isCurrent =
            today >= week.weekStart && today <= week.weekEnd;
          const isExpanded = expandedWeeks.has(week.weekStart);
          // Slot stats for the collapsed-week label. Counts at the
          // slot level (not the date level) so multi-slot days
          // contribute their full available count.
          let totalSlots = 0;
          let openSlots = 0;
          for (const d of week.dates) {
            for (const s of slotsByDate[d] ?? []) {
              totalSlots++;
              if (s.status === "OPEN") openSlots++;
            }
          }
          // Friendly week label like "Week of May 11 — May 17"
          const weekStart = new Date(week.weekStart + "T12:00:00");
          const weekEnd = new Date(week.weekEnd + "T12:00:00");
          const weekLabel = `Week of ${formatDateLocale(weekStart, {
            month: "short",
            day: "numeric",
          })} – ${formatDateLocale(weekEnd, {
            month: "short",
            day: "numeric",
          })}`;
          return (
            <div key={week.weekStart}>
              <button
                type="button"
                onClick={() => toggleWeek(week.weekStart)}
                aria-expanded={isExpanded}
                aria-controls={`week-${week.weekStart}`}
                className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border text-sm transition-colors ${
                  isCurrent
                    ? "border-gold-300 bg-gold-50 text-navy-800 hover:bg-gold-100"
                    : "border-cream-300 bg-cream-50 text-muted-foreground hover:bg-cream-100"
                }`}
              >
                <span className="flex items-center gap-2 text-left">
                  <span className="font-medium">{weekLabel}</span>
                  {isCurrent && (
                    <span className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                      This week
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs whitespace-nowrap">
                    {openSlots} of {totalSlots}{" "}
                    {totalSlots === 1 ? "slot" : "slots"} open
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>
              {isExpanded && (
                <div
                  id={`week-${week.weekStart}`}
                  className="space-y-3 mt-3"
                >
                  {week.dates.map(renderDateCard)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {claimingSlot && (
        <ClaimModal
          slot={claimingSlot}
          onClose={() => setClaimingSlot(null)}
        />
      )}
    </>
  );
}

function SlotCard({
  slot,
  isPast,
  trainActive,
  trainFrozen,
  onClaim,
}: {
  slot: Slot;
  isPast: boolean;
  trainActive: boolean;
  /** train.status === COMPLETED — note edit/delete is locked. */
  trainFrozen: boolean;
  onClaim: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [noteExpanded, setNoteExpanded] = useState(false);
  const isOpen = slot.status === "OPEN";
  const isClaimed = slot.status === "CLAIMED";
  const completed = slot.status === "COMPLETED";
  // Page-button completion is only for authenticated owners. Guest
  // claimers complete from the signed link in their reminder email.
  // Ownership is decided server-side (see page.tsx) so claimer User
  // IDs never appear in the public RSC payload.
  const hasNote =
    !!slot.completionNote && slot.completionNote.trim().length > 0;

  // Owner can open the modal (initial mark, or edit existing note)
  // while the train is still active. After the train ends, notes are
  // frozen but the icon-expand still works for read-only viewing.
  const canEdit = slot.viewerIsClaimer && !trainFrozen;

  return (
    <div
      className={`px-3 py-2.5 rounded-lg text-sm ${
        isOpen
          ? "slot-open"
          : isClaimed
          ? "slot-claimed"
          : "slot-completed"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-navy-700 text-xs truncate">
          {slot.prayerType.name}
        </span>
        {completed && <Check className="w-3.5 h-3.5 text-blue-500" />}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        {slot.prayerType.duration} min
      </div>

      {isOpen && trainActive && !isPast ? (
        <button
          onClick={onClaim}
          className="mt-2 w-full py-1.5 text-xs font-medium bg-white/80 hover:bg-white border border-slot-open-border rounded text-green-700 transition-colors"
        >
          Sign up to pray
        </button>
      ) : isClaimed && slot.claimerName ? (
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-1 text-xs text-amber-700">
            <User className="w-3 h-3" />
            {slot.claimerName}
          </div>
          {canEdit && (
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-1.5 text-xs font-medium bg-white/80 hover:bg-white border border-gold-300 rounded text-gold-700 hover:text-gold-800 transition-colors flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" />
              I prayed
            </button>
          )}
        </div>
      ) : completed && slot.claimerName ? (
        <div className="mt-2">
          <div className="flex items-center gap-1.5 text-xs text-blue-600">
            <Check className="w-3 h-3" />
            <span className="flex-1">{slot.claimerName} — prayed</span>
            {hasNote && (
              <button
                type="button"
                onClick={() => setNoteExpanded((v) => !v)}
                aria-expanded={noteExpanded}
                aria-label={
                  noteExpanded ? "Hide note" : "Show note from prayer"
                }
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            )}
            {canEdit && !hasNote && (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:text-blue-700 text-xs underline-offset-2 hover:underline"
              >
                Add note
              </button>
            )}
          </div>
          {hasNote && noteExpanded && (
            <div className="mt-2 px-3 py-2 bg-white/60 border border-blue-100 rounded text-xs text-navy-700 italic leading-relaxed">
              &ldquo;{slot.completionNote}&rdquo;
              {canEdit && (
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 not-italic text-[11px] underline-offset-2 hover:underline"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      ) : null}

      {showModal && (
        <CompletionModal
          slotId={slot.id}
          prayerName={slot.prayerType.name}
          initialNote={slot.completionNote ?? ""}
          initialShareWall={slot.completionNoteShareWall}
          isEdit={completed && hasNote}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
