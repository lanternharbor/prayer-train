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
      from: "PrayerTrains <noreply@prayertrains.com>",
    }),
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(process.env.APPLE_ID
      ? [
          Apple({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET!,
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
