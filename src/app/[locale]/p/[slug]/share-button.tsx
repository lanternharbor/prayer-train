"use client";

import { useEffect, useState } from "react";
import { Share2, Copy, Check, QrCode, X, MessageCircle, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

export function ShareButton({
  slug,
  t,
}: {
  slug: string;
  recipientName: string;
  t: Dictionary["shareButton"];
}) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const canNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/p/${slug}`
      : `/p/${slug}`;

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
        text: t.nativeShareText,
        url,
      });
    } catch {
      // User cancelled or share failed — fall back to copy
      handleCopy();
    }
  };

  const handleShowQr = async () => {
    setShowQr(true);
    if (!qrSvg) {
      try {
        const res = await fetch(`/api/qr/${slug}`);
        const svg = await res.text();
        setQrSvg(svg);
      } catch {
        setQrSvg(null);
      }
    }
  };

  // Deep-share URLs to the major messaging surfaces. WhatsApp + Email
  // are direct user-driven shares (no app open dialog on desktop is
  // worse than just letting the user choose the share medium).
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${t.nativeShareText} ${url}`)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(`${t.nativeShareText}\n\n${url}`)}`;

  // Close the QR modal on Escape. Only attach the listener while it's open
  // so we don't intercept Escape when the modal is hidden.
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
            {t.heading}
          </h3>
          <p className="text-sm text-muted-foreground">{t.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {/* Primary share action — native share on mobile, copy on desktop */}
          <button
            onClick={canNativeShare ? handleNativeShare : handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {t.copied}
              </>
            ) : canNativeShare ? (
              <>
                <Share2 className="w-4 h-4" />
                {t.share}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t.copyLink}
              </>
            )}
          </button>

          {/* WhatsApp — opens in new tab on desktop, app on mobile */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2 min-w-11 min-h-11 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title={t.whatsapp}
            aria-label={t.whatsapp}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.whatsapp}</span>
          </a>

          {/* Email */}
          <a
            href={emailUrl}
            className="flex items-center justify-center gap-2 px-3 py-2 min-w-11 min-h-11 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title={t.email}
            aria-label={t.email}
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{t.email}</span>
          </a>

          {/* QR code — opens inline modal */}
          <button
            onClick={handleShowQr}
            className="flex items-center justify-center gap-2 px-3 py-2 min-w-11 min-h-11 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title={t.qrCodeTitle}
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">{t.qrCode}</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t.qrModalAriaLabel}
          onClick={() => setShowQr(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-lg font-semibold text-navy-800 text-center mb-1">
              {t.scanToPray}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-5">
              {t.scanToPrayBody}
            </p>

            {/* QR Code */}
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

            {/* URL */}
            <p className="text-xs text-muted-foreground text-center break-all mb-5">
              {url}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-600 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t.copyLink}
                  </>
                )}
              </button>
              <a
                href={`/api/qr/${slug}`}
                download={`prayertrain-${slug}-qr.svg`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
              >
                {t.saveQR}
              </a>
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-4">
              {t.parishBulletinsHint}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
