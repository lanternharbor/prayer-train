"use client";

/**
 * Root client-side provider wrapper.
 *
 * Wraps anything that needs `useSession()` from next-auth/react.
 * Sits inside the server-component layout so the layout itself
 * stays static — auth state is now hydrated on the client rather
 * than read via `await auth()` on every render.
 *
 * Why this matters: a server-side `auth()` call (or any cookie
 * read) puts the route into dynamic-rendering mode and disables
 * Vercel's CDN caching. The whole site went origin-only because
 * `<Header>` called `await auth()` to switch its sign-in / dashboard
 * links. Moving that read to the client (via useSession in
 * Header.client.tsx) lets the public layout serve from the CDN
 * with `s-maxage=300, stale-while-revalidate=...`.
 *
 * Trade-off: signed-in users may see the "Sign In" link briefly
 * before the client hydrates the session and switches to "Dashboard".
 * Most public-page traffic is NOT signed in (visitors arriving from
 * shared links), so this flicker affects a small minority and is
 * worth the cache win.
 */

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
