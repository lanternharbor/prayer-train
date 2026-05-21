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

/**
 * FormData-aware boolean coercion.
 *
 * `z.coerce.boolean()` was a footgun: it uses JavaScript's `Boolean()`
 * primitive, which treats any non-empty string as truthy — including
 * the literal string "false". Server actions in this app receive
 * checkbox-ish values through FormData (strings only), and several
 * client wizards used to set `formData.set("isPublic", isPublic ? "true" : "false")`,
 * which silently coerced to `true` regardless of intent. The
 * default-public ↔ default-private flip from the May 2026 audit
 * exposed this — new private trains were still creating public.
 *
 * This helper treats only the canonical truthy strings as `true`
 * ("true", "on", "1") and everything else (including "false",
 * "0", empty string, or absent → undefined → default()) as `false`.
 * Accepts a literal boolean too, for direct programmatic callers.
 */
const formBoolean = () =>
  z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((v) => {
      if (typeof v === "boolean") return v;
      if (typeof v === "string") {
        const norm = v.trim().toLowerCase();
        return norm === "true" || norm === "on" || norm === "1";
      }
      return false;
    });

// ─── Create PrayerTrain ─────────────────────────────────────

const situationValues = Object.values(SituationCategory) as [
  SituationCategory,
  ...SituationCategory[],
];

export const createTrainSchema = z
  .object({
    recipientName: trimmedString(1, 80),
    recipientRelation: optionalTrimmed(60),
    parish: optionalTrimmed(120),
    parishId: optionalTrimmed(60),
    location: optionalTrimmed(120),
    intention: trimmedString(1, 2000),
    situation: z.enum(situationValues),
    situationDetail: optionalTrimmed(2000),
    // Optional free-form prayer the organizer wants every volunteer to also
    // pray. Generous cap because some traditional prayers are long.
    customPrayerText: optionalTrimmed(4000),
    durationDays: z.coerce.number().int().min(1).max(365).default(30),
    slotsPerDay: z.coerce.number().int().min(1).max(24).default(3),
    isPublic: formBoolean(),
    // Show the full recipient name on public surfaces. When false,
    // public surfaces (browse card, individual train page H1, OG meta)
    // render only the first whitespace-separated token of recipientName.
    // Default true — matches the schema default and the pre-T3a behavior
    // of every train created before this control existed.
    showNames: formBoolean(),
    // Organizer's display name. Required unless they opt into anonymity
    // (refinement below). Stored on User.name when set, so it appears on
    // every train this user organizes — anonymity per train is the
    // override, not the default.
    organizerName: optionalTrimmed(80),
    organizerAnonymous: formBoolean(),
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
    // Subset of prayerTypeIds the organizer flagged as "pray every day"
    // (daily-anchor). Order is preserved across the comma-separated
    // serialization so anchors[0] → slot 0 every day, anchors[1] → slot
    // 1, etc. Same shape as prayerTypeIds — refinement below enforces
    // subset + cardinality.
    anchorPrayerTypeIds: z
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
  })
  .refine(
    (data) =>
      data.organizerAnonymous ||
      (data.organizerName && data.organizerName.length > 0),
    {
      path: ["organizerName"],
      message:
        "Please enter your name, or check the box to show as Anonymous.",
    }
  )
  .refine(
    (data) => data.anchorPrayerTypeIds.every((id) => data.prayerTypeIds.includes(id)),
    {
      path: ["anchorPrayerTypeIds"],
      message: "Daily prayers must be among the selected prayers.",
    }
  )
  .refine(
    // Always leave at least one rotating slot per day. At slotsPerDay=1
    // anchors must be empty; at slotsPerDay=2 max one anchor, etc.
    (data) => data.anchorPrayerTypeIds.length <= data.slotsPerDay - 1,
    {
      path: ["anchorPrayerTypeIds"],
      message:
        "You can mark up to slotsPerDay minus 1 prayers as daily so other prayers can rotate.",
    }
  );

export type CreateTrainInput = z.infer<typeof createTrainSchema>;

// ─── Rebuild Train Schedule ──────────────────────────────────
//
// Used by the organizer-only `rebuildTrainSchedule` action on the
// /p/<slug>/manage/schedule page. Same cardinality + subset rules as
// the create schema; durationDays + slotsPerDay are NOT editable
// (those would invalidate already-claimed slots).

export const rebuildScheduleSchema = z
  .object({
    trainId: trimmedString(1, 60),
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
    anchorPrayerTypeIds: z
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
  })
  .refine((data) => data.prayerTypeIds.length > 0, {
    path: ["prayerTypeIds"],
    message: "Pick at least one prayer for the rebuilt schedule.",
  })
  .refine(
    (data) => data.anchorPrayerTypeIds.every((id) => data.prayerTypeIds.includes(id)),
    {
      path: ["anchorPrayerTypeIds"],
      message: "Daily prayers must be among the selected prayers.",
    }
  );

