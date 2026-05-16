"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  isSignedIn: boolean;
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
  localeSwitcher: Dictionary["localeSwitcher"];
};

export function MobileNav({
  isSignedIn,
  locale,
  nav,
  common,
  localeSwitcher,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* Compact CTA pill — keeps the primary acquisition action one
          tap away on mobile instead of two-taps-deep inside the
          hamburger drawer. Mirrors the desktop "Get Started" link;
          uses the same /create destination so the create-flow funnel
          is identical across viewports. min-h-11 enforces a 44px tap
          target per the iOS guideline. */}
      <Link
        href="/create"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-navy-700 transition-colors min-h-11"
      >
        {common.getStarted}
      </Link>
      <button
        onClick={() => setOpen(!open)}
        className="min-w-11 min-h-11 flex items-center justify-center text-muted-foreground hover:text-foreground"
        aria-label={open ? nav.closeMenu : nav.openMenu}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/browse"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {nav.findATrain}
            </Link>
            <Link
              href="/prayers"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {nav.prayerLibrary}
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {common.dashboard}
                </Link>
                <Link
                  href="/create"
                  className="block px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg text-center"
                  onClick={() => setOpen(false)}
                >
                  {common.getStarted}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {common.signIn}
                </Link>
                <Link
                  href="/create"
                  className="block px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg text-center"
                  onClick={() => setOpen(false)}
                >
                  {common.getStarted}
                </Link>
              </>
            )}
            {/* Locale switcher lives at the bottom of the mobile menu */}
            <div className="border-t border-border pt-3 mt-3">
              <LocaleSwitcher currentLocale={locale} label={localeSwitcher.label} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
