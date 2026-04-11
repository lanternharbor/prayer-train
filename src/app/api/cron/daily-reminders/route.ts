import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";
import { sendDailyReminder } from "@/lib/email";
import { getBaseUrl } from "@/lib/url";

// Vercel Cron hits this endpoint daily at 11:00 UTC.
// Schedule is in vercel.json. Authorization is the standard Vercel
// pattern: Bearer ${CRON_SECRET} — see
// https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs

function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    // Refuse to run without a secret rather than silently allowing all
    // traffic. This catches misconfigured deploys early.
    console.error("[cron] CRON_SECRET is not set; refusing all invocations");
    return false;
  }
  const header = request.headers.get("authorization") ?? "";
  const expectedHeader = `Bearer ${expected}`;

  // Length-prefixed timing-safe compare. timingSafeEqual throws on
  // length mismatch, so equalize lengths first.
  const a = Buffer.from(header);
  const b = Buffer.from(expectedHeader);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Find all claimed slots for today that haven't been completed.
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
  const baseUrl = getBaseUrl();

  for (const slot of slotsToRemind) {
    const email = slot.claimedBy?.email || slot.claimerEmail;
    const name = slot.claimedBy?.name || slot.claimerName || "Friend";

    if (!email) continue;

    try {
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
      console.error(`[cron] failed to send reminder for slot ${slot.id}:`, e);
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
