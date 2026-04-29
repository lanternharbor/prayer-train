import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Users,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Start a PrayerTrain",
  description:
    "Two ways to organize prayer for someone you love — pick the one that fits.",
  alternates: { canonical: "/create" },
};

export default function CreateChooserPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
          How can we help you organize prayer?
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Two ways to organize prayer. Both are PrayerTrain — pick what fits
          how your community wants to pray.
        </p>
      </div>

      {/* Two cards — both formats are PrayerTrain. The first card describes
          the calendar/coverage pattern; the second describes the synchronized
          "everyone prays the same prayer together" pattern. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Calendar format — current Train primitive */}
        <div className="prayer-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-navy-700" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-navy-800">
              Fill a prayer calendar
            </h2>
          </div>

          <p className="text-sm font-medium text-gold-700 mb-3">
            Distributed coverage
          </p>

          <p className="text-foreground leading-relaxed mb-5">
            A roster of different people each praying something on different
            days. The &ldquo;meal train, but for prayers&rdquo; pattern. You
            pick a duration, a number of slots per day, and your community
            fills the calendar.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Best for long durations (30, 54, 90 days)
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Many volunteers, varied prayers
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Each volunteer commits to one slot, one day
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic mb-6">
            Example: a parish coordinating 30 days of prayer for a family in
            crisis.
          </p>

          <Link
            href="/create/train"
            className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Start a calendar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pray-together format — current Chain primitive */}
        <div className="prayer-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold-700" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-navy-800">
              Pray together
            </h2>
          </div>

          <p className="text-sm font-medium text-gold-700 mb-3">
            Synchronized novena
          </p>

          <p className="text-foreground leading-relaxed mb-5">
            A small group all praying the same prayer at the same time, every
            day. The &ldquo;I&rsquo;m doing this novena, want to join me?&rdquo;
            pattern. You pick a novena from the library, invite friends, and
            everyone gets the same daily reminder.
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Best for traditional novenas (9 days, 33 days)
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Same prayer every day, in solidarity
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Each member prays every day for the duration
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic mb-6">
            Example: starting a St. Blaise novena for a loved one&rsquo;s
            healing and inviting family to pray it with you.
          </p>

          <Link
            href="/prayers/novenas"
            className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors"
          >
            <Users className="w-4 h-4" />
            Pick a novena
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Subtle help text */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground">
          Not sure?{" "}
          <Link
            href="/our-story"
            className="text-gold-700 hover:text-gold-800 underline-offset-2 hover:underline"
          >
            Read more about how PrayerTrain works
          </Link>
          , or{" "}
          <Link
            href="/browse"
            className="text-gold-700 hover:text-gold-800 underline-offset-2 hover:underline"
          >
            see what other people are organizing right now
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
