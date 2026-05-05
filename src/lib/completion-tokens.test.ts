import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  chainDayTokenId,
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

/**
 * The chain-day token previously signed only the memberId, leaving
 * the `day` query parameter unbound — a member receiving a day-3
 * reminder could edit ?day=3 to ?day=90 and still pass verification.
 * The action's Math.max(lastDayCompleted, day) only moves the counter
 * up, so worst-case a user could claim credit for days they hadn't
 * prayed yet. chainDayTokenId composes (memberId, day) into the
 * signed id; both the cron mint and the action verify go through it.
 *
 * These tests pin the day-binding so a future change can't silently
 * regress to memberId-only signing.
 */
describe("chainDayTokenId day-binding", () => {
  it("composes memberId and day into a stable string", () => {
    expect(chainDayTokenId("mem_abc", 3)).toBe("mem_abc:3");
    expect(chainDayTokenId("mem_xyz", 90)).toBe("mem_xyz:90");
  });

  it("a token signed for (member, day=1) verifies for (member, day=1)", () => {
    const id = chainDayTokenId("mem_abc", 1);
    const token = signCompletionToken("chain-day", id);
    expect(
      verifyCompletionToken("chain-day", chainDayTokenId("mem_abc", 1), token),
    ).toBe(true);
  });

  it("a token signed for (member, day=3) FAILS verification when day is tampered to 90", () => {
    // The exploit case: an attacker (or a curious user) edits the
    // ?day=3 query parameter to ?day=90 to claim credit for days
    // they didn't pray. With day bound into the signed id, the
    // composite no longer matches and verification fails.
    const id = chainDayTokenId("mem_abc", 3);
    const token = signCompletionToken("chain-day", id);
    expect(
      verifyCompletionToken("chain-day", chainDayTokenId("mem_abc", 90), token),
    ).toBe(false);
  });

  it("a token signed for (memberA, day=3) does not verify for (memberB, day=3)", () => {
    // memberId binding is preserved.
    const tokenA = signCompletionToken("chain-day", chainDayTokenId("mem_a", 3));
    expect(
      verifyCompletionToken("chain-day", chainDayTokenId("mem_b", 3), tokenA),
    ).toBe(false);
  });

  it("a memberId-only chain-day token (legacy format) does not verify under the new composite scheme", () => {
    // Defense against accidental rollback: if a cron run somewhere
    // still mints `signCompletionToken("chain-day", member.id)`
    // without the composite, the action's verify call (which uses
    // chainDayTokenId) won't accept it.
    const legacyToken = signCompletionToken("chain-day", "mem_abc");
    expect(
      verifyCompletionToken("chain-day", chainDayTokenId("mem_abc", 3), legacyToken),
    ).toBe(false);
  });
});
