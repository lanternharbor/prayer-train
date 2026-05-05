"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { submitSlotNote } from "@/lib/actions";
import { NOTE_MAX_LENGTH } from "@/lib/notes";

/**
 * Modal that opens when an authenticated slot owner clicks "I prayed"
 * on their slot card. Two optional fields (a short note + a
 * share-on-encouragement-wall checkbox) sit above the primary
 * "Mark complete" button. Submit with everything blank works
 * exactly like the old instant-tap behavior.
 *
 * Edit mode: when the slot already has a note, the modal pre-fills
 * the textarea + checkbox and the primary button reads "Save changes"
 * with a "Delete note" affordance underneath.
 *
 * Mirrors the AddWarriorModal pattern so the visual language is
 * consistent across the train detail page modals.
 */
export function CompletionModal({
  slotId,
  prayerName,
  initialNote,
  initialShareWall,
  isEdit,
  onClose,
}: {
  slotId: string;
  prayerName: string;
  initialNote: string;
  initialShareWall: boolean;
  isEdit: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [note, setNote] = useState(initialNote);
  const [shareWall, setShareWall] = useState(initialShareWall);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape — same affordance as the other modals on this page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("slotId", slotId);
      // Empty / whitespace-only normalizes to null on the server side.
      formData.set("note", note);
      // Send "true" only when checked, matching the FormData
      // convention for checkbox encoding.
      if (shareWall) formData.set("shareWall", "true");
      await submitSlotNote(formData);
      // Trigger a re-fetch so the slot card sees the canonical new
      // state (note text, shareWall, status). The action's
      // revalidatePath marks the route stale; router.refresh re-
      // requests the affected segments.
      router.refresh();
      onClose();
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.";
      setError(msg);
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setError(null);
    setDeleting(true);
    try {
      const formData = new FormData();
      formData.set("slotId", slotId);
      // Empty note + no shareWall flag clears both columns.
      formData.set("note", "");
      await submitSlotNote(formData);
      router.refresh();
      onClose();
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong deleting the note.";
      setError(msg);
      setDeleting(false);
    }
  };

  const remaining = NOTE_MAX_LENGTH - note.length;
  const overCap = remaining < 0;
  const busy = submitting || deleting;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-dialog-title"
    >
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="completion-dialog-title"
            className="font-heading text-xl font-semibold text-navy-800"
          >
            {isEdit ? "Edit your note" : "Mark this prayer complete"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close completion dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          {isEdit ? (
            <>
              Update or remove the note you left when you marked the{" "}
              <strong className="text-navy-700">{prayerName}</strong> as
              prayed.
            </>
          ) : (
            <>
              You&apos;ve prayed the{" "}
              <strong className="text-navy-700">{prayerName}</strong>. If
              you&apos;d like, leave a short note for the family — or just
              hit &ldquo;Mark complete&rdquo; below.
            </>
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="completion-note"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Leave a note{" "}
              <span className="text-xs text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="completion-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="A short word of encouragement, a verse, anything you want to share..."
              rows={3}
              maxLength={NOTE_MAX_LENGTH + 50 /* allow paste-overflow; server caps */}
              className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
            <p
              className={`text-xs mt-1 ${
                overCap ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {overCap
                ? `${-remaining} over the ${NOTE_MAX_LENGTH}-character limit`
                : `${remaining} characters left`}
            </p>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={shareWall}
              onChange={(e) => setShareWall(e.target.checked)}
              disabled={note.trim().length === 0}
              className="mt-0.5"
            />
            <span className="text-sm text-navy-700">
              Share this note on the encouragement wall
              <span className="block text-xs text-muted-foreground font-normal">
                Off by default; the note still appears in the spiritual
                bouquet either way.
              </span>
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
            {isEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={busy}
                className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting..." : "Delete note"}
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              disabled={busy || overCap}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {submitting
                ? "Saving..."
                : isEdit
                  ? "Save changes"
                  : "Mark complete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
