"use client";

import {
  CalendarDays,
  Check,
  Clock,
  Star,
} from "lucide-react";
import type { PrayerCategory, DifficultyLevel } from "@/generated/prisma/client";

/**
 * Shared prayer-type picker with optional daily-anchor stars.
 *
 * Used by the create wizard (step 4) and the manage/schedule rebuild
 * page. Pure controlled component — caller owns `selectedIds` /
 * `anchorIds` state and the toggle callbacks.
 *
 * Cardinality rules (anchors ≤ slotsPerDay - 1) are gated in the
 * caller; this component just disables the star button visually and
 * surfaces the right tooltip. Server-side validation is the final
 * line of defense.
 */

export type PrayerTypeCard = {
  id: string;
  name: string;
  category: PrayerCategory;
  description: string;
  duration: number;
  daysRequired: number;
  difficulty?: DifficultyLevel;
};

export type PrayerTypePickerStrings = {
  anchorHelpText: string;
  dailyBadge: string;
  maxAnchorsReached: string;
  anchorRequiresMoreSlots: string;
  setAsDailyAria: string;
  unsetAsDailyAria: string;
  minutesShort: string;
  daysSuffix: string;
};

export function PrayerTypePicker({
  prayerTypes,
  selectedIds,
  anchorIds,
  slotsPerDay,
  onToggleSelected,
  onToggleAnchor,
  prayerCategoryLabels,
  strings,
  emptyState,
}: {
  prayerTypes: readonly PrayerTypeCard[];
  selectedIds: readonly string[];
  anchorIds: readonly string[];
  /** Drives anchor cardinality. Set to 1 to disable the anchor UI. */
  slotsPerDay: number;
  onToggleSelected: (id: string) => void;
  onToggleAnchor: (id: string) => void;
  prayerCategoryLabels: Record<PrayerCategory, string>;
  strings: PrayerTypePickerStrings;
  /** Optional empty-state node rendered below the list. */
  emptyState?: React.ReactNode;
}) {
  const canAnchor = slotsPerDay >= 2;
  const maxAnchors = Math.max(0, slotsPerDay - 1);
  const atMaxAnchors = anchorIds.length >= maxAnchors;

  return (
    <div className="space-y-3">
      {canAnchor ? (
        <p className="text-xs text-muted-foreground bg-cream-50 border border-cream-200 rounded-lg px-3 py-2">
          {strings.anchorHelpText}
        </p>
      ) : null}

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {prayerTypes.map((prayer) => {
          const isSelected = selectedIds.includes(prayer.id);
          const isAnchored = anchorIds.includes(prayer.id);
          const starDisabled =
            !isSelected || !canAnchor || (!isAnchored && atMaxAnchors);
          const starTitle = !canAnchor
            ? strings.anchorRequiresMoreSlots
            : !isAnchored && atMaxAnchors
              ? strings.maxAnchorsReached
              : isAnchored
                ? strings.unsetAsDailyAria
                : strings.setAsDailyAria;
          return (
            <button
              key={prayer.id}
              type="button"
              onClick={() => onToggleSelected(prayer.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                isSelected
                  ? "bg-gold-50 border-gold-400"
                  : "bg-cream-50 border-border hover:border-navy-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-navy-800 text-sm">
                      {prayer.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-xs bg-cream-200 text-cream-600">
                      {prayerCategoryLabels[prayer.category]}
                    </span>
                    {isAnchored ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide font-semibold bg-gold-200 text-gold-800">
                        {strings.dailyBadge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {prayer.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {prayer.duration} {strings.minutesShort}
                    </span>
                    {prayer.daysRequired > 1 && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {prayer.daysRequired} {strings.daysSuffix}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3 mt-0.5">
                  {isSelected ? (
                    <span
                      role="button"
                      tabIndex={0}
                      aria-pressed={isAnchored}
                      aria-label={starTitle}
                      aria-disabled={starDisabled}
                      title={starTitle}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!starDisabled) onToggleAnchor(prayer.id);
                      }}
                      onKeyDown={(e) => {
                        if (
                          !starDisabled &&
                          (e.key === "Enter" || e.key === " ")
                        ) {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleAnchor(prayer.id);
                        }
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        starDisabled
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-gold-100"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isAnchored
                            ? "fill-gold-400 text-gold-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </span>
                  ) : null}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected
                        ? "bg-gold-400 border-gold-400"
                        : "border-cream-400"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {emptyState}

      {anchorIds.length > 0 && atMaxAnchors ? (
        <p className="text-xs text-navy-700 bg-gold-50 border border-gold-200 rounded-lg px-3 py-2">
          {strings.maxAnchorsReached}
        </p>
      ) : null}
    </div>
  );
}
