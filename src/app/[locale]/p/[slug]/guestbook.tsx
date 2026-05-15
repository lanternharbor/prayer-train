"use client";

import { useState, useTransition } from "react";
import {
  deleteGuestbookEntry,
  deleteSlotNote,
  hideGuestbookEntry,
  hideSlotNote,
  postGuestbookEntry,
  unhideGuestbookEntry,
  unhideSlotNote,
} from "@/lib/actions";
import { formatDateLocale } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  HandHeart,
  Loader2,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";

/**
 * Unified encouragement-wall entry. Two sources:
 *   - "guestbook"    — explicit wall posts via the form below
 *   - "prayer-note"  — slot completion notes where the claimer
 *                      opted to surface their note on the wall
 *
 * Both kinds support organizer-side moderation (hide / unhide /
 * permanently delete). The page-level wall query passes
 * `isOrganizer` and includes hidden entries only in the organizer
 * view; non-organizers never see hidden content. The `kind` field
 * tells the moderation buttons which server action to call.
 */
export type WallEntry = {
  id: string;
  /** Discriminates the moderation server actions to invoke. */
  kind: "guestbook" | "slot-note";
  createdAt: Date;
  authorName: string;
  message: string;
  /** Source-badge label (independent of kind, for legacy UI). */
  source: "guestbook" | "prayer-note";
  /** True only when isOrganizer is true and the entry has been
   *  soft-hidden. The organizer sees these with a "Hidden" tag and
   *  unhide / delete controls. Non-organizers never receive hidden
   *  entries — the page-level query filters them out. */
  hidden: boolean;
};

import type { Dictionary } from "@/i18n/dictionaries";

export function Guestbook({
  entries,
  trainId,
  isOrganizer,
  t,
}: {
  entries: WallEntry[];
  trainId: string;
  isOrganizer: boolean;
  t: Dictionary["guestbook"];
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.set("trainId", trainId);
    formData.set("authorName", name);
    formData.set("message", message);
    await postGuestbookEntry(formData);
    setMessage("");
    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-gold-500" />
        {t.heading}
      </h2>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="prayer-card mb-4 space-y-3">
        <label htmlFor="guestbook-name" className="sr-only">
          {t.nameLabel}
        </label>
        <input
          id="guestbook-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          required
          className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
        <label htmlFor="guestbook-message" className="sr-only">
          {t.messageLabel}
        </label>
        <textarea
          id="guestbook-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          required
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {t.submitButton}
        </button>
      </form>

      {/* Entries — both guestbook posts and shared prayer notes,
          rendered with the same chrome plus a small "from a prayer"
          badge on the slot-sourced ones so the provenance is clear.
          Organizer-only moderation controls render at the right
          edge of each entry. */}
      <div className="space-y-3">
        {entries.map((entry) => (
          <WallEntryRow
            key={`${entry.kind}-${entry.id}`}
            entry={entry}
            isOrganizer={isOrganizer}
          />
        ))}
        {entries.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            {t.emptyState}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Single wall-entry row with optional organizer moderation chrome.
 * Split out so the moderation state (pending action, confirm-modal
 * for delete) can live per-entry without re-rendering the whole
 * wall. Confirm-delete is a small inline popover rather than a
 * full-screen modal — the action is recoverable-via-soft-hide-first
 * in practice, so the friction stays proportionate.
 */
function WallEntryRow({
  entry,
  isOrganizer,
}: {
  entry: WallEntry;
  isOrganizer: boolean;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  const runHide = () =>
    startTransition(async () => {
      if (entry.kind === "guestbook") {
        await hideGuestbookEntry(entry.id);
      } else {
        await hideSlotNote(entry.id);
      }
    });

  const runUnhide = () =>
    startTransition(async () => {
      if (entry.kind === "guestbook") {
        await unhideGuestbookEntry(entry.id);
      } else {
        await unhideSlotNote(entry.id);
      }
    });

  const runDelete = () =>
    startTransition(async () => {
      if (entry.kind === "guestbook") {
        await deleteGuestbookEntry(entry.id);
      } else {
        await deleteSlotNote(entry.id);
      }
      setConfirmingDelete(false);
    });

  return (
    <div
      className={`prayer-card py-3 px-4 ${
        entry.hidden ? "opacity-60 border-dashed" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="font-medium text-sm text-navy-700">
          {entry.authorName}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDateLocale(new Date(entry.createdAt), {
            month: "short",
            day: "numeric",
          })}
        </span>
        {entry.source === "prayer-note" && (
          <span
            title="A note left by a prayer warrior when marking their commitment complete"
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold-700 font-semibold bg-gold-50 border border-gold-200 rounded-full px-1.5 py-0.5"
          >
            <HandHeart className="w-2.5 h-2.5" />
            from a prayer
          </span>
        )}
        {entry.hidden && (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold bg-cream-100 border border-cream-300 rounded-full px-1.5 py-0.5">
            Hidden
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {entry.message}
      </p>
      {isOrganizer && (
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-cream-200">
          {entry.hidden ? (
            <button
              type="button"
              onClick={runUnhide}
              disabled={pending}
              className="inline-flex items-center gap-1 text-xs text-navy-600 hover:text-navy-700 disabled:opacity-50 transition-colors"
              title="Show this entry on the public wall again"
            >
              {pending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
              Unhide
            </button>
          ) : (
            <button
              type="button"
              onClick={runHide}
              disabled={pending}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-navy-700 disabled:opacity-50 transition-colors"
              title="Hide from the public wall — reversible"
            >
              {pending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <EyeOff className="w-3 h-3" />
              )}
              Hide
            </button>
          )}
          {confirmingDelete ? (
            <span className="inline-flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1">
              Delete permanently?
              <button
                type="button"
                onClick={runDelete}
                disabled={pending}
                className="font-semibold hover:underline disabled:opacity-50"
              >
                {pending ? (
                  <Loader2 className="w-3 h-3 animate-spin inline" />
                ) : (
                  "Yes, delete"
                )}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                disabled={pending}
                className="text-muted-foreground hover:text-navy-700"
                aria-label="Cancel delete"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              disabled={pending}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-red-700 disabled:opacity-50 transition-colors ml-auto"
              title="Permanently remove from the wall and the bouquet PDF"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
