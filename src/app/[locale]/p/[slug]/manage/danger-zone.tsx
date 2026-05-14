"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Loader2,
  Play,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  cancelPrayerTrain,
  deletePrayerTrain,
  reactivatePrayerTrain,
} from "@/lib/actions";

/**
 * Danger zone with three modes based on train state:
 *
 *   1. Protected (Spina): one-line note, no actions. Server-side will
 *      also reject any attempt; this is just the UX signal.
 *
 *   2. CANCELLED: a single "Reactivate train" button (non-destructive
 *      inverse of cancel — no recipient-name confirmation required
 *      because reactivation is itself reversible by re-cancelling).
 *
 *   3. Active / Paused: hard-delete (when no slots are claimed) or
 *      soft-cancel (otherwise). Both require typing the recipient's
 *      name as a literal-phrase confirmation, mirroring the
 *      "yes delete benji" pattern from one-off destructive scripts.
 *
 * Server-side guards (in src/lib/actions.ts + src/lib/train-protection.ts)
 * are the actual safety boundary; this component is just the UX gate.
 */
export function DangerZone({
  trainId,
  recipientName,
  status,
  hasClaimedSlots,
  isProtected,
}: {
  trainId: string;
  recipientName: string;
  status: string;
  hasClaimedSlots: boolean;
  isProtected: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // 1. Protected trains (Spina) — no actions available at all.
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

  // 2. CANCELLED — only path back is reactivation. No confirmation
  // gate; this is the inverse of a destructive action.
  if (status === "CANCELLED") {
    return (
      <div className="prayer-card mt-12 border-cream-300 bg-cream-50">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy-700 mb-1">
              This prayer train is cancelled
            </h2>
            <p className="text-sm text-muted-foreground">
              You can bring it back to active. Reminders will resume the
              next morning the cron runs; existing claims are unchanged.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={async () => {
            setError(null);
            setPending(true);
            try {
              const fd = new FormData();
              fd.set("trainId", trainId);
              await reactivatePrayerTrain(fd);
              router.refresh();
            } catch (err) {
              const message =
                err instanceof Error ? err.message : "Something went wrong.";
              if (message.includes("NEXT_REDIRECT")) return;
              setError(message);
              setPending(false);
            }
          }}
          disabled={pending}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 transition-colors"
        >
          {pending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          Reactivate train
        </button>
        {error && (
          <p className="text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg px-3 py-2 mt-3">
            {error}
          </p>
        )}
      </div>
    );
  }

  // 3. Active / Paused — destructive actions available with the
  // confirm-by-typing gate.
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
                history and notifying everyone who committed) but it
                can no longer be hard-deleted.
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
