"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires a `signin_completed` event exactly once per browser session after the
 * user lands on the dashboard with an established session. Using sessionStorage
 * (not localStorage) ensures a fresh event on each new sign-in while keeping
 * dashboard reloads within the same session from double-counting.
 *
 * This captures magic-link, Google, and Apple sign-in flows uniformly, since
 * all three converge on the dashboard as the default callbackUrl.
 */
export function SignInCompleteBeacon() {
  useEffect(() => {
    const KEY = "pt:signin_tracked";
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    track("signin_completed");
  }, []);
  return null;
}
