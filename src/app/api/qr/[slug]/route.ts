import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getBaseUrl } from "@/lib/url";

// Generates a QR code SVG for a prayer train URL.
// Usage: /api/qr/[slug] → returns SVG image
//
// Generated locally with the `qrcode` npm package — no external API
// dependency. Error correction level M (15%) gives a good balance
// between density and scan reliability.

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const url = `${getBaseUrl()}/p/${slug}`;

  try {
    const svg = await QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 2,
      width: 400,
      color: {
        dark: "#242e58", // navy — matches the brand
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
      { status: 500 }
    );
  }
}
