import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Heart, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { markChainDayCompleteByToken } from "@/lib/actions";
import { organizerFirstName } from "@/lib/organizer-display";
import { CrossDivider } from "@/components/ui/catholic-icons";

/**
 * Tokenized one-click completion handler for the "pray together"
 * PrayerTrain format daily reminders. Mirrors the slot completion
 * handler at /p/[slug]/complete — same trust boundary (HMAC-signed
 * token covers memberId), same calm error states, same threat model
 * (parish ministries; "Aunt Susan tapped a forwarded link" not
 * "attacker spoofs completion stats").
 */

export const metadata: Metadata = {
  title: "Marking your prayer complete",
  robots: { index: false, follow: false },
};

export default async function CompleteChainDayPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    memberId?: string;
    token?: string;
    day?: string;
  }>;
}) {
  const { slug } = await params;
  const { memberId, token, day: dayStr } = await searchParams;

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    select: {
      slug: true,
      recipientName: true,
      durationDays: true,
      organizerAnonymous: true,
      organizer: { select: { name: true } },
    },
  });
  if (!chain) notFound();

  const orgFirst = organizerFirstName(chain);
  const dayNum = dayStr ? Number(dayStr) : NaN;

  let outcome: "success" | "missing-params" | "invalid";
  let errorMessage: string | null = null;
  let dayLabel: number | null = null;

  if (!memberId || !token || !Number.isFinite(dayNum)) {
    outcome = "missing-params";
  } else {
    try {
      const result = await markChainDayCompleteByToken(memberId, dayNum, token);
      outcome = "success";
      dayLabel = result.day;
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
              Thank you for praying.
            </h1>
            <p className="text-muted-foreground mb-2">
              Day{" "}
              <strong className="text-navy-700">
                {dayLabel ?? dayNum}
              </strong>{" "}
              of {chain.durationDays} is marked complete
              {chain.recipientName ? (
                <>
                  {" "}
                  for{" "}
                  <strong className="text-navy-700">
                    {chain.recipientName}
                  </strong>
                </>
              ) : null}
              .
            </p>
            <p className="text-sm text-muted-foreground italic">
              May the Lord receive your intercession alongside {orgFirst}
              &apos;s.
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
              This page lives behind the &ldquo;I prayed today&rdquo; button
              in our daily reminder emails. Open the prayer page to see
              who&apos;s praying alongside you.
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
              You can still pray. Visit the prayer page below.
            </p>
          </>
        )}

        <CrossDivider />

        <Link
          href={`/chain/${chain.slug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
        >
          Open the prayer
        </Link>
      </div>
    </div>
  );
}
