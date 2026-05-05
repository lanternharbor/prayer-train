"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

/**
 * Photo-upload field with a circular preview thumbnail. Used by both
 * the create wizard / new-chain form (no existing photo) and the edit
 * forms (existing photo to start from). Pattern mirrors the photo
 * upload in src/app/create/train/create-wizard.tsx so PrayerTrains
 * and PrayerChains feel consistent.
 *
 * Renders a hidden <input type="file"> behind a clickable circle. The
 * file is included in the parent form's FormData on submit — the
 * parent is a server-action form, so no extra wiring needed.
 *
 * Optional `existingImageUrl` shows the current photo as the starting
 * thumbnail. If the user picks a new file, the preview switches to
 * the local blob URL. If they don't, no file is sent and the server
 * action keeps the existing image.
 */
export function PhotoUploadField({
  name,
  existingImageUrl,
  helpText,
}: {
  name: string;
  existingImageUrl?: string | null;
  /** Override the default help copy if a surface needs different wording. */
  helpText?: string;
}) {
  const [preview, setPreview] = useState<string | null>(
    existingImageUrl ?? null,
  );
  const [hasNewFile, setHasNewFile] = useState(false);
  const [inputKey, setInputKey] = useState(0); // bumped to clear the input
  const [error, setError] = useState<string | null>(null);

  const showingExisting = !hasNewFile && !!existingImageUrl;

  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1.5">
        Photo{" "}
        <span className="text-xs text-muted-foreground font-normal">
          (optional)
        </span>
      </label>
      <p className="text-xs text-muted-foreground mb-3">
        {helpText ??
          "A photo helps everyone praying feel connected to the person they're praying for."}
      </p>
      <div className="flex items-center gap-4">
        <label
          className="photo-upload w-20 h-20 rounded-full bg-cream-100 border-2 border-dashed border-cream-400 flex items-center justify-center overflow-hidden hover:border-gold-400 transition-colors cursor-pointer shrink-0"
          aria-label="Upload a photo of the person you're praying for"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob URL or existing remote URL; sized below sm screens
            <img
              src={preview}
              alt="Selected recipient photo preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-6 h-6 text-muted-foreground" />
          )}
          <input
            key={inputKey}
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 5 * 1024 * 1024) {
                // Inline error pattern instead of alert() — matches
                // the rest of the app (claim-modal, completion-modal,
                // create-wizard photo) so the wizard/edit flow isn't
                // jarringly interrupted by a native dialog.
                setError("Photo must be under 5MB.");
                e.target.value = "";
                return;
              }
              setError(null);
              setPreview(URL.createObjectURL(file));
              setHasNewFile(true);
            }}
          />
        </label>
        <div className="text-xs text-muted-foreground">
          {hasNewFile ? (
            <button
              type="button"
              onClick={() => {
                setPreview(existingImageUrl ?? null);
                setHasNewFile(false);
                setInputKey((k) => k + 1);
                setError(null);
              }}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              {existingImageUrl ? "Cancel — keep existing photo" : "Remove photo"}
            </button>
          ) : showingExisting ? (
            <span>Tap the circle to replace this photo.</span>
          ) : (
            <span>JPG, PNG, or WebP. Max 5MB.</span>
          )}
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-2 py-1 mt-2"
        >
          {error}
        </p>
      )}
    </div>
  );
}
