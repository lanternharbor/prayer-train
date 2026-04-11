import { z } from "zod";
import { SituationCategory } from "@/generated/prisma/client";

/**
 * Shared input validation schemas for server actions.
 *
 * Every server action that accepts user input from a FormData should parse
 * with one of these schemas. Validation failures throw at the boundary so
 * downstream code can assume well-formed inputs.
 *
 * Field length caps are intentionally generous but bounded so a malicious
 * client can't post a 10MB intention or empty/whitespace-only strings.
 */

const trimmedString = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max);

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal("").transform(() => undefined));

// ─── Create PrayerTrain ─────────────────────────────────────

const situationValues = Object.values(SituationCategory) as [
  SituationCategory,
  ...SituationCategory[],
];

export const createTrainSchema = z.object({
  recipientName: trimmedString(1, 80),
  recipientRelation: optionalTrimmed(60),
  parish: optionalTrimmed(120),
  parishId: optionalTrimmed(60),
  location: optionalTrimmed(120),
  intention: trimmedString(1, 2000),
  situation: z.enum(situationValues),
  situationDetail: optionalTrimmed(2000),
  durationDays: z.coerce.number().int().min(1).max(365).default(30),
  slotsPerDay: z.coerce.number().int().min(1).max(24).default(3),
  isPublic: z.coerce.boolean().default(false),
  prayerTypeIds: z
    .string()
    .max(2000)
    .optional()
    .transform((s) =>
      s
        ? s
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
        : []
    ),
});

export type CreateTrainInput = z.infer<typeof createTrainSchema>;

// ─── Claim a Prayer Slot ────────────────────────────────────

export const claimSlotSchema = z.object({
  slotId: trimmedString(1, 60),
  claimerName: trimmedString(1, 80),
  claimerEmail: z.string().trim().email().max(254),
});

export type ClaimSlotInput = z.infer<typeof claimSlotSchema>;

// ─── Guestbook ──────────────────────────────────────────────

export const guestbookEntrySchema = z.object({
  trainId: trimmedString(1, 60),
  authorName: trimmedString(1, 80),
  message: trimmedString(1, 1000),
});

export type GuestbookEntryInput = z.infer<typeof guestbookEntrySchema>;

// ─── Train Update (Organizer) ───────────────────────────────

export const trainUpdateSchema = z.object({
  trainId: trimmedString(1, 60),
  title: trimmedString(1, 120),
  content: trimmedString(1, 4000),
});

export type TrainUpdateInput = z.infer<typeof trainUpdateSchema>;

/**
 * Helper that runs a Zod parse on a FormData object and throws a friendly
 * Error on failure. Server actions catch the throw and the error component
 * surfaces it to the user.
 */
export function parseFormData<T extends z.ZodType>(
  schema: T,
  formData: FormData
): z.infer<T> {
  const raw: Record<string, FormDataEntryValue | null> = {};
  for (const [key, value] of formData.entries()) {
    // Only keep the first occurrence of each key. Files are excluded — server
    // actions handle file uploads separately.
    if (typeof value === "string" && raw[key] === undefined) {
      raw[key] = value;
    }
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid input — ${issues}`);
  }
  return result.data;
}
