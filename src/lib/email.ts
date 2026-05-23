import { Resend } from "resend";
import { getBaseUrl } from "./url";
import { getEmailDictionary } from "@/i18n/email";
import { t as interpolate } from "@/i18n/format";

// Default sender address. Override via the EMAIL_FROM env var in
// Vercel (e.g. for a per-environment alias). The default uses the
// site's primary domain so the From address users see in their inbox
// matches the URL they signed up at. The previous default
// (noreply@ourfaithtrain.com) was a holdover from an earlier brand;
// kept for historical context in commit history but no longer used.
const FROM = process.env.EMAIL_FROM || "PrayerTrain <noreply@prayertrains.com>";

/**
 * Escape user-controlled content before injecting it into HTML email
 * templates. Email templates here are hand-built HTML strings (not React),
 * so React's automatic escaping doesn't apply. Without this helper, an
 * organizer typing `<` or `&` into an intention or custom prayer would
 * break email rendering — and a malicious actor (unlikely under our
 * threat model but defensive coding still matters) could inject markup.
 *
 * Apply this to: recipientName, claimerName, memberName, warriorName,
 * organizerName/orgFirst, intention, customPrayerText, prayerName,
 * prayerInstructions, prayerText, closingNote — anywhere user-provided
 * text gets interpolated into the HTML body.
 *
 * Do NOT apply to:
 * - subject lines (plain text already, no HTML)
 * - text/plain fallback bodies (plain text already)
 * - hardcoded template strings (no user content)
 * - URLs (use encodeURIComponent for those instead)
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Lazy-initialize the Resend client so module evaluation never throws when
// RESEND_API_KEY is missing (e.g., on Vercel preview deploys that aren't
// scoped to the production env vars). Each `send*` helper below already
// catches and logs its own errors, so a missing key just means delivery
// is a no-op — never a hard crash that takes the rest of the app down.
let _resend: Resend | null | undefined;
function getResend(): Resend | null {
  if (_resend !== undefined) return _resend;
  const key = process.env.RESEND_API_KEY;
  _resend = key ? new Resend(key) : null;
  return _resend;
}

// Wrapper that no-ops gracefully when Resend isn't configured. All call
// sites previously did `await resend.emails.send(...)` — replacing the
// resend variable with this proxy keeps every existing send call working
// without changes.
const resend = {
  emails: {
    async send(opts: Parameters<Resend["emails"]["send"]>[0]) {
      const client = getResend();
      if (!client) {
        console.warn("[email] RESEND_API_KEY not set — skipping send");
        return { data: null, error: null };
      }
      return client.emails.send(opts);
    },
  },
} as unknown as Resend;

/**
 * Outcome of attempting to dispatch an email through Resend.
 *
 * Distinct from the legacy `try { ... } catch { console.error }` pattern
 * that swallowed every failure mode — including Resend's API-level
 * `{ data: null, error: ErrorResponse }` rejections, which are returned
 * in the response body rather than thrown. Callers that need to know
 * whether the email actually reached Resend's API (notably the
 * audit-trail-writing daily-reminder crons) check `result.ok` before
 * recording success.
 *
 * `id` on success is Resend's generated email id, useful for log
 * correlation. `error` on failure is whatever surfaced — Resend's
 * structured error body, a thrown exception, or a defensive fallback
 * for malformed responses.
 */
export type EmailDispatchResult =
  | { ok: true; id: string }
  | { ok: false; error: unknown };

/**
 * Single source of truth for sending an email through Resend.
 *
 * Why this exists: every previous send-helper in this file used
 * `try { await resend.emails.send(...) } catch (error) { console.error }`
 * which has two silent-failure modes:
 *
 *   1. Resend SDK API errors (rate limits, bounces, suppressions,
 *      invalid recipients) come back as `{ data: null, error: ... }`
 *      in the response body — never thrown — so the catch block
 *      never sees them. The helper resolved as if the send succeeded.
 *
 *   2. Even when the SDK threw, the catch swallowed and resolved
 *      undefined. Callers couldn't tell success from failure.
 *
 * The chain-reminders cron's per-day audit trail (PR #50) wrote
 * `lastReminderSentForDay = N` whenever the helper resolved without
 * throwing, which the database read as "Resend accepted." It wasn't.
 * On May 8 2026 the audit field advanced to Day 3 for every priscilla
 * member — and not one of them got the email. That's the regression
 * this helper closes.
 *
 * Contract:
 *   - Returns `{ ok: true, id }` only when Resend's response
 *     resolves with no `error` body AND a non-empty `data.id`.
 *   - Returns `{ ok: false, error }` for API-error bodies, thrown
 *     exceptions, or malformed responses.
 *   - Always logs structured failure context so Vercel logs are
 *     greppable: `[email] {label} {failed|threw} {to, error}`.
 *   - Never re-throws. Callers that want to fail loudly should
 *     check `result.ok` and act on it (the cron's Promise.allSettled
 *     handles the natural-throw case too, but the explicit check is
 *     the contract everyone leans on).
 */
async function dispatchEmail(args: {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Short label used in failure log lines, e.g. "chain daily reminder". */
  label: string;
}): Promise<EmailDispatchResult> {
  try {
    const result = await resend.emails.send({
      from: FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
    });
    if (result.error) {
      console.error(`[email] ${args.label} failed`, {
        to: args.to,
        error: result.error,
      });
      return { ok: false, error: result.error };
    }
    if (!result.data?.id) {
      // Defensive — Resend's discriminated union should ensure this
      // branch is unreachable, but if the SDK's contract ever drifts
      // (or our resend-not-configured stub returns {data:null, error:null}
      // as a no-op in dev), we want a clear signal rather than a phantom
      // success.
      console.error(`[email] ${args.label} returned no id`, {
        to: args.to,
        result,
      });
      return { ok: false, error: new Error("Resend returned no id") };
    }
    return { ok: true, id: result.data.id };
  } catch (error) {
    console.error(`[email] ${args.label} threw`, { to: args.to, error });
    return { ok: false, error };
  }
}

// ─── Branded Sign-In Email ──────────────────────────────────
// Replaces Auth.js's bare default with the PrayerTrain look and feel.

export async function sendSignInEmail({
  to,
  url,
  from,
}: {
  to: string;
  url: string;
  from: string;
}) {
  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/logo.png`;

  await resend.emails.send({
    from,
    to,
    subject: "Your PrayerTrain sign-in link",
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #faf8f5;">
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 28px;">
          <img
            src="${logoUrl}"
            alt="PrayerTrain"
            width="120"
            height="120"
            style="width: 120px; height: auto;"
          />
        </div>

        <!-- Card -->
        <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; text-align: center;">
          <h1 style="color: #11152c; font-size: 24px; font-weight: 700; margin: 0 0 8px;">
            Sign in to PrayerTrain
          </h1>
          <p style="color: #6e6150; font-size: 15px; margin: 0 0 28px; line-height: 1.6;">
            Click the button below to sign in. This link expires in 24 hours
            and can only be used once.
          </p>

          <a
            href="${url}"
            style="display: inline-block; background: #242e58; color: #ffffff; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;"
          >
            Sign in to PrayerTrain
          </a>

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e8e0d5;">
            <p style="color: #b8a994; font-size: 13px; font-style: italic; margin: 0; line-height: 1.6;">
              &ldquo;For where two or three gather in my name,<br />
              there am I with them.&rdquo;
            </p>
            <p style="color: #b8a994; font-size: 12px; margin: 6px 0 0;">
              &mdash; Matthew 18:20
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 24px;">
          <p style="color: #b8a994; font-size: 12px; margin: 0 0 4px; line-height: 1.5;">
            You received this email because someone requested a sign-in link
            for <strong>${to}</strong> on PrayerTrain.
          </p>
          <p style="color: #b8a994; font-size: 12px; margin: 0;">
            If you didn&rsquo;t request this, you can safely ignore it.
          </p>
        </div>
      </div>
    `,
    text: `Sign in to PrayerTrain\n\nClick this link to sign in:\n${url}\n\nThis link expires in 24 hours and can only be used once.\n\nIf you didn't request this, you can safely ignore it.`,
  });
}

