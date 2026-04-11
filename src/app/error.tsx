"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CrossIcon } from "@/components/ui/catholic-icons";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // TODO: wire to Sentry / error reporting once configured
    console.error("Route segment error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-6">
          <CrossIcon className="w-8 h-8 text-gold-500" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-3">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-2">
          We hit an unexpected error rendering this page. The team has been
          notified and your work is safe.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground mb-6 font-mono">
            Reference: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
