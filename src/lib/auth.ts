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
    // TEMP: log everything we see during sign-in to figure out where the
    // Apple callback is failing. Returns true unconditionally — i.e., it
    // does not block sign-in. Remove once Apple is confirmed working.
    async signIn({ user, account, profile }) {
      try {
        console.error("[auth-debug][signIn-callback]", JSON.stringify({
          provider: account?.provider,
          providerType: account?.type,
          providerAccountId: account?.providerAccountId,
          userId: user?.id ?? null,
          userEmail: user?.email ?? null,
          userName: user?.name ?? null,
          profileSub: (profile as { sub?: string } | null | undefined)?.sub ?? null,
          profileEmail: (profile as { email?: string } | null | undefined)?.email ?? null,
          accountFields: account ? Object.keys(account) : null,
        }).slice(0, 1500));
      } catch (e) {
        console.error("[auth-debug][signIn-callback] (failed to serialize)", e);
      }
      return true;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Verbose logging to surface the underlying error from CallbackRouteError
  // wrappers. The Auth.js convention is that the *real* error lives at
  // error.cause.err — we follow the same pattern as Auth.js's default
  // logger (see node_modules/@auth/core/src/lib/utils/logger.ts) but
  // print the inner error name, message, AND the first chunk of stack
  // so we can see where it actually originated.
  // Each section is wrapped in try/catch so a single serialization failure
  // can never silence the whole logger.
  // Remove this once Apple sign-in is confirmed working.
  logger: {
    error(error) {
      try {
        const name = (error as { type?: string }).type ?? error?.name ?? "Error";
        console.error(`[auth-debug][error] ${name}: ${error?.message ?? "(no message)"}`);
      } catch {
        console.error("[auth-debug][error] (failed to print error.name/message)");
      }

      // Auth.js wraps the underlying error as cause.err, with extra
      // contextual fields alongside it.
      const cause = (error as { cause?: { err?: unknown; [k: string]: unknown } })
        ?.cause;
      if (cause && typeof cause === "object" && "err" in cause) {
        const inner = (cause as { err?: unknown }).err;
        if (inner instanceof Error) {
          try {
            console.error(
              `[auth-debug][cause] ${inner.name}: ${inner.message}`
            );
          } catch {
            console.error("[auth-debug][cause] (failed to print inner)");
          }
          try {
            const stackHead = inner.stack
              ?.split("\n")
              .slice(0, 8)
              .join(" || ");
            if (stackHead) console.error(`[auth-debug][stack] ${stackHead}`);
          } catch {
            console.error("[auth-debug][stack] (failed to print stack)");
          }
        } else {
          try {
            console.error("[auth-debug][cause-raw]", String(inner));
          } catch {
            console.error("[auth-debug][cause-raw] (unprintable)");
          }
        }
        // Print any additional context fields on cause (providerId, etc.)
        try {
          const { err: _omit, ...extra } = cause as Record<string, unknown> & {
            err?: unknown;
          };
          if (Object.keys(extra).length > 0) {
            console.error(
              "[auth-debug][details]",
              JSON.stringify(extra).slice(0, 800)
            );
          }
        } catch {
          console.error("[auth-debug][details] (failed to print)");
        }
      }
    },
    warn(code) {
      console.warn("[auth-debug][warn]", code);
    },
    debug(code, metadata) {
      try {
        console.log(
          "[auth-debug][debug]",
          code,
          metadata ? JSON.stringify(metadata).slice(0, 500) : ""
        );
      } catch {
        console.log("[auth-debug][debug]", code, "(metadata unprintable)");
      }
    },
  },
  debug: true,
});
