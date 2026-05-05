"use client";

import { useState } from "react";
import { markSlotComplete } from "@/lib/actions";
import { Check, Loader2 } from "lucide-react";

export function MarkCompleteButton({ slotId }: { slotId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await markSlotComplete(slotId);
    } catch (err) {
      // Mirror the inline-error pattern used in claim-modal.tsx so the
      // dashboard surfaces failures the same way the rest of the app does
      // — no native alert() interruption, just a calm message under the
      // button that the user can retry past.
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Could not mark as complete. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded hover:bg-navy-700 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Check className="w-3 h-3" />
        )}
        Mark Prayed
      </button>
      {error && (
        <p
          role="alert"
          className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 max-w-xs text-right"
        >
          {error}
        </p>
      )}
    </div>
  );
}
