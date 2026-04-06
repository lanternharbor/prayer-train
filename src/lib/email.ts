import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM || "PrayerTrain <noreply@prayertrain.org>";

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
  slotId,
}: {
  to: string;
  claimerName: string;
  recipientName: string;
  prayerName: string;
  prayerText: string | null;
  prayerInstructions: string | null;
  trainUrl: string;
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
