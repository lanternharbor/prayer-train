"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { generateSlug, formatDateLong } from "@/lib/utils";
import { getBaseUrl } from "@/lib/url";
import { sendClaimConfirmation } from "@/lib/email";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getRateLimitId } from "@/lib/request";
import {
  addPrayerWarriorSchema,
  cancelPrayerChainSchema,
  cancelPrayerTrainSchema,
  claimSlotSchema,
  closeChainSchema,
  createChainSchema,
  createTrainSchema,
  deletePrayerChainSchema,
  deletePrayerTrainSchema,
  guestbookEntrySchema,
  joinChainSchema,
  markChainDayCompleteSchema,
  parseFormData,
  reactivatePrayerChainSchema,
  reactivatePrayerTrainSchema,
  submitSlotNoteByTokenSchema,
  submitSlotNoteSchema,
  trainUpdateSchema,
  updateChainSchema,
  updateTrainSchema,
} from "@/lib/validation";
import { normalizeNoteText } from "@/lib/notes";
import {
  confirmationMatches,
  isProtectedChain,
  isProtectedTrain,
} from "@/lib/train-protection";
import {
  checkNovenaFullyAvailable,
  checkSlotClaimable,
  checkTrainAcceptingClaims,
  checkUpdateCountMatches,
} from "@/lib/claim-guard";
import {
  sendChainCancellationNotice,
  sendChainClosingDayEmail,
  sendChainJoinConfirmation,
  sendPrayerWarriorClosing,
  sendPrayerWarriorWelcome,
  sendTrainCancellationNotice,
} from "@/lib/email";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addDays, eachDayOfInterval } from "date-fns";
import {
  chainDayTokenId,
  signCompletionToken,
  verifyCompletionToken,
} from "@/lib/completion-tokens";
import { put } from "@vercel/blob";

// ─── Create PrayerTrain ─────────────────────────────────────

export async function createPrayerTrain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  await enforceRateLimit("createTrain", await getRateLimitId(session.user.id));

  const input = parseFormData(createTrainSchema, formData);
  const {
    recipientName,
    recipientRelation,
    parish,
    parishId,
    location,
    intention,
    situation,
    situationDetail,
    customPrayerText,
    durationDays,
    slotsPerDay,
    isPublic,
    organizerName,
    organizerAnonymous,
    prayerTypeIds,
  } = input;

  // Persist the organizer's display name to User.name. Skipped when
  // they opted into anonymity for this train (we don't want to wipe a
  // previously-set name on a per-train opt-out). Otherwise this
  // populates the User.name column that every render site reads —
  // closes the silent-Anonymous bug where magic-link sign-ins left
  // name=null and downstream surfaces fell back to "Anonymous"
  // without the user ever choosing it.
  if (!organizerAnonymous && organizerName && organizerName.length > 0) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: organizerName },
    });
  }

  const slug = generateSlug(recipientName);
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = addDays(startDate, durationDays - 1);

  // Handle photo upload (with timeout to prevent hanging)
  let recipientImageUrl: string | null = null;
  const photoFile = formData.get("recipientPhoto") as File | null;
  if (photoFile && photoFile.size > 0) {
    if (photoFile.size > 5 * 1024 * 1024) throw new Error("Photo must be under 5 MB.");
    if (!["image/jpeg", "image/png", "image/webp"].includes(photoFile.type))
      throw new Error("Photo must be JPEG, PNG, or WebP.");
  }
  if (photoFile && photoFile.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const uploadPromise = put(
        `prayer-train/${slug}-${Date.now()}.${photoFile.type.split("/")[1] || "jpg"}`,
        photoFile,
        { access: "public" }
      );
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Upload timeout")), 8000)
      );
      const blob = await Promise.race([uploadPromise, timeoutPromise]);
      recipientImageUrl = blob.url;
    } catch (e) {
      console.error("Photo upload failed (continuing without photo):", e);
    }
  }

  // Create the train
  const train = await prisma.prayerTrain.create({
    data: {
      slug,
      organizerId: session.user.id,
      recipientName,
      recipientRelation: recipientRelation || null,
      recipientImageUrl,
      parish: parish || null,
      parishId: parishId || null,
      location: location || null,
      intention,
      situation,
      situationDetail: situationDetail || null,
      customPrayerText: customPrayerText || null,
      startDate,
      endDate,
      slotsPerDay,
      isPublic,
      organizerAnonymous,
    },
  });

  // Generate prayer slots
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Get selected prayer types (or default to situation-appropriate ones)
  let prayerTypes;
  if (prayerTypeIds && prayerTypeIds.length > 0) {
    prayerTypes = await prisma.prayerType.findMany({
      where: { id: { in: prayerTypeIds } },
    });
  } else {
    // Auto-select based on situation
    prayerTypes = await prisma.prayerType.findMany({
      where: { situationTags: { has: situation } },
      take: 10,
    });
  }

  if (prayerTypes.length === 0) {
    prayerTypes = await prisma.prayerType.findMany({ take: 5 });
  }

  // Build slot data
  const slotData = [];
  let prayerIdx = 0;

  for (const day of days) {
    for (let slotIndex = 0; slotIndex < slotsPerDay; slotIndex++) {
      const prayer = prayerTypes[prayerIdx % prayerTypes.length];
      slotData.push({
        trainId: train.id,
        date: day,
        slotIndex,
        prayerTypeId: prayer.id,
      });
      prayerIdx++;
    }
  }

  await prisma.prayerSlot.createMany({ data: slotData });

  redirect(`/p/${slug}`);
}

// ─── Claim a Prayer Slot ────────────────────────────────────

