import { auth } from "./auth";

// Hard-coded admin allowlist. Lives in code (not env) because the only
// admin today is William and the set rarely changes; promoting a new
// admin is a deliberate code-review-worthy event. Comparison is
// lowercase-only to defang case differences between identity providers
// (Google may return mixed case for the local-part, magic-link is
// always lowercase).
const ADMIN_EMAILS: ReadonlySet<string> = new Set([
  "wkeough@gmail.com",
  "william@lanternharbor.co",
]);

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
}
