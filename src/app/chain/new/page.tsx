import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createPrayerChain } from "@/lib/actions";
import { Users, Heart } from "lucide-react";
import { SaintPortrait } from "@/components/saint-portrait";
import { PhotoUploadField } from "@/components/photo-upload-field";

export const metadata: Metadata = {
  title: "Pray Together",
  description:
    "Invite a small group of people to pray the same prayer together — every day, in solidarity, for someone you love.",
  alternates: { canonical: "/chain/new" },
  robots: { index: false, follow: false },
};

export default async function NewChainPage({
  searchParams,
}: {
  searchParams: Promise<{ prayerType?: string }>;
}) {
  // Require sign-in to create a chain. Mirrors /create gating.
  const session = await auth();
  if (!session?.user?.id) {
    const params = await searchParams;
    const cb = params.prayerType
      ? `/chain/new?prayerType=${encodeURIComponent(params.prayerType)}`
      : "/chain/new";
    redirect(`/signin?callbackUrl=${encodeURIComponent(cb)}`);
  }

  const { prayerType: prayerTypeSlug } = await searchParams;

  // Pre-fill the prayer if the user came from /prayers/[slug].
  const prayerType = prayerTypeSlug
    ? await prisma.prayerType.findUnique({
        where: { slug: prayerTypeSlug },
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          daysRequired: true,
          patronSaint: true,
        },
      })
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <Users className="w-10 h-10 text-gold-500 mx-auto mb-3" />
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-2">
          {prayerType
            ? `Pray the ${prayerType.name} together`
            : "Pray together"}
        </h1>
        <p className="text-muted-foreground">
          {prayerType
            ? `Invite friends to pray with you for ${prayerType.daysRequired} day${prayerType.daysRequired === 1 ? "" : "s"}.`
            : "Invite friends to pray the same prayer together for someone you love."}
        </p>
      </div>

      {prayerType && (
        <div className="prayer-card mb-6 flex items-start gap-4">
          <div className="shrink-0">
            <SaintPortrait patronSaint={prayerType.patronSaint} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-700 mb-1">
              {prayerType.name}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {prayerType.description}
            </p>
          </div>
        </div>
      )}

      {!prayerType && (
        <div className="prayer-card mb-6 bg-cream-50 border-cream-300">
          <p className="text-sm text-muted-foreground">
            Choose a prayer first.{" "}
            <Link
              href="/prayers"
              className="text-gold-700 hover:underline underline-offset-2"
            >
              Browse the prayer library
            </Link>{" "}
            and click <strong>Pray with friends</strong> on a prayer&apos;s page to
            come back here with it pre-filled.
          </p>
        </div>
      )}

      {prayerType && (
        <form action={createPrayerChain} className="prayer-card space-y-5">
          <input type="hidden" name="prayerTypeId" value={prayerType.id} />

          {/* Organizer self-identification. Pre-filled with whatever name
              is on the User row (Google sign-in fills it; magic-link
              users start blank and fill it here). Server-side refinement
              in createChainSchema enforces "name OR anonymous"; the
              required attribute is omitted because the no-JS path needs
              to allow empty-name + anonymous checked. */}
          <div className="rounded-lg bg-cream-50 border border-cream-300 p-4 space-y-3">
            <div>
              <label
                htmlFor="organizerName"
                className="block text-sm font-medium text-navy-700 mb-1.5"
              >
                Your name
              </label>
              <input
                id="organizerName"
                name="organizerName"
                type="text"
                maxLength={80}
                defaultValue={session.user.name ?? ""}
                placeholder="How you'd like to appear on the prayer page"
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-white focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Shown as &ldquo;Organized by [your name]&rdquo; on the public
                page. Leave blank and check the box below to stay anonymous.
              </p>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                name="organizerAnonymous"
                type="checkbox"
                value="true"
                className="mt-0.5"
              />
              <span className="text-sm text-navy-700">
                Show me as &ldquo;Anonymous&rdquo; on the public page
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="recipientName"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Who is this for?{" "}
              <span className="text-xs text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <input
              id="recipientName"
              name="recipientName"
              type="text"
              maxLength={80}
              placeholder="e.g., Benji, my sister, the unborn"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Skip if this is for an intention rather than a person
              (discernment, the Church, etc.).
            </p>
          </div>

          <div>
            <label
              htmlFor="intention"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              What&apos;s the intention?{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              id="intention"
              name="intention"
              required
              maxLength={2000}
              rows={3}
              placeholder="e.g., Full healing of his throat and vocal cords"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>

          <PhotoUploadField name="recipientPhoto" />

          {/* Optional custom prayer — same shape as PrayerTrain's custom
              prayer field. For organizers who have a specific prayer they
              want everyone to pray alongside the prayer-type text from
              the library. */}
          <div>
            <label
              htmlFor="customPrayerText"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              A personal prayer to include{" "}
              <span className="text-xs text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Have a specific prayer you&apos;d like everyone to pray alongside
              the {prayerType.name}? Paste it here. We&apos;ll show it on the
              prayer page and include it in the daily reminder emails.
            </p>
            <textarea
              id="customPrayerText"
              name="customPrayerText"
              maxLength={4000}
              rows={4}
              placeholder="e.g., a family prayer, a prayer a friend wrote, words from your heart…"
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>

          {/* Visibility opt-in. Default is PRIVATE (link-only) per the
              May 2026 audit. Going public is an explicit informed
              choice that lists this prayer on the public directory and
              exposes the intention to search-engine indexing. */}
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-cream-50 border border-cream-300">
            <input
              name="isPublic"
              type="checkbox"
              value="true"
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-navy-700">
                Make this shared prayer publicly discoverable
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                If checked: the recipient&apos;s name, intention, and
                prayer will appear on the public <span className="font-medium">Find</span>{" "}
                directory and may be indexed by search engines. If
                unchecked (the default), only people with the link can
                view this page. You can change this later from Manage.
              </p>
            </div>
          </label>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Start praying together
          </button>
        </form>
      )}
    </div>
  );
}
