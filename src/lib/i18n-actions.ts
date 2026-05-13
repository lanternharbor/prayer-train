"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

/**
 * Server action backing the LocaleSwitcher. Writes NEXT_LOCALE to a
 * year-long cookie and revalidates the current path so all server-
 * rendered content re-renders in the new locale on the next paint.
 *
 * Defensive: silently no-ops when the requested locale isn't supported
 * (rather than throwing) so a malicious / stale client form can't
 * break the page. The dictionary loader has its own fallback layer.
 */
export async function setLocale(locale: string, pathname: string) {
  if (!isLocale(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    // One year. The cookie is a UX preference, not security-sensitive,
    // so a long TTL is fine. Matches next-intl's recommended default.
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    // No `secure: true` — let it work over localhost for dev. In prod,
    // every request is HTTPS anyway via HSTS.
    httpOnly: false,
  });

  // Revalidate the user's current path so server components re-render
  // in the new locale. We pass the pathname from the client so this
  // works regardless of where the switcher was clicked. Falls back to
  // root if the caller didn't supply one.
  revalidatePath(pathname || "/");
}
