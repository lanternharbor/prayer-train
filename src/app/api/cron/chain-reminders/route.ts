import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";
import type { EmailDispatchResult } from "@/lib/email";
import {
  sendChainBouquetReady,
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
 * Resend's free-tier API rate limit is 2 requests per second. Sequential
 * sends with this delay keep the cron under that ceiling with safety
 * margin (~1.4 req/s effective once HTTP round-trip is factored in).
 *
 * History: pre-PR-#53 the cron fired all member sends in parallel via
 * Promise.allSettled. With chains of 25+ members, the parallel fan-out
 * blew through Resend's 2/s limit and ~80% of sends came back as
 * `{ data: null, error: { name: 'rate_limit_exceeded' } }` in the
 * response body. The legacy try/catch swallowed those (PR #52 fixed
 * the swallow but not the cause); the audit trail wrote phantom
 * successes. May 8 2026 Resend export confirmed: 25-member Surrender
 * Novena chain got exactly 5 sends per firing across May 6/7/8 — the
 * other 20 hit the rate limit invisibly.
 *
 * 600ms is conservative on purpose: Resend says they may apply
 * different limits per endpoint and we'd rather a slightly slower
 * cron than another silent-drop regression. For a 30-recipient day
 * the cron takes ~18 seconds, well inside Vercel's 30s default.
 */
const RESEND_RATE_LIMIT_DELAY_MS = 600;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
        select: {
          id: true,
          name: true,
          email: true,
          lastReminderSentForDay: true,
        },
      },
    },
  });

  let sent = 0;
  let skippedAlreadySent = 0;
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

    // Idempotency gate: drop members who already received this day's
    // reminder. Lets the route stay safe under retry / manual replay
    // (e.g. ops curl after a Vercel cron miss) without double-sending.
    // The flip side — a member whose send failed yesterday — has
    // lastReminderSentForDay still pointing at the previous successful
    // day (or null), so they remain in the eligible set and get caught
    // up on the current day's send. We deliberately do NOT try to
    // backfill missed prior days here: the catch-up path is a one-off
    // scripts/resend-chain-reminders.ts run with explicit auth.
    const eligibleMembers = chain.members.filter(
      (m) => m.lastReminderSentForDay !== dayNum,
    );
    skippedAlreadySent += chain.members.length - eligibleMembers.length;

    // Sequential dispatch with rate-limit delay between sends. Pre-
    // PR-#53 this used Promise.allSettled — pleasant in theory but the
    // parallel fan-out routinely tripped Resend's 2/s rate limit on
    // chains larger than ~5 members, and the rate-limit responses
    // came back as `{data:null, error}` in the body (not thrown).
    // PR #52 added the dispatchEmail check that surfaces those
    // errors, but checking after the fact still leaves the recipients
    // empty-inboxed. The right fix is to not hit the limit at all.
    //
    // We collect EmailDispatchResult per member and process the
    // success/failure split AFTER the loop, mirroring the original
    // Promise.allSettled-style two-phase shape — the audit-trail
    // updateMany still happens in a single batched write to keep
    // round-trip count low.
    const results: EmailDispatchResult[] = [];
    for (const member of eligibleMembers) {
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
      const otherCount = chain.members.length - 1;

      // Defensive try/catch: post-PR-#52 sendChainDailyReminder
      // returns EmailDispatchResult and never throws on its own.
      // But sequential awaits don't get the implicit rejection
      // capture that Promise.allSettled provides — if some future
      // change reintroduces a throw, we want to log + continue
      // rather than crash the entire cron mid-loop and leave the
      // remaining chains undispatched.
      let result: EmailDispatchResult;
      try {
        result = await sendChainDailyReminder({
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
          // PrayerChain.language set at create time from the organizer's
          // UI locale. See sendDailyReminder's parallel comment + the
          // schema field.
          language: chain.language,
        });
      } catch (thrown) {
        result = { ok: false, error: thrown };
      }
      results.push(result);
      await sleep(RESEND_RATE_LIMIT_DELAY_MS);
    }

    // Audit-trail write-back: only members whose Resend dispatch
    // verifiably succeeded. Pre-PR-#52 the cron treated any non-
    // throwing settle as success, which hid Resend API rejections
    // (the SDK returns `{data: null, error}` in the response body
    // — never thrown — so the legacy try/catch never saw them).
    // PR #52 introduced the EmailDispatchResult discriminated
    // return; this loop checks `result.ok`. A failed send leaves
    // lastReminderSentForDay unchanged so the next cron firing
    // retries.
    const successfulMemberIds: string[] = [];
    for (let i = 0; i < results.length; i++) {
      const member = eligibleMembers[i];
      const result = results[i];
      if (result.ok) {
        sent++;
        successfulMemberIds.push(member.id);
      } else {
        // Structured error so a future search for "did Jilu's day-5
        // reminder fail?" can grep `memberId:cm... day:5 reason:...`
        // out of Vercel logs. Previously the message interpolated
        // chain id + member id only, with the reason as a separate
        // serialized object — harder to grep across log entries.
        console.error("[chain-cron] reminder send failed", {
          chainId: chain.id,
          memberId: member.id,
          email: member.email,
          day: dayNum,
          reason: String(result.error),
        });
        errors++;
      }
    }

    if (successfulMemberIds.length > 0) {
      // Single batched updateMany rather than N updates: the cron
      // dispatches one chain at a time but a Spina-sized chain (38
      // members) still benefits from one round-trip vs 38. Failures
      // here are non-fatal — the email already went out — but we log
      // loudly so a partial-write divergence (sent but DB didn't
      // record) is visible in ops.
      try {
        await prisma.prayerChainMember.updateMany({
          where: { id: { in: successfulMemberIds } },
          data: {
            lastReminderSentForDay: dayNum,
            lastReminderSentAt: new Date(),
          },
        });
      } catch (e) {
        console.error("[chain-cron] failed to record reminder sends", {
          chainId: chain.id,
          memberIdCount: successfulMemberIds.length,
          day: dayNum,
          reason: String(e),
        });
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
    // Pull the fields needed for the bouquet-ready email below so a
    // second roundtrip per auto-close isn't required. Empty/anonymous
    // organizers are handled via the helper's null-name branch.
    select: {
      id: true,
      status: true,
      endDate: true,
      slug: true,
      organizerAnonymous: true,
      recipientName: true,
      organizer: { select: { name: true, email: true } },
      prayerType: { select: { name: true } },
    },
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
      // Bouquet-ready email to the organizer. Auto-close means the
      // organizer missed the closing prompt + 7-day grace; this email
      // catches them up by surfacing the artifact (the bouquet PDF)
      // they would have gotten on the manual-close path. Best-effort;
      // helper swallows errors so a single send failure doesn't stall
      // the rest of the auto-close loop.
      if (chain.organizer?.email) {
        await sendChainBouquetReady({
          to: chain.organizer.email,
          organizerName:
            chain.organizerAnonymous || !chain.organizer.name
              ? null
              : chain.organizer.name,
          prayerName: chain.prayerType.name,
          recipientName: chain.recipientName,
          bouquetUrl: `${baseUrl}/api/bouquet/chain/${chain.slug}`,
          chainUrl: `${baseUrl}/chain/${chain.slug}`,
        });
      }
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
        body: `chains=${chainsProcessed} sent=${sent} skipped=${skippedAlreadySent} closingPrompts=${closingPromptsSent} autoClosed=${autoClosed} errors=${errors}`,
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
    skippedAlreadySent,
    closingPromptsSent,
    autoClosed,
    errors,
  });
}
