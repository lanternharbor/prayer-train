"use client";

import { useEffect, useState } from "react";
import { Share2, Copy, Check, QrCode, X, MessageCircle, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Share affordance for the "pray together" PrayerTrain detail page.
 *
 * Mirrors src/app/[locale]/p/[slug]/share-button.tsx (the calendar share
 * button) so the sharing UX is identical across formats — copy link,
 * native share on mobile, scannable QR code modal, WhatsApp + Email
 * deep-share buttons. Copy and URL paths are specific to the
 * /chain/[slug] route group, even though both formats are PrayerTrain
 * under the umbrella branding.
 *
 * The share text composition still embeds the organizer's first name +
 * recipient phrase when not anonymous. That dynamic string is rendered
 * in English regardless of locale for now — i18n-ing the share text
 * itself requires placeholder-format strings in the dictionary
 * (`{organizerFirstName}`, `{recipientPhrase}`) and a follow-up pass.
 * The static chrome (heading, button labels, modal copy, hints) is
 * fully localized via the `t` prop below.
 */
export function ChainShareButton({
  slug,
  organizerFirstName,
  recipientPhrase,
  isAnonymous = false,
  t,
}: {
  slug: string;
  organizerFirstName: string;
  recipientPhrase: string;
  /** When true, the organizer chose anonymity. Drops "with [name]"
   *  from the native-share sheet text so it doesn't read "with the
   *  organizer" in iMessage / link unfurls. */
  isAnonymous?: boolean;
  t: Dictionary["chainShareButton"];
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

  const shareText = isAnonymous
    ? `Pray along ${recipientPhrase}:`
    : `Pray along with ${organizerFirstName} ${recipientPhrase}:`;

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

  // Deep-share URLs. Mobile launches the platform's app; desktop opens
  // the platform's web share dialog in a new tab.
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`;

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
        <div className="flex gap-2 shrink-0 flex-wrap sm:flex-nowrap">
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
            className="flex items-center gap-2 px-3 py-2 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title={t.whatsapp}
            aria-label={t.whatsapp}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.whatsapp}</span>
          </a>

          {/* Email */}
          <a
            href={emailUrl}
            className="flex items-center gap-2 px-3 py-2 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title={t.email}
            aria-label={t.email}
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{t.email}</span>
          </a>

          <button
            onClick={handleShowQr}
            className="flex items-center gap-2 px-3 py-2 border border-navy-200 text-navy-700 text-sm font-medium rounded-lg hover:bg-cream-100 transition-colors"
            title={t.qrCodeTitle}
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">{t.qrCode}</span>
          </button>
        </div>
      </div>

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
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
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
                href={`/api/qr/chain/${slug}`}
                download={`prayertrain-prayer-${slug}-qr.svg`}
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
