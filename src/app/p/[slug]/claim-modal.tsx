"use client";

import { useState } from "react";
import { claimPrayerSlot } from "@/lib/actions";
import { X, Heart, Loader2, CalendarDays } from "lucide-react";

type Slot = {
  id: string;
  date: Date;
  slotIndex: number;
  prayerType: {
    id: string;
    name: string;
    duration: number;
    daysRequired: number;
    category: string;
  };
};

export function ClaimModal({
  slot,
  onClose,
}: {
  slot: Slot;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isNovena = slot.prayerType.daysRequired > 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("slotId", slot.id);
      formData.set("claimerName", name);
      formData.set("claimerEmail", email);
      await claimPrayerSlot(formData);
      setSuccess(true);
    } catch {
      alert("Something went wrong. The slot may have already been claimed.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 backdrop-blur-sm px-4">
        <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 text-gold-600 fill-gold-600" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-navy-800 mb-2">
            Thank you, {name}!
          </h2>
          <p className="text-muted-foreground mb-2">
            You&apos;ve committed to pray the{" "}
            <strong>{slot.prayerType.name}</strong>.
          </p>
          {isNovena && (
            <p className="text-sm text-gold-600 bg-gold-50 rounded-lg p-3 mb-4">
              <CalendarDays className="w-4 h-4 inline mr-1" />
              Since this is a {slot.prayerType.daysRequired}-day devotion,
              you&apos;re committed for all {slot.prayerType.daysRequired} days.
            </p>
          )}
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ll send reminders to <strong>{email}</strong> on your
            committed days.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 backdrop-blur-sm px-4">
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-semibold text-navy-800">
            Sign Up to Pray
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-cream-50 rounded-lg p-3 mb-5 border border-cream-300">
          <p className="text-sm font-medium text-navy-700">
            {slot.prayerType.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {slot.prayerType.duration} min &bull;{" "}
            {new Date(slot.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          {isNovena && (
            <p className="text-xs text-gold-600 mt-1">
              This is a {slot.prayerType.daysRequired}-day commitment &mdash;
              claiming Day 1 commits you to all {slot.prayerType.daysRequired}{" "}
              days.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Your name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First & last name"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Email (for reminders)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
          </div>
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
            {loading ? "Claiming..." : "I'll Pray"}
          </button>
        </form>
      </div>
    </div>
  );
}
