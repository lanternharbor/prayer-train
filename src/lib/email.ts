import { Resend } from "resend";
import { getBaseUrl } from "./url";

const FROM = process.env.EMAIL_FROM || "PrayerTrain <noreply@ourfaithtrain.com>";

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
}: {
  to: string;
  claimerName: string;
  recipientName: string;
  prayerName: string;
  date: string;
  prayerInstructions: string | null;
  trainUrl: string;
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
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 32px;">
            PrayerTrain — Organized prayer for those in need
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send claim confirmation email:", error);
  }
}

export async function sendDailyReminder({
  to,
  claimerName,
  recipientName,
  prayerName,
  prayerText,
  prayerInstructions,
  customPrayerText,
  organizerFirstName,
  trainUrl,
  completeUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  slotId,
}: {
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
}) {
  // Pre-escape user-controlled fields for safe HTML injection.
  const eClaimerName = escapeHtml(claimerName);
  const eRecipientName = escapeHtml(recipientName);
  const ePrayerName = escapeHtml(prayerName);
  const ePrayerText = prayerText ? escapeHtml(prayerText) : null;
  const ePrayerInstructions = prayerInstructions
    ? escapeHtml(prayerInstructions)
    : null;
  const eCustomPrayerText = customPrayerText
    ? escapeHtml(customPrayerText)
    : null;
  const eOrgFirst = escapeHtml(organizerFirstName || "the organizer");
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Prayer reminder: ${prayerName} for ${recipientName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background: #242e58; line-height: 48px; text-align: center;">
              <span style="color: white; font-weight: bold; font-size: 18px;">PT</span>
            </div>
          </div>
          <h1 style="color: #11152c; font-size: 22px; text-align: center; margin-bottom: 8px;">
            Today's Prayer for ${eRecipientName}
          </h1>
          <p style="color: #6e6150; text-align: center; margin-bottom: 24px;">
            Hi ${eClaimerName}, here's your prayer commitment for today.
          </p>
          <div style="background: #faf8f5; border: 1px solid #e8e0d5; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 12px 0; color: #11152c; font-size: 18px;">
              ${ePrayerName}
            </h2>
            ${ePrayerInstructions ? `
              <p style="margin: 0 0 16px 0; color: #6e6150; font-size: 14px; line-height: 1.6;">
                <strong>How to pray:</strong> ${ePrayerInstructions}
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
                A prayer from ${eOrgFirst}
              </p>
              <p style="margin: 0; color: #242e58; font-style: italic; line-height: 1.8; font-size: 15px; white-space: pre-line;">
                ${eCustomPrayerText}
              </p>
            </div>
          ` : ""}
          <div style="text-align: center; margin-top: 24px;">
            <a href="${completeUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              I prayed
            </a>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 8px;">
            <a href="${trainUrl}" style="color: #b8a994; text-decoration: none;">View the prayer train</a>
          </p>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 24px;">
            PrayerTrain — Organized prayer for those in need
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send daily reminder email:", error);
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
): string {
  if (recipientName?.trim()) return `for ${recipientName.trim()}`;
  // Truncate the intention if it's long — never let it overflow the subject.
  const words = intention.trim().split(/\s+/).slice(0, 8).join(" ");
  return `for ${words}${intention.trim().split(/\s+/).length > 8 ? "…" : ""}`;
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export async function sendChainJoinConfirmation({
  to,
  memberName,
  organizerName,
  prayerName,
  recipientName,
  intention,
  durationDays,
  chainUrl,
}: {
  to: string;
  memberName: string;
  organizerName: string;
  prayerName: string;
  recipientName: string | null;
  intention: string;
  durationDays: number;
  chainUrl: string;
}) {
  const phrase = recipientPhrase(recipientName, intention);
  const orgFirst = firstName(organizerName);
  const subject = `You're praying with ${orgFirst} ${phrase}`;
  // Pre-escape user-controlled fields for safe HTML injection. `phrase`
  // is derived from user-provided recipientName/intention so it gets
  // escaped too.
  const eMemberName = escapeHtml(memberName);
  const eOrgFirst = escapeHtml(orgFirst);
  const ePrayerName = escapeHtml(prayerName);
  const ePhrase = escapeHtml(phrase);
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 12px;">
              Welcome, ${eMemberName}.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.6; margin: 0 0 14px;">
              You've joined ${eOrgFirst}'s <strong>${ePrayerName}</strong> ${ePhrase}.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.6; margin: 0 0 14px;">
              For the next ${durationDays} days, you'll receive an email each
              morning with the day's prayer text. Pray it whenever and wherever
              works for you. There's no obligation, no streak to maintain — just
              the grace of doing this together.
            </p>
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${chainUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Open the prayer
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `You've joined ${orgFirst}'s ${prayerName} ${phrase}.\n\nFor the next ${durationDays} days, you'll receive a daily email with the prayer text.\n\nOpen the prayer page: ${chainUrl}`,
    });
  } catch (error) {
    console.error("Failed to send chain join confirmation:", error);
  }
}

