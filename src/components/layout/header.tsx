import Link from "next/link";
import { auth } from "@/lib/auth";
import { Cross, Menu } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center">
              <span className="text-white text-sm font-heading font-bold">
                PT
              </span>
            </div>
            <span className="font-heading text-xl font-semibold text-navy-700 group-hover:text-navy-500 transition-colors">
              PrayerTrain
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/prayers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Prayer Library
            </Link>
            <Link
              href="/prayers/novenas"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Novenas
            </Link>
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-navy-700 transition-colors"
                >
                  Start a PrayerTrain
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-navy-700 transition-colors"
                >
                  Start a PrayerTrain
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <MobileNav isSignedIn={!!session?.user} />
        </div>
      </nav>
    </header>
  );
}
