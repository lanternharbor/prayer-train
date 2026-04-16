/**
 * Fire a Umami custom event. No-op if the Umami tracker hasn't loaded yet
 * (e.g. blocked by a user's content blocker, or during SSR).
 *
 * Canonical events (keep this list in sync with the privacy policy):
 *   - train_created     — a new prayer train was successfully created
 *   - slot_committed    — a volunteer claimed a prayer slot
 *   - guestbook_posted  — a guestbook entry was posted
 *   - signin_completed  — a user's first session load after signing in
 */
export function track(
  event: string,
  data?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const umami = (
    window as unknown as {
      umami?: {
        track: (
          event: string,
          data?: Record<string, string | number | boolean>,
        ) => void;
      };
    }
  ).umami;
  umami?.track(event, data);
}
