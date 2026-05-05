"use client";

import { useEffect, useState } from "react";
import { MessageCircleHeart } from "lucide-react";


/**
 * Floating bottom-right "Skip to encouragement" button. Appears once
 * the viewer scrolls past the calendar and disappears when the
 * guestbook section enters the viewport (don't surface "jump to" for
 * the section the viewer is already reading).
 *
 * Anchors: #calendar (the show-after threshold) and #guestbook (the
 * destination + hide trigger). Both must be present on the page for
 * the button to render usefully.
 *
 * Server-side renders null to avoid hydration mismatch with scroll
 * state. The IntersectionObserver mounts after first client render.
 */
export function JumpToGuestbook() {
  // Three states: hidden (default), shown (visible bottom-right),
  // arrived (guestbook in viewport, hide). Tracked via two booleans
  // so the IntersectionObservers can update independently. Initial
  // render produces null (visible === false), so SSR + first client
  // render match without a separate "mounted" flag — the
  // IntersectionObservers synchronously fire on attach if the
  // anchors are already in/out of view.
  const [pastCalendar, setPastCalendar] = useState(false);
  const [guestbookInView, setGuestbookInView] = useState(false);

  useEffect(() => {
    const calendar = document.getElementById("calendar");
    const guestbook = document.getElementById("guestbook");
    if (!calendar || !guestbook) return;

    // Mark "past calendar" when the calendar's TOP edge has scrolled
    // above the top of the viewport. rootMargin of 0px on the top
    // and large negative bottom flips intersection at the top edge.
    const calObserver = new IntersectionObserver(
      ([entry]) => {
        // Show button when the calendar's top has scrolled out of
        // view (entry.boundingClientRect.top < 0 means scrolled past)
        setPastCalendar(entry.boundingClientRect.top < 0);
      },
      { threshold: [0, 1] },
    );
    calObserver.observe(calendar);

    const guestObserver = new IntersectionObserver(
      ([entry]) => {
        setGuestbookInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    guestObserver.observe(guestbook);

    return () => {
      calObserver.disconnect();
      guestObserver.disconnect();
    };
  }, []);

  const visible = pastCalendar && !guestbookInView;
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        document
          .getElementById("guestbook")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream-50 text-navy-800 text-sm font-medium border border-gold-300 shadow-md hover:shadow-lg hover:bg-cream-100 hover:border-gold-400 transition-all"
      aria-label="Jump to encouragement wall"
    >
      <MessageCircleHeart className="w-4 h-4 text-gold-600" />
      <span className="hidden sm:inline">Encouragement</span>
    </button>
  );
}
