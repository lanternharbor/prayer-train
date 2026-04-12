import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { prisma } from "./db";
import { sendSignInEmail } from "./email";

// NOTE: Sign in with Apple is intentionally disabled.
//
// We had it wired end-to-end (Service ID configured in Apple Developer,
// JWT client secret in APPLE_SECRET, return URLs registered for both
// www and non-www prayertrains.com) and the OAuth round-trip with Apple
// itself completed successfully — the user got to Apple's native sheet,
// authenticated with Face ID, and Apple POSTed the auth code back to
// /api/auth/callback/apple.
//
// But the Auth.js callback handler then errored in a way that bypassed
// every observability hook we tried to add: a custom logger.error
// implementation, a signIn callback, and even a try/catch wrapper
// around the entire route handler all failed to surface the underlying
// cause. The handler returned a 302 to /api/auth/error with no log
// line at all from any of our hooks. We confirmed:
//
//   - APPLE_ID and APPLE_SECRET have no trailing whitespace
//   - APPLE_SECRET is a valid ES256 JWT (decoded payload, exp 175 days
//     out, issuer = team ID, subject = service ID, audience = apple)
//   - Apple Developer console has both prayertrains.com and
//     www.prayertrains.com registered as Domains and as Return URLs
//   - allowDangerousEmailAccountLinking is set so a pre-existing user
//     row from magic-link sign-in won't block the Account merge
//
// Because the failure is upstream of every Auth.js hook we have, the
// next debugging step would be to clone @auth/core and instrument the
// internal callback handler directly — out of scope for now. Magic-
// link sign-in via Resend works fine, so we leave Apple disabled until
// we have time to dig in fresh. To re-enable: import Apple from
// "next-auth/providers/apple" and re-add the conditional block below.
//
// import Apple from "next-auth/providers/apple";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "PrayerTrain <noreply@ourfaithtrain.com>",
      async sendVerificationRequest({ identifier: to, url, provider }) {
        await sendSignInEmail({
          to,
          url,
          from: provider.from ?? "PrayerTrain <noreply@ourfaithtrain.com>",
        });
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            // Google verifies email ownership before issuing the JWT, so it
            // is safe to merge a Google sign-in into an existing User row
            // that was previously created via magic-link sign-in with the
            // same email address. Without this, Auth.js throws
            // OAuthAccountNotLinked / CallbackRouteError.
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/signin",
    verifyRequest: "/signin/verify",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
