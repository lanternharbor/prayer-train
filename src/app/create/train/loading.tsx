// Skeleton for /create — mirrors the wizard layout: top progress-step
// indicator, a prayer-card with heading + two input placeholders, and
// bottom nav buttons. Users hit auth + prayer-types fetches before this
// renders, so the skeleton reduces the blank-screen window on cold
// loads.

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="animate-pulse">
        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-10">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cream-200" />
              {s < 3 && <div className="w-12 sm:w-20 h-0.5 bg-cream-200" />}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="prayer-card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cream-200" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-3/5 rounded-md bg-cream-200" />
              <div className="h-4 w-4/5 rounded-md bg-cream-200" />
            </div>
          </div>

          {/* Two input rows */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-28 rounded-md bg-cream-200" />
              <div className="h-11 w-full rounded-lg bg-cream-200" />
            </div>
          ))}

          {/* A wider textarea-like placeholder */}
          <div className="space-y-2">
            <div className="h-4 w-32 rounded-md bg-cream-200" />
            <div className="h-24 w-full rounded-lg bg-cream-200" />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex justify-between mt-8">
          <div className="h-10 w-24 rounded-lg bg-cream-200" />
          <div className="h-10 w-28 rounded-lg bg-cream-200" />
        </div>
      </div>
    </div>
  );
}
