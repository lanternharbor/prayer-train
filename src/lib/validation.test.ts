import { describe, expect, it } from "vitest";
import {
  addPrayerWarriorSchema,
  createChainSchema,
  createTrainSchema,
  markChainDayCompleteSchema,
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
  };

  it("accepts a minimal valid payload", () => {
    const result = createTrainSchema.safeParse(validBase);
    expect(result.success).toBe(true);
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
});
