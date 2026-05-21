import { describe, expect, it } from "vitest";
import { buildSlotData, type SlotPrayerType } from "./slot-generation";

/**
 * Anchor-algorithm coverage. Trains run real volunteers' calendars, so
 * the algorithm needs to be deterministic and backward-compatible with
 * the legacy round-robin (no anchors → same output as before).
 */

const day = (n: number) => new Date(2026, 4, n); // 2026-05-n, fixed
const days = (count: number) => Array.from({ length: count }, (_, i) => day(i + 1));

const pt = (id: string): SlotPrayerType => ({ id });

const slotIdsByDay = (slots: { date: Date; slotIndex: number; prayerTypeId: string }[]) => {
  // Group by day → array-of-arrays of prayerTypeIds in slotIndex order
  const grouped = new Map<string, string[]>();
  for (const s of slots) {
    const key = s.date.toISOString();
    if (!grouped.has(key)) grouped.set(key, []);
    const arr = grouped.get(key)!;
    arr[s.slotIndex] = s.prayerTypeId;
  }
  return Array.from(grouped.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, ids]) => ids);
};

describe("buildSlotData", () => {
  it("returns empty when prayerTypes is empty", () => {
    expect(
      buildSlotData({
        trainId: "t1",
        days: days(3),
        slotsPerDay: 3,
        prayerTypes: [],
        anchorPrayerTypeIds: [],
      }),
    ).toEqual([]);
  });

  describe("with no anchors (legacy round-robin)", () => {
    it("matches the original round-robin pattern exactly", () => {
      const prayerTypes = ["a", "b", "c", "d", "e"].map(pt);
      const slots = buildSlotData({
        trainId: "t1",
        days: days(3),
        slotsPerDay: 3,
        prayerTypes,
        anchorPrayerTypeIds: [],
      });
      // Day 1: a, b, c · Day 2: d, e, a · Day 3: b, c, d
      expect(slotIdsByDay(slots)).toEqual([
        ["a", "b", "c"],
        ["d", "e", "a"],
        ["b", "c", "d"],
      ]);
    });

    it("cycles a single prayer across all slots when only one is selected", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(2),
        slotsPerDay: 3,
        prayerTypes: [pt("a")],
        anchorPrayerTypeIds: [],
      });
      expect(slotIdsByDay(slots)).toEqual([
        ["a", "a", "a"],
        ["a", "a", "a"],
      ]);
    });
  });

  describe("with one anchor", () => {
    it("puts the anchor in slot 0 of every day; remaining slots rotate non-anchors", () => {
      const prayerTypes = ["rosary", "mercy", "adoration", "litany", "memorare"].map(pt);
      const slots = buildSlotData({
        trainId: "t1",
        days: days(4),
        slotsPerDay: 3,
        prayerTypes,
        anchorPrayerTypeIds: ["rosary"],
      });
      const byDay = slotIdsByDay(slots);
      // Slot 0 every day = rosary
      for (const day of byDay) {
        expect(day[0]).toBe("rosary");
      }
      // Slots 1+2 cycle the 4 non-anchor prayers
      // Day 1: mercy, adoration · Day 2: litany, memorare · Day 3: mercy, adoration · Day 4: litany, memorare
      expect(byDay).toEqual([
        ["rosary", "mercy", "adoration"],
        ["rosary", "litany", "memorare"],
        ["rosary", "mercy", "adoration"],
        ["rosary", "litany", "memorare"],
      ]);
    });

    it("anchored novena lands in slot 0 every day so a 9-day claim succeeds", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(9),
        slotsPerDay: 3,
        prayerTypes: [pt("novena-9d"), pt("rosary"), pt("mercy")],
        anchorPrayerTypeIds: ["novena-9d"],
      });
      const slot0s = slots.filter((s) => s.slotIndex === 0);
      expect(slot0s).toHaveLength(9);
      // Consecutive days, all the novena → matches the same-slotIndex
      // novena-claim query in claim-guard.ts.
      for (const s of slot0s) {
        expect(s.prayerTypeId).toBe("novena-9d");
      }
    });
  });

  describe("with multiple anchors", () => {
    it("preserves anchor order across slot positions", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(2),
        slotsPerDay: 3,
        prayerTypes: [pt("a"), pt("b"), pt("c"), pt("rotator")],
        anchorPrayerTypeIds: ["b", "a"], // intentionally non-canonical order
      });
      const byDay = slotIdsByDay(slots);
      // anchors[0]=b → slot 0, anchors[1]=a → slot 1, rotator fills slot 2
      expect(byDay).toEqual([
        ["b", "a", "c"],
        ["b", "a", "rotator"],
      ]);
    });

    it("two anchors + one rotator on 3 slots/day: rotator repeats every day", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(3),
        slotsPerDay: 3,
        prayerTypes: [pt("anc1"), pt("anc2"), pt("rot")],
        anchorPrayerTypeIds: ["anc1", "anc2"],
      });
      expect(slotIdsByDay(slots)).toEqual([
        ["anc1", "anc2", "rot"],
        ["anc1", "anc2", "rot"],
        ["anc1", "anc2", "rot"],
      ]);
    });

    it("one anchor + one rotator on 2 slots/day", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(3),
        slotsPerDay: 2,
        prayerTypes: [pt("rosary"), pt("mercy")],
        anchorPrayerTypeIds: ["rosary"],
      });
      expect(slotIdsByDay(slots)).toEqual([
        ["rosary", "mercy"],
        ["rosary", "mercy"],
        ["rosary", "mercy"],
      ]);
    });
  });

  describe("defensive fallbacks", () => {
    it("ignores anchor IDs that aren't in the prayerTypes list", () => {
      // A stale anchor ID (prayer was removed from the train) should
      // be silently dropped; the algorithm still produces a complete
      // schedule from what's left.
      const slots = buildSlotData({
        trainId: "t1",
        days: days(2),
        slotsPerDay: 2,
        prayerTypes: [pt("a"), pt("b")],
        anchorPrayerTypeIds: ["c"], // not in prayerTypes
      });
      // Falls through to round-robin
      expect(slotIdsByDay(slots)).toEqual([
        ["a", "b"],
        ["a", "b"],
      ]);
    });

    it("falls back to cycling all prayerTypes if anchors fill every slot (upstream should reject this)", () => {
      // anchors.length === slotsPerDay → rotators empty.
      // Validation rejects this case, but the helper shouldn't crash.
      const slots = buildSlotData({
        trainId: "t1",
        days: days(2),
        slotsPerDay: 2,
        prayerTypes: [pt("a"), pt("b")],
        anchorPrayerTypeIds: ["a", "b"],
      });
      // Slots filled by anchors; output is deterministic
      expect(slotIdsByDay(slots)).toEqual([
        ["a", "b"],
        ["a", "b"],
      ]);
    });
  });

  describe("filterSlotsToOpenCells (rebuild path)", () => {
    it("returns only cells listed as open, preserves the rest", async () => {
      const { filterSlotsToOpenCells } = await import("./slot-generation");
      const schedule = buildSlotData({
        trainId: "t1",
        days: days(2),
        slotsPerDay: 3,
        prayerTypes: [pt("a"), pt("b"), pt("c")],
        anchorPrayerTypeIds: ["a"],
      });
      // Day 1 slot 1 + slot 2 are open; slot 0 stays (claimed).
      // Day 2 all three slots are open.
      const openCells = [
        { date: day(1), slotIndex: 1 },
        { date: day(1), slotIndex: 2 },
        { date: day(2), slotIndex: 0 },
        { date: day(2), slotIndex: 1 },
        { date: day(2), slotIndex: 2 },
      ];
      const filtered = filterSlotsToOpenCells(schedule, openCells);
      expect(filtered).toHaveLength(5);
      // Day 1 slot 0 (where anchor would land) is correctly omitted —
      // because it's already CLAIMED with some old prayer.
      const day1Slot0 = filtered.find(
        (s) => s.date.getTime() === day(1).getTime() && s.slotIndex === 0,
      );
      expect(day1Slot0).toBeUndefined();
      // Day 2 slot 0 IS in the output and holds the anchor.
      const day2Slot0 = filtered.find(
        (s) => s.date.getTime() === day(2).getTime() && s.slotIndex === 0,
      );
      expect(day2Slot0?.prayerTypeId).toBe("a");
    });

    it("returns empty when openCells is empty", async () => {
      const { filterSlotsToOpenCells } = await import("./slot-generation");
      const schedule = buildSlotData({
        trainId: "t1",
        days: days(3),
        slotsPerDay: 3,
        prayerTypes: [pt("a"), pt("b")],
        anchorPrayerTypeIds: [],
      });
      expect(filterSlotsToOpenCells(schedule, [])).toEqual([]);
    });

    it("normalizes dates to local midnight on both sides", async () => {
      const { filterSlotsToOpenCells } = await import("./slot-generation");
      const schedule = buildSlotData({
        trainId: "t1",
        days: [day(1)],
        slotsPerDay: 2,
        prayerTypes: [pt("a"), pt("b")],
        anchorPrayerTypeIds: [],
      });
      // openCell with the same calendar day but a non-midnight time
      const nonMidnight = new Date(day(1));
      nonMidnight.setHours(14, 30, 0, 0);
      const filtered = filterSlotsToOpenCells(schedule, [
        { date: nonMidnight, slotIndex: 0 },
        { date: nonMidnight, slotIndex: 1 },
      ]);
      expect(filtered).toHaveLength(2);
    });
  });

  describe("trainId + date + slotIndex shape", () => {
    it("stamps every slot with the provided trainId", () => {
      const slots = buildSlotData({
        trainId: "train-xyz",
        days: days(2),
        slotsPerDay: 3,
        prayerTypes: [pt("a"), pt("b")],
        anchorPrayerTypeIds: [],
      });
      for (const s of slots) {
        expect(s.trainId).toBe("train-xyz");
      }
    });

    it("generates days × slotsPerDay total slots", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(7),
        slotsPerDay: 3,
        prayerTypes: [pt("a"), pt("b"), pt("c")],
        anchorPrayerTypeIds: [],
      });
      expect(slots).toHaveLength(21);
    });

    it("returns slotIndex values 0..slotsPerDay-1 for each day", () => {
      const slots = buildSlotData({
        trainId: "t1",
        days: days(2),
        slotsPerDay: 3,
        prayerTypes: [pt("a"), pt("b")],
        anchorPrayerTypeIds: [],
      });
      const indexes = slots.filter((s) => s.date.getTime() === day(1).getTime())
        .map((s) => s.slotIndex)
        .sort();
      expect(indexes).toEqual([0, 1, 2]);
    });
  });
});
