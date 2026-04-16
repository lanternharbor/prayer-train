"use client";

import { useState } from "react";
import { postGuestbookEntry } from "@/lib/actions";
import { track } from "@/lib/analytics";
import { MessageCircle, Send, Loader2 } from "lucide-react";

type GuestbookEntry = {
  id: string;
  createdAt: Date;
  authorName: string;
  message: string;
};

export function Guestbook({
  entries,
  trainId,
}: {
  entries: GuestbookEntry[];
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
    track("guestbook_posted");
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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full px-3 py-2 border border-border rounded-lg bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
        <textarea
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

      {/* Entries */}
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="prayer-card py-3 px-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-navy-700">
                {entry.authorName}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(entry.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
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
