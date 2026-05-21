"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { rebuildTrainSchedule } from "@/lib/actions";
import {
  PrayerTypePicker,
  type PrayerTypeCard,
  type PrayerTypePickerStrings,
} from "@/components/prayer-type-picker";
import { Loader2 } from "lucide-react";
import type { PrayerCategory } from "@/generated/prisma/client";

/**
 * Client form for `/p/<slug>/manage/schedule`. Wraps the shared
 * `PrayerTypePicker` and submits to `rebuildTrainSchedule`. Mirrors
 * the create-wizard's anchor handling: unselecting a prayer also
 * drops its anchor; the anchor list is trimmed when slotsPerDay
 * decreases (here `slotsPerDay` is immutable, so trimming on mount
 * is enough).
 */
export function EditScheduleForm({
  trainId,
  slug,
  slotsPerDay,
  prayerTypes,
  initialSelectedIds,
  initialAnchorIds,
  prayerCategoryLabels,
  pickerStrings,
  submitStrings,
}: {
  trainId: string;
  slug: string;
  slotsPerDay: number;
  prayerTypes: readonly PrayerTypeCard[];
  initialSelectedIds: readonly string[];
  initialAnchorIds: readonly string[];
  prayerCategoryLabels: Record<PrayerCategory, string>;
  pickerStrings: PrayerTypePickerStrings;
  submitStrings: {
    submitButton: string;
    submitting: string;
    cancelLink: string;
  };
}) {
  const maxAnchors = Math.max(0, slotsPerDay - 1);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    [...initialSelectedIds],
  );
  // Clamp the pre-filled anchors to the cardinality cap on first
  // render, in case a prior schedule had more anchors than the new
  // rules allow (defensive; the create-time rule has always been
  // enforced, but it's cheap to be safe).
  const [anchorIds, setAnchorIds] = useState<string[]>(
    [...initialAnchorIds].slice(0, maxAnchors),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // slotsPerDay is immutable on this page (prop from server), so the
  // initial useState clamp is sufficient — no useEffect needed to
  // re-trim after mount.

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const isRemoving = prev.includes(id);
      if (isRemoving) {
        setAnchorIds((anchors) => anchors.filter((a) => a !== id));
        return prev.filter((p) => p !== id);
      }
      return [...prev, id];
    });
  };

  const toggleAnchor = (id: string) => {
    setAnchorIds((prev) => {
      if (prev.includes(id)) return prev.filter((a) => a !== id);
      if (prev.length >= maxAnchors) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSubmitting(true);
    formData.set("trainId", trainId);
    formData.set("prayerTypeIds", selectedIds.join(","));
    formData.set("anchorPrayerTypeIds", anchorIds.join(","));
    try {
      await rebuildTrainSchedule(formData);
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong rebuilding the schedule.";
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <p
          role="alert"
          className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
        >
          {error}
        </p>
      )}

      <PrayerTypePicker
        prayerTypes={prayerTypes}
        selectedIds={selectedIds}
        anchorIds={anchorIds}
        slotsPerDay={slotsPerDay}
        onToggleSelected={toggleSelected}
        onToggleAnchor={toggleAnchor}
        prayerCategoryLabels={prayerCategoryLabels}
        strings={pickerStrings}
      />

      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          href={`/p/${slug}/manage`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {submitStrings.cancelLink}
        </Link>
        <button
          type="submit"
          disabled={submitting || selectedIds.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-400 text-navy-900 font-semibold hover:bg-gold-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {submitStrings.submitting}
            </>
          ) : (
            submitStrings.submitButton
          )}
        </button>
      </div>
    </form>
  );
}
