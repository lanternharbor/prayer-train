"use client";

import { useState } from "react";
import { setUserDisplayName } from "@/lib/actions";
import { Loader2, UserCircle } from "lucide-react";

/**
 * One-time backfill prompt for organizers whose User.name is null.
 *
 * Background: until PR #27, the create wizard didn't capture the
 * organizer's name and magic-link sign-in left User.name=null. Trains
 * those organizers created display as "Organized by Anonymous" — not a
 * choice they made, just a silent fallback.
 *
 * This card surfaces on /dashboard the next time an affected organizer
 * signs in. Submitting their name retroactively populates User.name,
 * which makes every existing train + chain they've organized
 * immediately render with the correct name (the per-train
 * organizerAnonymous flag defaults to false, so display falls through
 * to User.name).
 *
 * Card disappears once the action completes — the dashboard server
 * component reads session.user.name and only renders this child when
 * it's still falsy. The setUserDisplayName action calls
 * revalidatePath("/dashboard") so the next render sees the new name.
 */
export function SetNameCard() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await setUserDisplayName(name);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Couldn't save your name. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prayer-card mb-8 bg-gold-50 border-gold-200">
      <div className="flex items-start gap-3 mb-3">
        <UserCircle className="w-6 h-6 text-gold-600 shrink-0" />
        <div>
          <h2 className="font-heading text-lg font-semibold text-navy-800">
            Add your name
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            People who pray with you will see &ldquo;Organized by [your
            name]&rdquo; on every PrayerTrain you&apos;ve started. You can
            always choose to stay anonymous on individual trains by
            checking the option when you create them.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder="e.g., William Keough"
          className="flex-1 px-4 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
          required
        />
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          Save
        </button>
      </form>
      {error && (
        <p
          role="alert"
          className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-2"
        >
          {error}
        </p>
      )}
    </div>
  );
}