export async function sendClaimConfirmation({
  to,
  claimerName,
  recipientName,
  prayerName,
  date,
  prayerInstructions,
  trainUrl,
  completeUrl,
}: {
  to: string;
  claimerName: string;
  recipientName: string;
  prayerName: string;
  date: string;
  prayerInstructions: string | null;
  trainUrl: string;
  completeUrl?: string;
}) {
  // Pre-escape user-controlled fields for safe injection into HTML body.
  // Subject line and `date` (server-generated) don't need escaping.
  const eClaimerName = escapeHtml(claimerName);
  const eRecipientName = escapeHtml(recipientName);
  const ePrayerName = escapeHtml(prayerName);
  const ePrayerInstructions = prayerInstructions
    ? escapeHtml(prayerInstructions)
    : null;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `You're praying for ${recipientName} — ${prayerName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background: #242e58; line-height: 48px; text-align: center;">
              <span style="color: white; font-weight: bold; font-size: 18px;">PT</span>
            </div>
          </div>
          <h1 style="color: #11152c; font-size: 24px; text-align: center; margin-bottom: 8px;">
            Thank you, ${eClaimerName}!
          </h1>
          <p style="color: #6e6150; text-align: center; margin-bottom: 24px;">
            You've committed to pray for <strong>${eRecipientName}</strong>.
          </p>
          <div style="background: #faf8f5; border: 1px solid #e8e0d5; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; font-weight: bold; color: #11152c;">
              ${ePrayerName}
            </p>
            <p style="margin: 0; color: #6e6150; font-size: 14px;">
              ${date}
            </p>
            ${ePrayerInstructions ? `
              <hr style="border: none; border-top: 1px solid #e8e0d5; margin: 16px 0;" />
              <p style="margin: 0; color: #453d32; font-size: 14px; line-height: 1.6;">
                ${ePrayerInstructions}
              </p>
            ` : ""}
          </div>
          <div style="text-align: center;">
            <a href="${trainUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              View Prayer Train
            </a>
          </div>
          ${
            completeUrl
              ? `<div style="text-align: center; margin-top: 12px;">
                  <a href="${completeUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    I prayed today
                  </a>
                </div>
                <p style="text-align: center; color: #6e6150; font-size: 12px; margin-top: 10px;">
                  Use this after you have prayed today&apos;s commitment.
                </p>`
              : ""
          }
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 32px;">
            PrayerTrain — Organized prayer for those in need
          </p>
        </div>
      `,
      text: `Thank you, ${claimerName}!\n\nYou've committed to pray for ${recipientName}.\n\nPrayer: ${prayerName}\nDate: ${date}\n\n${prayerInstructions ? prayerInstructions + "\n\n" : ""}View PrayerTrain: ${trainUrl}${completeUrl ? `\n\nI prayed today: ${completeUrl}` : ""}`,
    });
  } catch (error) {
    console.error("Failed to send claim confirmation email:", error);
  }
}

export interface TrainDailyReminderInput {
  to: string;
  claimerName: string;
  recipientName: string;
  prayerName: string;
  prayerText: string | null;
  prayerInstructions: string | null;
  /** Optional personal prayer the organizer added when creating the train. */
  customPrayerText?: string | null;
  /** Used to attribute the custom prayer ("A prayer from {name}"). */
  organizerFirstName?: string | null;
  trainUrl: string;
  /**
   * Tokenized one-click completion URL. When the recipient clicks
   * "Mark as Prayed" they hit this URL, which verifies an HMAC token
   * and marks the slot complete server-side. The cron (caller) builds
   * and signs this; the template just renders it.
   */
  completeUrl: string;
  /** Reserved for future per-slot tracking links */
  slotId: string;
  /**
   * ISO 639-1 language tag from `PrayerTrain.language` (set at create
   * time from the organizer's UI locale). Falls back to "en" so any
   * legacy caller without language plumbed through keeps working. The
   * email dictionary loader itself falls back to English for any
   * unsupported value, so a stale DB value can't crash the cron.
   */
  language?: string;
}

/**
 * Pure render helper for the train daily reminder. Returns the
 * subject/html/text triple without dispatching to Resend, so unit
 * tests can pin every locale + edge case without touching the network.
 *
 * Mirrors the renderChainDailyReminder shape (see below). The
 * dispatching side-effect lives in `sendDailyReminder` so that
 * cron + scripts still see the same EmailDispatchResult contract.
 *
 * All user-controlled fields are HTML-escaped before interpolation
 * via escapeHtml(). The plaintext alternate uses the raw values
 * directly (no escape) because it's plain text.
 */
export function renderTrainDailyReminder(input: TrainDailyReminderInput): {
  subject: string;
  html: string;
  text: string;
} {
  const dict = getEmailDictionary(input.language ?? "en");
  const t = dict.trainDaily;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eClaimerName = escapeHtml(input.claimerName);
  const eRecipientName = escapeHtml(input.recipientName);
  const ePrayerName = escapeHtml(input.prayerName);
  const ePrayerText = input.prayerText ? escapeHtml(input.prayerText) : null;
  const ePrayerInstructions = input.prayerInstructions
    ? escapeHtml(input.prayerInstructions)
    : null;
  const eCustomPrayerText = input.customPrayerText
    ? escapeHtml(input.customPrayerText)
    : null;
  // Anonymous-aware attribution. When organizerFirstName is null or
  // empty, drop the "from X" attribution and use a generic neutral
  // label ("A personal prayer included") instead of the previous
  // stiff "A prayer from the organizer" fallback.
  const eOrgFirst = input.organizerFirstName
    ? escapeHtml(input.organizerFirstName)
    : null;
  const customPrayerHeading = eOrgFirst
    ? interpolate(t.customPrayerHeadingNamed, { organizerName: eOrgFirst })
    : t.customPrayerHeadingAnon;

  const subject = interpolate(t.subject, {
    prayerName: input.prayerName,
    recipientName: input.recipientName,
  });
  const h1Rendered = interpolate(t.h1, { recipientName: eRecipientName });
  const greetingRendered = interpolate(t.greeting, {
    claimerName: eClaimerName,
  });
  const html = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background: #242e58; line-height: 48px; text-align: center;">
              <span style="color: white; font-weight: bold; font-size: 18px;">PT</span>
            </div>
          </div>
          <h1 style="color: #11152c; font-size: 22px; text-align: center; margin-bottom: 8px;">
            ${h1Rendered}
          </h1>
          <p style="color: #6e6150; text-align: center; margin-bottom: 24px;">
            ${greetingRendered}
          </p>
          <div style="background: #faf8f5; border: 1px solid #e8e0d5; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 12px 0; color: #11152c; font-size: 18px;">
              ${ePrayerName}
            </h2>
            ${ePrayerInstructions ? `
              <p style="margin: 0 0 16px 0; color: #6e6150; font-size: 14px; line-height: 1.6;">
                <strong>${t.howToPrayLabel}</strong> ${ePrayerInstructions}
              </p>
            ` : ""}
            ${ePrayerText ? `
              <div style="background: white; border: 1px solid #e8e0d5; border-radius: 8px; padding: 16px;">
                <p style="margin: 0; color: #242e58; font-style: italic; line-height: 1.8; font-size: 15px; white-space: pre-line;">
                  ${ePrayerText}
                </p>
              </div>
            ` : ""}
          </div>
          ${eCustomPrayerText ? `
            <div style="background: #fdf8ef; border: 1px solid #e8d5a8; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
              <p style="margin: 0 0 10px 0; color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">
                ${customPrayerHeading}
              </p>
              <p style="margin: 0; color: #242e58; font-style: italic; line-height: 1.8; font-size: 15px; white-space: pre-line;">
                ${eCustomPrayerText}
              </p>
            </div>
          ` : ""}
          <div style="text-align: center; margin-top: 24px;">
            <a href="${input.completeUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              ${t.cta}
            </a>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 8px;">
            <a href="${input.trainUrl}" style="color: #b8a994; text-decoration: none;">${t.viewLink}</a>
          </p>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 24px;">
            ${t.footer}
          </p>
        </div>
      `;
  // Plain-text fallback. Mirrors the chain reminder helper —
  // missing-text used to mean Resend served only HTML, which renders
  // as "this email has no body" in some clients. Unescaped values
  // because this is plaintext.
  const customPrayerHeadingPlain = input.organizerFirstName
    ? interpolate(t.customPrayerHeadingNamed, {
        organizerName: input.organizerFirstName,
      })
    : t.customPrayerHeadingAnon;
  const textGreetingLine = interpolate(t.textGreeting, {
    recipientName: input.recipientName,
  });
  const textGreeting2 = interpolate(t.greeting, {
    claimerName: input.claimerName,
  });
  const text = `${textGreetingLine}\n\n${textGreeting2}\n\n${input.prayerName}\n${input.prayerInstructions ? input.prayerInstructions + "\n" : ""}${input.prayerText ? "\n" + input.prayerText + "\n" : ""}${input.customPrayerText ? "\n" + customPrayerHeadingPlain + ":\n" + input.customPrayerText + "\n" : ""}\n${t.textCTA} ${input.completeUrl}\n${t.textViewLink} ${input.trainUrl}`;
  return { subject, html, text };
}

export async function sendDailyReminder(
  input: TrainDailyReminderInput,
): Promise<EmailDispatchResult> {
  // Render → dispatch. Returns EmailDispatchResult so the train
  // daily-reminders cron can write its PrayerSlot.lastReminderSentAt
  // audit field only on verified Resend success. The legacy
  // try-catch-and-swallow shape silently dropped API-level rejections.
  // See sendChainDailyReminder for the parallel chain-side fix.
  const { subject, html, text } = renderTrainDailyReminder(input);
  return dispatchEmail({
    to: input.to,
    subject,
    html,
    text,
    label: "train daily reminder",
  });
}

// ─── Cancellation Notice (PrayerTrain) ─────────────────────
//
// Sent to every claimer + warrior when an organizer cancels a train.
// Pastoral framing: cancellation is the organizer's choice (sometimes
// because the recipient's situation changed, sometimes because the
// train was duplicated by mistake) rather than a failure. The
// recipient does NOT need to do anything; the email is a courtesy
// notice so people who committed to pray know the train is closed.
//
// Caller is responsible for deduplicating recipients (one email per
// unique address) and for handling the "no recipients" empty case.

export async function sendTrainCancellationNotice({
  to,
  recipientName,
  organizerFirstName,
}: {
  to: string;
  recipientName: string;
  organizerFirstName: string | null;
}) {
  const eRecipientName = escapeHtml(recipientName);
  const eOrgFirst = escapeHtml(organizerFirstName ?? "the organizer");
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `The prayer train for ${recipientName} has been cancelled`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 14px;">
              The prayer train for ${eRecipientName} has been cancelled.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              ${eOrgFirst} has closed this prayer train, so you won&rsquo;t
              receive any more daily reminders for it. Thank you for the
              prayers you offered while it was active. Whatever was prayed
              has been prayed; the Lord receives every offering whether or
              not the calendar around it continues.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0;">
              No action is needed from you.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `The prayer train for ${recipientName} has been cancelled.\n\n${organizerFirstName ?? "The organizer"} has closed this prayer train, so you won't receive any more daily reminders for it. Thank you for the prayers you offered while it was active.\n\nNo action is needed from you.`,
    });
  } catch (error) {
    console.error("Failed to send train cancellation notice:", error);
  }
}

