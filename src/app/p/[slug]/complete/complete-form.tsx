"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, MessageSquare } from "lucide-react";
import { submitSlotNoteByToken } from "@/lib/actions";
import { NOTE_MAX_LENGTH } from "@/lib/notes";

/**
 * Optional note form rendered below the success message on the
 * email-link landing page. Submits via submitSlotNoteByToken using
 * the same signed token that authenticated the initial mark-complete
 * action — works for both initial submissions and subsequent edits.
 *
 * If `frozen` is true (the train has ended and the bouquet is locked),
 * the textarea is disabled and the submit button is hidden — the form
 * becomes read-only.
 */
export function CompleteForm({
  slotId,
  token,
  initialNote,
  initialShareWall,
  frozen,
}: {
  slotId: string;
  token: string;
  initialNote: string;
  initialShareWall: boolean;
  frozen: boolean;
}) {
  const router = useRouter();
  const [note, setNote] = useState(initialNote);
  const [shareWall, setShareWall] = useState(initialShareWall);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remaining = NOTE_MAX_LENGTH - note.length;
  const overCap = remaining < 0;
  const busy = submitting || deleting;
  const hasExistingNote = initialNote.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (frozen) return;
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("slotId", slotId);
      fd.set("token", token);
      fd.set("note", note);
      if (shareWall) fd.set("shareWall", "true");
      await submitSlotNoteByToken(fd);
      setSavedAt(new Date());
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong saving your note.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (frozen) return;
    setError(null);
    setDeleting(true);
    try {
      const fd = new FormData();
      fd.set("slotId", slotId);
      fd.set("token", token);
      fd.set("note", "");
      await submitSlotNoteByToken(fd);
      setNote("");
      setShareWall(false);
      setSavedAt(new Date());
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong deleting the note.";
      setError(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="prayer-card mt-6 text-left">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-gold-500" />
        <h2 className="font-heading text-base font-semibold text-navy-800">
          {hasExistingNote ? "Your note" : "Leave a note (optional)"}
        </h2>
      </div>

      {frozen ? (
        <p className="text-sm text-muted-foreground italic">
          Notes are locked once the prayer train has ended. The
          spiritual bouquet has captured what was offered.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">
          A short word of encouragement, a verse, anything you want to
          share. Up to {NOTE_MAX_LENGTH} characters.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={frozen || busy}
          placeholder="A short word of encouragement..."
          rows={3}
          maxLength={NOTE_MAX_LENGTH + 50}
          className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none disabled:opacity-60"
        />

        {!frozen && (
          <p
            className={`text-xs ${
              overCap ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            {overCap
              ? `${-remaining} over the ${NOTE_MAX_LENGTH}-character limit`
              : `${remaining} characters left`}
          </p>
        )}

        {!frozen && (
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={shareWall}
              onChange={(e) => setShareWall(e.target.checked)}
              disabled={busy || note.trim().length === 0}
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
        )}

        {error && (
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {error}
          </p>
        )}

        {savedAt && !error && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            Saved.
          </p>
        )}

        {!frozen && (
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            {hasExistingNote ? (
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
              disabled={busy || overCap || note.trim().length === 0}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {submitting
                ? "Saving..."
                : hasExistingNote
                  ? "Save changes"
                  : "Save note"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
