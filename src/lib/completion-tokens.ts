import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * HMAC-signed completion tokens for slot/chain "I prayed today" email
 * links. Stateless — no DB column, no extra round-trip. The secret is
 * the same `CRON_SECRET` we already require for cron auth, so any
 * deployment that runs the daily reminder cron can verify these tokens
 * without additional configuration.
 *
 * Token format: `<expiryMs>.<base64url(hmac)>`
 *
 * - `expiryMs` is a Unix timestamp (ms) past which the token is rejected.
 *   Encoded in plaintext so verification can short-circuit on stale
 *   tokens without computing the HMAC.
 * - `hmac` covers `${kind}:${id}:${expiryMs}`. The `kind` distinguishes
 *   slot tokens from chain tokens so a token minted for one primitive
 *   can't be replayed against the other.
 *
 * Threat model is friendly (parish ministries, older users; the realistic
 * risk is "Aunt Susan accidentally taps a button that wasn't hers," not
 * adversarial tampering). Even so, signing the URL parameters means a
 * forwarded email can be marked complete, but a guessed slot ID with
 * a hand-crafted token can't.
 */

type TokenKind = "slot" | "chain-day";

const SEPARATOR = "."; // not URL-encoded so it's readable in email links

function getSecret(): string {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Fail closed: refuse to mint or verify without a secret rather
    // than producing fake-secure tokens. The daily-reminder cron
    // already requires CRON_SECRET, so any environment that sends
    // emails has it set.
    throw new Error(
      "CRON_SECRET is not set; cannot sign or verify completion tokens.",
    );
  }
  return secret;
}

function base64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(s: string): Buffer {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + "=".repeat(padding), "base64");
}

function compute(kind: TokenKind, id: string, expiryMs: number): string {
  const payload = `${kind}:${id}:${expiryMs}`;
  const h = createHmac("sha256", getSecret()).update(payload).digest();
  return base64url(h);
}

/**
 * Sign a token for the given slot/chain-day with a fixed expiry from
 * `now`. Default 14 days — long enough that a recipient can click a
 * forwarded reminder a week or two later, short enough that a stolen
 * email archive from a year ago can't be replayed.
 */
export function signCompletionToken(
  kind: TokenKind,
  id: string,
  ttlMs: number = 14 * 24 * 60 * 60 * 1000,
): string {
  const expiryMs = Date.now() + ttlMs;
  const sig = compute(kind, id, expiryMs);
  return `${expiryMs}${SEPARATOR}${sig}`;
}

/**
 * Compose the id portion of a chain-day token so the day number is
 * cryptographically bound to the token, not just a query-string
 * parameter the user can edit.
 *
 * Without this, a member receiving a day-3 reminder could change
 * `?day=3` to `?day=90` on the completion link and the token would
 * still verify (it only signed the memberId). The day cap in
 * markChainDayCompleteByToken caps the value at 365, but a member
 * could still claim credit for days they hadn't prayed yet.
 *
 * Both the cron mint and the action-level verify call go through
 * this helper so they can't drift apart.
 */
export function chainDayTokenId(memberId: string, day: number): string {
  return `${memberId}:${day}`;
}

/**
 * Verify a token. Returns `true` if the signature matches and the
 * expiry hasn't passed. Returns `false` on any malformed or stale
 * input — never throws on user-supplied data.
 */
export function verifyCompletionToken(
  kind: TokenKind,
  id: string,
  token: string,
): boolean {
  if (!token || typeof token !== "string") return false;
  const [expiryStr, sig] = token.split(SEPARATOR);
  if (!expiryStr || !sig) return false;

  const expiryMs = Number(expiryStr);
  if (!Number.isFinite(expiryMs)) return false;
  if (Date.now() > expiryMs) return false;

  const expected = compute(kind, id, expiryMs);
  const a = fromBase64url(sig);
  const b = fromBase64url(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