// ─── Pray-Together Emails (chain primitive) ────────────────
//
// Templates for the synchronized-solidarity primitive. Each one mentions
// the organizer + recipient by name so the email feels personal — the
// differentiator vs. praymorenovenas.com's generic global blasts. Copy
// here is queued for theology review (see docs/theology-review.md item
// #10) before chains officially launch.

function recipientPhrase(
  recipientName: string | null | undefined,
  intention: string,
  prefix: string = "for",
): string {
  if (recipientName?.trim()) return `${prefix} ${recipientName.trim()}`;
  // Truncate the intention if it's long — never let it overflow the subject.
  const words = intention.trim().split(/\s+/).slice(0, 8).join(" ");
  return `${prefix} ${words}${intention.trim().split(/\s+/).length > 8 ? "…" : ""}`;
}

/**
 * Resolve an organizer's first name for sentence interpolation, returning
 * `null` when the caller has signalled that no real name is available
 * (anonymous chain/train, or User.name is null/blank).
 *
 * Templates use the null branch to drop possessive constructions like
 * `${orgFirst}'s ${prayerName}` that previously produced broken-grammar
 * subjects ("Day 5 of the's Surrender Novena ..." — see PR commentary in
 * fix/anonymous-email-rendering for the original bug).
 *
 * Contract:
 *   - null input → null output (anonymous flag, propagate)
 *   - empty/whitespace input → null (defensive: treat as unset)
 *   - "First Last" → "First"
 *   - "First" → "First"
 */
export function firstNameOrNull(organizerName: string | null): string | null {
  if (organizerName === null) return null;
  const trimmed = organizerName.trim();
  if (trimmed.length === 0) return null;
  return trimmed.split(/\s+/)[0];
}

// ─── Chain email rendering helpers ────────────────────────────
//
// The four chain-audience email templates (sendChainJoinConfirmation,
// sendChainDailyReminder, sendChainClosingDayEmail,
// sendChainCancellationNotice) are split into pure `render*` helpers
// returning { subject, html, text } and thin async senders that call
// Resend. The split keeps the rendering logic testable without
// network mocks — the test suite asserts on subject/html shape for
// the (named, anonymous, null-name) permutations.
//
// All four take `organizerName: string | null`. The null path drops
// possessive constructions and substitutes anonymous-friendly copy,
// mirroring the chain detail page H1 fix from PR #30.

export interface ChainJoinConfirmationInput {
  to: string;
  memberName: string;
  /** null = anonymous OR no User.name. Template branches on this. */
  organizerName: string | null;
  prayerName: string;
  recipientName: string | null;
  intention: string;
  durationDays: number;
  chainUrl: string;
}

