"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Inline expandable-text block for long user-authored content
 * (intention text, custom prayer). When the body is shorter than
 * `threshold` characters the whole thing is rendered as-is — no
 * toggle. When longer, the body is truncated to a roughly-natural
 * word boundary and a "Read more" link expands it inline.
 *
 * Why a client component for what feels like a CSS problem: we want
 * to truncate at character boundaries, not pixel/line boundaries.
 * That keeps the cutoff predictable across viewports and respects
 * the organizer's word breaks. CSS `line-clamp` would have made the
 * truncation responsive but unpredictable.
 *
 * Threshold defaults to 400 chars. Tune at the call site if a
 * particular surface wants tighter or looser cutoffs.
 */
export function ExpandableText({
  text,
  threshold = 400,
  className = "",
  truncatedClassName,
}: {
  text: string;
  threshold?: number;
  /** Applied to the surrounding paragraph in both states. */
  className?: string;
  /**
   * Optional override applied only to the truncated paragraph (e.g.
   * to soften the color or italicize when collapsed). Falls back to
   * `className` when omitted.
   */
  truncatedClassName?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  // Short content renders as a plain paragraph with no toggle. Keeps
  // the common case identical to the pre-existing behavior.
  if (text.length <= threshold) {
    return <p className={`whitespace-pre-line ${className}`}>{text}</p>;
  }

  // Truncate at the last word boundary inside the threshold so we
  // never clip a word in half. Falls back to a hard slice if the
  // first `threshold` characters contain no whitespace at all.
  const slice = text.slice(0, threshold);
  const lastSpace = slice.lastIndexOf(" ");
  const truncated =
    (lastSpace > threshold * 0.7 ? slice.slice(0, lastSpace) : slice) + "…";

  return (
    <div>
      <p
        className={`whitespace-pre-line ${
          expanded ? className : (truncatedClassName ?? className)
        }`}
      >
        {expanded ? text : truncated}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-gold-700 hover:text-gold-800 transition-colors"
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            Show less
            <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Read more
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
