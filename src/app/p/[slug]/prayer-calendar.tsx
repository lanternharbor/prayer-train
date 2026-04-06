"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Clock, User, Check, BookOpen } from "lucide-react";
import { ClaimModal } from "./claim-modal";

type Slot = {
  id: string;
  date: Date;
  slotIndex: number;
  status: string;
  claimerName: string | null;
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
}: {
  slotsByDate: Record<string, Slot[]>;
  trainStatus: string;
}) {
  const [claimingSlot, setClaimingSlot] = useState<Slot | null>(null);

  const dates = Object.keys(slotsByDate).sort();
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="space-y-3">
        {dates.map((dateKey) => {
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
                    <span className="text-xs text-gold-600 font-medium">
                      Today
                    </span>
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
                    onClaim={() => setClaimingSlot(slot)}
                  />
                ))}
              </div>
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
  onClaim,
}: {
  slot: Slot;
  isPast: boolean;
  trainActive: boolean;
  onClaim: () => void;
}) {
  const isOpen = slot.status === "OPEN";
  const isClaimed = slot.status === "CLAIMED";
  const isCompleted = slot.status === "COMPLETED";

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
        {isCompleted && <Check className="w-3.5 h-3.5 text-blue-500" />}
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
        <div className="mt-2 flex items-center gap-1 text-xs text-amber-700">
          <User className="w-3 h-3" />
          {slot.claimerName}
        </div>
      ) : isCompleted && slot.claimerName ? (
        <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
          <Check className="w-3 h-3" />
          {slot.claimerName} — prayed
        </div>
      ) : null}
    </div>
  );
}