export function renderChainJoinConfirmation(input: ChainJoinConfirmationInput): {
  subject: string;
  html: string;
  text: string;
} {
  const phrase = recipientPhrase(input.recipientName, input.intention);
  const orgFirst = firstNameOrNull(input.organizerName);
  // Subject + greeting branch on whether a real name is available.
  // Anonymous: "You're praying along for Denis" — no "with X".
  // Named: "You're praying with William for Denis" — keeps the warm
  // first-name attribution.
  const subject = orgFirst
    ? `You're praying with ${orgFirst} ${phrase}`
    : `You're praying along ${phrase}`;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eMemberName = escapeHtml(input.memberName);
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const ePrayerName = escapeHtml(input.prayerName);
  const ePhrase = escapeHtml(phrase);
  // Intro sentence: drop the possessive ("the's Surrender Novena") when
  // anonymous. "the Surrender Novena for X" reads cleanly.
  const introSentence = eOrgFirst
    ? `You've joined ${eOrgFirst}'s <strong>${ePrayerName}</strong> ${ePhrase}.`
    : `You've joined the <strong>${ePrayerName}</strong> ${ePhrase}.`;
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 12px;">
              Welcome, ${eMemberName}.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.6; margin: 0 0 14px;">
              ${introSentence}
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.6; margin: 0 0 14px;">
              For the next ${input.durationDays} days, you'll receive an email each
              morning with the day's prayer text. Pray it whenever and wherever
              works for you. There's no obligation, no streak to maintain — just
              the grace of doing this together.
            </p>
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${input.chainUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Open the prayer
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `;
  const textIntro = orgFirst
    ? `You've joined ${orgFirst}'s ${input.prayerName} ${phrase}.`
    : `You've joined the ${input.prayerName} ${phrase}.`;
  const text = `${textIntro}\n\nFor the next ${input.durationDays} days, you'll receive a daily email with the prayer text.\n\nOpen the prayer page: ${input.chainUrl}`;
  return { subject, html, text };
}

export interface ChainDailyReminderInput {
  to: string;
  memberName: string;
  organizerName: string | null;
  prayerName: string;
  prayerText: string | null;
  prayerInstructions: string | null;
  customPrayerText?: string | null;
  /** Day-N specific meditation when prayerType.dailyReflections is
   *  populated (e.g., the Surrender Novena's nine distinct daily texts
   *  from Don Dolindo Ruotolo). Caller resolves via reflectionForDay
   *  in src/lib/daily-reflections.ts and passes through; null when the
   *  prayer doesn't have per-day reflections or this day isn't covered.
   *  Renders as a "Day N reflection" card above the refrain block. */
  dailyReflection?: string | null;
  recipientName: string | null;
  intention: string;
  day: number;
  durationDays: number;
  chainUrl: string;
  markCompleteUrl: string;
  unsubscribeUrl: string;
  otherMembersCount: number;
  /**
   * ISO 639-1 language tag from `PrayerChain.language`. Defaults to
   * "en" so any legacy caller without language plumbed through keeps
   * working. See PrayerChain.language in prisma/schema.prisma.
   */
  language?: string;
}

export function renderChainDailyReminder(input: ChainDailyReminderInput): {
  subject: string;
  html: string;
  text: string;
} {
  const dict = getEmailDictionary(input.language ?? "en");
  const t = dict.chainDaily;
  const phrase = recipientPhrase(
    input.recipientName,
    input.intention,
    dict.recipientPhrasePrefix,
  );
  const orgFirst = firstNameOrNull(input.organizerName);
  // Subject branches on name availability. Named uses the warm
  // "Day 5 of William's Surrender Novena for X" form. Anonymous
  // drops the possessive: "Day 5 of the Surrender Novena for X" —
  // grammatical and reads as a neutral description.
  const subject = orgFirst
    ? interpolate(t.subjectNamed, {
        day: input.day,
        orgFirst,
        prayerName: input.prayerName,
        phrase,
      })
    : interpolate(t.subjectAnon, {
        day: input.day,
        prayerName: input.prayerName,
        phrase,
      });
  // Pre-escape user-controlled fields for safe HTML injection.
  const eMemberName = escapeHtml(input.memberName);
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const ePrayerName = escapeHtml(input.prayerName);
  const ePhrase = escapeHtml(phrase);
  const ePrayerText = input.prayerText ? escapeHtml(input.prayerText) : null;
  const ePrayerInstructions = input.prayerInstructions
    ? escapeHtml(input.prayerInstructions)
    : null;
  const eCustomPrayerText = input.customPrayerText
    ? escapeHtml(input.customPrayerText)
    : null;
  const eDailyReflection = input.dailyReflection
    ? escapeHtml(input.dailyReflection)
    : null;
  // H1 mirrors the chain detail page (PR #30): drop possessive when
  // anonymous so the heading reads as a clean description.
  const h1 = eOrgFirst
    ? interpolate(t.h1Named, {
        orgFirst: eOrgFirst,
        prayerName: ePrayerName,
        phrase: ePhrase,
      })
    : interpolate(t.h1Anon, {
        prayerName: ePrayerName,
        phrase: ePhrase,
      });
  // Custom-prayer attribution: drop the "from X" when anonymous.
  // "A personal prayer included" reads as a neutral label rather
  // than "A prayer from the organizer" (stiff) or worse.
  const customPrayerHeading = eOrgFirst
    ? interpolate(t.customPrayerHeadingNamed, { orgFirst: eOrgFirst })
    : t.customPrayerHeadingAnon;
  // "N other people are praying with William today" → "N other people
  // are praying today" when anonymous. Each branch has singular +
  // plural so the count-aware template can drop the "is/are" English
  // dependency that doesn't survive translation cleanly.
  const otherMembersTemplate = eOrgFirst
    ? input.otherMembersCount === 1
      ? t.otherMembersNamedSingular
      : t.otherMembersNamedPlural
    : input.otherMembersCount === 1
      ? t.otherMembersAnonSingular
      : t.otherMembersAnonPlural;
  const otherMembersLine = interpolate(otherMembersTemplate, {
    count: input.otherMembersCount,
    orgFirst: eOrgFirst ?? "",
  });
  // Day-label inside the upper-cased badge. Localized so Spanish gets
  // "Día N de M" etc.
  const dayBadge = interpolate(t.dayLabel, {
    day: input.day,
    total: input.durationDays,
  });
  const dayReflectionBadge = interpolate(t.dayReflectionLabel, {
    day: input.day,
  });
  const greetingLine = interpolate(t.greeting, { memberName: eMemberName });
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px;">
              ${dayBadge}
            </p>
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              ${h1}
            </h1>
            <p style="color: #6e6150; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
              ${greetingLine}
            </p>
            ${
              ePrayerInstructions
                ? `<div style="border-left: 3px solid #d4a843; background: #fdf8ef; padding: 14px 18px; margin: 0 0 18px;">
                    <p style="color: #11152c; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${ePrayerInstructions}</p>
                  </div>`
                : ""
            }
            ${
              eDailyReflection
                ? `<div style="background: #fdf8ef; border: 1px solid #e8d5a8; border-radius: 12px; padding: 20px; margin: 0 0 22px;">
                    <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px;">${dayReflectionBadge}</p>
                    <p style="color: #11152c; font-size: 15px; line-height: 1.7; white-space: pre-line; margin: 0;">${eDailyReflection}</p>
                  </div>`
                : ""
            }
            ${
              ePrayerText
                ? `<div style="background: #fefdfb; border: 1px solid #f5f0ea; border-radius: 12px; padding: 22px; margin: 0 0 22px;">
                    <p style="font-family: 'EB Garamond', Georgia, serif; color: #11152c; font-size: 17px; font-style: italic; line-height: 1.7; white-space: pre-line; margin: 0;">${ePrayerText}</p>
                  </div>`
                : ""
            }
            ${
              eCustomPrayerText
                ? `<div style="background: #fdf8ef; border: 1px solid #e8d5a8; border-radius: 12px; padding: 20px; margin: 0 0 22px;">
                    <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px;">${customPrayerHeading}</p>
                    <p style="font-family: 'EB Garamond', Georgia, serif; color: #11152c; font-size: 16px; font-style: italic; line-height: 1.7; white-space: pre-line; margin: 0;">${eCustomPrayerText}</p>
                  </div>`
                : ""
            }
            ${
              input.otherMembersCount > 0
                ? `<p style="color: #6e6150; font-size: 13px; line-height: 1.6; margin: 0 0 18px; font-style: italic; text-align: center;">
                    ${otherMembersLine}
                  </p>`
                : ""
            }
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${input.markCompleteUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                ${t.cta}
              </a>
            </div>
            <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
              <a href="${input.chainUrl}" style="color: #947324; text-decoration: none;">${t.visitPrayer}</a>
              &nbsp;·&nbsp;
              <a href="${input.unsubscribeUrl}" style="color: #b8a994; text-decoration: none;">${t.unsubscribe}</a>
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 16px 0 0;">
            ${dict.brandFooter}
          </p>
        </div>
      `;
  // Plain-text fallback — unescaped values, locale-aware via t.*.
  const textHeader = orgFirst
    ? interpolate(t.textHeaderNamed, {
        day: input.day,
        total: input.durationDays,
        orgFirst,
        prayerName: input.prayerName,
        phrase,
      })
    : interpolate(t.textHeaderAnon, {
        day: input.day,
        total: input.durationDays,
        prayerName: input.prayerName,
        phrase,
      });
  const customTextAttribution = input.customPrayerText
    ? "\n\n" +
      (orgFirst
        ? interpolate(t.textCustomFromNamed, { orgFirst })
        : t.textCustomFromAnon) +
      `\n${input.customPrayerText}`
    : "";
  const reflectionText = input.dailyReflection
    ? `\n\n${interpolate(t.textReflectionLabel, { day: input.day })}\n${input.dailyReflection}`
    : "";
  const text = `${textHeader}\n\n${input.prayerInstructions ? input.prayerInstructions + "\n\n" : ""}${reflectionText ? reflectionText + "\n\n" : ""}${input.prayerText ?? ""}${customTextAttribution}\n\n${t.textCTA} ${input.markCompleteUrl}\n${t.textVisitPrayer} ${input.chainUrl}\n${t.textUnsubscribe} ${input.unsubscribeUrl}`;
  return { subject, html, text };
}

export interface ChainClosingDayEmailInput {
  to: string;
  memberName: string;
  organizerName: string | null;
  prayerName: string;
  recipientName: string | null;
  closingNote: string | null;
  chainUrl: string;
}

export function renderChainClosingDayEmail(input: ChainClosingDayEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const orgFirst = firstNameOrNull(input.organizerName);
  const recipientPhraseShort = input.recipientName?.trim()
    ? `for ${input.recipientName.trim()}`
    : "";
  // Subject: keep the closing line's warmth. Named version reads "thank
  // you for praying with William"; anonymous drops the trailing "with X"
  // since there's no name to attribute. The Prayer name + "is complete"
  // anchor stays.
  const subject = orgFirst
    ? `The ${input.prayerName} is complete — thank you for praying with ${orgFirst}`
    : `The ${input.prayerName} is complete — thank you for praying`;
  const eMemberName = escapeHtml(input.memberName);
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const ePrayerName = escapeHtml(input.prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  const eClosingNote = input.closingNote ? escapeHtml(input.closingNote) : null;
  // Body thank-you line: drop "with X" when anonymous. The recipient
  // phrase ("for Denis") still anchors the prayer to its subject so
  // the email is not generic.
  const thankYouLine = eOrgFirst
    ? `Thank you for praying with ${eOrgFirst} ${eRecipientPhraseShort}, ${eMemberName}.`
    : `Thank you for praying ${eRecipientPhraseShort}, ${eMemberName}.`;
  // Closing-note attribution: when anonymous, use generic "A note from
  // the organizer" rather than blank. The closing note is the
  // organizer's voice and that framing is grammatical even unnamed.
  const closingNoteHeading = eOrgFirst
    ? `A note from ${eOrgFirst}`
    : `A note from the organizer`;
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; text-align: center;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 12px; line-height: 1.3;">
              The ${ePrayerName} is complete.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
              ${thankYouLine}
            </p>
            ${
              eClosingNote
                ? `<div style="background: #fdf8ef; border-radius: 12px; padding: 20px; margin: 0 0 18px; text-align: left;">
                    <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">${closingNoteHeading}</p>
                    <p style="color: #11152c; font-style: italic; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-line;">${eClosingNote}</p>
                  </div>`
                : ""
            }
            <p style="color: #6e6150; font-size: 14px; font-style: italic; line-height: 1.7; margin: 18px 0 0;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            <a href="${input.chainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer page</a>
          </p>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 8px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `;
  const textThank = orgFirst
    ? `Thank you for praying with ${orgFirst} ${recipientPhraseShort}, ${input.memberName}.`
    : `Thank you for praying ${recipientPhraseShort}, ${input.memberName}.`;
  const textCloseAttrib = orgFirst ? `A note from ${orgFirst}` : `A note from the organizer`;
  const text = `The ${input.prayerName} is complete.\n\n${textThank}\n\n${input.closingNote ? textCloseAttrib + ":\n" + input.closingNote + "\n\n" : ""}May the Lord bless and keep all who carried this prayer.\n\n${input.chainUrl}`;
  return { subject, html, text };
}

export interface ChainCancellationNoticeInput {
  to: string;
  memberName: string;
  organizerName: string | null;
  prayerName: string;
  recipientName: string | null;
  intention: string;
}

export function renderChainCancellationNotice(input: ChainCancellationNoticeInput): {
  subject: string;
  html: string;
  text: string;
} {
  const phrase = recipientPhrase(input.recipientName, input.intention);
  const orgFirst = firstNameOrNull(input.organizerName);
  const eMemberName = escapeHtml(input.memberName);
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const ePrayerName = escapeHtml(input.prayerName);
  const ePhrase = escapeHtml(phrase);
  // Subject + H1: drop possessive when anonymous. The "has been
  // cancelled" structure still reads cleanly without an owner.
  const subject = orgFirst
    ? `${orgFirst}'s ${input.prayerName} ${phrase} has been cancelled`
    : `The ${input.prayerName} ${phrase} has been cancelled`;
  const h1 = eOrgFirst
    ? `${eOrgFirst}&rsquo;s ${ePrayerName} ${ePhrase} has been cancelled.`
    : `The ${ePrayerName} ${ePhrase} has been cancelled.`;
  const closedSentence = eOrgFirst
    ? `${eOrgFirst} has closed this shared prayer, so you won&rsquo;t`
    : `The organizer has closed this shared prayer, so you won&rsquo;t`;
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 14px;">
              ${h1}
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              ${closedSentence}
              receive any more daily reminders for it. Thank you for the
              prayers you offered while it was running, ${eMemberName}.
              Whatever was prayed has been prayed; the Lord receives every
              offering whether or not the calendar around it continues.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0;">
              No action is needed from you.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `;
  const textHeader = orgFirst
    ? `${orgFirst}'s ${input.prayerName} ${phrase} has been cancelled.`
    : `The ${input.prayerName} ${phrase} has been cancelled.`;
  const textBody = orgFirst
    ? `${orgFirst} has closed this shared prayer, so you won't receive any more daily reminders for it. Thank you for the prayers you offered while it was running, ${input.memberName}.`
    : `The organizer has closed this shared prayer, so you won't receive any more daily reminders for it. Thank you for the prayers you offered while it was running, ${input.memberName}.`;
  const text = `${textHeader}\n\n${textBody}\n\nNo action is needed from you.`;
  return { subject, html, text };
}

export async function sendChainJoinConfirmation(input: ChainJoinConfirmationInput) {
  const { subject, html, text } = renderChainJoinConfirmation(input);
  try {
    await resend.emails.send({ from: FROM, to: input.to, subject, html, text });
  } catch (error) {
    console.error("Failed to send chain join confirmation:", error);
  }
}

export async function sendChainDailyReminder(
  input: ChainDailyReminderInput,
): Promise<EmailDispatchResult> {
  // Returns EmailDispatchResult so the chain-reminders cron can write
  // its lastReminderSentForDay audit field only on verified Resend
  // success. The legacy void-returning shape with internal try/catch
  // hid API-level rejections (Resend's `{ data: null, error: ... }`
  // response body) as if they were successes — see PR after #50 for
  // the May 8 2026 priscilla regression that motivated this contract.
  const { subject, html, text } = renderChainDailyReminder(input);
  return dispatchEmail({
    to: input.to,
    subject,
    html,
    text,
    label: "chain daily reminder",
  });
}

export async function sendChainClosingDayEmail(input: ChainClosingDayEmailInput) {
  const { subject, html, text } = renderChainClosingDayEmail(input);
  try {
    await resend.emails.send({ from: FROM, to: input.to, subject, html, text });
  } catch (error) {
    console.error("Failed to send chain closing-day email:", error);
  }
}

// ─── Train closing prompt to organizer ──────────────────────
//
// Mirrors sendChainClosingPrompt but for the calendar/coverage
// PrayerTrain primitive. Fires from the daily-reminders cron on a
// train's endDate, once per train. Idempotency lives on
// PrayerTrain.closingPromptSentAt.
//
// CTA links to /p/[slug]/manage where the organizer hits the
// "Mark Completed" status button. That path fires the existing
// warrior-closing-email fan-out (preserved — auto-close is silent).

export async function sendTrainClosingPrompt({
  to,
  organizerFirstName,
  recipientName,
  trainManageUrl,
}: {
  to: string;
  /** Organizer's first name. Caller resolves anonymity via the
   *  organizer-display helper before passing in. */
  organizerFirstName: string;
  /** Always present on trains (recipientName is required at create). */
  recipientName: string;
  /** /p/[slug]/manage — where organizer hits Mark Completed. */
  trainManageUrl: string;
}) {
  const subject = `Your prayer train for ${recipientName} is wrapping up`;
  const eOrgFirst = escapeHtml(organizerFirstName);
  const eRecipientName = escapeHtml(recipientName);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              Prayers for ${eRecipientName}
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${eOrgFirst}, the prayer train you organized for ${eRecipientName} reaches its final day today.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              When you're ready, visit the manage page and click <strong>Mark Completed</strong> to wrap things up. Doing so notifies the prayer warriors who pledged to pray and unlocks the spiritual bouquet PDF — every prayer offered, every day covered — that you can send to the family.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${trainManageUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Mark the train completed
              </a>
            </div>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              No rush. The page stays available; you can come back to it whenever you're ready.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Prayers for ${recipientName}\n\n${organizerFirstName}, the prayer train you organized for ${recipientName} reaches its final day today.\n\nWhen you're ready, visit the manage page and click Mark Completed to wrap things up. Doing so notifies the prayer warriors and unlocks the spiritual bouquet PDF — every prayer offered, every day covered — that you can send to the family.\n\nMark the train completed: ${trainManageUrl}\n\nNo rush. The page stays available; you can come back to it whenever you're ready.`,
    });
  } catch (error) {
    console.error("Failed to send train closing-prompt email:", error);
  }
}

