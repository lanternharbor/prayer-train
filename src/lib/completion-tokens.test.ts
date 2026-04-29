import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  signCompletionToken,
  verifyCompletionToken,
} from "./completion-tokens";

/**
 * HMAC-signed completion tokens are the trust boundary for one-click
 * email completion ("I prayed today" buttons in daily reminder
 * emails). These tests pin the contract so a future refactor can't
 * silently let stale or forged tokens through.
 *
 * `CRON_SECRET` is set per-test rather than in beforeAll so we can
 * exercise the rotated-secret rejection path.
 */

const TEST_SECRET = "test-secret-for-tokens";

beforeEach(() => {
  process.env.CRON_SECRET = TEST_SECRET;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("signCompletionToken / verifyCompletionToken", () => {
  it("a freshly signed slot token verifies", () => {
    const token = signCompletionToken("slot", "slot_abc");
    expect(verifyCompletionToken("slot", "slot_abc", token)).toBe(true);
  });

  it("a token signed for a different slot id fails verification", () => {
    const token = signCompletionToken("slot", "slot_abc");
    expect(verifyCompletionToken("slot", "slot_xyz", token)).toBe(false);
  });

  it("a slot token cannot be replayed as a chain-day token", () => {
    // The token kind is part of the HMAC payload, so a token minted
    // for one primitive must not validate against the other.
    const token = signCompletionToken("slot", "shared_id");
    expect(verifyCompletionToken("chain-day", "shared_id", token)).toBe(false);
  });

  it("a chain-day token cannot be replayed as a slot token", () => {
    const token = signCompletionToken("chain-day", "shared_id");
    expect(verifyCompletionToken("slot", "shared_id", token)).toBe(false);
  });

  it("a token signed under a different secret fails verification", () => {
    const token = signCompletionToken("slot", "slot_abc");
    process.env.CRON_SECRET = "different-secret";
    expect(verifyCompletionToken("slot", "slot_abc", token)).toBe(false);
  });

  it("a tampered signature fails verification", () => {
    const token = signCompletionToken("slot", "slot_abc");
    // Flip a character in the signature half (after the dot).
    const [expiry, sig] = token.split(".");
    const tampered = `${expiry}.${sig.replace(/[A-Za-z]/, (c) =>
      c === "A" ? "B" : "A",
    )}`;
    expect(verifyCompletionToken("slot", "slot_abc", tampered)).toBe(false);
  });

  it("an expired token is rejected", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const token = signCompletionToken("slot", "slot_abc", 60_000); // 60s TTL
    // Advance past expiry.
    vi.setSystemTime(new Date("2026-01-01T00:01:01Z"));
    expect(verifyCompletionToken("slot", "slot_abc", token)).toBe(false);
  });

  it("a token still within its TTL verifies", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const token = signCompletionToken("slot", "slot_abc", 60_000);
    vi.setSystemTime(new Date("2026-01-01T00:00:30Z"));
    expect(verifyCompletionToken("slot", "slot_abc", token)).toBe(true);
  });

  it("malformed token strings fail without throwing", () => {
    expect(verifyCompletionToken("slot", "slot_abc", "")).toBe(false);
    expect(verifyCompletionToken("slot", "slot_abc", "no-dot-separator")).toBe(
      false,
    );
    expect(verifyCompletionToken("slot", "slot_abc", "abc.def")).toBe(false);
    expect(
      verifyCompletionToken("slot", "slot_abc", "not-a-number.signaturehere"),
    ).toBe(false);
  });

  it("signing without CRON_SECRET throws", () => {
    delete process.env.CRON_SECRET;
    expect(() => signCompletionToken("slot", "slot_abc")).toThrow(
      /CRON_SECRET/,
    );
  });
});
