// Skeleton for /browse — mirrors the public train list grid.

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse">
        <div className="mb-8">
          <div className="h-9 w-72 rounded-md bg-cream-200 mb-3" />
          <div className="h-5 w-96 rounded-md bg-cream-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-5 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-cream-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded-md bg-cream-200" />
                  <div className="h-3 w-20 rounded-md bg-cream-200" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded-md bg-cream-200" />
                <div className="h-3 w-5/6 rounded-md bg-cream-200" />
                <div className="h-3 w-2/3 rounded-md bg-cream-200" />
              </div>
              <div className="h-2 w-full rounded-full bg-cream-200" />
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 rounded-md bg-cream-200" />
                <div className="h-3 w-20 rounded-md bg-cream-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
