import Image from "next/image";
import { getSaintArt } from "@/lib/saint-art";

/**
 * Renders a circular framed portrait of the patron saint, when one exists in
 * `src/lib/saint-art.ts`. For prayers without a curated portrait, renders
 * nothing — purely additive, never breaks layout.
 *
 * Visual register intentionally evokes a Catholic holy card:
 *   - Circular crop (universal devotional motif)
 *   - Thin gold ring (matching the brand accent)
 *   - Artist credit underneath in muted italic, like a museum caption
 */
export function SaintPortrait({
  patronSaint,
}: {
  patronSaint: string | null | undefined;
}) {
  const art = getSaintArt(patronSaint);
  if (!art) return null;

  return (
    <figure className="flex flex-col items-center sm:items-start sm:flex-row sm:gap-4">
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-2 ring-gold-400 ring-offset-4 ring-offset-card overflow-hidden">
        <Image
          src={art.imagePath}
          alt={art.alt}
          fill
          sizes="(min-width: 640px) 112px, 96px"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 sm:mt-0 sm:self-end text-xs text-muted-foreground italic text-center sm:text-left max-w-[12rem]">
        {art.artist}
      </figcaption>
    </figure>
  );
}
