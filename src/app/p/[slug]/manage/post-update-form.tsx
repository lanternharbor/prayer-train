"use client";

import { useState } from "react";
import { postTrainUpdate } from "@/lib/actions";
import { Send, Loader2 } from "lucide-react";

export function PostUpdateForm({ trainId }: { trainId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.set("trainId", trainId);
    formData.set("title", title);
    formData.set("content", content);
    await postTrainUpdate(formData);
    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="prayer-card space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-1.5">
          Update title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Good news from the doctor"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-1.5">
          Update details
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          placeholder="Share an update about the recipient's situation..."
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {loading ? "Posting..." : "Post Update"}
      </button>
    </form>
  );
}
