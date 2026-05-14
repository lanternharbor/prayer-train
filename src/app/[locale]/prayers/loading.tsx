// Skeleton for /prayers — mirrors the prayer library index: header, filter
// chip row, and two-to-three category groups each with a 3-column grid of
// prayer cards.

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-10">
          <div className="h-10 w-64 rounded-md bg-cream-200 mb-3" />
          <div className="h-5 w-full max-w-xl rounded-md bg-cream-200 mb-1" />
          <div className="h-5 w-3/4 max-w-md rounded-md bg-cream-200" />
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-7 w-24 rounded-full bg-cream-200"
            />
          ))}
        </div>

        {/* Category groups */}
        {Array.from({ length: 2 }).map((_, groupIdx) => (
          <div key={groupIdx} className="mb-12">
            <div className="h-7 w-40 rounded-md bg-cream-200 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-5 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-5 w-3/4 rounded-md bg-cream-200" />
                    <div className="h-4 w-4 rounded bg-cream-200 shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded-md bg-cream-200" />
                    <div className="h-3 w-5/6 rounded-md bg-cream-200" />
                    <div className="h-3 w-2/3 rounded-md bg-cream-200" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-3 w-14 rounded-md bg-cream-200" />
                    <div className="h-3 w-20 rounded-md bg-cream-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
