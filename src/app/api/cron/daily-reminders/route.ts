import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";
import { localizePrayer } from "@/lib/prayer-localization";
import {
  sendDailyReminder,
  sendTrainAbandonmentArchived,
  sendTrainAbandonmentPrompt,
  sendTrainClosingPrompt,
} from "@/lib/email";
import { sendTrainClosingFanout } from "@/lib/closing-fanout";
import { getBaseUrl } from "@/lib/url";
import { signCompletionToken } from "@/lib/completion-tokens";
import {
  shouldAutoCancelAbandoned,
  shouldAutoClose,
  shouldSendAbandonmentPrompt,
  shouldSendClosingPrompt,
  TRAIN_ABANDONMENT_GRACE_DAYS,
  TRAIN_ABANDONMENT_PROMPT_DAYS,
  TRAIN_AUTO_CLOSE_GRACE_DAYS,
} from "@/lib/train-lifecycle";
import { DEFAULT_DISPLAY_TZ } from "@/lib/dates";
import { organizerFirstName } from "@/lib/organizer-display";
import { PROTECTED_SLUGS } from "@/lib/train-protection";

/**
 * Resend's free-tier API rate limit is 2 requests per second. The
 * train cron's slot loop has always been sequential (one slot at a
 * time, await between sends), but with HTTP round-trips ~80-150ms it
 * was effectively running at ~6-10 req/s — comfortably tripping
 * Resend's 2/s ceiling. The May 8 2026 Resend export confirmed: 8
 * eligible slots → 5 sent → 3 silent rate-limit drops, with audit
 * fields falsely advanced for all 8. PR #52 closed the audit-side
 * silence (helper now returns EmailDispatchResult so the cron skips
 * the audit write on failure); this delay closes the underlying
 * cause so the failures don't happen in the first place.
 *
 * Mirrors RESEND_RATE_LIMIT_DELAY_MS in chain-reminders/route.ts.
 */
