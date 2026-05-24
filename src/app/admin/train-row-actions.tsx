"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  toggleTrainVisibility,
  updateTrainStatus,
  cancelPrayerTrain,
} from "@/lib/actions";

type Props = {
  trainId: string;
  slug: string;
  recipientName: string;
  status: string;
  isPublic: boolean;
  isProtected: boolean;
};

// Compact row of admin actions. Toggle visibility is one-click because
// it's reversible. Mark-complete and cancel both trigger outbound email
// cascades (bouquet to organizer + warriors; cancellation notice to
// claimers + warriors), so they're gated behind a type-the-slug confirm
// pattern that mirrors the destructive-op auth style used elsewhere.
export function TrainRowActions({
  trainId,
  slug,
  recipientName,
  status,
  isPublic,
  isProtected,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmMode, setConfirmMode] = useState<
    null | "cancel" | "complete"
  >(null);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canCancel =
    !isProtected && status !== "CANCELLED" && status !== "COMPLETED";
  const canComplete = !isProtected && status !== "COMPLETED";

  function handleToggleVisibility() {
    setError(null);
    startTransition(async () => {
      try {
        await toggleTrainVisibility(trainId, !isPublic);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Toggle failed.");
      }
    });
  }

  function handleConfirm() {
    if (confirmText !== slug) {
      setError(`Type "${slug}" exactly to confirm.`);
      return;
    }
    setError(null);
    if (confirmMode === "complete") {
      startTransition(async () => {
        try {
          await updateTrainStatus(trainId, "COMPLETED");
          setConfirmMode(null);
          setConfirmText("");
          router.refresh();
        } catch (e) {
          setError(e instanceof Error ? e.message : "Action failed.");
        }
      });
    } else if (confirmMode === "cancel") {
      startTransition(async () => {
        try {
          const fd = new FormData();
          fd.set("trainId", trainId);
          fd.set("recipientNameConfirmation", recipientName);
          await cancelPrayerTrain(fd);
        } catch (e) {
          // cancelPrayerTrain ends in redirect() which Next throws as a
          // signal; treat it as success. Other thrown Errors are real.
          const msg = e instanceof Error ? e.message : "";
          const isRedirect =
            msg.startsWith("NEXT_REDIRECT") || msg === "NEXT_REDIRECT";
          if (!isRedirect) {
            setError(msg || "Cancellation failed.");
            return;
          }
          setConfirmMode(null);
          setConfirmText("");
          router.refresh();
        }
      });
    }
  }

  if (confirmMode) {
    return (
      <div className="inline-flex flex-col items-end gap-1">
        <div className="text-xs text-stone-600">
          Type <span className="font-mono text-stone-900">{slug}</span>:
        </div>
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="text-xs px-2 py-1 border border-stone-300 rounded font-mono w-44"
            placeholder={slug}
            autoFocus
          />
          <button
            onClick={handleConfirm}
            disabled={pending || confirmText !== slug}
            className={
              confirmMode === "cancel"
                ? "text-xs px-2 py-1 rounded bg-red-700 text-white disabled:opacity-50"
                : "text-xs px-2 py-1 rounded bg-sky-700 text-white disabled:opacity-50"
            }
          >
            {pending
              ? "…"
              : confirmMode === "cancel"
                ? "Cancel train"
                : "Mark complete"}
          </button>
          <button
            onClick={() => {
              setConfirmMode(null);
              setConfirmText("");
              setError(null);
            }}
            disabled={pending}
            className="text-xs px-2 py-1 rounded border border-stone-300 hover:bg-stone-100"
          >
            Back
          </button>
        </div>
        {error && (
          <p role="alert" className="text-xs text-red-700">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center justify-end gap-1">
        <button
          onClick={handleToggleVisibility}
          disabled={pending}
          className="text-xs px-2 py-1 rounded border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-50"
        >
          {isPublic ? "Make private" : "Make public"}
        </button>
        {canComplete && (
          <button
            onClick={() => {
              setConfirmMode("complete");
              setError(null);
            }}
            disabled={pending}
            className="text-xs px-2 py-1 rounded border border-sky-300 text-sky-800 bg-sky-50 hover:bg-sky-100 disabled:opacity-50"
          >
            Complete
          </button>
        )}
        {canCancel && (
          <button
            onClick={() => {
              setConfirmMode("cancel");
              setError(null);
            }}
            disabled={pending}
            className="text-xs px-2 py-1 rounded border border-red-300 text-red-800 bg-red-50 hover:bg-red-100 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
