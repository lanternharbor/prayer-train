import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Embeddable widget for parish websites
// Usage: Add to any website with:
// <iframe src="https://ourfaithtrain.com/api/widget/[slug]" width="400" height="300" frameborder="0"></iframe>

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    include: {
      slots: { select: { status: true } },
    },
  });

  if (!train) {
    return new NextResponse("<html><body><p>Prayer train not found.</p></body></html>", {
      headers: { "Content-Type": "text/html" },
      status: 404,
    });
  }

  const total = train.slots.length;
  const claimed = train.slots.filter((s) => s.status === "CLAIMED").length;
  const completed = train.slots.filter((s) => s.status === "COMPLETED").length;
  const open = total - claimed - completed;
  const fill = total > 0 ? Math.round(((claimed + completed) / total) * 100) : 0;

  const baseUrl = process.env.NEXTAUTH_URL || "https://ourfaithtrain.com";

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; background: #faf8f5; padding: 20px; }
    .card { background: white; border: 1px solid #e8e0d5; border-radius: 12px; padding: 20px; }
    .header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .cross { color: #d4a843; font-size: 18px; }
    .title { font-size: 18px; color: #11152c; font-weight: 600; }
    .intention { font-size: 13px; color: #6e6150; line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .bar-bg { width: 100%; height: 10px; background: #f5f0ea; border-radius: 5px; overflow: hidden; margin-bottom: 8px; }
    .bar-fill { height: 100%; background: #d4a843; border-radius: 5px; transition: width 0.3s; }
    .stats { display: flex; justify-content: space-between; font-size: 12px; color: #6e6150; margin-bottom: 16px; }
    .stat-value { font-weight: 700; color: #11152c; }
    .btn { display: block; width: 100%; padding: 10px; background: #242e58; color: white; text-align: center; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; }
    .btn:hover { background: #1a2142; }
    .footer { text-align: center; margin-top: 12px; font-size: 10px; color: #b8a994; }
    .footer a { color: #d4a843; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="cross">&#10013;</span>
      <span class="title">Prayers for ${escapeHtml(train.recipientName)}</span>
    </div>
    <p class="intention">${escapeHtml(train.intention)}</p>
    <div class="bar-bg"><div class="bar-fill" style="width:${fill}%"></div></div>
    <div class="stats">
      <span><span class="stat-value">${fill}%</span> covered</span>
      <span><span class="stat-value">${open}</span> slots open</span>
    </div>
    <a class="btn" href="${baseUrl}/p/${slug}" target="_blank">
      Sign Up to Pray
    </a>
  </div>
  <p class="footer">Powered by <a href="${baseUrl}" target="_blank">OurFaithTrain</a></p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, s-maxage=300",
    },
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
