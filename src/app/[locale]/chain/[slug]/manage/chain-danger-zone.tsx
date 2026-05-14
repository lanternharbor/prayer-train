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
  cancelPrayerChain,
  deletePrayerChain,
  reactivatePrayerChain,
} from "@/lib/actions";

/**
 * Chain-side parallel of /p/[slug]/manage/danger-zone. Same three
 * modes (Protected, CANCELLED, ACTIVE/PAUSED), same confirm-by-typing
 * UX, but the confirmation label can be EITHER the recipient name
 * (when present) OR the first ~80 chars of the intention (when the
 * chain has no recipientName because it's for a generic intention
 * like "discernment"). Server actions in src/lib/actions.ts apply the
 * same matcher.
 */
export function ChainDangerZone({
  chainId,
  confirmationLabel,
  status,
  hasMembers,
  isProtected,
}: {
  chainId: string;
  confirmationLabel: string;
  status: string;
  hasMembers: boolean;
  isProtected: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // 1. Protected chains — no actions. Currently no chains are
  // protected; isProtectedChain() always returns false. The branch
  // exists for symmetry with the train side.
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
              This shared prayer is protected and cannot be deleted or
              cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. CANCELLED — only path back is reactivation.
  if (status === "CANCELLED") {
    return (
      <div className="prayer-card mt-12 border-cream-300 bg-cream-50">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy-700 mb-1">
              This shared prayer is cancelled
            </h2>
            <p className="text-sm text-muted-foreground">
              You can bring it back to active. Reminders will resume the
              next morning the cron runs; existing memberships are
              unchanged.
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
              fd.set("chainId", chainId);
              await reactivatePrayerChain(fd);
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
          Reactivate prayer
        </button>
        {error && (
          <p className="text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg px-3 py-2 mt-3">
            {error}
          </p>
        )}
      </div>
    );
  }

  // 3. Active / Paused — destructive actions with confirm-by-typing.
  const action = hasMembers ? "cancel" : "delete";
  const ServerAction = hasMembers ? cancelPrayerChain : deletePrayerChain;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const formData = new FormData();
    formData.set("chainId", chainId);
    formData.set("confirmation", confirmation);
    try {
      await ServerAction(formData);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
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
            {hasMembers ? (
              <>
                People have already joined this shared prayer. You can
                still cancel it (preserving the prayer history and
                notifying every active member) but it can no longer be
                hard-deleted.
              </>
            ) : (
              <>
                No one has joined this shared prayer yet, so it can be
                deleted permanently. This action cannot be undone.
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
            hasMembers
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {hasMembers ? (
            <XCircle className="w-4 h-4" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {hasMembers ? "Cancel prayer" : "Delete prayer"}
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
                {confirmationLabel}
              </span>{" "}
              to confirm
            </label>
            <input
              id="confirmation"
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="Type to confirm"
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
                hasMembers
                  ? "bg-yellow-600 text-white hover:bg-yellow-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {pending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : hasMembers ? (
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
                  : "Cancel prayer"}
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
