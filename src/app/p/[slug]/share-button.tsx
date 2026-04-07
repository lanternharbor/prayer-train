"use client";

import { useState } from "react";
import { Share2, Copy, Check, QrCode, Download } from "lucide-react";

export function ShareButton({
  slug,
  recipientName,
}: {
  slug: string;
  recipientName: string;
}) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/p/${slug}`
      : `/p/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="prayer-card mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <h3 className="font-heading text-base font-semibold text-navy-800 mb-1 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-gold-500" />
          Share this FaithTrain
        </h3>
        <p className="text-sm text-muted-foreground">
          Invite friends, family, and your parish to sign up for prayer slots.
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Link
            </>
          )}
        </button>
        <a
          href={`/api/qr/${slug}`}
          download={`faithtrain-${slug}-qr.svg`}
          className="flex items-center gap-2 px-4 py-2 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
          title="Download QR code for bulletins or flyers"
        >
          <QrCode className="w-4 h-4" />
          QR Code
        </a>
      </div>
    </div>
  );
}
