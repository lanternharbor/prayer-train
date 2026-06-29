import { LocaleLink } from "@/components/locale-link";
import { HandHeart, Users, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { buildCarryForwardHref } from "@/lib/carry-forward-href";

/**
 * "Carry this forward" — the participant→organizer growth-loop CTA.
 *
 * Shown at the high-intent moments after someone has prayed: a completed
 * slot or chain day, a finished train/chain they followed a link to, or
 * the bouquet. It invites that warm participant to become the next
 * organizer. Pastoral register, never growth-hacky — this renders on a
 * grief-adjacent product, so it offers rather than pushes.
 *
 * Visually mirrors the navy-train + cream-chain card pair already used at
 * the foot of /prayers/[slug]. Every link carries a first-party `?from=`
 * attribution param (see ACQUISITION_SOURCES in src/lib/validation.ts) so
 * the loop's effect is measurable. `prayerSlug` pre-fills the create flow
 * when a single obvious prayer carries over (e.g. a chain's one prayer);
 * omit it for trains, which span several prayers.
 *
 * Server component: it renders LocaleLink (a client component) as a
 * child, which is fine. It must NOT be imported into a client component —
 * client surfaces (the guestbook) inline their own compact prompt instead.
 */
export function CarryForwardCta({
  from,
  prayerSlug,
  t,
  className = "",
}: {
  /** First-party attribution value (one of ACQUISITION_SOURCES). */
  from: string;
  /** Optional prayer slug to pre-fill the create flow. */
  prayerSlug?: string;
  t: Dictionary["carryForwardCta"];
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Start a prayer train (calendar / coverage primitive) */}
      <div className="prayer-card bg-navy-50 border-navy-100 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-2 flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-gold-500" />
            {t.trainHeading}
          </h2>
          <p className="text-sm text-foreground leading-relaxed">{t.trainBody}</p>
        </div>
        <LocaleLink
          href={buildCarryForwardHref("/create/train", from, prayerSlug)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
        >
          {t.trainCta}
          <ArrowRight className="w-4 h-4" />
        </LocaleLink>
      </div>

      {/* Pray together (small-group primitive) */}
      <div className="prayer-card bg-cream-50 border-cream-300 mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-500" />
            {t.chainHeading}
          </h2>
          <p className="text-sm text-foreground leading-relaxed">{t.chainBody}</p>
        </div>
        <LocaleLink
          href={buildCarryForwardHref("/chain/new", from, prayerSlug)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
        >
          <Users className="w-4 h-4" />
          {t.chainCta}
        </LocaleLink>
      </div>
    </div>
  );
}
