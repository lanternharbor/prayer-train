// Skeleton for /prayers/[slug] — mirrors the prayer detail page structure:
// back link, category/difficulty pills, title + description, 4-up meta
// cards, instructions card, prayer-text card, and tag row.

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        {/* Back link */}
        <div className="h-4 w-40 rounded-md bg-cream-200 mb-8" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-20 rounded-full bg-cream-200" />
            <div className="h-5 w-24 rounded-full bg-cream-200" />
          </div>
          <div className="h-10 w-3/4 rounded-md bg-cream-200 mb-4" />
          <div className="space-y-2">
            <div className="h-5 w-full rounded-md bg-cream-200" />
            <div className="h-5 w-5/6 rounded-md bg-cream-200" />
          </div>
        </div>

        {/* Meta info 4-up */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="prayer-card text-center py-4 space-y-2"
            >
              <div className="w-5 h-5 rounded bg-cream-200 mx-auto" />
              <div className="h-4 w-16 rounded-md bg-cream-200 mx-auto" />
              <div className="h-3 w-12 rounded-md bg-cream-200 mx-auto" />
            </div>
          ))}
        </div>

        {/* Instructions card */}
        <div className="prayer-card mb-8 space-y-3">
          <div className="h-6 w-32 rounded-md bg-cream-200" />
          <div className="h-4 w-full rounded-md bg-cream-200" />
          <div className="h-4 w-11/12 rounded-md bg-cream-200" />
          <div className="h-4 w-10/12 rounded-md bg-cream-200" />
          <div className="h-4 w-3/4 rounded-md bg-cream-200" />
        </div>

        {/* Prayer text card */}
        <div className="prayer-card bg-cream-50 border-cream-300 mb-8 space-y-3">
          <div className="h-6 w-28 rounded-md bg-cream-200" />
          <div className="bg-white rounded-lg p-6 border border-cream-300 space-y-2">
            <div className="h-5 w-full rounded-md bg-cream-200" />
            <div className="h-5 w-11/12 rounded-md bg-cream-200" />
            <div className="h-5 w-5/6 rounded-md bg-cream-200" />
          </div>
        </div>

        {/* Situation tags */}
        <div className="mb-8">
          <div className="h-5 w-36 rounded-md bg-cream-200 mb-3" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-24 rounded-full bg-cream-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
