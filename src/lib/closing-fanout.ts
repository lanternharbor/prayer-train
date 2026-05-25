/**
 * Closing-day email fan-out, shared between manual-close (organizer
 * clicks "Mark Completed") and auto-close (cron flips ACTIVE →
 * COMPLETED past endDate).
 *
 * Without this helper, the two close paths drifted: manual-close fanned
 * out closing emails to warriors but not slot-claimers; auto-close only
 * notified the organizer. Pre-May-2026 the result was that whether a
 * participant heard "the prayer train is complete, here's the bouquet"
 * depended on which path closed the train — confusing, and against the
 * spiritual register of the product (every person who carried a prayer
 * deserves the closing-day blessing equally).
 *
 * The fan-out is intentionally sequential, not Promise.all'd: Resend's
 * free-tier rate limit is 2 req/sec, and the closing-day fan-out is
 * the largest single burst the app makes. The existing dispatch
 * helpers in src/lib/email.ts swallow per-recipient failures and log
 * them so a single bad address doesn't break the rest of the loop.
 *
 * Helpers take already-fetched data rather than running their own
 * Prisma queries — callers decide which fields to pull and pass them
 * in. Keeps the helper testable and the SQL legible at the call site.
 */

import {
  sendPrayerWarriorClosing,
  sendTrainBouquetReady,
  sendChainClosingDayEmail,
  sendChainBouquetReady,
} from "./email";

/**
 * Shape callers must provide for `sendTrainClosingFanout`. Strictly
 * what the fan-out needs — callers may have more fields on their
 * `train` object; the helper ignores them.
 */
export type TrainForClosingFanout = {
  slug: string;
  recipientName: string;
  organizerAnonymous: boolean;
  organizer: { name: string | null; email: string } | null;
  warriors: Array<{ name: string; email: string }>;
  /**
   * Slots claimed by a prayer warrior. Under the presumed-prayed model
   * (commit 24f7432), both CLAIMED and COMPLETED slots belong on the
   * bouquet, so claimers in either state get the closing email.
   * Helper does NOT re-filter — pass the already-narrowed list.
   */
  slots: Array<{
    claimerName: string | null;
    claimerEmail: string | null;
  }>;
};

/**
 * Fan out closing-day emails on a train transitioning to COMPLETED.
 * Sends, in order:
 *   1. Warrior closing emails (overflow pledgers from PrayerWarrior).
 *   2. Slot-claimer closing emails (CLAIMED + COMPLETED slots),
 *      deduplicated against warriors so a person who both pledged
 *      AND took a slot only gets one email. Warriors take precedence
 *      because they explicitly signed up for closing notifications
 *      by pledging.
 *   3. Organizer bouquet-ready email with the PDF link.
 *
 * Defensive on missing fields (claimerName/email/organizer.email):
 * skips the bad row rather than throwing, since one malformed legacy
 * record shouldn't stall the rest of the fan-out.
 */
