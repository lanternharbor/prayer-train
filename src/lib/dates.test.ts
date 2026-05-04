import { describe, expect, it } from "vitest";
import {
  dateKeyInTimezone,
  dayNumberInTimezone,
  daysLeftInTimezone,
  DEFAULT_DISPLAY_TZ,
} from "./dates";

describe("dateKeyInTimezone", () => {
  // Anchor scenario: 8:12 PM EDT on May 3 (= 00:12 UTC May 4). The
  // exact bug William reported. The key in EDT must be May 3; the key
  // in UTC must be May 4.
  const eveningEdt = new Date("2026-05-04T00:12:00Z");

  it("returns the local calendar date in EDT (the user's wall clock)", () => {
    expect(dateKeyInTimezone(eveningEdt, "America/New_York")).toBe("2026-05-03");
  });

  it("returns the UTC calendar date when tz is UTC", () => {
    expect(dateKeyInTimezone(eveningEdt, "UTC")).toBe("2026-05-04");
  });

  it("DEFAULT_DISPLAY_TZ is America/New_York", () => {
    expect(DEFAULT_DISPLAY_TZ).toBe("America/New_York");
  });

  it("midnight UTC of a date stays that date in UTC", () => {
    expect(
      dateKeyInTimezone(new Date("2026-05-03T00:00:00Z"), "UTC"),
    ).toBe("2026-05-03");
  });

  it("midnight UTC formats as the previous day in EDT", () => {
    // 2026-05-03T00:00:00Z is 8 PM EDT on May 2 (EDT = UTC-4 in May).
    expect(
      dateKeyInTimezone(new Date("2026-05-03T00:00:00Z"), "America/New_York"),
    ).toBe("2026-05-02");
  });

  it("works for Pacific time too (8:12 PM PT May 3 = May 4 03:12 UTC)", () => {
    const eveningPt = new Date("2026-05-04T03:12:00Z");
    expect(dateKeyInTimezone(eveningPt, "America/Los_Angeles")).toBe(
      "2026-05-03",
    );
    expect(dateKeyInTimezone(eveningPt, "America/New_York")).toBe(
      "2026-05-03",
    );
    expect(dateKeyInTimezone(eveningPt, "UTC")).toBe("2026-05-04");
  });
});

describe("dayNumberInTimezone", () => {
  // Spina-shaped scenario: chain started May 1 midnight UTC; "now" is
  // 8:12 PM EDT May 3. In EDT the user's calendar reads May 3, which
  // is Day 3 of the chain (May 1 = Day 1, May 2 = Day 2, May 3 = Day 3).
  // Naive (Date.now() - startDate) / day on UTC would give Day 4 because
  // UTC is already past midnight into May 4.
  const start = new Date("2026-05-01T00:00:00Z");
  const eveningEdt = new Date("2026-05-04T00:12:00Z");

  it("returns Day 3 in EDT for May 3 8:12 PM EDT after May 1 start", () => {
    expect(dayNumberInTimezone(eveningEdt, start, "America/New_York")).toBe(3);
  });

  it("returns Day 4 in UTC (the wrong-feeling answer William saw)", () => {
    expect(dayNumberInTimezone(eveningEdt, start, "UTC")).toBe(4);
  });

  it("returns Day 1 on the start date itself", () => {
    const startDay = new Date("2026-05-01T15:00:00Z"); // mid-day May 1 UTC
    expect(dayNumberInTimezone(startDay, start, "America/New_York")).toBe(1);
  });

  it("never returns less than 1 (clamps at start)", () => {
    const before = new Date("2026-04-30T00:00:00Z");
    expect(dayNumberInTimezone(before, start, "America/New_York")).toBe(1);
  });

  it("counts sequential days correctly", () => {
    // Three days into the chain at noon EDT
    const day3Noon = new Date("2026-05-03T16:00:00Z"); // noon EDT
    expect(dayNumberInTimezone(day3Noon, start, "America/New_York")).toBe(3);
  });
});

describe("daysLeftInTimezone", () => {
  // Spina-shaped: train ends May 23, today is 8:12 PM EDT May 3.
  // Days remaining (in EDT) = 23 - 3 = 20.
  const end = new Date("2026-05-23T00:00:00Z");
  const eveningEdt = new Date("2026-05-04T00:12:00Z");

  it("returns 20 days left for the Spina-shaped scenario", () => {
    expect(daysLeftInTimezone(eveningEdt, end, "America/New_York")).toBe(20);
  });

  it("returns 0 on the end date itself", () => {
    const endDay = new Date("2026-05-23T15:00:00Z");
    expect(daysLeftInTimezone(endDay, end, "America/New_York")).toBe(0);
  });

  it("returns 0 (not negative) past the end date", () => {
    const past = new Date("2026-06-01T00:00:00Z");
    expect(daysLeftInTimezone(past, end, "America/New_York")).toBe(0);
  });

  it("returns 1 on the day before the end", () => {
    // May 22 noon EDT = May 22 16:00 UTC; one calendar day to May 23
    const dayBefore = new Date("2026-05-22T16:00:00Z");
    expect(daysLeftInTimezone(dayBefore, end, "America/New_York")).toBe(1);
  });
});
