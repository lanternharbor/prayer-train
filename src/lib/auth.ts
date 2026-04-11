import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "PrayerTrain <noreply@ourfaithtrain.com>",
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
    ...(process.env.APPLE_ID
      ? [
          Apple({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET!,
            // Same reasoning as Google — Apple verifies email ownership
            // before issuing the JWT. Without this, signing in with Apple
            // using an email that already exists from a magic-link sign-in
            // throws CallbackRouteError on the callback handler.
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
