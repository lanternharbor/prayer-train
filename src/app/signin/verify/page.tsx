import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Check Your Email",
  alternates: { canonical: "/signin/verify" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function VerifyPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const t = dict.signin;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="prayer-card py-10">
          <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-gold-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-800 mb-3">
            {t.verifyTitle}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {t.verifyBody}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {t.verifyExpiry}
          </p>
        </div>
      </div>
    </div>
  );
}