export type RebuildScheduleInput = z.infer<typeof rebuildScheduleSchema>;

// ─── Update PrayerTrain Details ─────────────────────────────
//
// Editable fields only. Excluded: durationDays, slotsPerDay,
// prayerTypeIds (slots are already generated and assigned to specific
// prayer types — changing these retroactively would invalidate the
// schedule). isPublic also excluded because it has its own dedicated
// toggle on the manage page.

export const updateTrainSchema = z
  .object({
    trainId: trimmedString(1, 60),
    recipientName: trimmedString(1, 80),
    recipientRelation: optionalTrimmed(60),
    parish: optionalTrimmed(120),
    parishId: optionalTrimmed(60),
    location: optionalTrimmed(120),
    intention: trimmedString(1, 2000),
    situation: z.enum(situationValues),
    situationDetail: optionalTrimmed(2000),
    customPrayerText: optionalTrimmed(4000),
    // Mirrors the create-flow organizer-identity capture so the edit
    // form can flip anonymity on / off later. Same refinement: name
    // OR anonymous required. Updating User.name from this path
    // propagates to every train + chain this user organizes.
    organizerName: optionalTrimmed(80),
    organizerAnonymous: formBoolean(),
  })
  .refine(
    (data) =>
      data.organizerAnonymous ||
      (data.organizerName && data.organizerName.length > 0),
    {
      path: ["organizerName"],
      message:
        "Please enter your name, or check the box to show as Anonymous.",
    }
  );

export type UpdateTrainInput = z.infer<typeof updateTrainSchema>;

// ─── Delete / Cancel PrayerTrain ────────────────────────────
//
// Both destructive actions (hard delete + soft cancel) require the
// organizer to type the recipient name as a literal-phrase confirmation.
// See src/lib/train-protection.ts for the matcher; the Zod schema's job
// here is just shape validation. Server-side guards enforce auth,
// protected-slug rejection, state preconditions, and the
// confirmation match.

export const deletePrayerTrainSchema = z.object({
  trainId: trimmedString(1, 60),
  recipientNameConfirmation: trimmedString(1, 80),
});

export type DeletePrayerTrainInput = z.infer<typeof deletePrayerTrainSchema>;

export const cancelPrayerTrainSchema = z.object({
  trainId: trimmedString(1, 60),
  recipientNameConfirmation: trimmedString(1, 80),
});

export type CancelPrayerTrainInput = z.infer<typeof cancelPrayerTrainSchema>;

// Reactivate is the inverse of cancel. No recipient-name confirmation
// because flipping CANCELLED back to ACTIVE is non-destructive (and
// can itself be undone by re-cancelling). Auth + ownership + state
// preconditions are still enforced server-side.
export const reactivatePrayerTrainSchema = z.object({
  trainId: trimmedString(1, 60),
});

export type ReactivatePrayerTrainInput = z.infer<
  typeof reactivatePrayerTrainSchema
>;

// ─── Delete / Cancel / Reactivate PrayerChain ───────────────
//
// Same shape and guard model as the PrayerTrain destructive actions:
// delete needs zero members joined; cancel allowed when members exist;
// reactivate flips CANCELLED back to ACTIVE.
//
// Confirmation field is named recipientOrIntentionConfirmation because
// chains have an optional recipientName — when null, the organizer
// types the first ~80 chars of the intention instead. The matcher in
// src/lib/train-protection.ts handles the comparison; the schema's
// only job here is shape.

export const deletePrayerChainSchema = z.object({
  chainId: trimmedString(1, 60),
  confirmation: trimmedString(1, 200),
});

export type DeletePrayerChainInput = z.infer<typeof deletePrayerChainSchema>;

export const cancelPrayerChainSchema = z.object({
  chainId: trimmedString(1, 60),
  confirmation: trimmedString(1, 200),
});

export type CancelPrayerChainInput = z.infer<typeof cancelPrayerChainSchema>;

export const reactivatePrayerChainSchema = z.object({
  chainId: trimmedString(1, 60),
});

export type ReactivatePrayerChainInput = z.infer<
  typeof reactivatePrayerChainSchema
>;

// ─── Submit a Slot Completion Note ──────────────────────────
//
// Used by both completion paths (page button + email link). Both
// fields are optional so the same schema serves the
// "just-mark-complete" tap and the "mark-complete-with-a-note"
// submission. Empty / whitespace-only note normalizes to undefined
// via optionalTrimmed; the server action stores undefined as null
// in the database (deletes any pre-existing note).

