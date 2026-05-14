"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { updateTrainDetails } from "@/lib/actions";
import { formatSituation } from "@/lib/utils";
import { ParishAutocomplete } from "@/components/ui/parish-autocomplete";
import { PhotoUploadField } from "@/components/photo-upload-field";
import { Heart, Loader2, X } from "lucide-react";
import type { SituationCategory } from "@/generated/prisma/client";

const SITUATIONS: SituationCategory[] = [
  "ILLNESS",
  "SURGERY",
  "MENTAL_HEALTH",
  "GRIEF",
  "PREGNANCY",
  "FERTILITY",
  "MARRIAGE",
  "FAMILY",
  "FINANCIAL",
  "CAREER",
  "CONVERSION",
  "DISCERNMENT",
  "GENERAL",
  "OTHER",
];

/**
 * Organizer edit form for PrayerTrain content. Pre-fills every field
 * from the existing train so the organizer can see what's there and
 * fix typos in place. Photo replacement is opt-in (existing photo
 * stays unless they pick a new file).
 *
 * Submits to the updateTrainDetails server action which redirects
 * back to the manage page on success.
 */
export function EditTrainForm({
  trainId,
  slug,
  initial,
}: {
  trainId: string;
  slug: string;
  initial: {
    recipientName: string;
    recipientRelation: string | null;
    parish: string | null;
    parishId: string | null;
    location: string | null;
    intention: string;
    situation: SituationCategory;
    situationDetail: string | null;
    customPrayerText: string | null;
    recipientImageUrl: string | null;
    /** session.user.name when known. Pre-fills the organizer-name
     *  input. May be null for organizers from before PR #27. */
    organizerName: string | null;
    /** train.organizerAnonymous. Drives the checkbox + disabled-input. */
    organizerAnonymous: boolean;
  };
}) {
  const [parish, setParish] = useState(initial.parish ?? "");
  const [parishId, setParishId] = useState<string | null>(
    initial.parishId ?? null,
  );
  const [location, setLocation] = useState(initial.location ?? "");
  const [situation, setSituation] = useState<SituationCategory>(
    initial.situation,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Organizer identity. Same shape as create-flow + edit-chain-form.
  const [organizerName, setOrganizerName] = useState(
    initial.organizerName ?? "",
  );
  const [organizerAnonymous, setOrganizerAnonymous] = useState(
    initial.organizerAnonymous,
  );

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSubmitting(true);
    // Layer the controlled-state values onto the FormData so the
    // server action receives them. Uncontrolled fields are already
    // present via their `name` attributes.
    formData.set("trainId", trainId);
    formData.set("parish", parish);
    formData.set("parishId", parishId ?? "");
    formData.set("location", location);
    formData.set("situation", situation);
    formData.set("organizerName", organizerName);
    formData.set("organizerAnonymous", organizerAnonymous ? "true" : "false");
    try {
      await updateTrainDetails(formData);
    } catch (err) {
      // Server action redirects on success, so reaching here means
      // an error was thrown. Surface it inline.
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
          Use the &ldquo;Post an update&rdquo; section on the manage page to
          announce changes to the people praying with you.
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

      {/* Organizer identity. Same card shape as the create wizard +
          chain edit form. Updating User.name (when not anonymous + a
          name is present) propagates to ALL of this user's trains
          and chains. The anonymous checkbox is per-train only. */}
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
              ? "Your name is hidden on this train's public page."
              : "Shown as “Organized by [your name]” on the public page. Updating this changes your name on every train and prayer you've organized."}
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
            Show me as &ldquo;Anonymous&rdquo; on this train&apos;s page
          </span>
        </label>
      </div>

      {/* Recipient name */}
      <div>
        <label
          htmlFor="recipientName"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          Their name <span className="text-red-400">*</span>
        </label>
        <input
          id="recipientName"
          name="recipientName"
          type="text"
          required
          maxLength={80}
          defaultValue={initial.recipientName}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
      </div>

      {/* Relationship */}
      <div>
        <label
          htmlFor="recipientRelation"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          Your relationship{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (optional)
          </span>
        </label>
        <input
          id="recipientRelation"
          name="recipientRelation"
          type="text"
          maxLength={60}
          defaultValue={initial.recipientRelation ?? ""}
          placeholder="e.g., My father, Our parishioner, A friend"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
      </div>

      {/* Parish + location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Parish{" "}
            <span className="text-xs text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <ParishAutocomplete
            value={parish}
            onChange={(val, id) => {
              setParish(val);
              setParishId(id);
            }}
            onLocationFill={(loc) => {
              if (!location) setLocation(loc);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-navy-700 mb-1.5"
          >
            Location{" "}
            <span className="text-xs text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <input
            id="location"
            type="text"
            maxLength={120}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., South Shore, MA"
            className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
          />
        </div>
      </div>

      {/* Photo */}
      <PhotoUploadField
        name="recipientPhoto"
        existingImageUrl={initial.recipientImageUrl}
      />

      {/* Intention */}
      <div>
        <label
          htmlFor="intention"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          Prayer intention <span className="text-red-400">*</span>
        </label>
        <textarea
          id="intention"
          name="intention"
          required
          rows={5}
          maxLength={2000}
          defaultValue={initial.intention}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-y"
        />
      </div>

      {/* Situation */}
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-1.5">
          Situation <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SITUATIONS.map((sit) => (
            <button
              key={sit}
              type="button"
              onClick={() => setSituation(sit)}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors border ${
                situation === sit
                  ? "bg-navy-600 text-white border-navy-600"
                  : "bg-cream-50 text-navy-700 border-border hover:border-navy-300"
              }`}
            >
              {formatSituation(sit)}
            </button>
          ))}
        </div>
      </div>

      {/* Situation detail */}
      <div>
        <label
          htmlFor="situationDetail"
          className="block text-sm font-medium text-navy-700 mb-1.5"
        >
          Additional details{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (optional)
          </span>
        </label>
        <textarea
          id="situationDetail"
          name="situationDetail"
          rows={3}
          maxLength={2000}
          defaultValue={initial.situationDetail ?? ""}
          placeholder="Any additional context you'd like prayer warriors to know…"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-y"
        />
      </div>

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
          Family prayer, a friend&apos;s prayer, or words from your heart.
          Shown on the train page and in daily reminder emails.
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
          href={`/p/${slug}/manage`}
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
