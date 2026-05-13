import { describe, expect, it } from "vitest";
import {
  addPrayerWarriorSchema,
  createChainSchema,
  createTrainSchema,
  markChainDayCompleteSchema,
  updateChainSchema,
  updateTrainSchema,
} from "./validation";

/**
 * These tests pin the Zod schemas that gate every server action's
 * inputs. Anything a server action accepts has to pass these schemas
 * first, so they're the front line of input validation.
 */

describe("addPrayerWarriorSchema", () => {
  it("accepts a minimal valid payload", () => {
    const result = addPrayerWarriorSchema.safeParse({
      trainId: "train_abc123",
      name: "Maria",
      email: "maria@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("trims whitespace from name and email", () => {
    const result = addPrayerWarriorSchema.safeParse({
      trainId: "train_abc123",
      name: "  Maria  ",
      email: "  maria@example.com  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Maria");
      expect(result.data.email).toBe("maria@example.com");
    }
  });

  it("accepts an optional message up to 500 chars", () => {
    const result = addPrayerWarriorSchema.safeParse({
      trainId: "train_abc123",
      name: "Maria",
      email: "maria@example.com",
      message: "I'm praying for healing.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = addPrayerWarriorSchema.safeParse({
      trainId: "train_abc123",
      name: "Maria",
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = addPrayerWarriorSchema.safeParse({
      trainId: "train_abc123",
      name: "",
      email: "maria@example.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message over 500 chars", () => {
    const result = addPrayerWarriorSchema.safeParse({
      trainId: "train_abc123",
      name: "Maria",
      email: "maria@example.com",
      message: "x".repeat(501),
    });
    expect(result.success).toBe(false);
  });
});

describe("markChainDayCompleteSchema", () => {
  it("accepts a memberId + day", () => {
    const result = markChainDayCompleteSchema.safeParse({
      memberId: "member_abc123",
      day: 3,
    });
    expect(result.success).toBe(true);
  });

  it("coerces a numeric string day to a number", () => {
    const result = markChainDayCompleteSchema.safeParse({
      memberId: "member_abc123",
      day: "5",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.day).toBe(5);
  });

  it("rejects day < 1", () => {
    const result = markChainDayCompleteSchema.safeParse({
      memberId: "member_abc123",
      day: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects day > 365", () => {
    const result = markChainDayCompleteSchema.safeParse({
      memberId: "member_abc123",
      day: 366,
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing memberId (regression: previous schema accepted email)", () => {
    // The previous schema accepted { chainId, email, day }. After the
    // Codex audit fix, the schema requires memberId only. Bare email
    // is no longer a valid auth proof.
    const result = markChainDayCompleteSchema.safeParse({
      chainId: "chain_abc123",
      email: "x@example.com",
      day: 1,
    });
    expect(result.success).toBe(false);
  });
});

describe("createTrainSchema", () => {
  const validBase = {
    recipientName: "Test Family",
    intention: "Prayers for healing",
    situation: "ILLNESS",
    // The schema requires either an organizer name or the anonymous
    // checkbox — see the refinement on createTrainSchema. Default the
    // base payload to providing a name so the existing tests focus on
    // the field-under-test (e.g. customPrayerText) rather than tripping
    // over the organizer-identity requirement.
    organizerName: "William",
  };

  it("accepts a minimal valid payload", () => {
    const result = createTrainSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  // Regression for the May 2026 z.coerce.boolean() footgun. The
  // create-train wizard's FormData unconditionally sets isPublic to
  // the literal string "true" or "false". Before the fix to a
  // FormData-aware formBoolean(), `z.coerce.boolean()` called
  // `Boolean("false")` → true, silently overriding the user's intent.
  // Codex caught this on PR #56. These tests pin the corrected
  // behavior so it cannot regress.
  describe("isPublic / organizerAnonymous boolean coercion", () => {
    it('treats the literal string "false" as false (NOT JS-truthy)', () => {
      const result = createTrainSchema.safeParse({
        ...validBase,
        isPublic: "false",
        organizerAnonymous: "false",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isPublic).toBe(false);
        expect(result.data.organizerAnonymous).toBe(false);
      }
    });

    it('treats "true", "on", and "1" as true', () => {
      for (const truthy of ["true", "on", "1"]) {
        const result = createTrainSchema.safeParse({
          ...validBase,
          isPublic: truthy,
        });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.isPublic).toBe(true);
      }
    });

    it("treats an omitted isPublic as the default (false)", () => {
      const result = createTrainSchema.safeParse(validBase);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.isPublic).toBe(false);
    });

    it("accepts a literal boolean true / false", () => {
      const result = createTrainSchema.safeParse({
        ...validBase,
        isPublic: true,
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.isPublic).toBe(true);
    });
  });

  it("accepts a payload with organizerAnonymous=true and no name", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    const result = createTrainSchema.safeParse({
      ...withoutName,
      organizerAnonymous: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a payload with neither organizerName nor organizerAnonymous", () => {
    // This is the bug the refinement guards against — silent
    // anonymity from a missing name. The wizard's canProceed gate
    // already prevents this in the UI, but the server schema is the
    // canonical line of defense.
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    const result = createTrainSchema.safeParse(withoutName);
    expect(result.success).toBe(false);
  });

  it("rejects a payload with empty organizerName when not anonymous", () => {
    const result = createTrainSchema.safeParse({
      ...validBase,
      organizerName: "   ",
    });
    expect(result.success).toBe(false);
  });

  it("accepts an optional customPrayerText", () => {
    const result = createTrainSchema.safeParse({
      ...validBase,
      customPrayerText: "Lord Jesus, hear our prayer for the family.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customPrayerText).toBe(
        "Lord Jesus, hear our prayer for the family.",
      );
    }
  });

  it("accepts an empty customPrayerText (organizer left the field blank)", () => {
    // The schema accepts empty strings as valid; downstream server
    // actions coerce empty/undefined to null via `text || null`. This
    // test pins that the form submission with an empty field doesn't
    // cause a Zod error and leave the user looking at a stack trace.
    const result = createTrainSchema.safeParse({
      ...validBase,
      customPrayerText: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects customPrayerText longer than 4000 chars", () => {
    const result = createTrainSchema.safeParse({
      ...validBase,
      customPrayerText: "x".repeat(4001),
    });
    expect(result.success).toBe(false);
  });
});

describe("createChainSchema", () => {
  const validBase = {
    prayerTypeId: "prayer_abc123",
    intention: "Prayers for the family",
    // Same organizer-name requirement as createTrainSchema; defaulted
    // here so existing tests focus on the field-under-test.
    organizerName: "William",
  };

  it("accepts an optional customPrayerText (parity with trains)", () => {
    const result = createChainSchema.safeParse({
      ...validBase,
      customPrayerText: "May Christ's peace be upon them.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customPrayerText).toBe(
        "May Christ's peace be upon them.",
      );
    }
  });

  it("defaults isPublic to false", () => {
    const result = createChainSchema.safeParse(validBase);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.isPublic).toBe(false);
  });

  it("accepts a payload with organizerAnonymous=true and no name", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    const result = createChainSchema.safeParse({
      ...withoutName,
      organizerAnonymous: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a payload with neither organizerName nor organizerAnonymous", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    const result = createChainSchema.safeParse(withoutName);
    expect(result.success).toBe(false);
  });
});

describe("updateTrainSchema (organizer-identity refinement)", () => {
  // Pins the same name-OR-anonymous refinement as createTrainSchema for
  // the edit-flow path. Sister's chain in PR #30's screenshot showed
  // why this matters: organizers who flipped anonymous on at create
  // need to be able to flip it off later, and the schema is the
  // canonical line of defense.
  const validBase = {
    trainId: "train_abc123",
    recipientName: "Test Family",
    intention: "Prayers for healing",
    situation: "ILLNESS",
    organizerName: "William",
  };

  it("accepts a name-only payload", () => {
    expect(updateTrainSchema.safeParse(validBase).success).toBe(true);
  });

  it("accepts an anonymous-only payload (no name)", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    expect(
      updateTrainSchema.safeParse({
        ...withoutName,
        organizerAnonymous: true,
      }).success,
    ).toBe(true);
  });

  it("rejects a payload with neither name nor anonymous", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    expect(updateTrainSchema.safeParse(withoutName).success).toBe(false);
  });
});

describe("updateChainSchema (organizer-identity refinement)", () => {
  const validBase = {
    chainId: "chain_abc123",
    intention: "Prayers for the family",
    organizerName: "William",
  };

  it("accepts a name-only payload", () => {
    expect(updateChainSchema.safeParse(validBase).success).toBe(true);
  });

  it("accepts an anonymous-only payload (no name)", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    expect(
      updateChainSchema.safeParse({
        ...withoutName,
        organizerAnonymous: true,
      }).success,
    ).toBe(true);
  });

  it("rejects a payload with neither name nor anonymous", () => {
    const { organizerName: _ignored, ...withoutName } = validBase;
    void _ignored;
    expect(updateChainSchema.safeParse(withoutName).success).toBe(false);
  });
});
