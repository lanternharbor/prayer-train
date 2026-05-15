import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Generates an .ics calendar file for a prayer commitment.
// Usage: /api/ics/[slotId] → downloads .ics file
//
// The event SUMMARY, DESCRIPTION, and 15-minute reminder are rendered
// in the train's `language` so the calendar entry that lands in the
// volunteer's calendar app (Google / Apple / Outlook) reads in their
// own language. Locale-specific label strings live in the COPY map
// below; the prayer's own content (name, intention, instructions,
// text) is whatever language the train was created in — already
// language-consistent because PrayerType translations are overlaid at
// read time when applicable (Phase ε helper not used here for
// simplicity — the volunteer chose to commit to a slot in a specific
// language-tagged train, so the train's own content is the natural
// source).

type IcsCopy = {
  pray: (prayer: string, recipient: string) => string;
  timeToPray: (prayer: string, recipient: string) => string;
  prayer: string;
  for: string;
  intention: string;
  howToPray: string;
  prayerText: string;
  slotNotFound: string;
};

const COPY: Record<string, IcsCopy> = {
  en: {
    pray: (prayer, recipient) => `Pray ${prayer} for ${recipient}`,
    timeToPray: (prayer, recipient) => `Time to pray ${prayer} for ${recipient}`,
    prayer: "Prayer",
    for: "For",
    intention: "Intention",
    howToPray: "How to pray",
    prayerText: "Prayer text",
    slotNotFound: "Slot not found",
  },
  es: {
    pray: (prayer, recipient) => `Rezar ${prayer} por ${recipient}`,
    timeToPray: (prayer, recipient) => `Hora de rezar ${prayer} por ${recipient}`,
    prayer: "Oración",
    for: "Por",
    intention: "Intención",
    howToPray: "Cómo orar",
    prayerText: "Texto de la oración",
    slotNotFound: "Horario no encontrado",
  },
  "pt-BR": {
    pray: (prayer, recipient) => `Rezar ${prayer} por ${recipient}`,
    timeToPray: (prayer, recipient) => `Hora de rezar ${prayer} por ${recipient}`,
    prayer: "Oração",
    for: "Por",
    intention: "Intenção",
    howToPray: "Como rezar",
    prayerText: "Texto da oração",
    slotNotFound: "Horário não encontrado",
  },
  fil: {
    pray: (prayer, recipient) => `Idasal ang ${prayer} para kay ${recipient}`,
    timeToPray: (prayer, recipient) => `Oras na idasal ang ${prayer} para kay ${recipient}`,
    prayer: "Panalangin",
    for: "Para kay",
    intention: "Intensyon",
    howToPray: "Paano magdasal",
    prayerText: "Teksto ng panalangin",
    slotNotFound: "Hindi nakita ang slot",
  },
  pl: {
    pray: (prayer, recipient) => `Modlitwa ${prayer} za ${recipient}`,
    timeToPray: (prayer, recipient) => `Czas modlitwy ${prayer} za ${recipient}`,
    prayer: "Modlitwa",
    for: "Za",
    intention: "Intencja",
    howToPray: "Jak się modlić",
    prayerText: "Tekst modlitwy",
    slotNotFound: "Nie znaleziono slotu",
  },
};

function pickCopy(language: string | null | undefined): IcsCopy {
  if (language && language in COPY) return COPY[language];
  return COPY.en;
}

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
    return NextResponse.json({ error: COPY.en.slotNotFound }, { status: 404 });
  }

  const t = pickCopy(slot.train.language);

  const date = new Date(slot.date);
  const startDate = formatIcsDate(date, 8, 0); // 8:00 AM
  const endDate = formatIcsDate(date, 8, slot.prayerType.duration);

  const baseUrl = process.env.NEXTAUTH_URL || "https://prayertrains.com";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PrayerTrain//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${escapeIcs(t.pray(slot.prayerType.name, slot.train.recipientName))}`,
    `DESCRIPTION:${escapeIcs(buildDescription(slot, t))}`,
    `URL:${baseUrl}/p/${slot.train.slug}`,
    `UID:${slot.id}@prayertrains`,
    "STATUS:CONFIRMED",
    `CATEGORIES:Prayer,PrayerTrain`,
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(t.timeToPray(slot.prayerType.name, slot.train.recipientName))}`,
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

function buildDescription(
  slot: {
    prayerType: { name: string; instructions: string | null; prayerText: string | null };
    train: { recipientName: string; intention: string };
  },
  t: IcsCopy,
): string {
  const parts = [
    `${t.prayer}: ${slot.prayerType.name}`,
    `${t.for}: ${slot.train.recipientName}`,
    `${t.intention}: ${slot.train.intention}`,
  ];
  if (slot.prayerType.instructions) {
    parts.push(`\n${t.howToPray}: ${slot.prayerType.instructions}`);
  }
  if (slot.prayerType.prayerText) {
    parts.push(`\n${t.prayerText}: ${slot.prayerType.prayerText.substring(0, 500)}`);
  }
  return parts.join("\n");
}
