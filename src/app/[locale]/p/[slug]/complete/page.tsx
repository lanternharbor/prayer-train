import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { notFound } from "next/navigation";
import { Check, Heart, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { markSlotCompleteByToken } from "@/lib/actions";
import { CrossDivider } from "@/components/ui/catholic-icons";
import { verifyCompletionToken } from "@/lib/completion-tokens";
import { CompleteForm } from "./complete-form";

/**
 * Tokenized one-click completion handler. Daily reminder emails point
 * the "I prayed" button here; the page reads `?slot=X&token=Y`,
 * verifies the HMAC signature, marks the slot complete, and shows a
 * thank-you message.
 *
 * Threat model is friendly (parish ministries) so we render any
 * verification failure as a calm, encouraging message rather than a
 * scary "INVALID TOKEN" — but server-side, the slot is only mutated
 * on a valid signature.
 */

export const metadata: Metadata = {
  title: "Marking your prayer complete",
  robots: { index: false, follow: false },
};

export default async function CompleteSlotPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ slot?: string; token?: string }>;
}) {
  const { slug } = await params;
  const { slot: slotId, token } = await searchParams;

  // Resolve the train regardless of token outcome so we can render a
  // useful page even on failure (the visitor still wants context for
  // who they were trying to pray for).
  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    select: { recipientName: true, slug: true, status: true },
  });
  if (!train) notFound();

  let outcome: "success" | "missing-params" | "invalid";
  let errorMessage: string | null = null;
  // Slot fields read AFTER the auto-mark so the form can render with
  // the canonical post-action state (note + shareWall + status).
  let slotState: {
    completionNote: string | null;
    completionNoteShareWall: boolean;
  } | null = null;

  if (!slotId || !token) {
    outcome = "missing-params";
  } else {
    try {
      // Auto-mark on render preserves the existing zero-click-after-
      // email-tap UX for users who don't want to leave a note. If the
      // slot is already COMPLETED this is idempotent.
      await markSlotCompleteByToken(slotId, token);
      outcome = "success";
      // Re-read the slot post-mutation so the form gets the actual
      // current note (if the user is returning to edit).
      const slot = await prisma.prayerSlot.findUnique({
        where: { id: slotId },
        select: { completionNote: true, completionNoteShareWall: true },
      });
      slotState = slot;
    } catch (err) {
      outcome = "invalid";
      errorMessage =
        err instanceof Error
          ? err.message
          : "We couldn't verify this completion link.";
    }
  }

  // The form is rendered only when the auto-mark succeeded AND the
  // token is genuinely valid for this slot (defensive double-check —
  // markSlotCompleteByToken already verifies but the form's submit
  // action will independently re-verify too).
  const showForm =
    outcome === "success" &&
    !!slotId &&
    !!token &&
    slotState !== null &&
    verifyCompletionToken("slot", slotId, token);
  const trainFrozen = train.status === "COMPLETED";

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="prayer-card text-center">
        {outcome === "success" ? (
          <>
            <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-gold-600" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy-800 mb-2">
              Thank you for your prayer.
            </h1>
            <p className="text-muted-foreground mb-2">
              Your prayer for{" "}
              <strong className="text-navy-700">{train.recipientName}</strong>{" "}
              is marked complete.
            </p>
            <p className="text-sm text-muted-foreground italic">
              May the Lord receive your intercession.
            </p>
          </>
        ) : outcome === "missing-params" ? (
          <>
            <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-gold-600" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy-800 mb-2">
              Welcome.
            </h1>
            <p className="text-muted-foreground">
              This page lives behind the &ldquo;I prayed&rdquo; button in our
              daily reminder emails. Open the prayer train to see who&apos;s
              being lifted up today.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-gold-600" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-navy-800 mb-2">
              We couldn&apos;t mark that one complete.
            </h1>
            <p className="text-muted-foreground mb-2">
              {errorMessage ?? "The completion link is invalid or expired."}
            </p>
            <p className="text-sm text-muted-foreground">
              You can still pray — the link just expired or doesn&apos;t
              match a current prayer slot. Visit the train below and find
              your slot if you&apos;d like to mark it complete from the page.
            </p>
          </>
        )}

        <CrossDivider />

        <Link
          href={`/p/${train.slug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
        >
          View the prayer train
        </Link>
      </div>

      {/* Optional note form — surfaced only when the auto-mark
          succeeded. Same form for initial submit and edit; if the
          slot already has a note the form pre-fills. The component
          itself disables interactions when the train has been
          marked COMPLETED (notes are frozen with the bouquet). */}
      {showForm && slotId && token && slotState && (
        <CompleteForm
          slotId={slotId}
          token={token}
          initialNote={slotState.completionNote ?? ""}
          initialShareWall={slotState.completionNoteShareWall}
          frozen={trainFrozen}
        />
      )}
    </div>
  );
}