export async function claimPrayerSlot(formData: FormData) {
  const { slotId, claimerName, claimerEmail } = parseFormData(
    claimSlotSchema,
    formData
  );

  const session = await auth();
  await enforceRateLimit("claim", await getRateLimitId(session?.user?.id));

  const claim = await prisma.$transaction(async (tx) => {
    const slot = await tx.prayerSlot.findUnique({
      where: { id: slotId },
      include: { train: true, prayerType: true },
    });

    // Pure-function preconditions extracted to src/lib/claim-guard.ts
    // so the boundary is unit-testable without spinning up Postgres.
    // Race-correctness (the SQL CAS on status: OPEN) stays in this
    // transaction; the helpers cover the read-time preconditions.
    checkSlotClaimable(slot);
    checkTrainAcceptingClaims(slot.train);

    const claimedAt = new Date();
    const claimData = {
      status: "CLAIMED" as const,
      claimedById: session?.user?.id || null,
      claimerName,
      claimerEmail,
      claimedAt,
    };

    // If this is a novena, claim the full connected run atomically. A
    // second volunteer racing for any overlapping days will see a short
    // update count and the transaction will roll back rather than leaving
    // a partial novena claim behind.
    if (slot.prayerType.daysRequired > 1) {
      const futureDays = await tx.prayerSlot.findMany({
        where: {
          trainId: slot.trainId,
          prayerTypeId: slot.prayerTypeId,
          slotIndex: slot.slotIndex,
          status: "OPEN",
          date: { gte: slot.date },
        },
        orderBy: { date: "asc" },
        take: slot.prayerType.daysRequired,
      });

      checkNovenaFullyAvailable(futureDays.length, slot.prayerType.daysRequired);

      const novenaGroupId = `novena-${slotId}-${claimedAt.getTime()}`;
      const updated = await tx.prayerSlot.updateMany({
        where: {
          id: { in: futureDays.map((s) => s.id) },
          status: "OPEN",
        },
        data: {
          ...claimData,
          novenaGroupId,
        },
      });

      checkUpdateCountMatches(updated.count, futureDays.length);

      const first = futureDays[0].date;
      const last = futureDays[futureDays.length - 1].date;
      return {
        train: slot.train,
        prayerType: slot.prayerType,
        claimedDateLabel: `${formatDateLong(first)} – ${formatDateLong(last)} (${futureDays.length} days)`,
        completionSlotId: futureDays[0].id,
        completionDate: first,
      };
    }

    const updated = await tx.prayerSlot.updateMany({
      where: { id: slotId, status: "OPEN" },
      data: claimData,
    });

    checkUpdateCountMatches(updated.count, 1);

    return {
      train: slot.train,
      prayerType: slot.prayerType,
      claimedDateLabel: formatDateLong(slot.date),
      completionSlotId: slot.id,
      completionDate: slot.date,
    };
  });

  const baseUrl = getBaseUrl();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = addDays(today, 1);
  const canCompleteToday =
    claim.completionDate >= today && claim.completionDate < tomorrow;
  const completeUrl = canCompleteToday
    ? `${baseUrl}/p/${claim.train.slug}/complete?slot=${
        claim.completionSlotId
      }&token=${encodeURIComponent(
        signCompletionToken("slot", claim.completionSlotId),
      )}`
    : undefined;

  // Send a confirmation email so the volunteer knows their commitment stuck.
  // sendClaimConfirmation already swallows + logs its own errors, so we
  // intentionally do not let an email failure block the slot claim.
  await sendClaimConfirmation({
    to: claimerEmail,
    claimerName,
    recipientName: claim.train.recipientName,
    prayerName: claim.prayerType.name,
    date: claim.claimedDateLabel,
    prayerInstructions: claim.prayerType.instructions,
    trainUrl: `${baseUrl}/p/${claim.train.slug}`,
    completeUrl,
  });

  revalidatePath(`/p/${claim.train.slug}`);
}

// ─── Mark Slot Complete ─────────────────────────────────────

export async function markSlotComplete(slotId: string) {
  const session = await auth();

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: { train: true },
  });

  if (!slot || slot.status !== "CLAIMED") {
    throw new Error("Cannot mark this slot as complete.");
  }

  // Page-button completion is only for authenticated owners. Guest
  // claimers complete from their signed reminder-email link instead,
  // which prevents anonymous public visitors from accidentally marking
  // someone else's commitment complete.
  if (!session?.user?.id || slot.claimedById !== session.user.id) {
    throw new Error("You can only mark your own commitments as complete.");
  }

  await prisma.prayerSlot.update({
    where: { id: slotId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  revalidatePath(`/p/${slot.train.slug}`);
  revalidatePath("/dashboard");
}

/**
 * Mark a slot complete (if not already) AND set/update/clear its
 * optional completion note in one call. Used by the page-button
 * modal which always opens with a textarea + checkbox; the user
 * may submit empty (just-mark-complete) or with a note.
 *
 * Auth-gated: only the slot's authenticated claimer can call this
 * for their own slot. Guest claimers use submitSlotNoteByToken via
 * the email-link page.
 *
 * Behavior matrix:
 *   slot OPEN          -> error (must claim before completing)
 *   slot CLAIMED       -> set status: COMPLETED, completedAt = now,
 *                          note = trimmed text or null,
 *                          shareWall = checkbox value
 *   slot COMPLETED     -> update note + shareWall only (this is the
 *                          edit / delete-via-empty path)
 *   train COMPLETED    -> error (notes are frozen with the bouquet)
 *
 * Empty / whitespace-only note normalizes to null in the DB so the
 * slot card doesn't render an empty bubble for accidental submits.
 */
export async function submitSlotNote(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be signed in to submit a completion note.");
  }

  const { slotId, note, shareWall } = parseFormData(
    submitSlotNoteSchema,
    formData,
  );

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: { train: { select: { slug: true, status: true } } },
  });
  if (!slot) throw new Error("That prayer slot no longer exists.");
  if (slot.claimedById !== session.user.id) {
    throw new Error("You can only update your own commitments.");
  }
  if (slot.train.status === "COMPLETED") {
    throw new Error(
      "Notes are locked once the prayer train has ended.",
    );
  }
  if (slot.status === "OPEN") {
    throw new Error("This slot isn't currently claimed.");
  }

  const normalizedNote = normalizeNoteText(note);
  // shareWall only meaningful when there's a note. Force false when
  // note is being cleared so the wall query doesn't keep an orphan.
  const effectiveShareWall = normalizedNote === null ? false : shareWall;

  await prisma.prayerSlot.update({
    where: { id: slotId },
    data: {
      // Mark complete on the CLAIMED -> COMPLETED transition; leave
      // status alone if already COMPLETED (this is the edit path).
      ...(slot.status === "CLAIMED"
        ? { status: "COMPLETED" as const, completedAt: new Date() }
        : {}),
      completionNote: normalizedNote,
      completionNoteShareWall: effectiveShareWall,
    },
  });

  revalidatePath(`/p/${slot.train.slug}`);
  revalidatePath("/dashboard");
}

