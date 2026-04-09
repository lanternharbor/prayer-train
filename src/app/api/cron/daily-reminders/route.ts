import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendDailyReminder } from "@/lib/email";

// Vercel Cron hits this endpoint daily at 7:00 AM ET
// Configured in vercel.json

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Find all claimed slots for today that haven't been completed
  const slotsToRemind = await prisma.prayerSlot.findMany({
    where: {
      date: { gte: today, lt: tomorrow },
      status: "CLAIMED",
      claimerEmail: { not: null },
      train: { status: "ACTIVE" },
    },
    include: {
      train: true,
      prayerType: true,
      claimedBy: { select: { email: true, name: true } },
    },
  });

  let sent = 0;
  let errors = 0;

  for (const slot of slotsToRemind) {
    const email = slot.claimedBy?.email || slot.claimerEmail;
    const name = slot.claimedBy?.name || slot.claimerName || "Friend";

    if (!email) continue;

    try {
      const baseUrl = process.env.NEXTAUTH_URL || "https://prayertrains.com";
      await sendDailyReminder({
        to: email,
        claimerName: name,
        recipientName: slot.train.recipientName,
        prayerName: slot.prayerType.name,
        prayerText: slot.prayerType.prayerText,
        prayerInstructions: slot.prayerType.instructions,
        trainUrl: `${baseUrl}/p/${slot.train.slug}`,
        slotId: slot.id,
      });
      sent++;
    } catch (e) {
      console.error(`Failed to send reminder for slot ${slot.id}:`, e);
      errors++;
    }
  }

  return NextResponse.json({
    ok: true,
    date: today.toISOString(),
    slotsFound: slotsToRemind.length,
    sent,
    errors,
  });
}
