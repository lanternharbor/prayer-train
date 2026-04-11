import Link from "next/link";
import { Heart } from "lucide-react";
import { CrossIcon } from "@/components/ui/catholic-icons";

export function Footer() {
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
              Coordinate prayer for those in need. Like a meal train, but for
              spiritual support. Invite your parish, friends, and family to
              commit to specific prayers on specific days.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-navy-700 mb-3">
              Prayers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prayers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Prayer Library
                </Link>
              </li>
              <li>
                <Link
                  href="/prayers/novenas"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Novenas
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Start a PrayerTrain
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-navy-700 mb-3">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/our-story"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PrayerTrain. Built with faith and
            love.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />{" "}
            for the Body of Christ
          </p>
        </div>
      </div>
    </footer>
  );
}