/**
 * Mark a slot complete via a tokenized email link. The daily-reminder
 * cron mints an HMAC-signed token that covers slotId + expiry, and the
 * email's "Mark as Prayed" CTA points at /p/[slug]/complete?slot=X&token=Y.
 * That handler page calls this function, which verifies the token before
 * mutating the slot.
 *
 * This is the proper way for guest claimers (no account) to mark prayers
 * complete from a daily reminder. The session-gated `markSlotComplete`
 * above is for the page-button path used by signed-in claimers.
 *
 * Returns `{ ok: true, slug }` on success or throws on any verification
 * failure — the handler page catches and renders a friendly error.
 */
export async function markSlotCompleteByToken(slotId: string, token: string) {
  if (!verifyCompletionToken("slot", slotId, token)) {
    throw new Error("This completion link is invalid or has expired.");
  }

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: { train: { select: { slug: true } } },
  });
  if (!slot) throw new Error("That prayer slot no longer exists.");

  // Idempotent: if already completed (the recipient clicked the link
  // twice, or completed via the page button first), just return success
  // rather than throwing. Coverage stats are the same either way.
  if (slot.status === "COMPLETED") {
    return { ok: true as const, slug: slot.train.slug };
  }

  if (slot.status !== "CLAIMED") {
    throw new Error("This prayer slot isn't currently claimed.");
  }

  await prisma.prayerSlot.update({
    where: { id: slotId },
    data: { status: "COMPLETED", completedAt: new Date() },
  });

  // No revalidatePath here. This action is invoked synchronously
  // during the /p/[slug]/complete page's render, and Next.js
  // (correctly) refuses to revalidate during render. The train
  // detail page is dynamic anyway (root layout calls auth() so
  // every public route is server-rendered per request), so the
  // next page load reads fresh data without any cache help.
  return { ok: true as const, slug: slot.train.slug };
}

/**
 * Token-gated variant of submitSlotNote. Used by the email-link
 * landing page form so guest claimers (no account) can leave or
 * edit their completion note. Same behavior matrix and same
 * trim-empty-to-null normalization.
 *
 * The token already authenticates the caller as the slot's claimer
 * (it's HMAC-signed against slotId), so no session check is needed.
 * The COMPLETED-train freeze still applies.
 */
export async function submitSlotNoteByToken(formData: FormData) {
  const { slotId, token, note, shareWall } = parseFormData(
    submitSlotNoteByTokenSchema,
    formData,
  );

  if (!verifyCompletionToken("slot", slotId, token)) {
    throw new Error("This completion link is invalid or has expired.");
  }

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: { train: { select: { slug: true, status: true } } },
  });
  if (!slot) throw new Error("That prayer slot no longer exists.");
  if (slot.train.status === "COMPLETED") {
    throw new Error(
      "Notes are locked once the prayer train has ended.",
    );
  }
  if (slot.status === "OPEN") {
    throw new Error("This slot isn't currently claimed.");
  }

  const normalizedNote = normalizeNoteText(note);
  const effectiveShareWall = normalizedNote === null ? false : shareWall;

  await prisma.prayerSlot.update({
    where: { id: slotId },
    data: {
      ...(slot.status === "CLAIMED"
        ? { status: "COMPLETED" as const, completedAt: new Date() }
        : {}),
      completionNote: normalizedNote,
      completionNoteShareWall: effectiveShareWall,
    },
  });

  revalidatePath(`/p/${slot.train.slug}`);
  // Caller (the form on /complete) will redirect back to itself or
  // to the train detail page. Returning a small success object lets
  // the form distinguish initial-mark from edit success.
  return { ok: true as const, slug: slot.train.slug };
}

// ─── Post Guestbook Entry ───────────────────────────────────

export async function postGuestbookEntry(formData: FormData) {
  const { trainId, authorName, message } = parseFormData(
    guestbookEntrySchema,
    formData
  );

  const session = await auth();
  await enforceRateLimit("guestbook", await getRateLimitId(session?.user?.id));

  const train = await prisma.prayerTrain.findUnique({
    where: { id: trainId },
  });

  if (!train) throw new Error("Prayer train not found.");

  await prisma.guestbookEntry.create({
    data: {
      trainId,
      authorId: session?.user?.id || null,
      authorName,
      message,
    },
  });

  revalidatePath(`/p/${train.slug}`);
}

// ─── Post Train Update (Organizer) ─────────────────────────

export async function postTrainUpdate(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const { trainId, title, content } = parseFormData(
    trainUpdateSchema,
    formData
  );

  const train = await prisma.prayerTrain.findUnique({
    where: { id: trainId },
  });

  if (!train || train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can post updates.");
  }

  await prisma.trainUpdate.create({
    data: {
      trainId,
      authorId: session.user.id,
      title,
      content,
    },
  });

  revalidatePath(`/p/${train.slug}`);
  revalidatePath(`/p/${train.slug}/manage`);
}

// ─── Update Train Status (Organizer) ────────────────────────

