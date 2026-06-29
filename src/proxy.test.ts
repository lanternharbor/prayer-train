import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

/**
 * Pins the edge auth-gate redirect. The load-bearing detail: when a
 * logged-out visitor hits a protected create route, the sign-in
 * callbackUrl must preserve the ORIGINAL query string — otherwise the
 * `?from=` growth-loop attribution (and any `?prayerType=` pre-fill) is
 * dropped before the page runs and the new train records blank source.
 *
 * Regression guard for the `pathname` → `pathname + nextUrl.search` fix.
 */
describe("proxy auth gate — callbackUrl query preservation", () => {
  async function callbackUrlFor(url: string): Promise<string> {
    const res = await proxy(new NextRequest(url));
    const location = res.headers.get("location");
    expect(location).toBeTruthy();
    const cb = new URL(location as string).searchParams.get("callbackUrl");
    expect(cb).toBeTruthy();
    return cb as string;
  }

  it("preserves ?from= on the sign-in callback for a no-cookie visitor", async () => {
    const cb = await callbackUrlFor(
      "https://prayertrains.com/create/train?from=bouquet",
    );
    expect(cb).toContain("/create/train");
    expect(cb).toContain("from=bouquet");
  });

  it("preserves BOTH prayerType and from together", async () => {
    const cb = await callbackUrlFor(
      "https://prayertrains.com/create/train?prayerType=surrender-novena&from=closing-email",
    );
    expect(cb).toContain("prayerType=surrender-novena");
    expect(cb).toContain("from=closing-email");
  });

  it("redirects a no-cookie visitor to the locale-aware signin route", async () => {
    const res = await proxy(
      new NextRequest("https://prayertrains.com/create/train?from=bouquet"),
    );
    const location = res.headers.get("location") as string;
    expect(location).toContain("/en/signin");
  });
});