// ─── Chain closing prompt to organizer ──────────────────────
//
// Fires from the chain-reminders cron on a chain's endDate, once per
// chain. Idempotency lives on PrayerChain.closingPromptSentAt — the
// cron sets it after a successful send; subsequent runs skip.
//
// Audience: just the organizer. Members already received their final
// daily reminder; this email is the nudge for the organizer to write
// a closing note + click Close, which generates the spiritual bouquet
// PDF for the recipient family.
//
// Tone: warm, parishioner-flavored, calm. Not productivity-app
// energy. Mirrors sendChainClosingDayEmail's shape but the audience +
// CTA differ.

export async function sendChainClosingPrompt({
  to,
  organizerFirstName,
  prayerName,
  recipientName,
  chainManageUrl,
}: {
  to: string;
  /** Organizer's first name for greeting. Caller resolves anonymity
   *  via the organizer-display helper before passing in; this template
   *  treats whatever it receives as the literal greeting. */
  organizerFirstName: string;
  prayerName: string;
  recipientName: string | null;
  /** /chain/[slug]/manage — where the organizer writes the closing
   *  note and clicks Close. */
  chainManageUrl: string;
}) {
  const recipientPhraseShort = recipientName?.trim()
    ? `for ${recipientName.trim()}`
    : "";
  const subject = recipientName?.trim()
    ? `Your ${prayerName} for ${recipientName.trim()} is wrapping up`
    : `Your ${prayerName} is wrapping up`;
  const eOrgFirst = escapeHtml(organizerFirstName);
  const ePrayerName = escapeHtml(prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              ${ePrayerName} ${eRecipientPhraseShort}
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${eOrgFirst}, the ${ePrayerName} you organized ${eRecipientPhraseShort} comes to its final day today.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              When you're ready, visit the manage page to add a closing note and wrap things up. Closing the prayer generates a spiritual bouquet PDF you can send to the family — every prayer offered, every day covered.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${chainManageUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Close the prayer
              </a>
            </div>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              No rush. The page stays available; you can come back to it whenever you're ready.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `${prayerName} ${recipientPhraseShort}\n\n${organizerFirstName}, the ${prayerName} you organized ${recipientPhraseShort} comes to its final day today.\n\nWhen you're ready, visit the manage page to add a closing note and wrap things up. Closing the prayer generates a spiritual bouquet PDF you can send to the family — every prayer offered, every day covered.\n\nClose the prayer: ${chainManageUrl}\n\nNo rush. The page stays available; you can come back to it whenever you're ready.`,
    });
  } catch (error) {
    console.error("Failed to send chain closing-prompt email:", error);
  }
}