export async function updateTrainStatus(
  trainId: string,
  status: "ACTIVE" | "PAUSED" | "COMPLETED"
) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const train = await prisma.prayerTrain.findUnique({
    where: { id: trainId },
    include: {
      organizer: { select: { name: true } },
      // Pull warriors here so we can email them on transition to
      // COMPLETED without a second roundtrip. Empty roster is fine.
      warriors: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  // organizerAnonymous comes back automatically because findUnique
  // without `select` returns all train columns. Captured for use in
  // the email-payload builders below so anonymous organizers don't
  // leak their name into closing-day notifications.

  if (!train || train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can update the train status.");
  }

  // State-change check: only fire warrior closing emails when this
  // call is actually transitioning the train to COMPLETED. Prevents
  // duplicate sends if the organizer toggles the status repeatedly.
  const isTransitioningToCompleted =
    status === "COMPLETED" && train.status !== "COMPLETED";

  await prisma.prayerTrain.update({
    where: { id: trainId },
    data: { status },
  });

  if (isTransitioningToCompleted && train.warriors.length > 0) {
    const baseUrl = getBaseUrl();
    const trainUrl = `${baseUrl}/p/${train.slug}`;
    const bouquetUrl = `${baseUrl}/api/bouquet/${train.slug}`;
    const orgFirst = train.organizerAnonymous
      ? null
      : (train.organizer?.name?.trim().split(/\s+/)[0] ?? null);

    // Fire emails sequentially, never blocking the status update.
    // Each send is wrapped in the email function's try/catch so a
    // single failure doesn't stop the rest from going out.
    for (const warrior of train.warriors) {
      await sendPrayerWarriorClosing({
        to: warrior.email,
        warriorName: warrior.name,
        recipientName: train.recipientName,
        organizerFirstName: orgFirst,
        trainUrl,
        bouquetUrl,
      });
    }
  }

  revalidatePath(`/p/${train.slug}`);
  revalidatePath(`/p/${train.slug}/manage`);
  revalidatePath("/browse");
}

// ─── Toggle Train Visibility (Organizer) ────────────────────

export async function toggleTrainVisibility(trainId: string, isPublic: boolean) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const train = await prisma.prayerTrain.findUnique({
    where: { id: trainId },
  });

  if (!train || train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can change visibility.");
  }

  await prisma.prayerTrain.update({
    where: { id: trainId },
    data: { isPublic },
  });

  revalidatePath(`/p/${train.slug}/manage`);
  revalidatePath("/browse");
}

// ─── Edit PrayerTrain Details (Organizer) ───────────────────
//
// Lets the organizer fix typos and update copy on a live train.
// Editable fields are scoped tightly: anything that would invalidate
// already-generated slots or already-sent emails (durationDays,
// slotsPerDay, prayer-type assignments, dates) is intentionally
// excluded. isPublic stays on its own toggle.
//
// Photo replacement is opt-in: if the form omits a new photo (the
// usual case), the existing recipientImageUrl is preserved.

export async function updateTrainDetails(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(updateTrainSchema, formData);

  const train = await prisma.prayerTrain.findUnique({
    where: { id: input.trainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      recipientImageUrl: true,
    },
  });
  if (!train) throw new Error("That prayer train no longer exists.");
  if (train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can edit this prayer train.");
  }

  // Optional photo replacement. Same shape as createPrayerTrain's
  // upload, but if the upload fails we keep the existing photo URL
  // rather than nulling it out — a flaky upload shouldn't lose the
  // family photo that's already there.
  let recipientImageUrl: string | null = train.recipientImageUrl;
  const photoFile = formData.get("recipientPhoto") as File | null;
  if (photoFile && photoFile.size > 0) {
    if (photoFile.size > 5 * 1024 * 1024) throw new Error("Photo must be under 5 MB.");
    if (!["image/jpeg", "image/png", "image/webp"].includes(photoFile.type))
      throw new Error("Photo must be JPEG, PNG, or WebP.");
  }
  if (photoFile && photoFile.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const uploadPromise = put(
        `prayer-train/${train.slug}-${Date.now()}.${photoFile.type.split("/")[1] || "jpg"}`,
        photoFile,
        { access: "public" },
      );
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Upload timeout")), 8000),
      );
      const blob = await Promise.race([uploadPromise, timeoutPromise]);
      recipientImageUrl = blob.url;
    } catch (e) {
      console.error("Photo upload failed (keeping existing photo):", e);
    }
  }

  await prisma.prayerTrain.update({
    where: { id: train.id },
    data: {
      recipientName: input.recipientName,
      recipientRelation: input.recipientRelation || null,
      parish: input.parish || null,
      parishId: input.parishId || null,
      location: input.location || null,
      intention: input.intention,
      situation: input.situation,
      situationDetail: input.situationDetail || null,
      customPrayerText: input.customPrayerText || null,
      recipientImageUrl,
    },
  });

  revalidatePath(`/p/${train.slug}`);
  revalidatePath(`/p/${train.slug}/manage`);
  revalidatePath("/browse");
  redirect(`/p/${train.slug}/manage`);
}

// ─── Delete / Cancel PrayerTrain ────────────────────────────
//
// Two destructive actions for organizers who made a mistake:
//
//   deletePrayerTrain — hard delete + cascade. Only allowed when no
//   slots are claimed (i.e., a true mistake the organizer wants to
//   undo before any volunteers committed). Removes the train and all
//   its dependent rows (slots, warriors, guestbook, updates) atomically.
//
//   cancelPrayerTrain — soft cancel via TrainStatus.CANCELLED. Allowed
//   when slots are claimed; preserves the prayer history but stops
//   reminders (cron filters on status: ACTIVE) and prevents bouquet
//   generation (bouquet route requires status: COMPLETED).
//
// Both actions enforce a four-layer guard: organizer-auth, protected-
// slug rejection (the Spina train is hard-coded in train-protection.ts
// and cannot be deleted/cancelled by any code path), recipient-name
// literal-phrase confirmation (parallel to "yes delete benji"), and
// state preconditions (delete needs all-OPEN; cancel needs not-already-
// terminal).

export async function deletePrayerTrain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(deletePrayerTrainSchema, formData);

  const train = await prisma.prayerTrain.findUnique({
    where: { id: input.trainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      recipientName: true,
      slots: { select: { status: true } },
    },
  });

  if (!train) throw new Error("That prayer train no longer exists.");
  if (train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can delete this prayer train.");
  }
  if (isProtectedTrain(train.slug)) {
    throw new Error(
      "This prayer train is protected and cannot be deleted.",
    );
  }
  if (!confirmationMatches(input.recipientNameConfirmation, train.recipientName)) {
    throw new Error(
      "Confirmation did not match. Please type the recipient's name exactly as shown.",
    );
  }
  const hasNonOpenSlot = train.slots.some((s) => s.status !== "OPEN");
  if (hasNonOpenSlot) {
    throw new Error(
      "This prayer train has claimed or completed slots and cannot be deleted. Cancel it instead to preserve the prayer history.",
    );
  }

  // Atomic cascade. Order doesn't matter for correctness because the
  // train row is what holds the foreign-key references, but we delete
  // dependents first to be explicit. Wrapped in a transaction so a
  // partial deletion is impossible if any single delete fails.
  await prisma.$transaction([
    prisma.prayerSlot.deleteMany({ where: { trainId: train.id } }),
    prisma.prayerWarrior.deleteMany({ where: { trainId: train.id } }),
    prisma.guestbookEntry.deleteMany({ where: { trainId: train.id } }),
    prisma.trainUpdate.deleteMany({ where: { trainId: train.id } }),
    prisma.prayerTrain.delete({ where: { id: train.id } }),
  ]);

  revalidatePath("/browse");
  redirect("/");
}

