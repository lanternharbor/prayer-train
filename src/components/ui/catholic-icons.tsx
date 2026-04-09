// Elegant, subtle Catholic SVG icons for PrayerTrain
// Each accepts className for sizing and color via Tailwind

interface IconProps {
  className?: string;
}

export function CrossIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="5" y1="8" x2="19" y2="8" />
    </svg>
  );
}

export function SacredHeartIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Heart shape */}
      <path d="M12 21C12 21 4 15 4 9.5C4 6.46 6.46 4 9.5 4C10.95 4 12 5 12 5C12 5 13.05 4 14.5 4C17.54 4 20 6.46 20 9.5C20 15 12 21 12 21Z" />
      {/* Small cross on top */}
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="10.5" y1="3.5" x2="13.5" y2="3.5" />
      {/* Small flame */}
      <path d="M12 8C12 8 13.5 9.5 13.5 10.5C13.5 11.33 12.83 12 12 12C11.17 12 10.5 11.33 10.5 10.5C10.5 9.5 12 8 12 8Z" />
    </svg>
  );
}

export function DoveIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 10C12 10 8 6 4 7C4 7 5 11 9 12L5 18" />
      <path d="M12 10C12 10 16 6 20 7C20 7 19 11 15 12L19 18" />
      <path d="M9 12L12 14L15 12" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

export function ChaliceIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Cup */}
      <path d="M7 3H17V8C17 11.31 14.76 13 12 13C9.24 13 7 11.31 7 8V3Z" />
      {/* Stem */}
      <line x1="12" y1="13" x2="12" y2="18" />
      {/* Base */}
      <path d="M8 21H16C16 21 15 18 12 18C9 18 8 21 8 21Z" />
      {/* Small cross above */}
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="11" y1="2" x2="13" y2="2" />
    </svg>
  );
}

export function PrayingHandsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Left hand */}
      <path d="M10 4L8 12L6 15L8 17" />
      <path d="M10 4L10 10" />
      {/* Right hand */}
      <path d="M14 4L16 12L18 15L16 17" />
      <path d="M14 4L14 10" />
      {/* Fingertips together */}
      <path d="M10 4C10 4 11 3 12 3C13 3 14 4 14 4" />
      {/* Rosary bead suggestion */}
      <circle cx="12" cy="19" r="1" />
      <line x1="12" y1="17" x2="12" y2="18" />
      <line x1="12" y1="20" x2="12" y2="22" />
    </svg>
  );
}

export function CandleIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Flame */}
      <path d="M12 3C12 3 14 5 14 7C14 8.1 13.1 9 12 9C10.9 9 10 8.1 10 7C10 5 12 3 12 3Z" />
      {/* Candle body */}
      <rect x="10" y="9" width="4" height="11" rx="0.5" />
      {/* Base */}
      <path d="M8 20H16V21C16 21.55 15.55 22 15 22H9C8.45 22 8 21.55 8 21V20Z" />
      {/* Drip */}
      <path d="M10 12C10 12 9.5 13 10 14" />
    </svg>
  );
}

export function RosaryIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Bead loop (top) */}
      <circle cx="12" cy="8" r="6" />
      {/* Beads around the loop */}
      <circle cx="12" cy="2" r="0.8" fill="currentColor" />
      <circle cx="17" cy="5" r="0.8" fill="currentColor" />
      <circle cx="18" cy="8" r="0.8" fill="currentColor" />
      <circle cx="17" cy="11" r="0.8" fill="currentColor" />
      <circle cx="7" cy="11" r="0.8" fill="currentColor" />
      <circle cx="6" cy="8" r="0.8" fill="currentColor" />
      <circle cx="7" cy="5" r="0.8" fill="currentColor" />
      {/* Hanging chain */}
      <line x1="12" y1="14" x2="12" y2="18" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
      {/* Cross at bottom */}
      <line x1="12" y1="18" x2="12" y2="23" />
      <line x1="10" y1="20" x2="14" y2="20" />
    </svg>
  );
}

export function MarianStarIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L14.4 8.8L21.6 9.2L16 14L17.8 21L12 17.4L6.2 21L8 14L2.4 9.2L9.6 8.8L12 2Z" />
      {/* Inner letter M for Mary */}
      <path d="M9 14L10.5 10L12 13L13.5 10L15 14" />
    </svg>
  );
}

// Decorative cross divider component
export function CrossDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 my-8 ${className}`}
      role="separator"
    >
      <div className="flex-1 h-px bg-border" />
      <CrossIcon className="w-4 h-4 text-gold-400" />
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

// Recipient photo with initials fallback
export function RecipientAvatar({
  imageUrl,
  name,
  size = "md",
}: {
  imageUrl?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl",
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`Photo of ${name}`}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gold-200 shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-navy-100 flex items-center justify-center border-2 border-gold-200 shadow-sm`}
    >
      <span className="font-heading font-semibold text-navy-600">
        {initials}
      </span>
    </div>
  );
}
