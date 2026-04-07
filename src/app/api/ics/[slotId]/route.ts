import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Generates an .ics calendar file for a prayer commitment
// Usage: /api/ics/[slotId] → downloads .ics file

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slotId: string }> }
) {
  const { slotId } = await params;

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: {
      train: true,
      prayerType: true,
    },
  });

  if (!slot) {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }

  const date = new Date(slot.date);
  const startDate = formatIcsDate(date, 8, 0); // 8:00 AM
  const endDate = formatIcsDate(date, 8, slot.prayerType.duration);

  const baseUrl = process.env.NEXTAUTH_URL || "https://prayer-train.vercel.app";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PrayerTrain//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:Pray ${slot.prayerType.name} for ${slot.train.recipientName}`,
    `DESCRIPTION:${escapeIcs(buildDescription(slot))}`,
    `URL:${baseUrl}/p/${slot.train.slug}`,
    `UID:${slot.id}@prayertrain`,
    "STATUS:CONFIRMED",
    `CATEGORIES:Prayer,PrayerTrain`,
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:Time to pray ${slot.prayerType.name} for ${slot.train.recipientName}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="prayer-${slot.train.slug}-${date.toISOString().split("T")[0]}.ics"`,
    },
  });
}

function formatIcsDate(date: Date, hours: number, extraMinutes: number): string {
  const d = new Date(date);
  d.setHours(hours, extraMinutes, 0, 0);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function buildDescription(slot: { prayerType: { name: string; instructions: string | null; prayerText: string | null }; train: { recipientName: string; intention: string } }): string {
  const parts = [
    `Prayer: ${slot.prayerType.name}`,
    `For: ${slot.train.recipientName}`,
    `Intention: ${slot.train.intention}`,
  ];
  if (slot.prayerType.instructions) {
    parts.push(`\nHow to pray: ${slot.prayerType.instructions}`);
  }
  if (slot.prayerType.prayerText) {
    parts.push(`\nPrayer text: ${slot.prayerType.prayerText.substring(0, 500)}`);
  }
  return parts.join("\n");
}