export async function cancelPrayerTrain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(cancelPrayerTrainSchema, formData);

  // Pull claimers + warriors in the same query so we can email them
  // after the status flip without a second roundtrip. Slots are
  // filtered to only CLAIMED + COMPLETED (status != OPEN) since OPEN
  // slots have no claimer.
  const train = await prisma.prayerTrain.findUnique({
    where: { id: input.trainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      organizerAnonymous: true,
      recipientName: true,
      status: true,
      organizer: { select: { name: true } },
      slots: {
        where: { status: { not: "OPEN" } },
        select: { claimerEmail: true },
      },
      warriors: { select: { email: true } },
    },
  });

  if (!train) throw new Error("That prayer train no longer exists.");
  if (train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can cancel this prayer train.");
  }
  if (isProtectedTrain(train.slug)) {
    throw new Error(
      "This prayer train is protected and cannot be cancelled.",
    );
  }
  if (!confirmationMatches(input.recipientNameConfirmation, train.recipientName)) {
    throw new Error(
      "Confirmation did not match. Please type the recipient's name exactly as shown.",
    );
  }
  if (train.status === "CANCELLED") {
    throw new Error("This prayer train is already cancelled.");
  }
  if (train.status === "COMPLETED") {
    throw new Error("Completed prayer trains cannot be cancelled.");
  }

  await prisma.prayerTrain.update({
    where: { id: train.id },
    data: { status: "CANCELLED" },
  });

  // Notify everyone who committed to pray. Dedupe by email so a
  // claimer who also pledged as a warrior gets one email, not two.
  // Email helpers already swallow + log their own errors, so an
  // outbound delivery hiccup can't fail the cancellation itself.
  const emails = new Set<string>();
  for (const slot of train.slots) {
    if (slot.claimerEmail) emails.add(slot.claimerEmail);
  }
  for (const warrior of train.warriors) {
    if (warrior.email) emails.add(warrior.email);
  }
  // Honor organizerAnonymous: anonymous trains pass null so the email
  // helper falls back to "the organizer" instead of leaking the name.
  const orgFirst = train.organizerAnonymous
    ? null
    : (train.organizer?.name?.trim().split(/\s+/)[0] ?? null);
  for (const email of emails) {
    await sendTrainCancellationNotice({
      to: email,
      recipientName: train.recipientName,
      organizerFirstName: orgFirst,
    });
  }

  revalidatePath(`/p/${train.slug}`);
  revalidatePath(`/p/${train.slug}/manage`);
  revalidatePath("/browse");
  redirect(`/p/${train.slug}/manage`);
}

export async function reactivatePrayerTrain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(reactivatePrayerTrainSchema, formData);

  const train = await prisma.prayerTrain.findUnique({
    where: { id: input.trainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      status: true,
    },
  });

  if (!train) throw new Error("That prayer train no longer exists.");
  if (train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can reactivate this prayer train.");
  }
  if (train.status !== "CANCELLED") {
    throw new Error(
      "Only cancelled prayer trains can be reactivated.",
    );
  }

  // No protected-slug check or recipient-name confirmation: reactivation
  // is non-destructive (the inverse of cancel) and itself reversible.
  // Auth + ownership + state precondition is the full guard.
  await prisma.prayerTrain.update({
    where: { id: train.id },
    data: { status: "ACTIVE" },
  });

  revalidatePath(`/p/${train.slug}`);
  revalidatePath(`/p/${train.slug}/manage`);
  revalidatePath("/browse");
  redirect(`/p/${train.slug}/manage`);
}

// ─── Delete / Cancel / Reactivate PrayerChain ───────────────
//
// Same shape and guard model as the train versions. Chain has its
// own enum value (ChainStatus.CANCELLED) and PrayerChainMember has
// onDelete: Cascade in the schema, so deleting a chain auto-removes
// all members in a single statement. No protected chains currently
// exist; isProtectedChain() always returns false but the call sites
// follow the train pattern so adding one later is a Set addition.
//
// Chain confirmation field accepts EITHER the recipient name OR the
// first ~80 chars of the intention (chains have an optional
// recipientName). The schema field is named `confirmation` for that
// reason; the matcher tries the recipient name first, then falls
// back to the intention prefix.

function chainConfirmationLabel(
  recipientName: string | null,
  intention: string,
): string {
  if (recipientName?.trim()) return recipientName.trim();
  // Intention can be long; we ask for the first ~80 chars only.
  // 80 matches the validation cap on recipientName.
  return intention.trim().slice(0, 80);
}

function chainConfirmationMatches(
  typed: string,
  recipientName: string | null,
  intention: string,
): boolean {
  return confirmationMatches(
    typed,
    chainConfirmationLabel(recipientName, intention),
  );
}

export async function deletePrayerChain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(deletePrayerChainSchema, formData);

  const chain = await prisma.prayerChain.findUnique({
    where: { id: input.chainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      recipientName: true,
      intention: true,
      members: { select: { id: true } },
    },
  });

  if (!chain) throw new Error("That shared prayer no longer exists.");
  if (chain.organizerId !== session.user.id) {
    throw new Error("Only the organizer can delete this shared prayer.");
  }
  if (isProtectedChain(chain.slug)) {
    throw new Error(
      "This shared prayer is protected and cannot be deleted.",
    );
  }
  if (
    !chainConfirmationMatches(
      input.confirmation,
      chain.recipientName,
      chain.intention,
    )
  ) {
    throw new Error(
      "Confirmation did not match. Please type the recipient or intention exactly as shown.",
    );
  }
  if (chain.members.length > 0) {
    throw new Error(
      "This shared prayer has members and cannot be deleted. Cancel it instead to preserve the prayer history.",
    );
  }

  // PrayerChainMember has onDelete: Cascade, so deleting the chain
  // automatically removes any member rows in a single statement.
  await prisma.prayerChain.delete({ where: { id: chain.id } });

  revalidatePath("/browse");
  redirect("/");
}

