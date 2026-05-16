import { LocaleLink as Link } from "@/components/locale-link";
import { Heart } from "lucide-react";
import { CrossIcon } from "@/components/ui/catholic-icons";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  footer: Dictionary["footer"];
  prayers: Dictionary["nav"];
  common: Dictionary["common"];
};

export function Footer({ footer, prayers, common }: Props) {
  // Split the copyright line on the {company} placeholder so we can
  // render the Lantern Harbor link as a proper anchor inside an
  // otherwise localized sentence. Keeps every locale's JSON file as
  // plain text without HTML.
  const [copyrightPre, copyrightPost] = footer.copyright.split("{company}");

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <CrossIcon className="w-4 h-4 text-gold-500" />
              <span className="font-heading text-lg font-semibold text-navy-700">
                PrayerTrain
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-navy-700 mb-3">
              {footer.prayersHeading}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prayers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prayers.prayerLibrary}
                </Link>
              </li>
              <li>
                <Link
                  href="/prayers/novenas"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prayers.novenas}
                </Link>
              </li>
              <li>
                <Link
                  href="/situations"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prayers.bySituation}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-start-a-prayer-train"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {footer.howToStart}
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prayers.createTrain}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-navy-700 mb-3">
              {footer.aboutHeading}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/our-story"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prayers.ourStory}
                </Link>
              </li>
              <li>
                <Link
                  href="/parish-kit"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {footer.forParishes}
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {common.signIn}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {footer.terms}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@prayertrains.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {footer.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {copyrightPre}
            <a
              href="https://lanternharbor.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
            >
              Lantern Harbor
            </a>
            {copyrightPost}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {footer.madeWith} <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />{" "}
            {footer.forBodyOfChrist}
          </p>
        </div>
      </div>
    </footer>
  );
}
