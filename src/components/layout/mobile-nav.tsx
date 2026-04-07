"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileNav({ isSignedIn }: { isSignedIn: boolean }) {
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
              Find a FaithTrain
            </Link>
            <Link
              href="/prayers"
              className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              Prayer Library
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className="block px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg text-center"
                  onClick={() => setOpen(false)}
                >
                  Start a FaithTrain
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/create"
                  className="block px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg text-center"
                  onClick={() => setOpen(false)}
                >
                  Start a FaithTrain
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
