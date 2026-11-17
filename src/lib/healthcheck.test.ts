import { afterEach, describe, expect, it, vi } from "vitest";
import { healthcheckPingUrl, isUnhealthyRun, pingHealthcheck } from "./healthcheck";

const URL = "https://hc-ping.com/abc-123";

describe("isUnhealthyRun", () => {
  it("flags a run that hit errors and sent nothing", () => {
    expect(isUnhealthyRun({ sent: 0, errors: 3 })).toBe(true);
  });
  it("does not flag a partial failure", () => {
    expect(isUnhealthyRun({ sent: 4, errors: 1 })).toBe(false);
  });
  it("does not flag a quiet day with nothing to send", () => {
    expect(isUnhealthyRun({ sent: 0, errors: 0 })).toBe(false);
  });
});

describe("healthcheckPingUrl", () => {
  it("keeps the success URL for a healthy run", () => {
    expect(healthcheckPingUrl(URL, { sent: 5, errors: 0 })).toBe(URL);
  });
  it("appends /fail for an unhealthy run", () => {
    expect(healthcheckPingUrl(URL, { sent: 0, errors: 2 })).toBe(`${URL}/fail`);
  });
  it("tolerates a trailing slash", () => {
    expect(healthcheckPingUrl(`${URL}/`, { sent: 0, errors: 2 })).toBe(`${URL}/fail`);
  });
  it("inserts /fail before a query string", () => {
    expect(healthcheckPingUrl(`${URL}?rid=1`, { sent: 0, errors: 2 })).toBe(
      `${URL}/fail?rid=1`,
    );
  });
});

describe("pingHealthcheck", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("does nothing without a URL", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await pingHealthcheck(undefined, { sent: 0, errors: 1 }, "body", "[t]");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts to /fail when every send failed", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    await pingHealthcheck(URL, { sent: 0, errors: 4 }, "sent=0 errors=4", "[t]");
    expect(fetchMock).toHaveBeenCalledWith(`${URL}/fail`, {
      method: "POST",
      body: "sent=0 errors=4",
    });
  });

  it("swallows a monitor outage", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(
      pingHealthcheck(URL, { sent: 1, errors: 0 }, "b", "[t]"),
    ).resolves.toBeUndefined();
    expect(err).toHaveBeenCalled();
    err.mockRestore();
  });
});