export async function sendTrainClosingFanout(
  train: TrainForClosingFanout,
  baseUrl: string,
): Promise<void> {
  const trainUrl = `${baseUrl}/p/${train.slug}`;
  const bouquetUrl = `${baseUrl}/api/bouquet/${train.slug}`;
  const orgFirst = train.organizerAnonymous
    ? null
    : (train.organizer?.name?.trim().split(/\s+/)[0] ?? null);

  // Track who's already been emailed so a person who pledged AND
  // took a slot doesn't get two copies. Lowercase keys for
  // case-insensitive dedup (Resend treats addresses as
  // case-sensitive but humans don't — be kind to humans).
  const seenEmails = new Set<string>();

  // 1. Warrior pledgers first. They explicitly signed up for the
  // closing notification by pledging.
  for (const warrior of train.warriors) {
    if (!warrior.email) continue;
    const key = warrior.email.toLowerCase();
    if (seenEmails.has(key)) continue;
    seenEmails.add(key);
    await sendPrayerWarriorClosing({
      to: warrior.email,
      warriorName: warrior.name,
      recipientName: train.recipientName,
      organizerFirstName: orgFirst,
      trainUrl,
      bouquetUrl,
    });
  }

  // 2. Slot claimers. Reuse the warrior closing template — its
  // existing copy already reads "every slot, every pledge ... is
  // held in the spiritual bouquet" which fits both audiences
  // naturally. Skip rows with missing name or email (defensive;
  // the claim form requires both).
  for (const slot of train.slots) {
    if (!slot.claimerEmail || !slot.claimerName) continue;
    const key = slot.claimerEmail.toLowerCase();
    if (seenEmails.has(key)) continue;
    seenEmails.add(key);
    await sendPrayerWarriorClosing({
      to: slot.claimerEmail,
      warriorName: slot.claimerName,
      recipientName: train.recipientName,
      organizerFirstName: orgFirst,
      trainUrl,
      bouquetUrl,
    });
  }

  // 3. Organizer bouquet-ready. Fires whether or not there are
  // warriors/slot-claimers — the bouquet PDF is meaningful on a
  // slot-only train. Anonymous organizers still receive the
  // delivery; only the rendered "from" name is suppressed.
  if (train.organizer?.email) {
    await sendTrainBouquetReady({
      to: train.organizer.email,
      organizerName:
        train.organizerAnonymous || !train.organizer.name
          ? null
          : train.organizer.name,
      recipientName: train.recipientName,
      bouquetUrl,
      trainUrl,
    });
  }
}

/**
 * Shape callers must provide for `sendChainClosingFanout`.
 */
export type ChainForClosingFanout = {
  slug: string;
  recipientName: string | null;
  organizerAnonymous: boolean;
  organizer: { name: string | null; email: string } | null;
  prayerType: { name: string };
  /**
   * Active chain members. Callers must filter `unsubscribedAt: null`
   * before passing — the helper doesn't re-filter.
   */
  members: Array<{ name: string; email: string }>;
};

/**
 * Fan out closing-day emails on a chain transitioning to COMPLETED.
 * Sends, in order:
 *   1. Closing-day email to every active member, now WITH the bouquet
 *      URL folded in (previously the member got the closing note but
 *      no link to the bouquet their daily prayers contributed to).
 *   2. Bouquet-ready email to the organizer.
 *
 * `closingNote` is the organizer's free-text closing message (manual
 * close only — auto-close from cron passes null).
 */
export async function sendChainClosingFanout(
  chain: ChainForClosingFanout,
  closingNote: string | null,
  baseUrl: string,
): Promise<void> {
  const chainUrl = `${baseUrl}/chain/${chain.slug}`;
  const bouquetUrl = `${baseUrl}/api/bouquet/chain/${chain.slug}`;
  const organizerName =
    chain.organizerAnonymous || !chain.organizer?.name
      ? null
      : chain.organizer.name;

  // 1. Member fan-out. The closing-day template now takes bouquetUrl
  // and renders a button alongside the closing note. Members get one
  // email per chain regardless of how many days they joined for.
  for (const member of chain.members) {
    if (!member.email) continue;
    await sendChainClosingDayEmail({
      to: member.email,
      memberName: member.name,
      organizerName,
      prayerName: chain.prayerType.name,
      recipientName: chain.recipientName,
      closingNote,
      chainUrl,
      bouquetUrl,
    });
  }

  // 2. Organizer bouquet-ready. Same logic as the train side — fires
  // whether or not members exist (organizer might have closed an
  // empty chain, or members might have all unsubscribed).
  if (chain.organizer?.email) {
    await sendChainBouquetReady({
      to: chain.organizer.email,
      organizerName,
      prayerName: chain.prayerType.name,
      recipientName: chain.recipientName,
      bouquetUrl,
      chainUrl,
    });
  }
}
