// Loading skeleton for the prayer train detail page. Mirrors the high-level
// shape of page.tsx so the layout doesn't shift when content arrives.

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-5 mb-4">
            <div className="w-20 h-20 rounded-full bg-cream-200 shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-24 rounded-full bg-cream-200" />
                <div className="h-5 w-16 rounded-full bg-cream-200" />
              </div>
              <div className="h-9 w-2/3 rounded-md bg-cream-200" />
              <div className="h-5 w-full rounded-md bg-cream-200" />
              <div className="h-5 w-5/6 rounded-md bg-cream-200" />
              <div className="h-4 w-1/2 rounded-md bg-cream-200" />
            </div>
          </div>
        </div>

        {/* Progress card */}
        <div className="prayer-card mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-40 rounded-md bg-cream-200" />
            <div className="h-5 w-20 rounded-md bg-cream-200" />
          </div>
          <div className="h-3 w-full rounded-full bg-cream-200 mb-3" />
          <div className="flex gap-6">
            <div className="h-4 w-16 rounded-md bg-cream-200" />
            <div className="h-4 w-20 rounded-md bg-cream-200" />
            <div className="h-4 w-24 rounded-md bg-cream-200" />
          </div>
        </div>

        {/* Calendar block */}
        <div className="mb-10">
          <div className="h-7 w-48 rounded-md bg-cream-200 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-cream-200" />
            ))}
          </div>
        </div>

        {/* Two-column footer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-7 w-32 rounded-md bg-cream-200" />
            <div className="h-32 rounded-xl bg-cream-200" />
            <div className="h-32 rounded-xl bg-cream-200" />
          </div>
          <div className="space-y-4">
            <div className="h-7 w-32 rounded-md bg-cream-200" />
            <div className="h-24 rounded-xl bg-cream-200" />
            <div className="h-24 rounded-xl bg-cream-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
