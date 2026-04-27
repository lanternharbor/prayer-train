import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getBaseUrl } from "@/lib/url";

// Generates a QR code SVG for a PrayerChain URL.
// Sibling endpoint to /api/qr/[slug] (which targets prayer trains).
// Usage: /api/qr/chain/[slug] → returns SVG image
//
// Kept in a separate file from the train QR endpoint for the same
// isolation discipline as the chain reminder cron — chain code paths
// never touch train code paths.

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = `${getBaseUrl()}/chain/${slug}`;

  try {
    const svg = await QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 2,
      width: 400,
      color: {
        dark: "#242e58",
        light: "#ffffff",
      },
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