export const submitSlotNoteSchema = z.object({
  slotId: trimmedString(1, 60),
  note: optionalTrimmed(200),
  shareWall: formBoolean(),
});

export type SubmitSlotNoteInput = z.infer<typeof submitSlotNoteSchema>;

// Token-gated variant: same shape plus a token for the signed
// email-link flow. Server action verifies the token before mutation.
export const submitSlotNoteByTokenSchema = z.object({
  slotId: trimmedString(1, 60),
  token: trimmedString(1, 200),
  note: optionalTrimmed(200),
  shareWall: formBoolean(),
});

export type SubmitSlotNoteByTokenInput = z.infer<
  typeof submitSlotNoteByTokenSchema
>;

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

// ─── Create PrayerChain ─────────────────────────────────────

export const createChainSchema = z
  .object({
    prayerTypeId: trimmedString(1, 60),
    recipientName: optionalTrimmed(80),
    intention: trimmedString(1, 2000),
    // Optional free-form prayer the organizer wants every member to also pray.
    // Mirrors createTrainSchema.customPrayerText.
    customPrayerText: optionalTrimmed(4000),
    // Optional override; if omitted, we use the prayer's default daysRequired.
    durationDays: z.coerce.number().int().min(1).max(365).optional(),
    isPublic: formBoolean(),
    // Organizer-name capture mirrors createTrainSchema. See the
    // refinement there for the contract.
    organizerName: optionalTrimmed(80),
    organizerAnonymous: formBoolean(),
  })
  .refine(
    (data) =>
      data.organizerAnonymous ||
      (data.organizerName && data.organizerName.length > 0),
    {
      path: ["organizerName"],
      message:
        "Please enter your name, or check the box to show as Anonymous.",
    }
  );

export type CreateChainInput = z.infer<typeof createChainSchema>;

// ─── Update PrayerChain Details ─────────────────────────────
//
// Editable fields only. Excluded: prayerTypeId (members joined for
// THIS prayer; changing it retroactively breaks the contract),
// durationDays/startDate/endDate (already-sent reminders are pinned
// to those values), isPublic (V1 keeps that off the form).

export const updateChainSchema = z
  .object({
    chainId: trimmedString(1, 60),
    recipientName: optionalTrimmed(80),
    intention: trimmedString(1, 2000),
    customPrayerText: optionalTrimmed(4000),
    // Mirrors the create-flow organizer-identity capture. See
    // updateTrainSchema for the full rationale.
    organizerName: optionalTrimmed(80),
    organizerAnonymous: formBoolean(),
  })
  .refine(
    (data) =>
      data.organizerAnonymous ||
      (data.organizerName && data.organizerName.length > 0),
    {
      path: ["organizerName"],
      message:
        "Please enter your name, or check the box to show as Anonymous.",
    }
  );

export type UpdateChainInput = z.infer<typeof updateChainSchema>;

// ─── Join PrayerChain ───────────────────────────────────────

export const joinChainSchema = z.object({
  chainId: trimmedString(1, 60),
  name: trimmedString(1, 80),
  email: z.string().trim().email().max(254),
});

export type JoinChainInput = z.infer<typeof joinChainSchema>;

// ─── Chain Day Completion ──────────────────────────────────
//
// Identifies the member by their PrayerChainMember.id (a cuid). Earlier
// drafts used raw email as authority — switched to memberId because
// (a) emails are easier to guess/observe and (b) the cuid is the same
// shape we use for unsubscribe tokens, so there's only one identifier
// pattern across the chain code paths.

export const markChainDayCompleteSchema = z.object({
  memberId: trimmedString(1, 60),
  day: z.coerce.number().int().min(1).max(365),
});

export type MarkChainDayCompleteInput = z.infer<
  typeof markChainDayCompleteSchema
>;

// ─── Close Chain ────────────────────────────────────────────

export const closeChainSchema = z.object({
  chainId: trimmedString(1, 60),
  closingNote: optionalTrimmed(2000),
});

export type CloseChainInput = z.infer<typeof closeChainSchema>;

// ─── Add PrayerWarrior pledge ───────────────────────────────
// Soft-pledge to pray for a fully-covered train without claiming a
// calendar slot. Idempotent on (trainId, email) — same shape as joining
// a chain, since both are friction-free name+email participations.

export const addPrayerWarriorSchema = z.object({
  trainId: trimmedString(1, 60),
  name: trimmedString(1, 80),
  email: z.string().trim().email().max(254),
  message: optionalTrimmed(500),
});

export type AddPrayerWarriorInput = z.infer<typeof addPrayerWarriorSchema>;

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
