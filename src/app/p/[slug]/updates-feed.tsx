import { Newspaper } from "lucide-react";

type Update = {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  author: { name: string | null };
};

export function UpdatesFeed({ updates }: { updates: Update[] }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
        <Newspaper className="w-5 h-5 text-gold-500" />
        Updates
      </h2>

      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="prayer-card">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-heading text-base font-semibold text-navy-800">
                {update.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {update.content}
            </p>
            <p className="text-xs text-muted-foreground">
              {update.author.name || "Organizer"} &bull;{" "}
              {new Date(update.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
        {updates.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No updates yet. The organizer will post updates here.
          </p>
        )}
      </div>
    </div>
  );
}