export async function cancelPrayerChain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(cancelPrayerChainSchema, formData);

  const chain = await prisma.prayerChain.findUnique({
    where: { id: input.chainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      organizerAnonymous: true,
      recipientName: true,
      intention: true,
      status: true,
      organizer: { select: { name: true } },
      prayerType: { select: { name: true } },
      members: {
        where: { unsubscribedAt: null },
        select: { name: true, email: true },
      },
    },
  });

  if (!chain) throw new Error("That shared prayer no longer exists.");
  if (chain.organizerId !== session.user.id) {
    throw new Error("Only the organizer can cancel this shared prayer.");
  }
  if (isProtectedChain(chain.slug)) {
    throw new Error(
      "This shared prayer is protected and cannot be cancelled.",
    );
  }
  if (
    !chainConfirmationMatches(
      input.confirmation,
      chain.recipientName,
      chain.intention,
    )
  ) {
    throw new Error(
      "Confirmation did not match. Please type the recipient or intention exactly as shown.",
    );
  }
  if (chain.status === "CANCELLED") {
    throw new Error("This shared prayer is already cancelled.");
  }
  if (chain.status === "COMPLETED") {
    throw new Error("Completed shared prayers cannot be cancelled.");
  }
  if (chain.status === "PROMOTED") {
    throw new Error(
      "This shared prayer was promoted to a PrayerTrain and cannot be cancelled directly.",
    );
  }

  await prisma.prayerChain.update({
    where: { id: chain.id },
    data: { status: "CANCELLED" },
  });

  // Notify every active member. Dedupe by email defensively; the
  // (chainId, email) pair is unique in the schema but the dedupe
  // adds zero cost and protects future-edits.
  const seen = new Set<string>();
  // Honor organizerAnonymous: anonymous chains use the generic
  // "the organizer" label so the cancellation email doesn't leak the
  // name they explicitly chose to hide.
  const orgName =
    chain.organizerAnonymous || !chain.organizer?.name
      ? "the organizer"
      : chain.organizer.name;
  for (const member of chain.members) {
    if (!member.email || seen.has(member.email)) continue;
    seen.add(member.email);
    await sendChainCancellationNotice({
      to: member.email,
      memberName: member.name,
      organizerName: orgName,
      prayerName: chain.prayerType.name,
      recipientName: chain.recipientName,
      intention: chain.intention,
    });
  }

  revalidatePath(`/chain/${chain.slug}`);
  revalidatePath(`/chain/${chain.slug}/manage`);
  revalidatePath("/browse");
  redirect(`/chain/${chain.slug}/manage`);
}

export async function reactivatePrayerChain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(reactivatePrayerChainSchema, formData);

  const chain = await prisma.prayerChain.findUnique({
    where: { id: input.chainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      status: true,
    },
  });

  if (!chain) throw new Error("That shared prayer no longer exists.");
  if (chain.organizerId !== session.user.id) {
    throw new Error("Only the organizer can reactivate this shared prayer.");
  }
  if (chain.status !== "CANCELLED") {
    throw new Error("Only cancelled shared prayers can be reactivated.");
  }

  await prisma.prayerChain.update({
    where: { id: chain.id },
    data: { status: "ACTIVE" },
  });

  revalidatePath(`/chain/${chain.slug}`);
  revalidatePath(`/chain/${chain.slug}/manage`);
  revalidatePath("/browse");
  redirect(`/chain/${chain.slug}/manage`);
}

// ─── Set User Display Name ──────────────────────────────────
//
// One-time backfill action used by the dashboard "Set your name"
// card. Magic-link sign-in leaves User.name=null because nothing in
// that flow asks for a name; the create wizard captures it for
// future trains, but existing organizers' rows still display as
// "Anonymous" until they update User.name through this action.
//
// Idempotent — calling it again with a new name just overwrites the
// previous one (not a destructive operation; the user's display name
// is data they own). Bounded length matches the create-wizard /
// chain-new validation so all three paths agree on the cap.

export async function setUserDisplayName(name: string) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Please enter your name.");
  }
  if (trimmed.length > 80) {
    throw new Error("Name must be 80 characters or fewer.");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: trimmed },
  });

  // Refresh the dashboard so the card disappears (the gating
  // condition is `!session.user.name`, which now resolves true) and
  // every "Organized by" surface re-renders with the new name.
  revalidatePath("/dashboard");
  revalidatePath("/browse");
}

// ─── Add PrayerWarrior pledge ───────────────────────────────
//
// Soft-pledge to pray for a train without claiming a calendar slot.
// Surfaced as the primary CTA on the train detail page when every
// slot is already claimed — "no one is ever turned away from praying."
// Auth is optional (matches the slot-claim and chain-join patterns):
// name + email is all we require. Idempotent on (trainId, email).

export async function addPrayerWarrior(formData: FormData) {
  const session = await auth();
  await enforceRateLimit("addWarrior", await getRateLimitId(session?.user?.id));

  const { trainId, name, email, message } = parseFormData(
    addPrayerWarriorSchema,
    formData,
  );

  const train = await prisma.prayerTrain.findUnique({
    where: { id: trainId },
    select: {
      id: true,
      slug: true,
      recipientName: true,
      status: true,
      organizerAnonymous: true,
      organizer: { select: { name: true } },
    },
  });
  if (!train) throw new Error("That train doesn't exist.");
  if (train.status !== "ACTIVE") {
    throw new Error("This train is no longer accepting new prayer warriors.");
  }

  // Idempotent on (trainId, email). Re-submitting with the same email
  // updates name + message rather than creating a duplicate row.
  await prisma.prayerWarrior.upsert({
    where: { trainId_email: { trainId: train.id, email } },
    update: { name, message: message || null },
    create: {
      trainId: train.id,
      name,
      email,
      message: message || null,
      userId: session?.user?.id ?? null,
    },
  });

  await sendPrayerWarriorWelcome({
    to: email,
    warriorName: name,
    recipientName: train.recipientName,
    organizerFirstName: train.organizerAnonymous
      ? null
      : (train.organizer?.name?.trim().split(/\s+/)[0] ?? null),
    trainUrl: `${getBaseUrl()}/p/${train.slug}`,
  });

  revalidatePath(`/p/${train.slug}`);
}

