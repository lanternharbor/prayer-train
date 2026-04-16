import { prisma } from "@/lib/db";
import { Heart, Users, Check } from "lucide-react";
import { pluralize } from "@/lib/pluralize";

// Tiny numbers undermine trust. Each stat stays hidden until it's credible,
// and the whole strip disappears unless at least two stats qualify.
const MIN_ACTIVE_TRAINS = 25;
const MIN_COMMITMENTS = 500;
const MIN_COMPLETED = 250;

export async function PrayerCounter() {
  const [activeTrains, commitments, completed] = await Promise.all([
    prisma.prayerTrain.count({ where: { status: "ACTIVE" } }),
    prisma.prayerSlot.count({
      where: { status: { in: ["CLAIMED", "COMPLETED"] } },
    }),
    prisma.prayerSlot.count({ where: { status: "COMPLETED" } }),
  ]);

  const showActive = activeTrains >= MIN_ACTIVE_TRAINS;
  const showCommitments = commitments >= MIN_COMMITMENTS;
  const showCompleted = completed >= MIN_COMPLETED;

  const visibleCount = [showActive, showCommitments, showCompleted].filter(
    Boolean,
  ).length;

  // Hide the whole strip unless at least two stats are credible. No placeholder.
  if (visibleCount < 2) return null;

  const gridClass = visibleCount === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <section className="py-8 -mt-6 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`prayer-card shadow-lg grid ${gridClass} gap-4 text-center`}
        >
          {showActive && (
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-navy-800">
                {activeTrains}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Heart className="w-3.5 h-3.5 text-gold-400" />
                {pluralize(activeTrains, "Active Train")}
              </p>
            </div>
          )}
          {showCommitments && (
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-navy-800">
                {commitments}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                {pluralize(commitments, "Prayer Commitment")}
              </p>
            </div>
          )}
          {showCompleted && (
            <div>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-navy-800">
                {completed}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5 text-gold-400" />
                {pluralize(completed, "Prayer")} Completed
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
