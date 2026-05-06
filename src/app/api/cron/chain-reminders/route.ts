import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";
import {
  sendChainClosingPrompt,
  sendChainDailyReminder,
} from "@/lib/email";
import { getBaseUrl } from "@/lib/url";
import { chainDayTokenId, signCompletionToken } from "@/lib/completion-tokens";
import {
  AUTO_CLOSE_GRACE_DAYS,
  shouldAutoClose,
  shouldSendClosingPrompt,
} from "@/lib/chain-lifecycle";
import { DEFAULT_DISPLAY_TZ } from "@/lib/dates";
import { organizerFirstName } from "@/lib/organizer-display";
import { reflectionForDay } from "@/lib/daily-reflections";

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
        // dailyReflections is included so the cron can resolve the
        // day-N specific meditation (Surrender Novena, Divine Mercy,
        // etc.) for each member's reminder. Empty array on legacy
        // rows means reflectionForDay returns null and the email
        // template's empty-gate skips the reflection card entirely.
        select: {
          name: true,
          prayerText: true,
          instructions: true,
          dailyReflections: true,
        },
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

    // Fire all member emails in parallel so a large chain doesn't exhaust
    // the 30s Vercel function timeout through sequential awaits.
    const results = await Promise.allSettled(
      chain.members.map((member) => {
        const otherCount = chain.members.length - 1;
        // Tokenized one-click completion URL. Points at the
        // /chain/[slug]/complete handler which verifies the HMAC before
        // calling markChainDayCompleteByToken. Default 14-day TTL — a
        // member who reads the reminder a few days late can still mark
        // complete; ancient archived reminders can't be replayed.
        //
        // The token signs the (memberId, day) tuple so the day number
        // is cryptographically bound — a member can't tamper with
        // ?day= in the URL to claim credit for a day other than the
        // one this reminder was for.
        const completionToken = signCompletionToken(
          "chain-day",
          chainDayTokenId(member.id, dayNum),
        );
        const markCompleteUrl = `${baseUrl}/chain/${
          chain.slug
        }/complete?day=${dayNum}&memberId=${encodeURIComponent(
          member.id,
        )}&token=${encodeURIComponent(completionToken)}`;
        const unsubscribeUrl = `${baseUrl}/api/chain/unsubscribe?id=${member.id}`;

        return sendChainDailyReminder({
          to: member.email,
          memberName: member.name,
          // Pass null when the chain is anonymous OR User.name is unset.
          // The render helper drops the possessive ("the's Surrender Novena")
          // and substitutes anonymous-friendly copy. See firstNameOrNull
          // and renderChainDailyReminder in src/lib/email.ts.
          organizerName:
            chain.organizerAnonymous || !chain.organizer?.name
              ? null
              : chain.organizer.name,
          prayerName: chain.prayerType.name,
          prayerText: chain.prayerType.prayerText,
          prayerInstructions: chain.prayerType.instructions,
          // Day-specific meditation when populated; null otherwise.
          // The email template's empty-gate skips the card when null.
          dailyReflection: reflectionForDay(
            chain.prayerType.dailyReflections,
            dayNum,
          ),
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
      }),
    );

    for (let i = 0; i < results.length; i++) {
      if (results[i].status === "fulfilled") {
        sent++;
      } else {
        console.error(
          `[chain-cron] failed to send reminder for chain ${chain.id} member ${chain.members[i].id}:`,
          (results[i] as PromiseRejectedResult).reason,
        );
        errors++;
      }
    }
  }

  // ─── End-of-life passes ──────────────────────────────────────
  //
  // Two additional sweeps after the daily-reminders dispatch above:
  //
  //   1. Closing prompt — fires the day a chain hits its endDate.
  //      One-shot per chain via PrayerChain.closingPromptSentAt
  //      idempotency. Email goes to the organizer; members already
  //      received their final daily reminder above.
  //
  //   2. Auto-close — flips status: ACTIVE → COMPLETED for chains
  //      that lingered past endDate + AUTO_CLOSE_GRACE_DAYS (default
  //      7). Silent cleanup; no member-facing emails on this path
  //      (those are reserved for manual closePrayerChain so the
  //      organizer's intent is preserved when emails go out).
  //
  // Both passes use shouldSendClosingPrompt / shouldAutoClose as the
  // final guard so the predicates stay unit-testable. SQL queries
  // are slightly broader than the predicates require (we let the
  // predicate make the final call) so we don't have to encode TZ-
  // aware date math in raw Postgres.

  let closingPromptsSent = 0;
  let autoClosed = 0;
  const nowForCron = new Date();

  // Pass 1: closing prompt to organizer
  const promptCandidates = await prisma.prayerChain.findMany({
    where: {
      status: "ACTIVE",
      closingPromptSentAt: null,
      // Broaden slightly — pull the last 2 days of endDates so a chain
      // that ended yesterday at the TZ boundary still gets caught
      // even though "today" in DEFAULT_DISPLAY_TZ vs UTC may straddle.
      // The shouldSendClosingPrompt predicate compares exact calendar
      // keys and rejects anything other than today.
      endDate: {
        gte: new Date(nowForCron.getTime() - 2 * 24 * 60 * 60 * 1000),
        lte: new Date(nowForCron.getTime() + 1 * 24 * 60 * 60 * 1000),
      },
    },
    include: {
      organizer: {
        select: { name: true, email: true },
      },
      prayerType: { select: { name: true } },
    },
  });

  for (const chain of promptCandidates) {
    if (
      !shouldSendClosingPrompt(
        {
          status: chain.status,
          endDate: chain.endDate,
          closingPromptSentAt: chain.closingPromptSentAt,
          organizer: { email: chain.organizer?.email ?? null },
        },
        nowForCron,
        DEFAULT_DISPLAY_TZ,
      )
    ) {
      continue;
    }
    try {
      await sendChainClosingPrompt({
        to: chain.organizer!.email!,
        organizerFirstName: organizerFirstName({
          organizerAnonymous: chain.organizerAnonymous,
          organizer: { name: chain.organizer?.name ?? null },
        }),
        prayerName: chain.prayerType.name,
        recipientName: chain.recipientName,
        chainManageUrl: `${baseUrl}/chain/${chain.slug}/manage`,
      });
      // Set the idempotency timestamp inside the same loop iteration
      // so a repeated send within the same cron run can't double-fire.
      // sendChainClosingPrompt already swallows its own errors and
      // logs them; if it failed silently the column stays null and
      // the next cron run will retry. Acceptable trade-off.
      await prisma.prayerChain.update({
        where: { id: chain.id },
        data: { closingPromptSentAt: new Date() },
      });
      closingPromptsSent++;
    } catch (e) {
      console.error(
        `[chain-cron] closing prompt failed for chain ${chain.id}:`,
        e,
      );
      errors++;
    }
  }

  // Pass 2: auto-close past the grace period
  const closeCandidates = await prisma.prayerChain.findMany({
    where: {
      status: "ACTIVE",
      // Anything ending more than (graceDays + 1) ago is a candidate.
      // The +1 buffers TZ skew so we don't miss anything at the edge.
      endDate: {
        lt: new Date(
          nowForCron.getTime() -
            (AUTO_CLOSE_GRACE_DAYS + 1) * 24 * 60 * 60 * 1000,
        ),
      },
    },
    select: { id: true, status: true, endDate: true, slug: true },
  });

  for (const chain of closeCandidates) {
    if (
      !shouldAutoClose(
        { status: chain.status, endDate: chain.endDate },
        nowForCron,
        DEFAULT_DISPLAY_TZ,
      )
    ) {
      continue;
    }
    try {
      await prisma.prayerChain.update({
        where: { id: chain.id },
        data: { status: "COMPLETED" },
      });
      autoClosed++;
    } catch (e) {
      console.error(
        `[chain-cron] auto-close failed for chain ${chain.id}:`,
        e,
      );
      errors++;
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
        body: `chains=${chainsProcessed} sent=${sent} closingPrompts=${closingPromptsSent} autoClosed=${autoClosed} errors=${errors}`,
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
    closingPromptsSent,
    autoClosed,
    errors,
  });
}
