import Link from "next/link";
import { CrossIcon } from "@/components/ui/catholic-icons";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-6">
          <CrossIcon className="w-8 h-8 text-gold-500" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          We couldn&apos;t find the page you were looking for. It may have been
          removed, or the link may be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Search className="w-4 h-4" />
            Find a PrayerTrain
          </Link>
        </div>
      </div>
    </div>
  );
}
