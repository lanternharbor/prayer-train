"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  isSignedIn: boolean;
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
};

export function MobileNav({ isSignedIn, locale, nav, common }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-muted-foreground hover:text-foreground"
        aria-label={open ? "Close menu" : "Open menu"}
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
              <LocaleSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
