import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Your Email",
  alternates: { canonical: "/signin/verify" },
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="prayer-card py-10">
          <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-gold-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-navy-800 mb-3">
            Check your email
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            A sign-in link has been sent to your email address. Click the link
            to complete your sign in.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            The link will expire in 24 hours. If you don&apos;t see it, check
            your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