// ─── PrayerChain — Synchronized solidarity (Phase B, feature/chains) ────────
//
// Chains are a separate prayer primitive from Trains. Same prayer + same
// days + group of people praying together. The five actions below match the
// pattern of the train actions above (Zod validation, rate limiting, friendly
// errors) but never modify train tables. See docs/chains-spec.md for the
// product rationale and docs/operational-safety.md for the isolation
// guarantee that protects the live Spina train.

// ─── Create PrayerChain ─────────────────────────────────────

export async function createPrayerChain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  await enforceRateLimit(
    "createChain",
    await getRateLimitId(session.user.id),
  );

  const {
    prayerTypeId,
    recipientName,
    intention,
    customPrayerText,
    durationDays,
    isPublic,
    organizerName,
    organizerAnonymous,
  } = parseFormData(createChainSchema, formData);

  // Persist the organizer's display name to User.name. See createPrayerTrain
  // for the full rationale; this mirrors that behavior so chains and trains
  // stay consistent.
  if (!organizerAnonymous && organizerName && organizerName.length > 0) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: organizerName },
    });
  }

  const prayerType = await prisma.prayerType.findUnique({
    where: { id: prayerTypeId },
    select: { id: true, slug: true, daysRequired: true, name: true },
  });
  if (!prayerType) throw new Error("That prayer doesn't exist.");

  // Default duration to the prayer's natural length (9 for novenas, 1 for
  // most others). Caller can override via durationDays.
  const finalDurationDays = durationDays ?? prayerType.daysRequired;

  // Slug uses the recipient name when present, otherwise the prayer slug.
  const slugBase = recipientName?.trim()
    ? recipientName
    : prayerType.slug;
  const slug = generateSlug(slugBase);

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = addDays(startDate, finalDurationDays - 1);

  // Optional recipient photo upload — same Vercel Blob pattern as
  // createPrayerTrain. Wrapped to fail gracefully so a Blob hiccup
  // never blocks creation of the chain itself.
  let recipientImageUrl: string | null = null;
  const photoFile = formData.get("recipientPhoto") as File | null;
  if (photoFile && photoFile.size > 0) {
    if (photoFile.size > 5 * 1024 * 1024) throw new Error("Photo must be under 5 MB.");
    if (!["image/jpeg", "image/png", "image/webp"].includes(photoFile.type))
      throw new Error("Photo must be JPEG, PNG, or WebP.");
  }
  if (photoFile && photoFile.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const uploadPromise = put(
        `prayer-chain/${slug}-${Date.now()}.${photoFile.type.split("/")[1] || "jpg"}`,
        photoFile,
        { access: "public" },
      );
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Upload timeout")), 8000),
      );
      const blob = await Promise.race([uploadPromise, timeoutPromise]);
      recipientImageUrl = blob.url;
    } catch (e) {
      console.error("Chain photo upload failed (continuing without photo):", e);
    }
  }

  // Get the organizer's name + email for the auto-membership row. Falls
  // back to "the organizer" if their User row has no name (unusual).
  const organizer = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  const chain = await prisma.prayerChain.create({
    data: {
      slug,
      organizerId: session.user.id,
      prayerTypeId: prayerType.id,
      recipientName: recipientName ?? null,
      recipientImageUrl,
      intention,
      customPrayerText: customPrayerText || null,
      startDate,
      durationDays: finalDurationDays,
      endDate,
      isPublic,
      organizerAnonymous,
      members: {
        create: {
          userId: session.user.id,
          name: organizer?.name ?? "Organizer",
          email: organizer?.email ?? session.user.email ?? "",
        },
      },
    },
  });

  revalidatePath("/browse");
  redirect(`/chain/${chain.slug}`);
}

// ─── Join PrayerChain ───────────────────────────────────────

export async function joinPrayerChain(formData: FormData) {
  const { chainId, name, email } = parseFormData(joinChainSchema, formData);

  const session = await auth();
  await enforceRateLimit(
    "joinChain",
    await getRateLimitId(session?.user?.id),
  );

  const chain = await prisma.prayerChain.findUnique({
    where: { id: chainId },
    include: {
      organizer: { select: { name: true } },
      prayerType: { select: { name: true } },
    },
  });
  if (!chain) throw new Error("That prayer no longer exists.");
  if (chain.status !== "ACTIVE") {
    throw new Error("This prayer is no longer accepting new members.");
  }

  // Idempotent: if this email already joined, refresh their record (clear
  // unsubscribedAt so they get reminders again, update name in case they
  // re-typed it differently).
  const member = await prisma.prayerChainMember.upsert({
    where: { chainId_email: { chainId, email } },
    create: {
      chainId,
      userId: session?.user?.id ?? null,
      name,
      email,
    },
    update: {
      name,
      unsubscribedAt: null,
    },
  });

  // Confirmation email is best-effort — the email helper swallows errors,
  // so a Resend hiccup never blocks the join itself.
  await sendChainJoinConfirmation({
    to: email,
    memberName: name,
    organizerName:
      chain.organizerAnonymous || !chain.organizer?.name
        ? "the organizer"
        : chain.organizer.name,
    prayerName: chain.prayerType.name,
    recipientName: chain.recipientName,
    intention: chain.intention,
    durationDays: chain.durationDays,
    chainUrl: `${getBaseUrl()}/chain/${chain.slug}`,
  });

  revalidatePath(`/chain/${chain.slug}`);
  return { ok: true, memberId: member.id };
}

// ─── Mark a Chain Day Complete ──────────────────────────────
//
// Identifies the member by memberId (cuid) instead of raw email. The
// memberId is delivered via the daily reminder email's "I prayed
// today" link and isn't easily guessable. (Codex audit flagged the
// previous email-based scheme.)

export async function markChainDayComplete(formData: FormData) {
  const { memberId, day } = parseFormData(
    markChainDayCompleteSchema,
    formData,
  );

  const member = await prisma.prayerChainMember.findUnique({
    where: { id: memberId },
    include: { chain: { select: { slug: true } } },
  });
  if (!member) throw new Error("You're not a member of this prayer.");

  // Idempotent: only advance, never go backward. A user clicking yesterday's
  // "I prayed today" link after marking today shouldn't undo the later state.
  const newDay = Math.max(member.lastDayCompleted ?? 0, day);
  await prisma.prayerChainMember.update({
    where: { id: member.id },
    data: { lastDayCompleted: newDay },
  });

  revalidatePath(`/chain/${member.chain.slug}`);
}

