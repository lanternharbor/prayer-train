// Slug generation: "John Smith" -> "john-smith-a3b2"
export function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${suffix}`;
}

// Format situation category for display
export function formatSituation(situation: string): string {
  const map: Record<string, string> = {
    ILLNESS: "Illness & Health",
    SURGERY: "Surgery & Recovery",
    MENTAL_HEALTH: "Mental Health",
    GRIEF: "Grief & Loss",
    PREGNANCY: "Pregnancy & Birth",
    FERTILITY: "Fertility",
    MARRIAGE: "Marriage",
    FAMILY: "Family",
    FINANCIAL: "Financial Hardship",
    CAREER: "Career & Work",
    CONVERSION: "Conversion",
    DISCERNMENT: "Discernment",
    GENERAL: "General Intention",
    OTHER: "Other",
  };
  return map[situation] || situation;
}

// Format prayer category for display
export function formatPrayerCategory(category: string): string {
  const map: Record<string, string> = {
    NOVENA: "Novenas",
    ROSARY: "Rosary",
    CHAPLET: "Chaplets",
    LITANY: "Litanies",
    SHORT_PRAYER: "Short Prayers",
    MASS_SACRAMENTAL: "Mass & Sacramental",
    SCRIPTURE: "Scripture-Based",
    DEVOTION: "Devotions",
    ALL_CHRISTIANS: "Prayers for All Christians",
  };
  return map[category] || category;
}

// Format difficulty for display
export function formatDifficulty(difficulty: string): string {
  const map: Record<string, string> = {
    BEGINNER: "Beginner-Friendly",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  };
  return map[difficulty] || difficulty;
}

// Calculate percentage of slots filled
export function calculateFillRate(
  totalSlots: number,
  claimedSlots: number,
  completedSlots: number
): number {
  if (totalSlots === 0) return 0;
  return Math.round(((claimedSlots + completedSlots) / totalSlots) * 100);
}

// Format a date for display. Slot dates and train start/end dates are
// stored as midnight UTC of the intended calendar day (see
// createPrayerTrain), so we explicitly format in UTC to recover the
// original calendar day regardless of where the runtime lives. Without
// timeZone: "UTC" the runtime's local TZ leaks in — fine on Vercel
// (also UTC) but fragile under any other runtime, and incorrect when
// these helpers run on the client side.
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateLong(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Truncate a string to <= maxChars, preferring a word boundary.
 *
 * Plain `s.slice(0, maxChars)` chops mid-word, producing snippets like
 * "...abandonment to God's wil" — fine for character budget, ugly in
 * a SERP snippet or social-share preview. This helper finds the last
 * whitespace inside the slice, falls back to a hard cut if no
 * boundary is reasonably close (within `lookbackChars` of the cap),
 * and appends a single Unicode ellipsis (U+2026, one char) only when
 * truncation actually happened.
 *
 * Returns the input unchanged if it already fits.
 *
 * Default lookback of 30 chars matches typical word lengths in
 * English; raising it makes the truncation more "courteous" but can
 * trim too aggressively when the input has long mid-string runs of
 * non-whitespace (URLs, code, etc.).
 */
export function smartTruncate(
  s: string,
  maxChars: number,
  lookbackChars = 30,
): string {
  if (s.length <= maxChars) return s;
  // Reserve 1 char for the ellipsis so the rendered output fits the
  // caller-supplied budget exactly. Callers can pass a SERP cap like
  // 160 without doing the math themselves.
  const budget = Math.max(1, maxChars - 1);
  const head = s.slice(0, budget);
  // Search backwards for the last whitespace within the lookback
  // window. /\s/ catches spaces, tabs, and newlines.
  const windowStart = Math.max(0, budget - lookbackChars);
  for (let i = budget - 1; i >= windowStart; i--) {
    if (/\s/.test(head[i])) {
      // Trim trailing whitespace + punctuation that would read poorly
      // immediately before an ellipsis (commas, semicolons, periods).
      return head.slice(0, i).replace(/[\s,.;:]+$/, "") + "…";
    }
  }
  // No whitespace in the lookback window — fall back to a hard cut.
  return head + "…";
}
