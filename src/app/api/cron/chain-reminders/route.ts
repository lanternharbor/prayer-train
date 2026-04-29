import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";
import { sendChainDailyReminder } from "@/lib/email";
import { getBaseUrl } from "@/lib/url";

/**
 * Vercel Cron hits this endpoint daily at 11:05 UTC — five minutes after the
 * train daily-reminders cron runs at 11:00. The 5-minute offset is the
 * safety mechanism: if anything in this handler throws, the train cron has
 * already completed its work for the day, so the live Spina-train daily
 * reminders are physically unaffected by failures here.
 *
 * This is a deliberately separate file from daily-reminders/route.ts so
 * that a code change here cannot accidentally touch the train code path.
 *
 * Schedule lives in vercel.json. Authorization is the Vercel Bearer
 * pattern with CRON_SECRET — same secret as the train cron.
 */

function isAuthorized(request: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    console.error("[chain-cron] CRON_SECRET is not set; refusing all invocations");
    return false;
  }
  const header = request.headers.get("authorization") ?? "";
  const expectedHeader = `Bearer ${expected}`;
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

  // Find every active chain whose schedule covers today (startDate <= today
  // <= endDate). For each, dispatch a personalized reminder to every active
  // (non-unsubscribed) member.
  const activeChains = await prisma.prayerChain.findMany({
    where: {
      status: "ACTIVE",
      startDate: { lte: today },
      endDate: { gte: today },
    },
    include: {
      organizer: { select: { name: true } },
      prayerType: {
        select: { name: true, prayerText: true, instructions: true },
      },
      members: {
        where: { unsubscribedAt: null },
        select: { id: true, name: true, email: true },
      },
    },
  });

  let sent = 0;
  let errors = 0;
  let chainsProcessed = 0;
  const baseUrl = getBaseUrl();

  for (const chain of activeChains) {
    chainsProcessed++;

    // 1-indexed day number within the chain.
    const dayNum =
      Math.floor(
        (today.getTime() - new Date(chain.startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    const chainUrl = `${baseUrl}/chain/${chain.slug}`;

    for (const member of chain.members) {
      const otherCount = chain.members.length - 1;

      // markCompleteUrl carries memberId (cuid) + day so the receiver
      // can check off the day with one click. The link calls a server
      // action via a small handler page; for now we point at the chain
      // detail with a query param (the page will read it client-side
      // in a follow-up commit). Switched away from raw email per Codex
      // audit — memberId is the same identifier shape we use for
      // unsubscribe tokens and isn't trivially guessable.
      const markCompleteUrl = `${chainUrl}?markDay=${dayNum}&memberId=${encodeURIComponent(
        member.id,
      )}`;
      const unsubscribeUrl = `${baseUrl}/api/chain/unsubscribe?id=${member.id}`;

      try {
        await sendChainDailyReminder({
          to: member.email,
          memberName: member.name,
          organizerName: chain.organizer?.name ?? "the organizer",
          prayerName: chain.prayerType.name,
          prayerText: chain.prayerType.prayerText,
          prayerInstructions: chain.prayerType.instructions,
          customPrayerText: chain.customPrayerText,
          recipientName: chain.recipientName,
          intention: chain.intention,
          day: dayNum,
          durationDays: chain.durationDays,
          chainUrl,
          markCompleteUrl,
          unsubscribeUrl,
          otherMembersCount: otherCount,
        });
        sent++;
      } catch (e) {
        console.error(
          `[chain-cron] failed to send reminder for chain ${chain.id} member ${member.id}:`,
          e,
        );
        errors++;
      }
    }
  }

  // Heartbeat ping. Same opt-in env-var pattern as the train cron — see
  // docs/operational-safety.md for the Healthchecks.io setup. Wrapped to
  // never throw so a Healthchecks outage cannot mask a successful run.
  const healthcheckUrl = process.env.HEALTHCHECKS_CHAIN_REMINDERS_URL;
  if (healthcheckUrl) {
    try {
      await fetch(healthcheckUrl, {
        method: "POST",
        body: `chains=${chainsProcessed} sent=${sent} errors=${errors}`,
      });
    } catch (e) {
      console.error("[chain-cron] healthcheck ping failed:", e);
    }
  }

  return NextResponse.json({
    ok: true,
    date: today.toISOString(),
    chainsProcessed,
    sent,
    errors,
  });
}
