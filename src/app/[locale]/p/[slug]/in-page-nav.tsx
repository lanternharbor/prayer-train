"use client";

import { CalendarDays, HandHeart, MessageSquare, Newspaper } from "lucide-react";

/**
 * Sticky in-page navigation strip for the train detail page. Anchors
 * to the major sections so a long-running train (where the calendar
 * is a wall) doesn't bury the prayer-warrior roster, organizer
 * updates, and encouragement wall.
 *
 * Sticks to the top of the viewport once the page header scrolls
 * past. Sits BELOW the global site header (which is z-50, sticky)
 * so the two stack visually instead of fighting for the same row.
 *
 * Conditional sections (warriors only when any pledged, updates only
 * when any posted) hide gracefully via the props — no anchor link
 * for a section that isn't on the page.
 *
 * Active-section highlighting is intentionally NOT implemented in V1.
 * Adding it would require IntersectionObserver tracking and per-
 * section state; the navigation utility works fine without it. Easy
 * follow-up if there's appetite later.
 */
export function InPageNav({
  showWarriors,
  showUpdates,
}: {
  showWarriors: boolean;
  showUpdates: boolean;
}) {
  return (
    <nav
      aria-label="In-page sections"
      // Outer wrapper handles sticky positioning and the alignment
      // axis (flex justify-start). The inner pill is content-width
      // so the strip doesn't read as a wide empty bar on desktop —
      // it hugs the chips and stays visually compact.
      className="sticky top-16 z-40 mb-6 flex justify-start"
    >
      {/* Content-width pill. inline-flex sizes to its chip contents;
          overflow-x-auto + max-w-full lets the chips scroll
          horizontally when the pill would exceed the available
          width (mobile narrow viewports). The pill carries its own
          subtle background + border + shadow so it reads as a
          self-contained navigation widget rather than a full-width
          bar. */}
      <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded-full bg-card/95 backdrop-blur border border-cream-300 shadow-sm overflow-x-auto max-w-full">
        <NavChip href="#calendar" icon={<CalendarDays className="w-3.5 h-3.5" />}>
          Calendar
        </NavChip>
        {showWarriors && (
          <NavChip href="#prayer-warriors" icon={<HandHeart className="w-3.5 h-3.5" />}>
            Prayer warriors
          </NavChip>
        )}
        {showUpdates && (
          <NavChip href="#updates" icon={<Newspaper className="w-3.5 h-3.5" />}>
            Updates
          </NavChip>
        )}
        <NavChip href="#guestbook" icon={<MessageSquare className="w-3.5 h-3.5" />}>
          Encouragement
        </NavChip>
      </div>
    </nav>
  );
}

function NavChip({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  // Smooth-scroll with offset so the anchored heading doesn't get
  // hidden under the sticky site header (h-16) plus this nav strip.
  // Using scrollIntoView gives smooth-scroll + accessible-tree
  // anchor behavior; preventDefault prevents the default jump that
  // would also fire and overshoot.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.startsWith("#") ? href.slice(1) : href;
    const el = document.getElementById(id);
    if (!el) return;
    // 64px site header + ~50px nav strip ≈ 120px. scrollMarginTop on
    // the target element handles the offset cleanly via CSS, so we
    // can use the standard scrollIntoView.
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-100 text-navy-700 text-xs font-medium border border-cream-300 hover:bg-cream-200 hover:border-cream-400 transition-colors whitespace-nowrap"
    >
      {icon}
      {children}
    </a>
  );
}
