/**
 * Pure slot-generation algorithm shared by `createPrayerTrain` and
 * `rebuildTrainSchedule`. Decides which prayer type goes in which
 * `{date, slotIndex}` cell of a train's schedule based on:
 *
 *   - the user-selected prayer types (in the order they were picked)
 *   - the subset flagged as "daily anchors" (always-on per day)
 *
 * Algorithm:
 *
 *   anchors  = selectedPrayerTypes filtered by anchorPrayerTypeIds,
 *              preserving the order in anchorPrayerTypeIds
 *   rotators = selectedPrayerTypes - anchors (preserving selection order)
 *
 *   for each day:
 *     for slotIndex 0..slotsPerDay-1:
 *       if slotIndex < anchors.length:
 *         prayer = anchors[slotIndex]
 *       else:
 *         prayer = rotators[rotatorIdx % rotators.length]
 *         rotatorIdx++
 *
 * Backward-compatible: when `anchorPrayerTypeIds` is empty, every
 * slot enters the rotator branch and the output matches the original
 * flat round-robin exactly.
 *
 * Cardinality is enforced upstream (validation + UI):
 *   anchorPrayerTypeIds.length <= slotsPerDay - 1
 *   anchorPrayerTypeIds ⊆ selectedPrayerTypes.id
 * The helper does NOT throw on cardinality violations; it just
 * generates what it's given. If anchors fill all slotsPerDay (which
 * upstream rejects), rotators is empty and the helper falls back to
 * cycling the full selectedPrayerTypes list — same as the no-anchor
 * branch — so output stays deterministic rather than crashing.
 */

export type SlotPrayerType = {
  /** Prisma PrayerType.id */
  id: string;
};

export type SlotInput = {
  trainId: string;
  date: Date;
  slotIndex: number;
  prayerTypeId: string;
};

export function buildSlotData({
  trainId,
  days,
  slotsPerDay,
  prayerTypes,
  anchorPrayerTypeIds,
}: {
  trainId: string;
  days: Date[];
  slotsPerDay: number;
  /** Selected prayer types in user-pick order. */
  prayerTypes: readonly SlotPrayerType[];
  /**
   * Subset of `prayerTypes.id` flagged as daily. Order is meaningful:
   * anchors[0] → slot 0 every day, anchors[1] → slot 1, etc.
   */
  anchorPrayerTypeIds: readonly string[];
}): SlotInput[] {
  if (prayerTypes.length === 0) return [];

  // Partition prayer types into anchors (in caller-supplied anchor
  // order) and rotators (preserving selection order).
  const anchorIdSet = new Set(anchorPrayerTypeIds);
  const anchors: SlotPrayerType[] = anchorPrayerTypeIds
    .map((id) => prayerTypes.find((p) => p.id === id))
    .filter((p): p is SlotPrayerType => p != null);
  const rotators = prayerTypes.filter((p) => !anchorIdSet.has(p.id));

  // Defensive fallback: if validation slipped and anchors fill every
  // slotsPerDay with no rotators, cycle the full prayerTypes list so
  // we still produce a complete schedule instead of throwing.
  const fallbackPool: readonly SlotPrayerType[] =
    rotators.length > 0 ? rotators : prayerTypes;

  const slotData: SlotInput[] = [];
  let rotatorIdx = 0;

  for (const day of days) {
    for (let slotIndex = 0; slotIndex < slotsPerDay; slotIndex++) {
      let prayer: SlotPrayerType;
      if (slotIndex < anchors.length) {
        prayer = anchors[slotIndex];
      } else {
        prayer = fallbackPool[rotatorIdx % fallbackPool.length];
        rotatorIdx++;
      }
      slotData.push({
        trainId,
        date: day,
        slotIndex,
        prayerTypeId: prayer.id,
      });
    }
  }

  return slotData;
}
