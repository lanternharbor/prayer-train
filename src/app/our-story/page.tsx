import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  CrossIcon,
  CrossDivider,
  SacredHeartIcon,
  CandleIcon,
} from "@/components/ui/catholic-icons";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "PrayerTrain was born from one family's experience with three children facing life-threatening medical crises — and the community of prayer that carried them through.",
};

export default function OurStoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <Image
          src="/logo.png"
          alt="PrayerTrain"
          width={200}
          height={200}
          className="w-32 h-auto mx-auto mb-8"
        />
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
          Why PrayerTrain Exists
        </h1>
        <p className="text-lg text-muted-foreground italic">
          Born from crisis. Built on faith. Sustained by community.
        </p>
      </div>

      <CrossDivider />

      {/* The Story */}
      <article className="prose-custom space-y-6 text-foreground leading-relaxed">
        <p className="text-lg">
          We&apos;re a close-knit, faithful Catholic extended family from the
          South Shore of Massachusetts &mdash; the kind where aunties and
          uncles show up without being asked, where grandmas and papas drop
          everything, and where the mothers and fathers lean on each other
          through whatever comes. In late 2025 and early 2026, that bond was
          tested like never before when three children across our family faced
          life-threatening medical crises within months of each other.
        </p>

        <div className="prayer-card border-l-4 border-l-gold-400">
          <div className="flex items-start gap-3">
            <CandleIcon className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-navy-800 mb-1">
                A premature baby &mdash; 73 days in the NICU
              </p>
              <p className="text-muted-foreground text-sm">
                Born at just 30 weeks, one of our little ones spent 73 days in
                the NICU. Seventy-three days of monitors, of hoping, of praying
                through every alarm and every setback.
              </p>
            </div>
          </div>
        </div>

        <div className="prayer-card border-l-4 border-l-gold-400">
          <div className="flex items-start gap-3">
            <SacredHeartIcon className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-navy-800 mb-1">
                Open heart surgery at five days old
              </p>
              <p className="text-muted-foreground text-sm">
                A baby born in January needed open heart surgery when she was just
                five days old. There is no preparing yourself for handing your
                newborn to a surgical team and waiting.
              </p>
            </div>
          </div>
        </div>

        <div className="prayer-card border-l-4 border-l-gold-400">
          <div className="flex items-start gap-3">
            <CrossIcon className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-navy-800 mb-1">
                A severe respiratory crisis
              </p>
              <p className="text-muted-foreground text-sm">
                Then another child in the family faced a severe respiratory
                crisis requiring intubation. Another hospital room. Another set
                of prayers sent upward.
              </p>
            </div>
          </div>
        </div>

        <CrossDivider />

        <p className="text-lg">
          <strong>Through the grace of God</strong> and the extraordinary care
          of Boston Children&apos;s Hospital, all three children came out on
          top. Every single one.
        </p>

        <p>
          But what carried our family through those months wasn&apos;t just
          medicine. It was the village. The aunties who took shifts at the
          hospital. The uncles who handled everything at home. The grandmas and
          papas who never left our sides. And underneath all of it &mdash; the
          prayers. Friends, parishioners, and even strangers committed to
          specific prayers on specific days. Novenas were offered. Rosaries were
          prayed. Masses were said. We could feel it.
        </p>

        <p>
          The challenge was coordination. Who was praying what? Which days were
          covered? Were there gaps? We found ourselves wishing for something
          like a meal train &mdash; but for prayers. A way to organize the
          spiritual support the way communities already organize meals and
          practical help.
        </p>

        <p className="text-lg font-heading font-semibold text-navy-800">
          That&apos;s why our family built PrayerTrain.
        </p>

        <p>
          We built it so that the next family sitting in a NICU, the next
          parents waiting outside an OR, the next extended family rallying
          around a child in crisis &mdash; can know with certainty that their
          community is lifting them up in organized, continuous prayer. Every
          day. Every slot. Every intention covered.
        </p>

        <div className="text-center py-8">
          <p className="font-heading text-xl text-navy-700 italic mb-2">
            &ldquo;For where two or three gather in my name,
            <br />
            there am I with them.&rdquo;
          </p>
          <p className="text-sm text-muted-foreground">
            &mdash; Matthew 18:20
          </p>
        </div>

        <CrossDivider />

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            If someone you love is going through something hard, you don&apos;t
            have to organize the prayers alone.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors text-lg"
          >
            Start a PrayerTrain
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </article>
    </div>
  );
}
