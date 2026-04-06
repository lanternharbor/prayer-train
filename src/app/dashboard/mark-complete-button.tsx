"use client";

import { useState } from "react";
import { markSlotComplete } from "@/lib/actions";
import { Check, Loader2 } from "lucide-react";

export function MarkCompleteButton({ slotId }: { slotId: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await markSlotComplete(slotId);
    } catch {
      alert("Could not mark as complete.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
