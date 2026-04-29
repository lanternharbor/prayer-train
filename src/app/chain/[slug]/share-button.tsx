"use client";

import { useEffect, useState } from "react";
import { Share2, Copy, Check, QrCode, X } from "lucide-react";

/**
 * Share affordance for the "pray together" PrayerTrain detail page.
 *
 * Mirrors src/app/p/[slug]/share-button.tsx (the calendar share button) so
 * the sharing UX is identical across formats — copy link, native share on
 * mobile, scannable QR code modal. Copy and URL paths are specific to the
 * /chain/[slug] route group, even though both formats are PrayerTrain
 * under the umbrella branding.
 */
export function ChainShareButton({
  slug,
  organizerFirstName,
  recipientPhrase,
}: {
  slug: string;
  organizerFirstName: string;
  recipientPhrase: string;
}) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const canNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/chain/${slug}`
      : `/chain/${slug}`;

  const shareText = `Pray along with ${organizerFirstName} ${recipientPhrase}:`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "PrayerTrain",
        text: shareText,
        url,
      });
    } catch {
      handleCopy();
    }
  };

  const handleShowQr = async () => {
    setShowQr(true);
    if (!qrSvg) {
      try {
        const res = await fetch(`/api/qr/chain/${slug}`);
        const svg = await res.text();
        setQrSvg(svg);
      } catch {
        setQrSvg(null);
      }
    }
  };

  useEffect(() => {
    if (!showQr) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowQr(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showQr]);

  return (
    <>
      <div className="prayer-card mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-heading text-base font-semibold text-navy-800 mb-1 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-gold-500" />
            Share this prayer
          </h3>
          <p className="text-sm text-muted-foreground">
            Invite friends, family, and your parish to pray along with you.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={canNativeShare ? handleNativeShare : handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : canNativeShare ? (
              <>
                <Share2 className="w-4 h-4" />
                Share
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>

          <button
            onClick={handleShowQr}
            className="flex items-center gap-2 px-4 py-2 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title="Show QR code"
          >
            <QrCode className="w-4 h-4" />
            QR Code
          </button>
        </div>
      </div>

      {showQr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="QR code for sharing this prayer"
          onClick={() => setShowQr(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-lg font-semibold text-navy-800 text-center mb-1">
              Scan to pray along
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-5">
              Point a phone camera at this code to join this prayer.
            </p>

            <div className="flex justify-center mb-5">
              {qrSvg ? (
                <div
                  className="w-56 h-56 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div className="w-56 h-56 bg-cream-100 rounded-xl animate-pulse" />
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center break-all mb-5">
              {url}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
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
                href={`/api/qr/chain/${slug}`}
                download={`prayerchain-${slug}-qr.svg`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
              >
                Save QR
              </a>
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-4">
              Great for parish bulletins, text messages, and group chats.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
