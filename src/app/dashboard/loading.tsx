// Skeleton for /dashboard — mirrors the organizer/volunteer split.

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className="h-9 w-56 rounded-md bg-cream-200 mb-3" />
          <div className="h-5 w-80 rounded-md bg-cream-200" />
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="h-3 w-24 rounded-md bg-cream-200 mb-3" />
              <div className="h-8 w-16 rounded-md bg-cream-200" />
            </div>
          ))}
        </div>

        {/* Section: trains you organize */}
        <div className="mb-10">
          <div className="h-7 w-56 rounded-md bg-cream-200 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-cream-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-44 rounded-md bg-cream-200" />
                    <div className="h-3 w-28 rounded-md bg-cream-200" />
                  </div>
                </div>
                <div className="h-3 w-16 rounded-md bg-cream-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Section: prayer commitments */}
        <div>
          <div className="h-7 w-64 rounded-md bg-cream-200 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="h-4 w-3/4 rounded-md bg-cream-200 mb-2" />
                <div className="h-3 w-1/2 rounded-md bg-cream-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
