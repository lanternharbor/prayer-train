import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public API for global prayer stats
// Used by the landing page and embeddable widget

export async function GET() {
  const [totalTrains, totalSlots, completedSlots, claimedSlots, totalPrayerWarriors] =
    await Promise.all([
      prisma.prayerTrain.count({ where: { status: "ACTIVE" } }),
      prisma.prayerSlot.count(),
      prisma.prayerSlot.count({ where: { status: "COMPLETED" } }),
      prisma.prayerSlot.count({ where: { status: "CLAIMED" } }),
      prisma.prayerSlot.count({
        where: {
          claimerEmail: { not: null },
          status: { in: ["CLAIMED", "COMPLETED"] },
        },
      }),
    ]);

  return NextResponse.json(
    {
      activeTrains: totalTrains,
      totalPrayerCommitments: claimedSlots + completedSlots,
      prayersCompleted: completedSlots,
      totalSlots,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