// ─── Train abandonment prompt to organizer ────────────────────
//
// Fires from the daily-reminders cron after 14 days from createdAt
// for trains still ACTIVE with zero claimed slots and zero warriors.
// Mirrors sendTrainClosingPrompt's shape but the trigger is empty-
// engagement (not endDate) and the action set is broader (share /
// edit / close). Idempotency via PrayerTrain.abandonmentPromptSentAt.
//
// Tone guardrails: no em dashes in body copy (William's preference
// for new user-facing text). Don't quantify shame ("nobody signed
// up"); frame as "hasn't received signups yet" so the door stays
// open. Always announce the auto-archive timer so the organizer
// isn't surprised by Pass 4 a week later.
//
// CTA links to /p/[slug]/manage where the organizer can copy the
// train link to share, edit details, or click cancel.

export async function sendTrainAbandonmentPrompt({
  to,
  organizerFirstName,
  recipientName,
  trainUrl,
  trainManageUrl,
}: {
  to: string;
  organizerFirstName: string;
  recipientName: string;
  /** /p/[slug] — public train page the organizer copies + shares. */
  trainUrl: string;
  /** /p/[slug]/manage — where the organizer edits or closes the train. */
  trainManageUrl: string;
}) {
  const subject = `A few options for your prayer train for ${recipientName}`;
  const eOrgFirst = escapeHtml(organizerFirstName);
  const eRecipientName = escapeHtml(recipientName);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              Prayers for ${eRecipientName}
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${eOrgFirst}, the prayer train you started for ${eRecipientName} hasn&rsquo;t received any signups yet. We&rsquo;re holding the space, and here are a few options if you&rsquo;d like to take action.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 8px;">
              <strong>Share the link.</strong> Most trains pick up momentum when an organizer texts or emails it to a few friends and family.
            </p>
            <p style="color: #11152c; font-size: 14px; line-height: 1.6; margin: 0 0 18px; word-break: break-all;">
              <a href="${trainUrl}" style="color: #242e58; text-decoration: underline;">${trainUrl}</a>
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
              <strong>Edit the train.</strong> If the recipient&rsquo;s situation has changed, you can update details or the intention on the manage page.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              <strong>Close the train.</strong> If you&rsquo;d rather wind it down, the manage page has a close option.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${trainManageUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Open the manage page
              </a>
            </div>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              If we don&rsquo;t hear from you within 7 days, we&rsquo;ll quietly archive this train so it doesn&rsquo;t sit unattended. You can always reach out to restore it.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Prayers for ${recipientName}\n\n${organizerFirstName}, the prayer train you started for ${recipientName} hasn't received any signups yet. We're holding the space, and here are a few options if you'd like to take action.\n\nShare the link. Most trains pick up momentum when an organizer texts or emails it to a few friends and family.\n${trainUrl}\n\nEdit the train. If the recipient's situation has changed, you can update details or the intention on the manage page.\n\nClose the train. If you'd rather wind it down, the manage page has a close option.\n\nOpen the manage page: ${trainManageUrl}\n\nIf we don't hear from you within 7 days, we'll quietly archive this train so it doesn't sit unattended. You can always reach out to restore it.`,
    });
  } catch (error) {
    console.error("Failed to send train abandonment-prompt email:", error);
  }
}

// ─── Train abandonment archived notification ───────────────────
//
// Sent on the auto-cancel path (Pass 4) after the 7-day grace window
// elapsed without engagement. Brief and pastoral; the train is gone
// from public listings now, so the organizer should know it happened
// and how to come back if they want to.

export async function sendTrainAbandonmentArchived({
  to,
  organizerFirstName,
  recipientName,
}: {
  to: string;
  organizerFirstName: string;
  recipientName: string;
}) {
  const subject = `Your prayer train for ${recipientName} has been archived`;
  const eOrgFirst = escapeHtml(organizerFirstName);
  const eRecipientName = escapeHtml(recipientName);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 24px; font-weight: 700; margin: 0 0 14px; line-height: 1.3;">
              Your prayer train has been archived.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              ${eOrgFirst}, we&rsquo;ve quietly archived your prayer train for ${eRecipientName}. It sat without signups for three weeks, so we tucked it away.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              If you&rsquo;d like to start fresh or restore this one, just reply to this email and we&rsquo;ll help.
            </p>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 18px 0 0; text-align: center;">
              May the Lord bless and keep ${eRecipientName} and your family.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Your prayer train has been archived.\n\n${organizerFirstName}, we've quietly archived your prayer train for ${recipientName}. It sat without signups for three weeks, so we tucked it away.\n\nIf you'd like to start fresh or restore this one, just reply to this email and we'll help.\n\nMay the Lord bless and keep ${recipientName} and your family.`,
    });
  } catch (error) {
    console.error("Failed to send train abandonment-archived email:", error);
  }
}

// ─── Chain abandonment prompt to organizer ────────────────────
//
// Chain-side mirror of sendTrainAbandonmentPrompt. Triggered from the
// chain-reminders cron after 14 days for chains still ACTIVE with
// zero members. Idempotency via PrayerChain.abandonmentPromptSentAt.

export async function sendChainAbandonmentPrompt({
  to,
  organizerFirstName,
  prayerName,
  recipientName,
  chainUrl,
  chainManageUrl,
}: {
  to: string;
  organizerFirstName: string;
  prayerName: string;
  recipientName: string | null;
  /** /chain/[slug] — public chain page to share. */
  chainUrl: string;
  /** /chain/[slug]/manage — where the organizer edits or closes. */
  chainManageUrl: string;
}) {
  const recipientPhraseShort = recipientName?.trim()
    ? `for ${recipientName.trim()}`
    : "";
  const subject = recipientName?.trim()
    ? `A few options for your ${prayerName} for ${recipientName.trim()}`
    : `A few options for your ${prayerName}`;
  const eOrgFirst = escapeHtml(organizerFirstName);
  const ePrayerName = escapeHtml(prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              ${ePrayerName} ${eRecipientPhraseShort}
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${eOrgFirst}, the ${ePrayerName} you started ${eRecipientPhraseShort} hasn&rsquo;t picked up any other members yet. We&rsquo;re holding the space, and here are a few options if you&rsquo;d like to take action.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 8px;">
              <strong>Share the link.</strong> A short text or email to a few friends or family is usually all it takes.
            </p>
            <p style="color: #11152c; font-size: 14px; line-height: 1.6; margin: 0 0 18px; word-break: break-all;">
              <a href="${chainUrl}" style="color: #242e58; text-decoration: underline;">${chainUrl}</a>
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
              <strong>Edit the prayer.</strong> If the intention has changed, the manage page lets you update it.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              <strong>Close it.</strong> If you&rsquo;d rather wind it down, the manage page has a close option.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${chainManageUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Open the manage page
              </a>
            </div>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              If we don&rsquo;t hear from you within 7 days, we&rsquo;ll quietly archive this prayer so it doesn&rsquo;t sit unattended. You can always reach out to restore it.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `${prayerName} ${recipientPhraseShort}\n\n${organizerFirstName}, the ${prayerName} you started ${recipientPhraseShort} hasn't picked up any other members yet. We're holding the space, and here are a few options if you'd like to take action.\n\nShare the link. A short text or email to a few friends or family is usually all it takes.\n${chainUrl}\n\nEdit the prayer. If the intention has changed, the manage page lets you update it.\n\nClose it. If you'd rather wind it down, the manage page has a close option.\n\nOpen the manage page: ${chainManageUrl}\n\nIf we don't hear from you within 7 days, we'll quietly archive this prayer so it doesn't sit unattended. You can always reach out to restore it.`,
    });
  } catch (error) {
    console.error("Failed to send chain abandonment-prompt email:", error);
  }
}

