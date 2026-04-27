import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { closePrayerChain } from "@/lib/actions";
import { ArrowLeft, Settings, Users, FileDown } from "lucide-react";

// Module-level helper. Defined outside the component to satisfy the
// react-hooks/purity rule, which rejects Date.now() inside render.
function currentDayNumber(startDate: Date): number {
  const ms = Date.now() - startDate.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    select: { recipientName: true, intention: true },
  });
  if (!chain) return { title: "Manage PrayerChain" };
  return {
    title: chain.recipientName
      ? `Manage: ${chain.recipientName}`
      : "Manage PrayerChain",
    robots: { index: false, follow: false },
  };
}

export default async function ChainManagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true } },
      prayerType: { select: { name: true, slug: true } },
      members: {
        orderBy: { joinedAt: "asc" },
        select: {
          id: true,
          name: true,
          email: true,
          joinedAt: true,
          unsubscribedAt: true,
          lastDayCompleted: true,
        },
      },
    },
  });

  if (!chain) notFound();
  if (chain.organizerId !== session.user.id) {
    redirect(`/chain/${slug}`);
  }

  const activeCount = chain.members.filter((m) => !m.unsubscribedAt).length;
  const dayNum = currentDayNumber(chain.startDate);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/chain/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to PrayerChain
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-6 h-6 text-gold-500" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-800">
            Manage:{" "}
            {chain.recipientName ?? chain.prayerType.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {chain.prayerType.name} &bull; Day {dayNum} of{" "}
            {chain.durationDays} &bull; {activeCount} active{" "}
            {activeCount === 1 ? "member" : "members"}
          </p>
        </div>
      </div>

      {/* Bouquet PDF — only when COMPLETED */}
      {chain.status === "COMPLETED" && (
        <div className="prayer-card mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-heading text-lg font-semibold text-navy-800 mb-1 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-gold-500" />
              Spiritual Bouquet
            </h2>
            <p className="text-sm text-muted-foreground">
              A printable record of every member who prayed with you.
            </p>
          </div>
          <a
            href={`/api/bouquet/chain/${chain.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
          >
            <FileDown className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      )}

      {/* Close chain form */}
      {chain.status === "ACTIVE" && (
        <form action={closePrayerChain} className="prayer-card mb-8 space-y-4">
          <input type="hidden" name="chainId" value={chain.id} />
          <div>
            <h2 className="font-heading text-lg font-semibold text-navy-800 mb-2">
              Close this PrayerChain
            </h2>
            <p className="text-sm text-muted-foreground">
              Marks the PrayerChain complete, sends a closing-day email to
              every active member, and unlocks the spiritual bouquet PDF.
            </p>
          </div>
          <div>
            <label
              htmlFor="closingNote"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              Closing note{" "}
              <span className="text-xs text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="closingNote"
              name="closingNote"
              rows={3}
              maxLength={2000}
              placeholder="A few words to send to everyone who prayed."
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            Close the PrayerChain
          </button>
        </form>
      )}

      {/* Member roster */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-gold-500" />
          Members ({chain.members.length})
        </h2>
        <div className="prayer-card">
          <div className="divide-y divide-border">
            {chain.members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-navy-700">
                    {m.name}
                    {m.unsubscribedAt && (
                      <span className="text-xs text-muted-foreground italic ml-2">
                        (unsubscribed)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                {m.lastDayCompleted != null && (
                  <p className="text-xs text-gold-700">
                    Day {m.lastDayCompleted} ✓
                  </p>
                )}
              </div>
            ))}
            {chain.members.length === 0 && (
              <p className="text-sm text-muted-foreground py-3">
                No one has joined yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
