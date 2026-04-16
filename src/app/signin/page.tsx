import type { Metadata } from "next";
import Image from "next/image";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to PrayerTrain to create prayer trains and manage your prayer commitments.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="PrayerTrain"
            width={200}
            height={200}
            className="w-40 h-auto object-contain mx-auto mb-6"
          />
          <h1 className="font-heading text-3xl font-bold text-navy-800 mb-2">
            Welcome to PrayerTrain
          </h1>
          <p className="text-muted-foreground">
            Sign in to create prayer trains and manage your commitments
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            There was an error signing in. Please try again.
          </div>
        )}

        <div className="prayer-card">
          <SignInForm
            callbackUrl={callbackUrl}
            googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID)}
            // Apple sign-in is intentionally disabled even though APPLE_ID
            // is configured in production — the Auth.js callback handler
            // fails in a way we can't observe. See src/lib/auth.ts for
            // the full notes.
            appleEnabled={false}
          />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          No account needed for claiming prayer slots &mdash; you can sign up
          for prayers with just your name and email.
        </p>
      </div>
    </div>
  );
}