// ─── Chain abandonment archived notification ───────────────────

export async function sendChainAbandonmentArchived({
  to,
  organizerFirstName,
  prayerName,
  recipientName,
}: {
  to: string;
  organizerFirstName: string;
  prayerName: string;
  recipientName: string | null;
}) {
  const recipientPhraseShort = recipientName?.trim()
    ? `for ${recipientName.trim()}`
    : "";
  const subject = recipientName?.trim()
    ? `Your ${prayerName} for ${recipientName.trim()} has been archived`
    : `Your ${prayerName} has been archived`;
  const eOrgFirst = escapeHtml(organizerFirstName);
  const ePrayerName = escapeHtml(prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 24px; font-weight: 700; margin: 0 0 14px; line-height: 1.3;">
              Your ${ePrayerName} has been archived.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              ${eOrgFirst}, we&rsquo;ve quietly archived your ${ePrayerName} ${eRecipientPhraseShort}. It sat without any other members for three weeks, so we tucked it away.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              If you&rsquo;d like to start fresh or restore this one, just reply to this email and we&rsquo;ll help.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Your ${prayerName} has been archived.\n\n${organizerFirstName}, we've quietly archived your ${prayerName} ${recipientPhraseShort}. It sat without any other members for three weeks, so we tucked it away.\n\nIf you'd like to start fresh or restore this one, just reply to this email and we'll help.`,
    });
  } catch (error) {
    console.error("Failed to send chain abandonment-archived email:", error);
  }
}

// Cancellation notice (chain) — same shape and pastoral framing as the
// train version. Sent to every active member (unsubscribedAt is null)
// when an organizer cancels the chain. Caller dedupes by email and
// handles the empty-recipients case.

export async function sendChainCancellationNotice(input: ChainCancellationNoticeInput) {
  const { subject, html, text } = renderChainCancellationNotice(input);
  try {
    await resend.emails.send({ from: FROM, to: input.to, subject, html, text });
  } catch (error) {
    console.error("Failed to send chain cancellation notice:", error);
  }
}

// ─── Bouquet-ready email (chain + train) ────────────────────
//
// Sent to the organizer when their prayer transitions to COMPLETED
// (manual close OR cron auto-close path). Surfaces the spiritual
// bouquet PDF download link so the organizer doesn't have to dig
// through the manage page to find it.
//
// End-user motivation: William closed the Benji novena May 6 2026
// and asked "shouldn't I get an email with the bouquet?" — yes,
// you should. The bouquet exists at /api/bouquet/chain/[slug]
// (and /api/bouquet/[slug] for trains) but nothing emails the
// link to the organizer when the prayer ends.
//
// Audience: just the organizer. Members already received their
// closing-day email. Warriors on trains already received their
// closing email with the bouquet link (existing behavior). This
// helper closes the gap for the organizer themselves.
//
// Tone: warm, not transactional. The PDF is a sacred artifact for
// the recipient family, not a downloadable invoice.

export interface ChainBouquetReadyInput {
  to: string;
  /** Organizer name when available; null when anonymous OR no User.name.
   *  Template uses null to drop possessive constructions and substitute
   *  neutral copy. Same contract as the other chain emails. */
  organizerName: string | null;
  prayerName: string;
  recipientName: string | null;
  /** /api/bouquet/chain/[slug] — direct link to the PDF. Generates
   *  fresh on each request; organizer-auth gated server-side. */
  bouquetUrl: string;
  /** /chain/[slug] — back to the public prayer page. */
  chainUrl: string;
}

