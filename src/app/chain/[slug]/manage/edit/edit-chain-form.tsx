"use client";

import { useState } from "react";
import Link from "next/link";
import { updateChainDetails } from "@/lib/actions";
import { PhotoUploadField } from "@/components/photo-upload-field";
import { Heart, Loader2, X } from "lucide-react";

/**
 * Organizer edit form for the pray-together format. Fewer fields than
 * the train edit form because chains are tied tightly to a single
 * prayer-type plus a date range — neither of which is editable post-
 * creation. Members joined for THIS prayer; the schedule is pinned.
 *
 * Submits to the updateChainDetails server action which redirects
 * back to the manage page on success.
 */
export function EditChainForm({
  chainId,
  slug,
  initial,
}: {
  chainId: string;
  slug: string;
  initial: {
    recipientName: string | null;
    intention: string;
    customPrayerText: string | null;
    recipientImageUrl: string | null;
  };
}) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    formData.set("chainId", chainId);
    try {
      await updateChainDetails(formData);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong saving your changes.";
      alert(msg);
      setSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="prayer-card bg-cream-50 border-cream-300">
        <p className="text-sm text-muted-foreground">
          <strong className="text-navy-700">Editing this won&apos;t email
          anyone.</strong>{" "}
          The next daily reminder will use the updated text. Members already
          joined for the prayer they signed up for; the schedule and prayer
          aren&apos;t editable.
        </p>
      </div>

      {/* Recipient name */}
      <div>
        <label
          htmlFor="recipientName"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          Who is this for?{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (optional)
          </span>
        </label>
        <input
          id="recipientName"
          name="recipientName"
          type="text"
          maxLength={80}
          defaultValue={initial.recipientName ?? ""}
          placeholder="e.g., Benji, my sister, the unborn"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Leave blank if the prayer is for an intention rather than a person.
        </p>
      </div>

      {/* Intention */}
      <div>
        <label
          htmlFor="intention"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          What&apos;s the intention? <span className="text-red-400">*</span>
        </label>
        <textarea
          id="intention"
          name="intention"
          required
          rows={4}
          maxLength={2000}
          defaultValue={initial.intention}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-y"
        />
      </div>

      {/* Photo */}
      <PhotoUploadField
        name="recipientPhoto"
        existingImageUrl={initial.recipientImageUrl}
      />

      {/* Custom prayer text */}
      <div>
        <label
          htmlFor="customPrayerText"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          A personal prayer to include{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (optional)
          </span>
        </label>
        <p className="text-xs text-muted-foreground mb-2">
          A family prayer, a friend&apos;s prayer, or words from your heart.
          Shown on the prayer page and in the daily reminder.
        </p>
        <textarea
          id="customPrayerText"
          name="customPrayerText"
          rows={4}
          maxLength={4000}
          defaultValue={initial.customPrayerText ?? ""}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-y"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <Link
          href={`/chain/${slug}/manage`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
          {submitting ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
