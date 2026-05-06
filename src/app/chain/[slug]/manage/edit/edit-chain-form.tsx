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
    /** session.user.name when known. Pre-fills the organizer-name
     *  input. May be null for organizers who created their chain
     *  before PR #27 added name capture. */
    organizerName: string | null;
    /** chain.organizerAnonymous. Drives the checkbox initial state
     *  + the disabled-name-input behavior. */
    organizerAnonymous: boolean;
  };
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Organizer identity. Pre-filled from props so the form reflects
  // the current state rather than always defaulting to anonymous.
  const [organizerName, setOrganizerName] = useState(
    initial.organizerName ?? "",
  );
  const [organizerAnonymous, setOrganizerAnonymous] = useState(
    initial.organizerAnonymous,
  );

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSubmitting(true);
    formData.set("chainId", chainId);
    formData.set("organizerName", organizerName);
    formData.set("organizerAnonymous", organizerAnonymous ? "true" : "false");
    try {
      await updateChainDetails(formData);
    } catch (err) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong saving your changes.";
      setError(msg);
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

      {error && (
        <p
          role="alert"
          className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
        >
          {error}
        </p>
      )}

      {/* Organizer identity. Same shape as the create-flow
          organizer-identity card. Updates User.name (which propagates
          to ALL of this user's trains + chains) when name is provided
          and anonymous is unchecked. Anonymous-flag changes are per-
          chain only. */}
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-4 space-y-3">
        <div>
          <label
            htmlFor="organizerName"
            className="block text-sm font-medium text-navy-700 mb-1.5"
          >
            Your name{" "}
            {!organizerAnonymous && <span className="text-red-400">*</span>}
          </label>
          <input
            id="organizerName"
            type="text"
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
            disabled={organizerAnonymous}
            maxLength={80}
            placeholder="How you'd like to appear on the prayer page"
            className="w-full px-4 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            {organizerAnonymous
              ? "Your name is hidden on this prayer's public page."
              : "Shown as “Organized by [your name]” on the public page. Updating this changes your name on every prayer you've organized."}
          </p>
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={organizerAnonymous}
            onChange={(e) => setOrganizerAnonymous(e.target.checked)}
            className="mt-0.5"
          />
          <span className="text-sm text-navy-700">
            Show me as &ldquo;Anonymous&rdquo; on this prayer&apos;s page
          </span>
        </label>
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