export function renderChainBouquetReady(input: ChainBouquetReadyInput): {
  subject: string;
  html: string;
  text: string;
} {
  const orgFirst = firstNameOrNull(input.organizerName);
  const recipientPhraseShort = input.recipientName?.trim()
    ? `for ${input.recipientName.trim()}`
    : "";
  const subject = input.recipientName?.trim()
    ? `Your spiritual bouquet for ${input.recipientName.trim()} is ready`
    : `Your spiritual bouquet is ready`;
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const ePrayerName = escapeHtml(input.prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  // Greeting: "William, the [Prayer] for [Recipient] is complete."
  // When anonymous, drop the name and start the sentence with "The".
  const greeting = eOrgFirst
    ? `${eOrgFirst}, the ${ePrayerName} ${eRecipientPhraseShort} is complete.`
    : `The ${ePrayerName} ${eRecipientPhraseShort} is complete.`;
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              The spiritual bouquet is ready.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${greeting}
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              The bouquet PDF below holds every name that prayed and every day that was covered. It&rsquo;s yours to download, print, or send on to the family.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${input.bouquetUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Download the spiritual bouquet
              </a>
            </div>
            <p style="color: #6e6150; font-size: 13px; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              <a href="${input.chainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer page</a>
            </p>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 18px 0 0; text-align: center;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `;
  const textGreeting = orgFirst
    ? `${orgFirst}, the ${input.prayerName} ${recipientPhraseShort} is complete.`
    : `The ${input.prayerName} ${recipientPhraseShort} is complete.`;
  const text = `The spiritual bouquet is ready.\n\n${textGreeting}\n\nThe bouquet PDF holds every name that prayed and every day that was covered. It's yours to download, print, or send on to the family.\n\nDownload: ${input.bouquetUrl}\nVisit the prayer page: ${input.chainUrl}\n\nMay the Lord bless and keep all who carried this prayer.`;
  return { subject, html, text };
}

export async function sendChainBouquetReady(input: ChainBouquetReadyInput) {
  const { subject, html, text } = renderChainBouquetReady(input);
  try {
    await resend.emails.send({ from: FROM, to: input.to, subject, html, text });
  } catch (error) {
    console.error("Failed to send chain bouquet-ready email:", error);
  }
}

// ─── Bouquet shared with members ─────────────────────────────
//
// Member-facing variant of the bouquet-ready email. Tone is
// gracious-thank-you, not "your bouquet" — members joined the
// prayer, they didn't organize it, so the framing is "the artifact
// your prayers helped create." Used by the resend-chain-bouquet
// one-off script to follow up with members of chains that closed
// before PR #40 wired the organizer-only bouquet email; can also
// be invoked from closePrayerChain in the future if William wants
// every member to get the bouquet on close (PR #40 explicitly
// excluded this; revisitable).
//
// Audience: each active member (unsubscribedAt: null) of a
// COMPLETED chain. NOT the organizer — they get
// sendChainBouquetReady, which is keyed on "Your" pronoun.

export interface ChainBouquetForMembersInput {
  to: string;
  memberName: string;
  /** Organizer first name when available; null when anonymous OR
   *  no User.name. Template uses null to drop "with [name]" from the
   *  thank-you sentence and substitute "joining this prayer." Same
   *  contract as the other chain emails. */
  organizerName: string | null;
  prayerName: string;
  recipientName: string | null;
  bouquetUrl: string;
  chainUrl: string;
}

export function renderChainBouquetForMembers(input: ChainBouquetForMembersInput): {
  subject: string;
  html: string;
  text: string;
} {
  const orgFirst = firstNameOrNull(input.organizerName);
  const recipientPhraseShort = input.recipientName?.trim()
    ? `for ${input.recipientName.trim()}`
    : "";
  const subject = input.recipientName?.trim()
    ? `The spiritual bouquet for ${input.recipientName.trim()}`
    : `The spiritual bouquet from the ${input.prayerName}`;
  const eMemberName = escapeHtml(input.memberName);
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const ePrayerName = escapeHtml(input.prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  // Thank-you greeting: drop "with [name]" when anonymous so the
  // sentence still reads cleanly without the organizer attribution.
  const thankYou = eOrgFirst
    ? `${eMemberName}, thank you for praying with ${eOrgFirst} ${eRecipientPhraseShort}.`
    : `${eMemberName}, thank you for joining this prayer ${eRecipientPhraseShort}.`;
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              The spiritual bouquet is ready.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${thankYou}
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              The ${ePrayerName} is complete. The bouquet below holds every name that prayed and every day that was covered.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${input.bouquetUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                View the spiritual bouquet
              </a>
            </div>
            <p style="color: #6e6150; font-size: 13px; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              <a href="${input.chainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer page</a>
            </p>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 18px 0 0; text-align: center;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `;
  const textThank = orgFirst
    ? `${input.memberName}, thank you for praying with ${orgFirst} ${recipientPhraseShort}.`
    : `${input.memberName}, thank you for joining this prayer ${recipientPhraseShort}.`;
  const text = `The spiritual bouquet is ready.\n\n${textThank}\n\nThe ${input.prayerName} is complete. The bouquet holds every name that prayed and every day that was covered.\n\nView the bouquet: ${input.bouquetUrl}\nVisit the prayer page: ${input.chainUrl}\n\nMay the Lord bless and keep all who carried this prayer.`;
  return { subject, html, text };
}

export async function sendChainBouquetForMembers(input: ChainBouquetForMembersInput) {
  const { subject, html, text } = renderChainBouquetForMembers(input);
  try {
    await resend.emails.send({ from: FROM, to: input.to, subject, html, text });
  } catch (error) {
    console.error("Failed to send chain bouquet-for-members email:", error);
  }
}

export interface TrainBouquetReadyInput {
  to: string;
  organizerName: string | null;
  /** Always present on trains (recipientName is required at create). */
  recipientName: string;
  /** /api/bouquet/[slug] — direct link to the PDF. */
  bouquetUrl: string;
  /** /p/[slug] — back to the public train page. */
  trainUrl: string;
}

export function renderTrainBouquetReady(input: TrainBouquetReadyInput): {
  subject: string;
  html: string;
  text: string;
} {
  const orgFirst = firstNameOrNull(input.organizerName);
  const subject = `Your spiritual bouquet for ${input.recipientName} is ready`;
  const eOrgFirst = orgFirst ? escapeHtml(orgFirst) : null;
  const eRecipientName = escapeHtml(input.recipientName);
  const greeting = eOrgFirst
    ? `${eOrgFirst}, the prayer train for ${eRecipientName} is complete.`
    : `The prayer train for ${eRecipientName} is complete.`;
  const html = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              The spiritual bouquet is ready.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              ${greeting}
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              The bouquet PDF below holds every name that prayed and every day that was covered. It&rsquo;s yours to download, print, or send on to the family.
            </p>
            <div style="text-align: center; margin: 8px 0 4px;">
              <a href="${input.bouquetUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Download the spiritual bouquet
              </a>
            </div>
            <p style="color: #6e6150; font-size: 13px; line-height: 1.6; margin: 24px 0 0; text-align: center;">
              <a href="${input.trainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer train</a>
            </p>
            <p style="color: #b8a994; font-size: 13px; font-style: italic; line-height: 1.6; margin: 18px 0 0; text-align: center;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain &middot; A Lantern Harbor project
          </p>
        </div>
      `;
  const textGreeting = orgFirst
    ? `${orgFirst}, the prayer train for ${input.recipientName} is complete.`
    : `The prayer train for ${input.recipientName} is complete.`;
  const text = `The spiritual bouquet is ready.\n\n${textGreeting}\n\nThe bouquet PDF holds every name that prayed and every day that was covered. It's yours to download, print, or send on to the family.\n\nDownload: ${input.bouquetUrl}\nVisit the prayer train: ${input.trainUrl}\n\nMay the Lord bless and keep all who carried this prayer.`;
  return { subject, html, text };
}

export async function sendTrainBouquetReady(input: TrainBouquetReadyInput) {
  const { subject, html, text } = renderTrainBouquetReady(input);
  try {
    await resend.emails.send({ from: FROM, to: input.to, subject, html, text });
  } catch (error) {
    console.error("Failed to send train bouquet-ready email:", error);
  }
}

// ─── PrayerWarrior Emails ───────────────────────────────────
//
// Templates for the overflow-pledge primitive — visitors who pledge to
// pray for a fully-covered train without claiming a specific calendar
// slot. Two messages: a welcome confirmation right after they sign up,
// and a closing thank-you when the train transitions to COMPLETED.
// No daily reminders by design — warriors made an open-ended pledge,
// not a per-day commitment.

export async function sendPrayerWarriorWelcome({
  to,
  warriorName,
  recipientName,
  organizerFirstName,
  trainUrl,
}: {
  to: string;
  warriorName: string;
  recipientName: string;
  organizerFirstName: string | null;
  trainUrl: string;
}) {
  const subject = `Thank you for praying for ${recipientName}`;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eWarriorName = escapeHtml(warriorName);
  const eRecipientName = escapeHtml(recipientName);
  // Drop possessive when the organizer is anonymous or has no name.
  // "the organizer's prayer for X" reads stiff; the anonymous form
  // "the prayer for X" mirrors the chain detail-page H1 fix from
  // PR #30. Mirrors the rendering pattern in the chain email helpers.
  const eOrgFirst = organizerFirstName ? escapeHtml(organizerFirstName) : null;
  const joinSentence = eOrgFirst
    ? `You've joined ${eOrgFirst}'s prayer for <strong>${eRecipientName}</strong>.`
    : `You've joined the prayer for <strong>${eRecipientName}</strong>.`;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 12px;">
              Thank you, ${eWarriorName}.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              ${joinSentence}
              Every slot on the calendar is filled — and your prayer adds to the
              cloud of intercession surrounding ${eRecipientName}.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 14px;">
              Pray however and whenever you can. There's no specific time,
              no slot, no obligation — just the grace of joining your prayer
              to ours. When the prayer train ends, we'll send you a closing
              note with the full spiritual bouquet.
            </p>
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${trainUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Visit the prayer train
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Thank you for praying for ${recipientName}, ${warriorName}.\n\n${organizerFirstName ? `You've joined ${organizerFirstName}'s prayer.` : `You've joined the prayer for ${recipientName}.`} Every calendar slot is filled — and your prayer adds to the cloud of intercession.\n\nPray however and whenever you can. When the prayer train ends, we'll send you a closing note.\n\nVisit: ${trainUrl}`,
    });
  } catch (error) {
    console.error("Failed to send prayer-warrior welcome email:", error);
  }
}

export async function sendPrayerWarriorClosing({
  to,
  warriorName,
  recipientName,
  organizerFirstName,
  trainUrl,
  bouquetUrl,
}: {
  to: string;
  warriorName: string;
  recipientName: string;
  organizerFirstName: string | null;
  trainUrl: string;
  bouquetUrl: string;
}) {
  // organizerFirstName is part of the signature for symmetry with the
  // welcome template and future use; the closing copy doesn't currently
  // reference it.
  void organizerFirstName;
  const subject = `The prayer train for ${recipientName} is complete`;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eWarriorName = escapeHtml(warriorName);
  const eRecipientName = escapeHtml(recipientName);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; text-align: center;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 12px; line-height: 1.3;">
              The prayer train is complete.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
              Thank you for praying for ${eRecipientName}, ${eWarriorName}.
              Every prayer offered — every slot, every pledge — is held in the
              spiritual bouquet linked below. May the Lord reward your
              faithfulness.
            </p>
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${bouquetUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                View the spiritual bouquet
              </a>
            </div>
            <p style="color: #6e6150; font-size: 14px; font-style: italic; line-height: 1.7; margin: 18px 0 0;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            <a href="${trainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer train</a>
          </p>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 8px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `The prayer train for ${recipientName} is complete.\n\nThank you for praying, ${warriorName}. Every prayer offered is held in the spiritual bouquet.\n\nView the bouquet: ${bouquetUrl}\nVisit the train: ${trainUrl}\n\nMay the Lord bless and keep all who carried this prayer.`,
    });
  } catch (error) {
    console.error("Failed to send prayer-warrior closing email:", error);
  }
}
