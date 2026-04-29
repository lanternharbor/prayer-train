import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Heart, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { markSlotCompleteByToken } from "@/lib/actions";
import { CrossDivider } from "@/components/ui/catholic-icons";

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
    select: { recipientName: true, slug: true },
  });
  if (!train) notFound();

  let outcome: "success" | "missing-params" | "invalid";
  let errorMessage: string | null = null;

  if (!slotId || !token) {
    outcome = "missing-params";
  } else {
    try {
      await markSlotCompleteByToken(slotId, token);
      outcome = "success";
    } catch (err) {
      outcome = "invalid";
      errorMessage =
        err instanceof Error
          ? err.message
          : "We couldn't verify this completion link.";
    }
  }

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
              This page lives behind the "I prayed" button in our daily
              reminder emails. Open the prayer train to see who&apos;s being
              lifted up today.
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
    </div>
  );
}
