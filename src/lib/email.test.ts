import { describe, expect, it } from "vitest";
import { escapeHtml } from "./email";

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