/**
 * Token-gated variant for chain-day completion via the daily reminder
 * email. Mirrors markSlotCompleteByToken — the token covers memberId
 * (the member identifier in the reminder URL) and is verified before
 * the lastDayCompleted update fires. Idempotent on already-completed
 * days. The handler page at /chain/[slug]/complete catches errors and
 * renders a calm friendly message.
 */
export async function markChainDayCompleteByToken(
  memberId: string,
  day: number,
  token: string,
) {
  if (!Number.isInteger(day) || day < 1 || day > 365) {
    throw new Error("That day number doesn't look right.");
  }
  // Token signs the (memberId, day) tuple — see chainDayTokenId in
  // completion-tokens.ts. Tampering with ?day= in the URL changes the
  // composite id and invalidates the signature.
  if (!verifyCompletionToken("chain-day", chainDayTokenId(memberId, day), token)) {
    throw new Error("This completion link is invalid or has expired.");
  }

  const member = await prisma.prayerChainMember.findUnique({
    where: { id: memberId },
    include: { chain: { select: { slug: true } } },
  });
  if (!member) {
    throw new Error("This completion link no longer matches a chain member.");
  }

  const newDay = Math.max(member.lastDayCompleted ?? 0, day);
  if (newDay !== member.lastDayCompleted) {
    await prisma.prayerChainMember.update({
      where: { id: member.id },
      data: { lastDayCompleted: newDay },
    });
  }

  // No revalidatePath here — this runs during the /chain/[slug]/complete
  // page render. Same reasoning as markSlotCompleteByToken above. The
  // chain detail page is dynamic, so the next visit reads fresh data.
  return { ok: true as const, slug: member.chain.slug, day: newDay };
}

// ─── Edit PrayerChain Details (Organizer) ──────────────────
//
// Same shape as updateTrainDetails but for the pray-together format.
// prayerTypeId is intentionally not editable — members joined for
// THIS prayer; swapping it after the fact breaks the contract.
// Schedule fields are also not editable for the same reason.

export async function updateChainDetails(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const input = parseFormData(updateChainSchema, formData);

  const chain = await prisma.prayerChain.findUnique({
    where: { id: input.chainId },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      recipientImageUrl: true,
    },
  });
  if (!chain) throw new Error("That prayer no longer exists.");
  if (chain.organizerId !== session.user.id) {
    throw new Error("Only the organizer can edit this prayer.");
  }

  // Optional photo replacement. Keeps the existing image if upload
  // fails or no new file is sent.
  let recipientImageUrl: string | null = chain.recipientImageUrl;
  const photoFile = formData.get("recipientPhoto") as File | null;
  if (photoFile && photoFile.size > 0) {
    if (photoFile.size > 5 * 1024 * 1024) throw new Error("Photo must be under 5 MB.");
    if (!["image/jpeg", "image/png", "image/webp"].includes(photoFile.type))
      throw new Error("Photo must be JPEG, PNG, or WebP.");
  }
  if (photoFile && photoFile.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const uploadPromise = put(
        `prayer-chain/${chain.slug}-${Date.now()}.${photoFile.type.split("/")[1] || "jpg"}`,
        photoFile,
        { access: "public" },
      );
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Upload timeout")), 8000),
      );
      const blob = await Promise.race([uploadPromise, timeoutPromise]);
      recipientImageUrl = blob.url;
    } catch (e) {
      console.error("Chain photo upload failed (keeping existing photo):", e);
    }
  }

  await prisma.prayerChain.update({
    where: { id: chain.id },
    data: {
      recipientName: input.recipientName ?? null,
      intention: input.intention,
      customPrayerText: input.customPrayerText || null,
      recipientImageUrl,
    },
  });

  revalidatePath(`/chain/${chain.slug}`);
  revalidatePath(`/chain/${chain.slug}/manage`);
  revalidatePath("/browse");
  redirect(`/chain/${chain.slug}/manage`);
}

// ─── Close PrayerChain (Organizer) ──────────────────────────

export async function closePrayerChain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const { chainId, closingNote } = parseFormData(closeChainSchema, formData);

  const chain = await prisma.prayerChain.findUnique({
    where: { id: chainId },
    include: {
      organizer: { select: { name: true } },
      prayerType: { select: { name: true } },
      members: {
        where: { unsubscribedAt: null },
        select: { email: true, name: true },
      },
    },
  });

  if (!chain) throw new Error("Prayer not found.");
  if (chain.organizerId !== session.user.id) {
    throw new Error("Only the organizer can close this prayer.");
  }

  await prisma.prayerChain.update({
    where: { id: chainId },
    data: {
      status: "COMPLETED",
      closingNote: closingNote ?? null,
    },
  });

  // Closing-day emails to all active members. Best-effort.
  const chainUrl = `${getBaseUrl()}/chain/${chain.slug}`;
  for (const member of chain.members) {
    await sendChainClosingDayEmail({
      to: member.email,
      memberName: member.name,
      organizerName:
        chain.organizerAnonymous || !chain.organizer?.name
          ? "the organizer"
          : chain.organizer.name,
      prayerName: chain.prayerType.name,
      recipientName: chain.recipientName,
      closingNote: closingNote ?? null,
      chainUrl,
    });
  }

  revalidatePath(`/chain/${chain.slug}`);
  revalidatePath(`/chain/${chain.slug}/manage`);
}

// ─── Unsubscribe from a PrayerChain (token-gated link in emails) ────────

export async function unsubscribeFromChain(memberId: string) {
  // No auth required — the unsubscribe URL is treated as the proof of
  // identity. Membership IDs are cuids (effectively unguessable) so this
  // is acceptable for a low-stakes "stop sending me reminders" action.
  const member = await prisma.prayerChainMember.findUnique({
    where: { id: memberId },
    include: { chain: { select: { slug: true } } },
  });
  if (!member) return; // Treat as success — already gone.

  await prisma.prayerChainMember.update({
    where: { id: memberId },
    data: { unsubscribedAt: new Date() },
  });

  if (member.chain) revalidatePath(`/chain/${member.chain.slug}`);
}
