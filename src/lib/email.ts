import { Resend } from "resend";
import { getBaseUrl } from "./url";

const FROM = process.env.EMAIL_FROM || "PrayerTrain <noreply@ourfaithtrain.com>";

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
            Thank you, ${claimerName}!
          </h1>
          <p style="color: #6e6150; text-align: center; margin-bottom: 24px;">
            You've committed to pray for <strong>${recipientName}</strong>.
          </p>
          <div style="background: #faf8f5; border: 1px solid #e8e0d5; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; font-weight: bold; color: #11152c;">
              ${prayerName}
            </p>
            <p style="margin: 0; color: #6e6150; font-size: 14px;">
              ${date}
            </p>
            ${prayerInstructions ? `
              <hr style="border: none; border-top: 1px solid #e8e0d5; margin: 16px 0;" />
              <p style="margin: 0; color: #453d32; font-size: 14px; line-height: 1.6;">
                ${prayerInstructions}
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
  trainUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  slotId,
}: {
  to: string;
  claimerName: string;
  recipientName: string;
  prayerName: string;
  prayerText: string | null;
  prayerInstructions: string | null;
  trainUrl: string;
  /** Reserved for future per-slot tracking links */
  slotId: string;
}) {
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
            Today's Prayer for ${recipientName}
          </h1>
          <p style="color: #6e6150; text-align: center; margin-bottom: 24px;">
            Hi ${claimerName}, here's your prayer commitment for today.
          </p>
          <div style="background: #faf8f5; border: 1px solid #e8e0d5; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 12px 0; color: #11152c; font-size: 18px;">
              ${prayerName}
            </h2>
            ${prayerInstructions ? `
              <p style="margin: 0 0 16px 0; color: #6e6150; font-size: 14px; line-height: 1.6;">
                <strong>How to pray:</strong> ${prayerInstructions}
              </p>
            ` : ""}
            ${prayerText ? `
              <div style="background: white; border: 1px solid #e8e0d5; border-radius: 8px; padding: 16px;">
                <p style="margin: 0; color: #242e58; font-style: italic; line-height: 1.8; font-size: 15px;">
                  ${prayerText}
                </p>
              </div>
            ` : ""}
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <a href="${trainUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Mark as Prayed
            </a>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin-top: 32px;">
            PrayerTrain — Organized prayer for those in need
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send daily reminder email:", error);
  }
}

// ─── PrayerChain Emails ─────────────────────────────────────
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
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 28px 26px;">
            <h1 style="color: #11152c; font-size: 22px; font-weight: 700; margin: 0 0 12px;">
              Welcome, ${memberName}.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.6; margin: 0 0 14px;">
              You've joined ${orgFirst}'s <strong>${prayerName}</strong> ${phrase}.
            </p>
            <p style="color: #11152c; font-size: 15px; line-height: 1.6; margin: 0 0 14px;">
              For the next ${durationDays} days, you'll receive an email each
              morning with the day's prayer text. Pray it whenever and wherever
              works for you. There's no obligation, no streak to maintain — just
              the grace of doing this together.
            </p>
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${chainUrl}" style="display: inline-block; background: #242e58; color: #ffffff; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                Open the PrayerChain
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `You've joined ${orgFirst}'s ${prayerName} ${phrase}.\n\nFor the next ${durationDays} days, you'll receive a daily email with the prayer text.\n\nOpen the chain: ${chainUrl}`,
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
              ${orgFirst}'s ${prayerName} ${phrase}
            </h1>
            <p style="color: #6e6150; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
              Take a moment, ${memberName}. The prayer for today is below.
            </p>
            ${
              prayerInstructions
                ? `<div style="border-left: 3px solid #d4a843; background: #fdf8ef; padding: 14px 18px; margin: 0 0 18px;">
                    <p style="color: #11152c; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${prayerInstructions}</p>
                  </div>`
                : ""
            }
            ${
              prayerText
                ? `<div style="background: #fefdfb; border: 1px solid #f5f0ea; border-radius: 12px; padding: 22px; margin: 0 0 22px;">
                    <p style="font-family: 'EB Garamond', Georgia, serif; color: #11152c; font-size: 17px; font-style: italic; line-height: 1.7; white-space: pre-line; margin: 0;">${prayerText}</p>
                  </div>`
                : ""
            }
            ${
              otherMembersCount > 0
                ? `<p style="color: #6e6150; font-size: 13px; line-height: 1.6; margin: 0 0 18px; font-style: italic; text-align: center;">
                    ${otherMembersCount} ${otherMembersCount === 1 ? "other person is" : "other people are"} praying with ${orgFirst} today.
                  </p>`
                : ""
            }
            <div style="text-align: center; margin: 24px 0 8px;">
              <a href="${markCompleteUrl}" style="display: inline-block; background: #d4a843; color: #0a0c1a; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                I prayed today
              </a>
            </div>
            <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
              <a href="${chainUrl}" style="color: #947324; text-decoration: none;">Visit the PrayerChain</a>
              &nbsp;·&nbsp;
              <a href="${unsubscribeUrl}" style="color: #b8a994; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 16px 0 0;">
            PrayerTrain · A Lantern Harbor project
          </p>
        </div>
      `,
      text: `Day ${day} of ${durationDays} — ${orgFirst}'s ${prayerName} ${phrase}\n\n${prayerInstructions ? prayerInstructions + "\n\n" : ""}${prayerText ?? ""}\n\nI prayed today: ${markCompleteUrl}\nVisit the chain: ${chainUrl}\nUnsubscribe: ${unsubscribeUrl}`,
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
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #faf8f5;">
          <div style="background: #ffffff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; text-align: center;">
            <h1 style="color: #11152c; font-family: 'EB Garamond', Georgia, serif; font-size: 26px; font-weight: 700; margin: 0 0 12px; line-height: 1.3;">
              The ${prayerName} is complete.
            </h1>
            <p style="color: #11152c; font-size: 15px; line-height: 1.7; margin: 0 0 18px;">
              Thank you for praying with ${orgFirst} ${recipientPhraseShort}, ${memberName}.
            </p>
            ${
              closingNote
                ? `<div style="background: #fdf8ef; border-radius: 12px; padding: 20px; margin: 0 0 18px; text-align: left;">
                    <p style="color: #947324; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">A note from ${orgFirst}</p>
                    <p style="color: #11152c; font-style: italic; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-line;">${closingNote}</p>
                  </div>`
                : ""
            }
            <p style="color: #6e6150; font-size: 14px; font-style: italic; line-height: 1.7; margin: 18px 0 0;">
              May the Lord bless and keep all who carried this prayer.
            </p>
          </div>
          <p style="text-align: center; color: #b8a994; font-size: 12px; margin: 18px 0 0;">
            <a href="${chainUrl}" style="color: #947324; text-decoration: none;">Visit the chain</a>
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
