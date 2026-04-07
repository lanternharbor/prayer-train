"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addDays, eachDayOfInterval } from "date-fns";
import { SituationCategory, SlotStatus } from "@/generated/prisma/client";
import { put } from "@vercel/blob";

// ─── Create PrayerTrain ─────────────────────────────────────

export async function createPrayerTrain(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const recipientName = formData.get("recipientName") as string;
  const recipientRelation = formData.get("recipientRelation") as string;
  const intention = formData.get("intention") as string;
  const situation = formData.get("situation") as SituationCategory;
  const situationDetail = formData.get("situationDetail") as string;
  const durationDays = parseInt(formData.get("durationDays") as string) || 30;
  const slotsPerDay = parseInt(formData.get("slotsPerDay") as string) || 3;
  const isPublic = formData.get("isPublic") === "true";
  const prayerTypeIds = (formData.get("prayerTypeIds") as string)
    ?.split(",")
    .filter(Boolean);

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
      intention,
      situation,
      situationDetail: situationDetail || null,
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
  const slotId = formData.get("slotId") as string;
  const claimerName = formData.get("claimerName") as string;
  const claimerEmail = formData.get("claimerEmail") as string;

  const session = await auth();

  const slot = await prisma.prayerSlot.findUnique({
    where: { id: slotId },
    include: { train: true, prayerType: true },
  });

  if (!slot || slot.status !== "OPEN") {
    throw new Error("This slot is no longer available.");
  }

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
  }

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

  // Verify ownership
  if (session?.user?.id && slot.claimedById !== session.user.id) {
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

// ─── Post Guestbook Entry ───────────────────────────────────

export async function postGuestbookEntry(formData: FormData) {
  const trainId = formData.get("trainId") as string;
  const authorName = formData.get("authorName") as string;
  const message = formData.get("message") as string;

  const session = await auth();

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

  const trainId = formData.get("trainId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

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
  });

  if (!train || train.organizerId !== session.user.id) {
    throw new Error("Only the organizer can update the train status.");
  }

  await prisma.prayerTrain.update({
    where: { id: trainId },
    data: { status },
  });

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
