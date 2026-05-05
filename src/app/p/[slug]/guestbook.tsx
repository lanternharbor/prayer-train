"use client";

import { useState } from "react";
import { postGuestbookEntry } from "@/lib/actions";
import { MessageCircle, Send, Loader2, HandHeart } from "lucide-react";

/**
 * Unified encouragement-wall entry. Two sources today:
 *   - "guestbook"    — explicit wall posts via the form below
 *   - "prayer-note"  — slot completion notes where the claimer
 *                      opted to surface their note on the wall
 *
 * Source-badge rendering distinguishes them in the entry list so the
 * provenance is legible. The component takes a pre-merged array so
 * the page (server) controls the sort + cap; this client component
 * just renders.
 */
export type WallEntry = {
  id: string;
  createdAt: Date;
  authorName: string;
  message: string;
  source: "guestbook" | "prayer-note";
};

export function Guestbook({
  entries,
  trainId,
}: {
  entries: WallEntry[];
  trainId: string;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.set("trainId", trainId);
    formData.set("authorName", name);
    formData.set("message", message);
    await postGuestbookEntry(formData);
    setMessage("");
    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-gold-500" />
        Encouragement Wall
      </h2>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="prayer-card mb-4 space-y-3">
        <label htmlFor="guestbook-name" className="sr-only">
          Your name
        </label>
        <input
          id="guestbook-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
        <label htmlFor="guestbook-message" className="sr-only">
          Message of encouragement
        </label>
        <textarea
          id="guestbook-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message of encouragement..."
          required
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          Post
        </button>
      </form>

      {/* Entries — both guestbook posts and shared prayer notes,
          rendered with the same chrome plus a small "from a prayer"
          badge on the slot-sourced ones so the provenance is clear. */}
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="prayer-card py-3 px-4">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-sm text-navy-700">
                {entry.authorName}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(entry.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {entry.source === "prayer-note" && (
                <span
                  title="A note left by a prayer warrior when marking their commitment complete"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold-700 font-semibold bg-gold-50 border border-gold-200 rounded-full px-1.5 py-0.5"
                >
                  <HandHeart className="w-2.5 h-2.5" />
                  from a prayer
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {entry.message}
            </p>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            Be the first to leave an encouraging message!
          </p>
        )}
      </div>
    </div>
  );
}
