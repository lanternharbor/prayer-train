import { describe, expect, it } from "vitest";
import {
  normalizeForSearch,
  tokenize,
  buildParishHaystack,
  matchesParish,
  type SearchableParish,
} from "./parish-search";

describe("normalizeForSearch", () => {
  it("lowercases", () => {
    expect(normalizeForSearch("St. PAUL Parish")).toBe("saint paul parish");
  });

  it("expands 'st.' to 'saint'", () => {
    expect(normalizeForSearch("St. Paul")).toBe("saint paul");
  });

  it("expands 'st' (no period) to 'saint'", () => {
    expect(normalizeForSearch("st paul")).toBe("saint paul");
  });

  it("leaves 'saint' unchanged", () => {
    expect(normalizeForSearch("saint paul")).toBe("saint paul");
  });

  it("expands 'sts.' to 'saints'", () => {
    expect(normalizeForSearch("Sts. Peter and Paul")).toBe(
      "saints peter and paul",
    );
  });

  it("expands 'sts' (no period) to 'saints'", () => {
    expect(normalizeForSearch("sts peter")).toBe("saints peter");
  });

  it("does NOT match 'st' inside other words", () => {
    expect(normalizeForSearch("First Christian Church")).toBe(
      "first christian church",
    );
    expect(normalizeForSearch("Christ the King")).toBe("christ the king");
    expect(normalizeForSearch("Stations of the Cross")).toBe(
      "stations of the cross",
    );
    expect(normalizeForSearch("Stamford")).toBe("stamford");
  });

  it("strips ASCII apostrophes without inserting space", () => {
    expect(normalizeForSearch("St. Mary's Cathedral")).toBe(
      "saint marys cathedral",
    );
  });

  it("strips typographic apostrophes (U+2019) too", () => {
    expect(normalizeForSearch("St. Mary’s Cathedral")).toBe(
      "saint marys cathedral",
    );
  });

  it("replaces other punctuation with a space", () => {
    expect(normalizeForSearch("Our Lady, Star of the Sea")).toBe(
      "our lady star of the sea",
    );
    expect(normalizeForSearch("Sacred Heart - Holy Family")).toBe(
      "sacred heart holy family",
    );
  });

  it("collapses whitespace", () => {
    expect(normalizeForSearch("  St.   Paul   ")).toBe("saint paul");
  });

  it("returns empty string for empty input", () => {
    expect(normalizeForSearch("")).toBe("");
    expect(normalizeForSearch("   ")).toBe("");
  });

  it("expands trailing 'St' (end of string)", () => {
    // A parish or address ending in "St" alone should still expand,
    // even without trailing whitespace.
    expect(normalizeForSearch("Main St")).toBe("main saint");
    expect(normalizeForSearch("Main St.")).toBe("main saint");
  });
});

describe("tokenize", () => {
  it("splits multi-word queries", () => {
    expect(tokenize("st paul hingham")).toEqual(["saint", "paul", "hingham"]);
  });

  it("returns empty array for empty input", () => {
    expect(tokenize("")).toEqual([]);
    expect(tokenize("   ")).toEqual([]);
  });

  it("returns single token for single word", () => {
    expect(tokenize("hingham")).toEqual(["hingham"]);
  });

  it("normalizes before splitting", () => {
    expect(tokenize("St. Paul")).toEqual(["saint", "paul"]);
  });
});

describe("buildParishHaystack", () => {
  it("normalizes and concatenates parish fields", () => {
    const parish: SearchableParish = {
      name: "St. Paul Parish",
      city: "Hingham",
      state: "MA",
      diocese: "Archdiocese of Boston",
    };
    expect(buildParishHaystack(parish)).toBe(
      "saint paul parish hingham ma archdiocese of boston",
    );
  });

  it("handles a null diocese", () => {
    const parish: SearchableParish = {
      name: "Holy Family Parish",
      city: "Rockland",
      state: "MA",
      diocese: null,
    };
    expect(buildParishHaystack(parish)).toBe(
      "holy family parish rockland ma",
    );
  });
});

