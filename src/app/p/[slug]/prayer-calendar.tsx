"use client";

import { useState } from "react";
import { markSlotComplete } from "@/lib/actions";
import {
  Clock,
  User,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ClaimModal } from "./claim-modal";

type Slot = {
  id: string;
  date: Date;
  slotIndex: number;
  status: string;
  claimerName: string | null;
  /**
   * The User.id of the authenticated claimer, if any. Null for guest
   * claims. Used by SlotCard to gate the "I prayed" button so a viewer
   * can't accidentally complete someone else's prayer.
   */
  claimedById: string | null;
  completedAt: Date | null;
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
  currentUserId,
}: {
  slotsByDate: Record<string, Slot[]>;
  trainStatus: string;
  /**
   * The current viewer's User.id, or null if anonymous. Threaded down
   * to SlotCard so it can decide whether to render the "I prayed"
   * button for slots claimed by an authenticated user.
   */
  currentUserId: string | null;
}) {
  const [claimingSlot, setClaimingSlot] = useState<Slot | null>(null);
  // Past days are collapsed by default so an organizer or volunteer
  // lands on today + upcoming dates without scrolling. Toggle expands
  // the past section in place above today.
  const [pastExpanded, setPastExpanded] = useState(false);

  const dates = Object.keys(slotsByDate).sort();
  const today = new Date().toISOString().split("T")[0];
  const pastDates = dates.filter((d) => d < today);
  const upcomingDates = dates.filter((d) => d >= today);

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
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-lg font-bold leading-tight">
              {date.getDate()}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-navy-700">
              {date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </p>
            {isToday && (
              <span className="text-xs text-gold-600 font-medium">Today</span>
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
              currentUserId={currentUserId}
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

        {/* Today + upcoming — always expanded. */}
        {upcomingDates.map(renderDateCard)}
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
  currentUserId,
  onClaim,
}: {
  slot: Slot;
  isPast: boolean;
  trainActive: boolean;
  currentUserId: string | null;
  onClaim: () => void;
}) {
  const [marking, setMarking] = useState(false);
  const [completed, setCompleted] = useState(slot.status === "COMPLETED");
  const isOpen = slot.status === "OPEN" && !completed;
  const isClaimed = slot.status === "CLAIMED" && !completed;
  // Whether the current viewer can mark this slot complete from the
  // calendar. Mirrors the server-side check in markSlotComplete:
  //  - Authenticated owner: yes
  //  - Anyone, when slot is guest-claimed (claimedById null): yes
  //  - Otherwise (someone else's authenticated claim): no
  const canMarkComplete =
    !slot.claimedById || slot.claimedById === currentUserId;

  const handleMarkPrayed = async () => {
    setMarking(true);
    try {
      await markSlotComplete(slot.id);
      setCompleted(true);
    } catch {
      // Slot may not belong to this user — that's ok
    }
    setMarking(false);
  };

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
          {canMarkComplete && (
            <button
              onClick={handleMarkPrayed}
              disabled={marking}
              className="w-full py-1.5 text-xs font-medium bg-white/80 hover:bg-white border border-gold-300 rounded text-gold-700 hover:text-gold-800 transition-colors flex items-center justify-center gap-1"
            >
              {marking ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <>
                  <Check className="w-3 h-3" />
                  I prayed
                </>
              )}
            </button>
          )}
        </div>
      ) : completed && slot.claimerName ? (
        <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
          <Check className="w-3 h-3" />
          {slot.claimerName} — prayed
        </div>
      ) : null}
    </div>
  );
}
