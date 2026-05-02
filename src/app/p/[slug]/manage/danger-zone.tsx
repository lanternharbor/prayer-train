"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Trash2, XCircle } from "lucide-react";
import { deletePrayerTrain, cancelPrayerTrain } from "@/lib/actions";

/**
 * Danger zone: hard-delete (when no slots are claimed) or soft-cancel
 * (otherwise) the train. Both paths require the organizer to type the
 * recipient's name as a literal-phrase confirmation. Mirrors the
 * "yes delete benji" pattern from one-off destructive scripts:
 * ambiguous "yes" or "go for it" should never trigger irreversible
 * operations.
 *
 * Server-side guards (in src/lib/actions.ts + src/lib/train-protection.ts)
 * are the actual safety boundary; this component is just the UX gate.
 */
export function DangerZone({
  trainId,
  recipientName,
  hasClaimedSlots,
  isProtected,
}: {
  trainId: string;
  recipientName: string;
  hasClaimedSlots: boolean;
  isProtected: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Protected trains (Spina) get a one-line note instead of a button.
  // Server-side will also reject any attempt; this is just the UX
  // signal that the action is unavailable.
  if (isProtected) {
    return (
      <div className="prayer-card mt-12 border-cream-300 bg-cream-50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy-700 mb-1">
              Protected
            </h2>
            <p className="text-sm text-muted-foreground">
              This prayer train is protected and cannot be deleted or
              cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const action = hasClaimedSlots ? "cancel" : "delete";
  const ServerAction = hasClaimedSlots
    ? cancelPrayerTrain
    : deletePrayerTrain;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const formData = new FormData();
    formData.set("trainId", trainId);
    formData.set("recipientNameConfirmation", confirmation);
    try {
      await ServerAction(formData);
      // The server action redirects on success, so we won't reach
      // here under normal flow. router.refresh() is a safety net for
      // any non-redirect path the action might take in the future.
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      // Next's redirect() throws a NEXT_REDIRECT-tagged error on
      // success. Surface only real errors to the user.
      if (message.includes("NEXT_REDIRECT")) return;
      setError(message);
      setPending(false);
    }
  }

  return (
    <div className="prayer-card mt-12 border-red-200 bg-red-50/30">
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-heading text-lg font-semibold text-red-700 mb-1">
            Danger zone
          </h2>
          <p className="text-sm text-muted-foreground">
            {hasClaimedSlots ? (
              <>
                Volunteers have already claimed prayer slots on this
                train. You can still cancel it (preserving the prayer
                history) but it can no longer be hard-deleted.
              </>
            ) : (
              <>
                No one has claimed a prayer slot yet, so this train can
                be deleted permanently. This action cannot be undone.
              </>
            )}
          </p>
        </div>
      </div>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            hasClaimedSlots
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {hasClaimedSlots ? (
            <XCircle className="w-4 h-4" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {hasClaimedSlots ? "Cancel train" : "Delete train"}
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="confirmation"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Type{" "}
              <span className="font-mono bg-cream-100 px-1.5 py-0.5 rounded text-navy-800 border border-cream-300">
                {recipientName}
              </span>{" "}
              to confirm
            </label>
            <input
              id="confirmation"
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="Recipient name"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400 transition text-sm"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending || !confirmation.trim()}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                hasClaimedSlots
                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {pending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : hasClaimedSlots ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {pending
                ? action === "delete"
                  ? "Deleting..."
                  : "Cancelling..."
                : action === "delete"
                  ? "Delete forever"
                  : "Cancel train"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirmation("");
                setError(null);
              }}
              disabled={pending}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              Never mind
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
