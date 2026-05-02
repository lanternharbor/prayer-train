"use client";

import { useEffect, useState } from "react";
import { joinPrayerChain } from "@/lib/actions";
import { X, Heart, Loader2 } from "lucide-react";

export function JoinChainModal({
  chainId,
  organizerFirstName,
  recipientPhrase,
  durationDays,
  onClose,
}: {
  chainId: string;
  organizerFirstName: string;
  recipientPhrase: string;
  durationDays: number;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape — matches the claim-modal pattern
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("chainId", chainId);
      formData.set("name", name);
      formData.set("email", email);
      await joinPrayerChain(formData);
      setSuccess(true);
    } catch (err) {
      // Surface the server-side error message. joinPrayerChain throws
      // "This prayer is no longer accepting new members." for cancelled
      // or completed chains; surface that verbatim instead of a generic
      // browser alert.
      const msg =
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 backdrop-blur-sm px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chain-join-success-title"
      >
        <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-gold-600 fill-gold-600" />
          </div>
          <h2
            id="chain-join-success-title"
            className="font-heading text-2xl font-bold text-navy-800 mb-2"
          >
            Welcome, {name}.
          </h2>
          <p className="text-muted-foreground mb-2">
            You&apos;re praying with {organizerFirstName} {recipientPhrase}.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ll send a daily reminder to <strong>{email}</strong> for the
            next {durationDays} days.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chain-join-title"
    >
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="chain-join-title"
            className="font-heading text-xl font-semibold text-navy-800"
          >
            Pray along with {organizerFirstName}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close join dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          {durationDays} days, starting today. We&apos;ll send a daily email
          with the prayer text. You can unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="join-name"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Your name
            </label>
            <input
              id="join-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              placeholder="First & last name"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>
          <div>
            <label
              htmlFor="join-email"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Email (for daily reminders)
            </label>
            <input
              id="join-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>
          {error && (
            <p
              role="alert"
              className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className="w-4 h-4" />
            )}
            {loading ? "Joining..." : "I'll pray"}
          </button>
        </form>
      </div>
    </div>
  );
}
