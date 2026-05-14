"use client";

/**
 * Site-wide navigation header.
 *
 * Client component that reads auth state via `useSession()` from
 * next-auth/react. Originally a server component that called
 * `await auth()` server-side, which forced every page in the site
 * into dynamic-rendering mode and disabled the Vercel CDN cache for
 * public pages (homepage, /our-story, /prayers, /prayers/[slug]).
 *
 * Switching to client-side session lets the public layout serve
 * from the CDN with `s-maxage=300, stale-while-revalidate=...`
 * (translated from `export const revalidate = 300` on those pages).
 * The `<Providers>` wrapper in src/components/providers.tsx supplies
 * the SessionProvider context this hook needs.
 *
 * Trade-off: signed-in users may see the "Sign In" link briefly
 * before useSession resolves and the component re-renders with
 * "Dashboard". Treated as acceptable: most public-page visitors
 * arrive un-authenticated, so the flicker affects a minority. The
 * `status` field is checked to avoid flashing the wrong state during
 * the initial loading window — we render the signed-out variant
 * during loading + signed-out and switch to the signed-in variant
 * only when status === "authenticated".
 *
 * Localization: receives `locale`, `nav`, and `common` from the
 * server-component layout. The component itself stays a client
 * component (needed for useSession and the LocaleSwitcher's
 * useTransition), but all rendered strings come from the dictionary
 * the server resolved.
 */

import { LocaleLink as Link } from "@/components/locale-link";
import { useSession } from "next-auth/react";
import { CrossIcon } from "@/components/ui/catholic-icons";
import { MobileNav } from "./mobile-nav";
import { LocaleSwitcher } from "./locale-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
};

export function Header({ locale, nav, common }: Props) {
  const { status } = useSession();
  const isSignedIn = status === "authenticated";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <nav
        aria-label="Primary navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <CrossIcon className="w-5 h-5 text-gold-500" />
            <span className="font-heading text-xl font-semibold text-navy-700 group-hover:text-navy-500 transition-colors">
              {common.appName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {nav.findATrain}
            </Link>
            <Link
              href="/prayers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {nav.prayerLibrary}
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {common.dashboard}
                </Link>
                <LocaleSwitcher currentLocale={locale} />
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-navy-700 transition-colors"
                >
                  {common.getStarted}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {common.signIn}
                </Link>
                <LocaleSwitcher currentLocale={locale} />
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-navy-700 transition-colors"
                >
                  {common.getStarted}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <MobileNav isSignedIn={isSignedIn} locale={locale} nav={nav} common={common} />
        </div>
      </nav>
    </header>
  );
}
