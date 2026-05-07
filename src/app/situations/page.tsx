import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { SITUATIONS, SITUATION_TOPICS } from "./[topic]/content";

/**
 * /situations — index page that lists every situation page.
 *
 * Light page. Single H1, short lead, six cards linking to the leaf
 * pages. Exists primarily to give /situations/[topic] breadcrumbs a
 * real parent URL and to surface the cluster from the homepage / nav
 * if William wires that link in later.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Catholic prayers by situation",
  description:
    "Catholic prayers and ways to organize community prayer when someone you love is facing illness, surgery, grief, or other hard moments.",
  alternates: { canonical: "/situations" },
};

export default function SituationsIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 leading-tight mb-5 gold-accent">
          Catholic prayers by situation
        </h1>
        <p className="text-lg text-foreground leading-relaxed">
          When someone you love is in a hard moment, the question is not
          usually whether to pray. It is what to pray. Each page below
          collects the prayers Catholic tradition has given us for one
          specific situation, with a way to gather others and pray
          together if you want to.
        </p>
      </header>

      <div className="space-y-4 mb-12">
        {SITUATION_TOPICS.map((topic) => {
          const content = SITUATIONS[topic];
          return (
            <Link
              key={topic}
              href={`/situations/${topic}`}
              className="prayer-card group block"
            >
              <h2 className="font-heading text-xl font-semibold text-navy-800 group-hover:text-navy-600 transition-colors mb-2">
                {content.h1}
              </h2>
              <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                {content.lead}
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-gold-600 group-hover:text-gold-700">
                Read more
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Light CTA back to /create */}
      <div className="prayer-card bg-cream-50 border-cream-300 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <h2 className="font-heading text-lg font-semibold text-navy-800 mb-1">
            Don&apos;t see your situation?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Start a PrayerTrain anyway. The prayer library covers many
            more situations than the cluster here, and the create flow
            will recommend prayers based on the situation you describe.
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
        >
          <Heart className="w-4 h-4" />
          Start a PrayerTrain
        </Link>
      </div>
    </div>
  );
}
