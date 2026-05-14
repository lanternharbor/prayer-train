"use client";

import { useState } from "react";
import { toggleTrainVisibility } from "@/lib/actions";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function VisibilityToggle({
  trainId,
  currentlyPublic,
}: {
  trainId: string;
  currentlyPublic: boolean;
}) {
  const [isPublic, setIsPublic] = useState(currentlyPublic);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newValue = !isPublic;
    await toggleTrainVisibility(trainId, newValue);
    setIsPublic(newValue);
    setLoading(false);
  };

  return (
    <div className="prayer-card mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h2 className="font-heading text-lg font-semibold text-navy-800 flex items-center gap-2">
            {isPublic ? (
              <Eye className="w-5 h-5 text-green-500" />
            ) : (
              <EyeOff className="w-5 h-5 text-muted-foreground" />
            )}
            Public Directory
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isPublic
              ? "This prayer train is listed on the public directory. Anyone can find it."
              : "This prayer train is private. Only people with the direct link can see it."}
          </p>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading}
          role="switch"
          aria-checked={isPublic}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors disabled:opacity-50 ${
            isPublic ? "bg-gold-400" : "bg-cream-400"
          }`}
        >
          {loading ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            </span>
          ) : (
            <span
              className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-sm transform transition-transform ${
                isPublic ? "translate-x-5" : "translate-x-0"
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
}
