import { NextResponse } from "next/server";
import { unsubscribeFromChain } from "@/lib/actions";

/**
 * GET /api/chain/unsubscribe?id=<memberId>
 *
 * Token-style unsubscribe. The link in the daily-reminder email footer hits
 * this endpoint with the member's PrayerChainMember.id. The id is a cuid
 * (effectively unguessable), so we treat possession of the link as proof
 * of identity for this low-stakes "stop sending me email" operation.
 *
 * Always returns a friendly HTML page — never throws — so even if the user
 * opens an old link the experience reads as gentle.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      await unsubscribeFromChain(id);
    } catch (e) {
      console.error("[chain-unsubscribe] error:", e);
    }
  }

  // Plain HTML response — no JS required. No tracking. Reads as a quiet
  // confirmation, not an "are you sure?" upsell.
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Unsubscribed · PrayerTrain</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      body {
        font-family: Georgia, "Times New Roman", serif;
        background: #faf8f5;
        color: #11152c;
        max-width: 540px;
        margin: 0 auto;
        padding: 64px 24px;
        line-height: 1.6;
      }
      h1 { font-size: 28px; font-weight: 700; margin: 0 0 12px; }
      p { font-size: 16px; margin: 0 0 12px; color: #1a2142; }
      a { color: #947324; }
      .card { background: #fff; border: 1px solid #e8e0d5; border-radius: 16px; padding: 32px 28px; }
      .footer { text-align: center; color: #b8a994; font-size: 12px; margin-top: 24px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>You're unsubscribed.</h1>
      <p>You won't receive any more reminders for this PrayerChain.</p>
      <p>You're still listed as a prayer warrior on the chain itself — your name will appear on the spiritual bouquet when it closes. If you want to leave entirely, please reply to any prior email and ask us to remove you.</p>
      <p style="margin-top: 18px;">Thank you for praying with us.</p>
    </div>
    <p class="footer">PrayerTrain · A Lantern Harbor project</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
