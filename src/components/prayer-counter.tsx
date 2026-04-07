import { prisma } from "@/lib/db";
import { Heart, Users, CalendarDays, Check } from "lucide-react";
import { CrossIcon } from "@/components/ui/catholic-icons";

export async function PrayerCounter() {
  const [activeTrains, commitments, completed] = await Promise.all([
    prisma.prayerTrain.count({ where: { status: "ACTIVE" } }),
    prisma.prayerSlot.count({
      where: { status: { in: ["CLAIMED", "COMPLETED"] } },
    }),
    prisma.prayerSlot.count({ where: { status: "COMPLETED" } }),
  ]);

  // Don't show the counter if there's no data yet
  if (commitments === 0) return null;

  return (
    <section className="py-8 -mt-6 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prayer-card shadow-lg grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-navy-800">
              {activeTrains}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 text-gold-400" />
              Active Trains
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-navy-800">
              {commitments}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-gold-400" />
              Prayer Commitments
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-navy-800">
              {completed}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5 text-gold-400" />
              Prayers Completed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
