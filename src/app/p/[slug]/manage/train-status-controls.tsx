"use client";

import { useState } from "react";
import { updateTrainStatus } from "@/lib/actions";
import { Play, Pause, CheckCircle2, Loader2 } from "lucide-react";

export function TrainStatusControls({
  trainId,
  currentStatus,
}: {
  trainId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (
    status: "ACTIVE" | "PAUSED" | "COMPLETED"
  ) => {
    setLoading(true);
    await updateTrainStatus(trainId, status);
    setLoading(false);
  };

  return (
    <div className="prayer-card mb-8">
      <h2 className="font-heading text-lg font-semibold text-navy-800 mb-3">
        Train Status
      </h2>
      <div className="flex flex-wrap gap-3">
        {currentStatus !== "ACTIVE" && (
          <button
            onClick={() => handleStatusChange("ACTIVE")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Activate
          </button>
        )}
        {currentStatus === "ACTIVE" && (
          <button
            onClick={() => handleStatusChange("PAUSED")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
            Pause
          </button>
        )}
        {currentStatus !== "COMPLETED" && (
          <button
            onClick={() => handleStatusChange("COMPLETED")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            Mark Completed
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Current status:{" "}
        <span className="font-medium">{currentStatus}</span>
        {currentStatus === "PAUSED" &&
          " — No new sign-ups while paused."}
        {currentStatus === "COMPLETED" &&
          " — The prayer train has ended. Thank you!"}
      </p>
    </div>
  );
}
