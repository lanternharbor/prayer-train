import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the email senders so the fan-out runs without touching Resend.
// We only care about WHAT URL the fan-out hands the bouquet button.
const sendPrayerWarriorClosing = vi.fn();
const sendTrainBouquetReady = vi.fn();
const sendChainClosingDayEmail = vi.fn();
const sendChainBouquetReady = vi.fn();

vi.mock("./email", () => ({
  sendPrayerWarriorClosing: (...a: unknown[]) => sendPrayerWarriorClosing(...a),
  sendTrainBouquetReady: (...a: unknown[]) => sendTrainBouquetReady(...a),
  sendChainClosingDayEmail: (...a: unknown[]) => sendChainClosingDayEmail(...a),
  sendChainBouquetReady: (...a: unknown[]) => sendChainBouquetReady(...a),
}));

import { sendTrainClosingFanout, sendChainClosingFanout } from "./closing-fanout";

const BASE = "https://prayertrains.com";

beforeEach(() => {
  sendPrayerWarriorClosing.mockClear();
  sendTrainBouquetReady.mockClear();
  sendChainClosingDayEmail.mockClear();
  sendChainBouquetReady.mockClear();
});

describe("sendTrainClosingFanout bouquet URL", () => {
  it("points every recipient at the HTML landing page, not the raw PDF", async () => {
    await sendTrainClosingFanout(
      {
        slug: "benjamin-iaut",
        recipientName: "Benjamin",
        organizerAnonymous: false,
        organizer: { name: "William", email: "org@example.com" },
        warriors: [{ name: "Maria", email: "maria@example.com" }],
        slots: [{ claimerName: "Jon", claimerEmail: "jon@example.com" }],
      },
      BASE,
    );
    const expected = `${BASE}/p/benjamin-iaut/bouquet`;
    // Warriors + slot-claimers + organizer all get the landing URL.
    for (const call of sendPrayerWarriorClosing.mock.calls) {
      expect(call[0].bouquetUrl).toBe(expected);
      expect(call[0].bouquetUrl).not.toContain("/api/bouquet");
    }
    expect(sendTrainBouquetReady.mock.calls[0][0].bouquetUrl).toBe(expected);
  });
});

describe("sendChainClosingFanout bouquet URL", () => {
  it("points members + organizer at the chain HTML landing page", async () => {
    await sendChainClosingFanout(
      {
        slug: "benji-6kcs",
        recipientName: "Benji",
        organizerAnonymous: false,
        organizer: { name: "William", email: "org@example.com" },
        prayerType: { name: "Surrender Novena" },
        members: [{ name: "Ana", email: "ana@example.com" }],
      },
      null,
      BASE,
    );
    const expected = `${BASE}/chain/benji-6kcs/bouquet`;
    expect(sendChainClosingDayEmail.mock.calls[0][0].bouquetUrl).toBe(expected);
    expect(sendChainBouquetReady.mock.calls[0][0].bouquetUrl).toBe(expected);
  });
});
