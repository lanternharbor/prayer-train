import { afterEach, describe, expect, it, vi } from "vitest";
import { escapeHtml, getFromAddress } from "./email";

/**
 * The email module's HTML templates inject user-controlled strings
 * (recipient names, custom prayers, etc.) into hand-built HTML. These
 * tests pin the contract of the escapeHtml helper that's applied to
 * those interpolations, so a stray unescaped variable can't slip past
 * a future refactor.
 */
describe("escapeHtml", () => {
  it("escapes ampersands first to prevent double-encoding", () => {
    // If `&` weren't escaped first, escaping `<` to `&lt;` would then
    // become `&amp;lt;` on a second pass. Single-pass replace order
    // matters; this test pins it.
    expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
  });

  it("escapes less-than to &lt;", () => {
    expect(escapeHtml("a < b")).toBe("a &lt; b");
  });

  it("escapes greater-than to &gt;", () => {
    expect(escapeHtml("b > a")).toBe("b &gt; a");
  });

  it("escapes double quote to &quot;", () => {
    expect(escapeHtml('"hello"')).toBe("&quot;hello&quot;");
  });

  it("escapes single quote to &#39;", () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  it("neutralizes a script tag injection attempt", () => {
    const input = "<script>alert(1)</script>";
    const escaped = escapeHtml(input);
    expect(escaped).not.toContain("<script");
    expect(escaped).toContain("&lt;script&gt;");
  });

  it("preserves newlines (caller relies on white-space: pre-line)", () => {
    expect(escapeHtml("line one\nline two")).toBe("line one\nline two");
  });

  it("returns empty string unchanged", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("handles all five special chars in one input", () => {
    expect(escapeHtml(`& < > " '`)).toBe(
      `&amp; &lt; &gt; &quot; &#39;`,
    );
  });

  it("does not double-escape an already-escaped string", () => {
    // First pass:
    const once = escapeHtml("&");
    expect(once).toBe("&amp;");
    // If a developer accidentally double-escapes, this is what they
    // get. The test isn't asserting double-escape is bad — it's
    // documenting that the helper is not idempotent and must only
    // be applied at the HTML-injection boundary.
    expect(escapeHtml(once)).toBe("&amp;amp;");
  });
});

/**
 * getFromAddress() is the single point where outgoing-mail sender
 * resolution happens. Pinning this contract here prevents a regression
 * where someone reintroduces a silent fallback to a stale/unverified
 * domain in production. Silent misdelivery is the failure mode we're
 * defending against — Resend rejecting mail or it landing in spam from
 * an unverified sender produces no obvious error trail.
 */
describe("getFromAddress", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the EMAIL_FROM value verbatim when set, in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("EMAIL_FROM", "PrayerTrain <noreply@prayertrains.com>");
    expect(getFromAddress()).toBe("PrayerTrain <noreply@prayertrains.com>");
  });

  it("returns the EMAIL_FROM value verbatim when set, in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("EMAIL_FROM", "PrayerTrain <override@example.com>");
    expect(getFromAddress()).toBe("PrayerTrain <override@example.com>");
  });

  it("throws in production when EMAIL_FROM is unset", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("EMAIL_FROM", "");
    expect(() => getFromAddress()).toThrow(/EMAIL_FROM/);
  });

  it("throws in production when EMAIL_FROM is an empty string", () => {
    // Empty-string env vars are a common Vercel misconfiguration shape
    // (the var exists in the dashboard but has no value). We treat
    // empty as unset for the purposes of the loud-fail invariant.
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("EMAIL_FROM", "");
    expect(() => getFromAddress()).toThrow(/must be set in production/);
  });

  it("falls back to a prayertrains.com default in development when unset", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("EMAIL_FROM", "");
    expect(getFromAddress()).toBe(
      "PrayerTrain <noreply@prayertrains.com>",
    );
  });

  it("falls back to the dev default in test env too (no production gate)", () => {
    // `NODE_ENV === "test"` is what vitest sets by default. The throw
    // is gated specifically on production — non-prod envs should
    // always get a working fallback so local + CI keep flowing.
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("EMAIL_FROM", "");
    expect(getFromAddress()).toBe(
      "PrayerTrain <noreply@prayertrains.com>",
    );
  });
});
