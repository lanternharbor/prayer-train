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

// Format a date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateLong(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
