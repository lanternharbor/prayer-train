"use client";

// global-error replaces the root layout when active, so it must include
// its own <html> and <body> tags. Per Next 16 docs, metadata exports are
// not supported here — use React's <title> instead.

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          background: "#faf8f5",
          color: "#11152c",
        }}
      >
        <title>Something went wrong | PrayerTrain</title>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Something went very wrong
          </h1>
          <p style={{ color: "#6e6150", marginBottom: "1.5rem" }}>
            We hit a critical error rendering the page. Please try again, and
            if the problem persists let us know.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6e6150",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                marginBottom: "1.5rem",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <button
            onClick={() => unstable_retry()}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#242e58",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