describe("matchesParish", () => {
  const stPaul: SearchableParish = {
    name: "St. Paul Parish",
    city: "Hingham",
    state: "MA",
    diocese: "Archdiocese of Boston",
  };

  const resurrection: SearchableParish = {
    name: "Resurrection Parish",
    city: "Hingham",
    state: "MA",
    diocese: "Archdiocese of Boston",
  };

  const stMarys: SearchableParish = {
    name: "St. Mary's Cathedral",
    city: "Boston",
    state: "MA",
    diocese: "Archdiocese of Boston",
  };

  // The exact regression cases from the bug report. Every one of these
  // should find St. Paul Parish in Hingham.
  describe("regression: queries that should find St. Paul Parish", () => {
    it("'st paul' matches", () => {
      expect(matchesParish("st paul", stPaul)).toBe(true);
    });

    it("'saint paul' matches", () => {
      expect(matchesParish("saint paul", stPaul)).toBe(true);
    });

    it("'st. paul' matches", () => {
      expect(matchesParish("st. paul", stPaul)).toBe(true);
    });

    it("'st paul hingham' matches", () => {
      expect(matchesParish("st paul hingham", stPaul)).toBe(true);
    });

    it("'paul hingham' matches", () => {
      expect(matchesParish("paul hingham", stPaul)).toBe(true);
    });
  });

  // Existing simple-search behavior must still work.
  describe("preserves existing simple-search behavior", () => {
    it("'paul' matches St. Paul Parish", () => {
      expect(matchesParish("paul", stPaul)).toBe(true);
    });

    it("'hingham' matches both Hingham parishes", () => {
      expect(matchesParish("hingham", stPaul)).toBe(true);
      expect(matchesParish("hingham", resurrection)).toBe(true);
    });

    it("'resurrection' matches Resurrection Parish", () => {
      expect(matchesParish("resurrection", resurrection)).toBe(true);
    });
  });

  // Negative cases must NOT match.
  describe("negative cases", () => {
    it("'paul' does not match Resurrection Parish", () => {
      expect(matchesParish("paul", resurrection)).toBe(false);
    });

    it("'xyz' matches nothing", () => {
      expect(matchesParish("xyz", stPaul)).toBe(false);
    });

    it("empty query matches nothing", () => {
      expect(matchesParish("", stPaul)).toBe(false);
      expect(matchesParish("   ", stPaul)).toBe(false);
    });

    it("a token that exists in NO field rejects the whole match (AND semantics)", () => {
      // "paul" is in stPaul; "xyz" is not. AND -> false.
      expect(matchesParish("paul xyz", stPaul)).toBe(false);
    });
  });

  describe("apostrophe handling end-to-end", () => {
    it("'marys' (no apostrophe) matches St. Mary's Cathedral", () => {
      expect(matchesParish("marys", stMarys)).toBe(true);
    });

    it("'mary' (substring) matches St. Mary's Cathedral", () => {
      expect(matchesParish("mary", stMarys)).toBe(true);
    });

    it("'st marys' matches St. Mary's Cathedral", () => {
      expect(matchesParish("st marys", stMarys)).toBe(true);
    });

    it("'st. mary' matches St. Mary's Cathedral", () => {
      expect(matchesParish("st. mary", stMarys)).toBe(true);
    });
  });

  describe("token order independence", () => {
    it("'hingham paul' matches St. Paul Parish (reverse order)", () => {
      expect(matchesParish("hingham paul", stPaul)).toBe(true);
    });

    it("'boston paul' matches St. Paul Parish (paul in name, boston in diocese)", () => {
      expect(matchesParish("boston paul", stPaul)).toBe(true);
    });
  });

  describe("diocese matching", () => {
    it("'archdiocese' matches", () => {
      expect(matchesParish("archdiocese", stPaul)).toBe(true);
    });

    it("'boston' matches via diocese (parish is in Hingham)", () => {
      expect(matchesParish("boston", stPaul)).toBe(true);
    });
  });
});
