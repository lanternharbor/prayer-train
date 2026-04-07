import { NextResponse } from "next/server";

// Generates a QR code SVG for a prayer train URL
// Usage: /api/qr/[slug] → returns SVG image

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const baseUrl = process.env.NEXTAUTH_URL || "https://ourfaithtrain.com";
  const url = `${baseUrl}/p/${slug}`;

  // Use a public QR code API to generate the QR code
  // This avoids adding a QR code library dependency
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&format=svg&margin=20`;

  try {
    const response = await fetch(qrApiUrl);
    const svg = await response.text();

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}