const RESEND_RATE_LIMIT_DELAY_MS = 600;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  // The `lastReminderSentAt: null` clause is the idempotency gate:
  // each slot maps to exactly one calendar date, so once we've
  // dispatched a reminder for it the slot is permanently retired
  // from the cron's working set. A manual replay (ops curl) after a
  // Vercel cron miss won't double-send; a per-slot send failure
  // leaves lastReminderSentAt null so the next cron run retries.
  const slotsToRemind = await prisma.prayerSlot.findMany({
    where: {
      date: { gte: today, lt: tomorrow },
      status: "CLAIMED",
      claimerEmail: { not: null },
      lastReminderSentAt: null,
      train: { status: "ACTIVE" },
    },
    include: {
      train: {
        include: {
          organizer: { select: { name: true } },
        },
      },
      // Pull all reviewed translations for this prayerType — we'll
      // filter to slot.train.language at merge time below. Reviewed-
      // only filter keeps the editorial gate intact (unreviewed
      // translations don't go live even if they exist in the DB).
      // Most prayers will have 0–4 rows here (one per launched
      // locale's first-wave translations); payload is small.
      prayerType: {
        include: {
          translations: { where: { reviewedAt: { not: null } } },
        },
      },
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

    // Sign a 14-day completion token so the email's "I prayed"
    // button hits a verifiable URL. The handler page at
    // /p/[slug]/complete validates this server-side before mutating
    // the slot. Stateless — no DB column needed.
    const completionToken = signCompletionToken("slot", slot.id);
    const completeUrl = `${baseUrl}/p/${slot.train.slug}/complete?slot=${
      slot.id
    }&token=${encodeURIComponent(completionToken)}`;

    // Merge the reviewed translation (if any) for this train's
    // language onto the prayer's base row. Falls back field-by-field
    // to English when no reviewed translation exists for the
    // train.language. The chrome (subject, CTA, footer) is already
    // localized via the email dictionary; this localizes the prayer
    // text + instructions + name embedded inside the body.
    const localizedPrayer = localizePrayer(
      slot.prayerType,
      slot.prayerType.translations,
      slot.train.language,
    );

    // sendDailyReminder returns EmailDispatchResult so we can write
    // lastReminderSentAt only on verified Resend success. Pre-PR-#52
    // the helper had an internal try/catch that swallowed both API
    // errors and thrown errors, returning void either way — the cron
    // then read "no exception" as success and wrote the audit field
    // for sends that never actually happened. See sendDailyReminder
    // doc comment + chain-reminders/route.ts for the parallel fix.
    const result = await sendDailyReminder({
      to: email,
      claimerName: name,
      recipientName: slot.train.recipientName,
      prayerName: localizedPrayer.name,
      prayerText: localizedPrayer.prayerText,
      prayerInstructions: localizedPrayer.instructions,
      customPrayerText: slot.train.customPrayerText,
      organizerFirstName: slot.train.organizerAnonymous
        ? null
        : (slot.train.organizer?.name?.trim().split(/\s+/)[0] ?? null),
      trainUrl: `${baseUrl}/p/${slot.train.slug}`,
      completeUrl,
      slotId: slot.id,
      // PrayerTrain.language was set from the organizer's UI locale at
      // train-create time. Drives the email chrome language. The
      // prayer body itself comes from `localizedPrayer` above, which
      // applies the same `language` against the translation table.
      // Defaults to "en" on existing rows (Prisma column default).
      language: slot.train.language,
    });

    // Pace the sequential loop under Resend's 2/s rate limit. The
    // delay must come AFTER the await — Resend counts the moment a
    // request is accepted, so spacing out requests-per-second means
    // pausing between them (not before the next). Putting it after
    // the result-check so a hard error path also throttles before
    // the next call.
    if (!result.ok) {
      console.error("[cron] reminder send failed", {
        slotId: slot.id,
        trainId: slot.trainId,
        email,
        date: slot.date.toISOString(),
        reason: String(result.error),
      });
      errors++;
      await sleep(RESEND_RATE_LIMIT_DELAY_MS);
      continue;
    }

    // Record the send so the slot is excluded from the cron's
    // working set on subsequent runs (the `lastReminderSentAt:
    // null` filter on the findMany above). Wrap so a Prisma flake
    // here doesn't mask a successful send. If this update fails,
    // worst case the next cron run re-sends; we'd rather a duplicate
    // reminder than a missed one.
    try {
      await prisma.prayerSlot.update({
        where: { id: slot.id },
        data: { lastReminderSentAt: new Date() },
      });
    } catch (writeErr) {
      console.error("[cron] failed to record slot reminder send", {
        slotId: slot.id,
        trainId: slot.trainId,
        reason: String(writeErr),
      });
      // Note: we DO NOT increment errors here — the email did go
      // out; this is purely a bookkeeping miss. The next cron run
      // will re-send, which is the safe-on-prayer side of the
      // tradeoff.
    }
    sent++;
    await sleep(RESEND_RATE_LIMIT_DELAY_MS);
  }

  // ─── Train end-of-life passes ────────────────────────────────
  //
  // Two additional sweeps after the daily-reminder dispatch above:
  //
  //   1. Closing prompt — fires the day a train hits its endDate.
  //      One-shot per train via PrayerTrain.closingPromptSentAt
  //      idempotency. Email goes to the organizer; prayer warriors
  //      already received their final daily reminder above (if they
  //      had a slot today).
  //
  //   2. Auto-close — flips status: ACTIVE → COMPLETED for trains
  //      that lingered past endDate + TRAIN_AUTO_CLOSE_GRACE_DAYS
  //      (default 7). Silent cleanup; NO warrior closing emails on
  //      this path — those are reserved for manual updateTrainStatus
  //      so the organizer's intent is preserved when emails go out.
  //
  //      PAUSED trains are explicitly excluded from auto-close: the
  //      organizer chose to halt sign-ups intentionally; the cron
  //      shouldn't override that. See shouldAutoClose for the gate.
  //
  // Both passes use shouldSendClosingPrompt / shouldAutoClose as
  // the final guard so the predicates stay unit-testable. Mirrors
  // the chain-reminders cron's end-of-life passes.

  let closingPromptsSent = 0;
  let autoClosed = 0;
  const nowForCron = new Date();

  // Pass 1: closing prompt to organizer
  const promptCandidates = await prisma.prayerTrain.findMany({
    where: {
      status: "ACTIVE",
      closingPromptSentAt: null,
      // Broaden by ~2-day window so TZ skew at the boundary doesn't
      // drop a train that ended right around the cron's UTC moment.
      // The shouldSendClosingPrompt predicate compares calendar keys
      // and rejects anything other than today.
      endDate: {
        gte: new Date(nowForCron.getTime() - 2 * 24 * 60 * 60 * 1000),
        lte: new Date(nowForCron.getTime() + 1 * 24 * 60 * 60 * 1000),
      },
    },
    include: {
      organizer: { select: { name: true, email: true } },
    },
  });

  for (const train of promptCandidates) {
    if (
      !shouldSendClosingPrompt(
        {
          status: train.status,
          endDate: train.endDate,
          closingPromptSentAt: train.closingPromptSentAt,
          organizer: { email: train.organizer?.email ?? null },
        },
        nowForCron,
        DEFAULT_DISPLAY_TZ,
      )
    ) {
      continue;
    }
    try {
      await sendTrainClosingPrompt({
        to: train.organizer!.email!,
        organizerFirstName: organizerFirstName({
          organizerAnonymous: train.organizerAnonymous,
          organizer: { name: train.organizer?.name ?? null },
        }),
        recipientName: train.recipientName,
        trainManageUrl: `${baseUrl}/p/${train.slug}/manage`,
      });
      // Set the idempotency timestamp inside the same loop iteration
      // so repeated sends within the same cron run can't double-fire.
      // sendTrainClosingPrompt swallows + logs its own errors; if it
      // failed silently the column stays null and the next cron run
      // retries. Acceptable trade-off.
      await prisma.prayerTrain.update({
        where: { id: train.id },
        data: { closingPromptSentAt: new Date() },
      });
      closingPromptsSent++;
    } catch (e) {
      console.error(
        `[cron] closing prompt failed for train ${train.id}:`,
        e,
      );
      errors++;
    }
  }

  // Pass 2: auto-close past the grace period
  const closeCandidates = await prisma.prayerTrain.findMany({
    where: {
      status: "ACTIVE",
      // (graceDays + 1) buffer to account for TZ skew at the edge.
      endDate: {
        lt: new Date(
          nowForCron.getTime() -
            (TRAIN_AUTO_CLOSE_GRACE_DAYS + 1) * 24 * 60 * 60 * 1000,
        ),
      },
    },
    // Pull everything the closing fan-out needs: organizer (for the
    // bouquet-ready email), warriors (overflow pledgers), and slots
    // (CLAIMED or COMPLETED — under the presumed-prayed model both
    // belong on the bouquet and both populations deserve the closing
    // email). Mirrors the manual-close path's findUnique include.
    select: {
      id: true,
      status: true,
      endDate: true,
      slug: true,
      recipientName: true,
      organizerAnonymous: true,
      organizer: { select: { name: true, email: true } },
      warriors: { select: { name: true, email: true } },
      slots: {
        where: { status: { in: ["CLAIMED", "COMPLETED"] } },
        select: { claimerName: true, claimerEmail: true },
      },
    },
  });

  for (const train of closeCandidates) {
    if (
      !shouldAutoClose(
        { status: train.status, endDate: train.endDate },
        nowForCron,
        DEFAULT_DISPLAY_TZ,
      )
    ) {
      continue;
    }
    try {
      await prisma.prayerTrain.update({
        where: { id: train.id },
        data: { status: "COMPLETED" },
      });
      autoClosed++;
      // Closing fan-out: warriors + slot-claimers + organizer
      // bouquet-ready. Shared with the manual-close path in
      // src/lib/actions.ts updateTrainStatus. Pre-May-2026 the cron
      // path only notified the organizer, leaving slot-claimers and
      // warriors to silently lose their reminders — fixed here so
      // every participant hears the closing-day blessing whether the
      // organizer manually closed or the train aged out on its own.
      await sendTrainClosingFanout(train, baseUrl);
    } catch (e) {
      console.error(
        `[cron] auto-close failed for train ${train.id}:`,
        e,
      );
      errors++;
    }
  }

  // ─── Abandonment-cleanup passes ──────────────────────────────
  //
  // Two more sweeps for empty trains (zero claimed slots + zero
  // warriors) keyed off createdAt rather than endDate. Pre-existing
  // auto-close above only fires after a train reaches its endDate, so
  // a 30-day train with no signups would sit ACTIVE for 37 days
  // before any cleanup. These passes catch the abandoned case earlier:
  //
  //   3. Abandonment prompt — fires 14 days after createdAt for an
  //      empty ACTIVE train. One-shot per train via
  //      PrayerTrain.abandonmentPromptSentAt. Email offers share /
  //      edit / close options and announces the 7-day archive timer.
  //
  //   4. Abandonment auto-cancel — fires 7 days after the prompt for
  //      trains still empty + still ACTIVE. Flips status to CANCELLED
  //      (not COMPLETED — these trains never completed anything, so a
  //      bouquet email would be wrong). Sends a brief archived-
  //      notification to the organizer.
  //
  // Protected slugs (Spina, Denis Wilson) get a defense-in-depth
  // skip even though they'll never satisfy the empty-train query.

  let abandonmentPromptsSent = 0;
  let abandonedCancelled = 0;

  // Pass 3: abandonment prompt to organizer
  const abandonmentPromptCandidates = await prisma.prayerTrain.findMany({
    where: {
      status: "ACTIVE",
      abandonmentPromptSentAt: null,
      createdAt: {
        // Pull anything 14+ days old. (graceDays buffer not needed
        // here because the predicate compares calendar keys exactly.)
        lt: new Date(
          nowForCron.getTime() -
            TRAIN_ABANDONMENT_PROMPT_DAYS * 24 * 60 * 60 * 1000,
        ),
      },
      // SQL-level empty filter: no CLAIMED or COMPLETED slots, no
      // warriors. The predicate below re-checks with counts passed
      // in so the gate is unit-testable.
      slots: { none: { status: { in: ["CLAIMED", "COMPLETED"] } } },
      warriors: { none: {} },
    },
    select: {
      id: true,
      slug: true,
      status: true,
      createdAt: true,
      recipientName: true,
      abandonmentPromptSentAt: true,
      organizerAnonymous: true,
      organizer: { select: { name: true, email: true } },
    },
  });

  for (const train of abandonmentPromptCandidates) {
    // SQL already filtered to empty + 14d+ old + null-prompt + ACTIVE,
    // so the count args here are 0/0 by construction. Pass them
    // through anyway so the predicate's signup-count gate is
    // exercised end-to-end (defense in depth for a future SQL change).
    if (
      !shouldSendAbandonmentPrompt(
        {
          slug: train.slug,
          status: train.status,
          createdAt: train.createdAt,
          abandonmentPromptSentAt: train.abandonmentPromptSentAt,
          organizer: { email: train.organizer?.email ?? null },
        },
        0,
        0,
        nowForCron,
        DEFAULT_DISPLAY_TZ,
      )
    ) {
      continue;
    }
    // Belt-and-suspenders protected-slug skip on top of the predicate.
    if (PROTECTED_SLUGS.has(train.slug)) continue;
    try {
      await sendTrainAbandonmentPrompt({
        to: train.organizer!.email!,
        organizerFirstName: organizerFirstName({
          organizerAnonymous: train.organizerAnonymous,
          organizer: { name: train.organizer?.name ?? null },
        }),
        recipientName: train.recipientName,
        trainUrl: `${baseUrl}/p/${train.slug}`,
        trainManageUrl: `${baseUrl}/p/${train.slug}/manage`,
      });
      // Set idempotency timestamp regardless of helper outcome.
      // sendTrainAbandonmentPrompt swallows + logs its own errors;
      // if a send genuinely failed, the column would stay null on the
      // next cron run and retry. Acceptable trade-off: mirrors the
      // closing-prompt path above.
      await prisma.prayerTrain.update({
        where: { id: train.id },
        data: { abandonmentPromptSentAt: new Date() },
      });
      abandonmentPromptsSent++;
      await sleep(RESEND_RATE_LIMIT_DELAY_MS);
    } catch (e) {
      console.error(
        `[cron] abandonment prompt failed for train ${train.id}:`,
        e,
      );
      errors++;
    }
  }

  // Pass 4: abandonment auto-cancel past the grace period
  const abandonedCancelCandidates = await prisma.prayerTrain.findMany({
    where: {
      status: "ACTIVE",
      abandonmentPromptSentAt: {
        lt: new Date(
          nowForCron.getTime() -
            TRAIN_ABANDONMENT_GRACE_DAYS * 24 * 60 * 60 * 1000,
        ),
      },
      // Still empty.
      slots: { none: { status: { in: ["CLAIMED", "COMPLETED"] } } },
      warriors: { none: {} },
    },
    select: {
      id: true,
      slug: true,
      status: true,
      abandonmentPromptSentAt: true,
      recipientName: true,
      organizerAnonymous: true,
      organizer: { select: { name: true, email: true } },
    },
  });

  for (const train of abandonedCancelCandidates) {
    if (
      !shouldAutoCancelAbandoned(
        {
          slug: train.slug,
          status: train.status,
          abandonmentPromptSentAt: train.abandonmentPromptSentAt,
        },
        0,
        0,
        nowForCron,
        DEFAULT_DISPLAY_TZ,
      )
    ) {
      continue;
    }
    if (PROTECTED_SLUGS.has(train.slug)) continue;
    try {
      await prisma.prayerTrain.update({
        where: { id: train.id },
        data: { status: "CANCELLED" },
      });
      abandonedCancelled++;
      // Brief archived-notification to the organizer. NOT the bouquet
      // email — these trains have nothing to bouquet. Best-effort;
      // helper swallows its own errors.
      if (train.organizer?.email) {
        await sendTrainAbandonmentArchived({
          to: train.organizer.email,
          organizerFirstName: organizerFirstName({
            organizerAnonymous: train.organizerAnonymous,
            organizer: { name: train.organizer?.name ?? null },
          }),
          recipientName: train.recipientName,
        });
        await sleep(RESEND_RATE_LIMIT_DELAY_MS);
      }
    } catch (e) {
      console.error(
        `[cron] abandonment auto-cancel failed for train ${train.id}:`,
        e,
      );
      errors++;
    }
  }

  // Heartbeat ping to Healthchecks.io (or any compatible monitor). Opt-in
  // via env var — zero behavior change if not set. Wrapped to never throw,
  // so a Healthchecks outage cannot mask or fail an otherwise successful
  // reminder run. This catches the silent-failure mode where the cron
  // stops invoking entirely (Vercel issue, secret rotation, etc.) — if
  // Healthchecks doesn't see the ping by ~25 hours, the user gets paged.
  const healthcheckUrl = process.env.HEALTHCHECKS_DAILY_REMINDERS_URL;
  if (healthcheckUrl) {
    try {
      await fetch(healthcheckUrl, {
        method: "POST",
        body: `slotsFound=${slotsToRemind.length} sent=${sent} closingPrompts=${closingPromptsSent} autoClosed=${autoClosed} abandonmentPrompts=${abandonmentPromptsSent} abandonedCancelled=${abandonedCancelled} errors=${errors}`,
      });
    } catch (e) {
      console.error("[cron] healthcheck ping failed:", e);
    }
  }

  return NextResponse.json({
    ok: true,
    date: today.toISOString(),
    slotsFound: slotsToRemind.length,
    sent,
    closingPromptsSent,
    autoClosed,
    abandonmentPromptsSent,
    abandonedCancelled,
    errors,
  });
}
