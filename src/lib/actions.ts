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
  claimSlotSchema,
  closeChainSchema,
  createChainSchema,
  createTrainSchema,
  guestbookEntrySchema,
  joinChainSchema,
  markChainDayCompleteSchema,
  parseFormData,
  trainUpdateSchema,
} from "@/lib/validation";
import {
  sendChainClosingDayEmail,
  sendChainJoinConfirmation,
  sendPrayerWarriorClosing,
  sendPrayerWarriorWelcome,
} from "@/lib/email";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addDays, eachDayOfInterval } from "date-fns";
import { verifyCompletionToken } from "@/lib/completion-tokens";
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
    prayerTypeIds,
  } = input;

  const slug = generateSlug(recipientName);
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const endDate = addDays(startDate, durationDays - 1);

  // Handle photo upload (with timeout to prevent hanging)
  let recipientImageUrl: string | null = null;
  const photoFile = formData.get("recipientPhoto") as File | null;
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

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: { train: true, prayerType: true },
  });

  if (!slot || slot.status !== "OPEN") {
    throw new Error("This slot is no longer available.");
  }

  // Track the date(s) we end up claiming so we can format an accurate
  // confirmation email below.
  let claimedDateLabel: string;

  // If this is a novena, find/create a group and claim all 9 days
  if (slot.prayerType.daysRequired > 1) {
    const novenaGroupId = `novena-${slotId}-${Date.now()}`;
    const futureDays = await prisma.prayerSlot.findMany({
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

    await prisma.prayerSlot.updateMany({
      where: { id: { in: futureDays.map((s) => s.id) } },
      data: {
        status: "CLAIMED",
        claimedById: session?.user?.id || null,
        claimerName,
        claimerEmail,
        claimedAt: new Date(),
        novenaGroupId,
      },
    });

    const first = futureDays[0]?.date ?? slot.date;
    const last = futureDays[futureDays.length - 1]?.date ?? slot.date;
    claimedDateLabel = `${formatDateLong(first)} – ${formatDateLong(last)} (${futureDays.length} days)`;
  } else {
    await prisma.prayerSlot.update({
      where: { id: slotId },
      data: {
        status: "CLAIMED",
        claimedById: session?.user?.id || null,
        claimerName,
        claimerEmail,
        claimedAt: new Date(),
      },
    });
    claimedDateLabel = formatDateLong(slot.date);
  }

  // Send a confirmation email so the volunteer knows their commitment stuck.
  // sendClaimConfirmation already swallows + logs its own errors, so we
  // intentionally do not let an email failure block the slot claim.
  await sendClaimConfirmation({
    to: claimerEmail,
    claimerName,
    recipientName: slot.train.recipientName,
    prayerName: slot.prayerType.name,
    date: claimedDateLabel,
    prayerInstructions: slot.prayerType.instructions,
    trainUrl: `${getBaseUrl()}/p/${slot.train.slug}`,
  });

  revalidatePath(`/p/${slot.train.slug}`);
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

  // Ownership check.
  //
  // Threat model: this is a friendly Catholic prayer site for older users
  // in parish ministries; the realistic risk is "Aunt Susan accidentally
  // taps a button that wasn't hers," not adversarial tampering. So:
  //
  // - If the slot was claimed by an authenticated user (claimedById set),
  //   only that user can mark it complete. Prevents a logged-in viewer
  //   AND any anonymous viewer from completing someone else's prayer.
  // - If the slot was claimed by a guest (claimedById null, claimerEmail
  //   set), keep the existing "anyone can mark complete" behavior, since
  //   guest claimers have no other way to complete from the page (no
  //   tokenized email link yet — that's a separate morning task).
  if (slot.claimedById && slot.claimedById !== session?.user?.id) {
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
    const orgFirst = train.organizer?.name?.split(/\s+/)[0] ?? null;

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
    organizerFirstName: train.organizer?.name?.split(/\s+/)[0] ?? null,
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
  } = parseFormData(createChainSchema, formData);

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
  if (!chain) throw new Error("That PrayerChain no longer exists.");
  if (chain.status !== "ACTIVE") {
    throw new Error("This PrayerChain is no longer accepting new members.");
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
    organizerName: chain.organizer?.name ?? "the organizer",
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
  if (!member) throw new Error("You're not a member of this PrayerChain.");

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
  if (!verifyCompletionToken("chain-day", memberId, token)) {
    throw new Error("This completion link is invalid or has expired.");
  }
  if (!Number.isInteger(day) || day < 1 || day > 365) {
    throw new Error("That day number doesn't look right.");
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

  if (!chain) throw new Error("PrayerChain not found.");
  if (chain.organizerId !== session.user.id) {
    throw new Error("Only the organizer can close this PrayerChain.");
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
      organizerName: chain.organizer?.name ?? "the organizer",
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
