"use client";

import { useEffect, useState } from "react";
import { addPrayerWarrior } from "@/lib/actions";
import { HandHeart, Loader2, X } from "lucide-react";

/**
 * "Add yourself as a prayer warrior" CTA — surfaced as the primary
 * affordance on the train detail page when every slot is already
 * claimed. Mirrors the claim-modal client pattern (controlled inputs,
 * server-action submit, optimistic success state) so the UX feels
 * consistent with claiming a slot.
 *
 * Renders both the button and the modal. Parent component just drops
 * <AddWarriorButton trainId={...} recipientName={...} /> into the page.
 */
export function AddWarriorButton({
  trainId,
  recipientName,
}: {
  trainId: string;
  recipientName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors"
      >
        <HandHeart className="w-4 h-4" />
        Add yourself as a prayer warrior
      </button>
      {open && (
        <AddWarriorModal
          trainId={trainId}
          recipientName={recipientName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function AddWarriorModal({
  trainId,
  recipientName,
  onClose,
}: {
  trainId: string;
  recipientName: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape — same affordance as the claim modal.
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
      formData.set("trainId", trainId);
      formData.set("name", name);
      formData.set("email", email);
      if (message.trim()) formData.set("message", message);
      await addPrayerWarrior(formData);
      setSuccess(true);
    } catch (err) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 backdrop-blur-sm px-4">
        <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
            <HandHeart className="w-7 h-7 text-gold-600 fill-gold-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-navy-800 mb-2">
            Thank you, {name}.
          </h2>
          <p className="text-muted-foreground mb-2">
            You&apos;re praying for <strong>{recipientName}</strong>.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ve sent a confirmation to <strong>{email}</strong>. When
            the prayer train ends, we&apos;ll send a closing note with the
            full spiritual bouquet.
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
      aria-labelledby="warrior-dialog-title"
    >
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            id="warrior-dialog-title"
            className="font-heading text-xl font-semibold text-navy-800"
          >
            Add yourself as a prayer warrior
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close prayer-warrior dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          Pledge to pray for <strong>{recipientName}</strong>. There&apos;s no
          specific time or commitment — pray however and whenever you can.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="warrior-name"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Your name
            </label>
            <input
              id="warrior-name"
              type="text"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First & last name"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>
          <div>
            <label
              htmlFor="warrior-email"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="warrior-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              We&apos;ll send a confirmation now and a closing note when the
              prayer train ends. No daily reminders.
            </p>
          </div>
          <div>
            <label
              htmlFor="warrior-message"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              A short prayer or note{" "}
              <span className="text-xs text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="warrior-message"
              rows={3}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`I'm praying that…`}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
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
            disabled={loading || !name.trim() || !email.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <HandHeart className="w-4 h-4" />
            )}
            {loading ? "Pledging…" : "I'll pray"}
          </button>
        </form>
      </div>
    </div>
  );
}