export async function sendChainDailyReminder({
  to,
  memberName,
  organizerName,
  prayerName,
  prayerText,
  prayerInstructions,
  customPrayerText,
  recipientName,
  intention,
  day,
  durationDays,
  chainUrl,
  markCompleteUrl,
  unsubscribeUrl,
  otherMembersCount,
}: {
  to: string;
  memberName: string;
  organizerName: string;
  prayerName: string;
  prayerText: string | null;
  prayerInstructions: string | null;
  /** Optional personal prayer the organizer added on chain creation. */
  customPrayerText?: string | null;
  recipientName: string | null;
  intention: string;
  day: number;
  durationDays: number;
  chainUrl: string;
  markCompleteUrl: string;
  unsubscribeUrl: string;
  otherMembersCount: number;
}) {
  const phrase = recipientPhrase(recipientName, intention);
  const orgFirst = firstName(organizerName);
  const subject = `Day ${day} of ${orgFirst}'s ${prayerName} ${phrase}`;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eMemberName = escapeHtml(memberName);
  const eOrgFirst = escapeHtml(orgFirst);
  const ePrayerName = escapeHtml(prayerName);
  const ePhrase = escapeHtml(phrase);
  const ePrayerText = prayerText ? escapeHtml(prayerText) : null;
  const ePrayerInstructions = prayerInstructions
    ? escapeHtml(prayerInstructions)
    : null;
  const eCustomPrayerText = customPrayerText
    ? escapeHtml(customPrayerText)
    : null;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px;">
              Day ${day} of ${durationDays}
            </p>
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
              ${eOrgFirst}'s ${ePrayerName} ${ePhrase}
            </h1>
            <p style="color: #6e6150; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
              Take a moment, ${eMemberName}. The prayer for today is below.
            </p>
            ${
              ePrayerInstructions
                ? `<div style="border-left: 3px solid #d4a843; background: #fdf8ef; padding: 14px 18px; margin: 0 0 18px;">
                    <p style="color: #11152c; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${ePrayerInstructions}</p>
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
                    <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px;">A prayer from ${eOrgFirst}</p>
                    <p style="font-family: 'EB Garamond', Georgia, serif; color: #11152c; font-size: 16px; font-style: italic; line-height: 1.7; white-space: pre-line; margin: 0;">${eCustomPrayerText}</p>
                  </div>`
                : ""
            }
            ${
              otherMembersCount > 0
                ? `<p style="color: #6e6150; font-size: 13px; line-height: 1.6; margin: 0 0 18px; font-style: italic; text-align: center;">
                    ${otherMembersCount} ${otherMembersCount === 1 ? "other person is" : "other people are"} praying with ${eOrgFirst} today.
                  </p>`
                : ""
            }
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${markCompleteUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                I prayed today
              </a>
            </div>
            <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
              <a href="${chainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer</a>
              &nbsp;·&nbsp;
              <a href="${unsubscribeUrl}" style="color: #b8a994; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 16px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Day ${day} of ${durationDays} — ${orgFirst}'s ${prayerName} ${phrase}\n\n${prayerInstructions ? prayerInstructions + "\n\n" : ""}${prayerText ?? ""}${customPrayerText ? `\n\nA prayer from ${orgFirst}:\n${customPrayerText}` : ""}\n\nI prayed today: ${markCompleteUrl}\nVisit the prayer page: ${chainUrl}\nUnsubscribe: ${unsubscribeUrl}`,
    });
  } catch (error) {
    console.error("Failed to send chain daily reminder:", error);
  }
}

export async function sendChainClosingDayEmail({
  to,
  memberName,
  organizerName,
  prayerName,
  recipientName,
  closingNote,
  chainUrl,
}: {
  to: string;
  memberName: string;
  organizerName: string;
  prayerName: string;
  recipientName: string | null;
  closingNote: string | null;
  chainUrl: string;
}) {
  const orgFirst = firstName(organizerName);
  const recipientPhraseShort = recipientName?.trim()
    ? `for ${recipientName.trim()}`
    : "";
  const subject = `The ${prayerName} is complete — thank you for praying with ${orgFirst}`;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eMemberName = escapeHtml(memberName);
  const eOrgFirst = escapeHtml(orgFirst);
  const ePrayerName = escapeHtml(prayerName);
  const eRecipientPhraseShort = escapeHtml(recipientPhraseShort);
  const eClosingNote = closingNote ? escapeHtml(closingNote) : null;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; text-align: center;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 12px; line-height: 1.3;">
              The ${ePrayerName} is complete.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
              Thank you for praying with ${eOrgFirst} ${eRecipientPhraseShort}, ${eMemberName}.
            </p>
            ${
              eClosingNote
                ? `<div style="background: #fdf8ef; border-radius: 12px; padding: 20px; margin: 0 0 18px; text-align: left;">
                    <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">A note from ${eOrgFirst}</p>
                    <p style="color: #11152c; font-style: italic; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-line;">${eClosingNote}</p>
                  </div>`
                : ""
            }
            <p style="color: #6e6150; font-size: 14px; font-style: italic; line-height: 1.7; margin: 18px 0 0;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            <a href="${chainUrl}" style="color: #947324; text-decoration: none;">Visit the prayer page</a>
          </p>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 8px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `The ${prayerName} is complete.\n\nThank you for praying with ${orgFirst} ${recipientPhraseShort}, ${memberName}.\n\n${closingNote ? "A note from " + orgFirst + ":\n" + closingNote + "\n\n" : ""}May the Lord bless and keep all who carried this prayer.\n\n${chainUrl}`,
    });
  } catch (error) {
    console.error("Failed to send chain closing-day email:", error);
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
  const orgFirst = organizerFirstName ?? "the organizer";
  const subject = `Thank you for praying for ${recipientName}`;
  // Pre-escape user-controlled fields for safe HTML injection.
  const eWarriorName = escapeHtml(warriorName);
  const eRecipientName = escapeHtml(recipientName);
  const eOrgFirst = escapeHtml(orgFirst);
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
              You've joined ${eOrgFirst}'s prayer for <strong>${eRecipientName}</strong>.
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
      text: `Thank you for praying for ${recipientName}, ${warriorName}.\n\nYou've joined ${orgFirst}'s prayer. Every calendar slot is filled — and your prayer adds to the cloud of intercession.\n\nPray however and whenever you can. When the prayer train ends, we'll send you a closing note.\n\nVisit: ${trainUrl}`,
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
