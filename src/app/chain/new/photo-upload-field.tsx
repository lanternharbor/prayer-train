"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

/**
 * Photo-upload field with a circular preview thumbnail. Mirrors the photo
 * upload in src/app/create/train/create-wizard.tsx so PrayerTrains and
 * PrayerChains feel consistent.
 *
 * Renders a hidden <input type="file"> behind a clickable circle. The file
 * is included in the parent form's FormData on submit — the parent is a
 * server-action form, so no extra wiring needed.
 */
export function PhotoUploadField({ name }: { name: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [hasFile, setHasFile] = useState(false);
  const [inputKey, setInputKey] = useState(0); // bumped to clear the input

  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1.5">
        Photo{" "}
        <span className="text-xs text-muted-foreground font-normal">
          (optional)
        </span>
      </label>
      <p className="text-xs text-muted-foreground mb-3">
        A photo helps everyone praying feel connected to the person they&apos;re
        praying for.
      </p>
      <div className="flex items-center gap-4">
        <label
          className="photo-upload w-20 h-20 rounded-full bg-cream-100 border-2 border-dashed border-cream-400 flex items-center justify-center overflow-hidden hover:border-gold-400 transition-colors cursor-pointer shrink-0"
          aria-label="Upload a photo of the person you're praying for"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob URL
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
                alert("Photo must be under 5MB.");
                e.target.value = "";
                return;
              }
              setPreview(URL.createObjectURL(file));
              setHasFile(true);
            }}
          />
        </label>
        <div className="text-xs text-muted-foreground">
          {hasFile ? (
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setHasFile(false);
                setInputKey((k) => k + 1);
              }}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Remove photo
            </button>
          ) : (
            <span>JPG, PNG, or WebP. Max 5MB.</span>
          )}
        </div>
      </div>
    </div>
  );
}
