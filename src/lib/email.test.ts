import { describe, expect, it } from "vitest";
import {
  escapeHtml,
  firstNameOrNull,
  renderChainBouquetForMembers,
  renderChainBouquetReady,
  renderChainCancellationNotice,
  renderChainClosingDayEmail,
  renderChainDailyReminder,
  renderChainJoinConfirmation,
  renderTrainBouquetReady,
  renderTrainDailyReminder,
} from "./email";

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

/**
 * The pure render helpers for chain-audience emails branch on
 * organizerName (string vs. null) to drop possessive constructions
 * when the organizer is anonymous or has no User.name set.
 *
 * The original bug: when chain.organizerAnonymous was true OR
 * User.name was null, the cron passed the literal string
 * "the organizer" into the email helper, which then ran
 * firstName("the organizer") → "the" and rendered subject lines like
 * "Day 5 of the's Surrender Novena for Denis Wilson". The H1, the
 * "A prayer from the" attribution, and the "praying with the today"
 * lines were all broken in the same way.
 *
 * These tests pin three properties for each of the four chain emails:
 *   1. Named organizer renders the warm possessive form (regression)
 *   2. Anonymous (organizerName: null) renders without possessives
 *   3. No rendered output ever contains the broken-grammar substring
 *      "the's " or "the organizer's " under any input
 */
describe("firstNameOrNull", () => {
  it("returns null for null input", () => {
    expect(firstNameOrNull(null)).toBeNull();
  });

  it("returns null for empty-string input", () => {
    expect(firstNameOrNull("")).toBeNull();
  });

  it("returns null for whitespace-only input", () => {
    expect(firstNameOrNull("   ")).toBeNull();
  });

  it("returns first word from a multi-word name", () => {
    expect(firstNameOrNull("William Keough")).toBe("William");
  });

  it("returns the only word when input has no spaces", () => {
    expect(firstNameOrNull("William")).toBe("William");
  });

  it("trims surrounding whitespace before splitting", () => {
    expect(firstNameOrNull("  William Keough  ")).toBe("William");
  });
});

/**
 * Shared test fixture for chain emails. Real-world Surrender Novena
 * for Denis Wilson — mirrors the actual data shape Jilu's chains
 * would render with after the fix.
 */
const surrenderNovenaInputs = {
  prayerName: "Surrender Novena",
  recipientName: "Denis Wilson",
  intention:
    "Denis has found out that after a year of remission, his lymphoma has returned.",
  durationDays: 9,
};

describe("renderChainJoinConfirmation", () => {
  const base = {
    to: "alice@example.com",
    memberName: "Alice",
    chainUrl: "https://prayertrains.com/chain/denis-wilson-9ghj",
    ...surrenderNovenaInputs,
  };

  it("uses warm possessive form when a real name is provided", () => {
    const r = renderChainJoinConfirmation({ ...base, organizerName: "Jilu Chengat" });
    expect(r.subject).toBe("You're praying with Jilu for Denis Wilson");
    // Apostrophes inside template literals (not user-controlled) aren't
    // routed through escapeHtml — they render verbatim. Only ${eOrgFirst}
    // gets escaped, and "Jilu" has no special chars.
    expect(r.html).toContain("Jilu's <strong>Surrender Novena</strong>");
    expect(r.text).toContain("You've joined Jilu's Surrender Novena for Denis Wilson.");
  });

  it("drops the possessive when organizerName is null (anonymous)", () => {
    const r = renderChainJoinConfirmation({ ...base, organizerName: null });
    expect(r.subject).toBe("You're praying along for Denis Wilson");
    expect(r.html).toContain("You've joined the <strong>Surrender Novena</strong>");
    expect(r.text).toContain("You've joined the Surrender Novena for Denis Wilson.");
  });

  it("treats empty-string organizerName as anonymous", () => {
    const r = renderChainJoinConfirmation({ ...base, organizerName: "" });
    expect(r.subject).toBe("You're praying along for Denis Wilson");
  });

  it("never produces broken-grammar 'the's' or 'the organizer's' substrings", () => {
    for (const organizerName of [null, "", "   ", "Jilu", "Jilu Chengat"]) {
      const r = renderChainJoinConfirmation({ ...base, organizerName });
      const all = r.subject + "\n" + r.html + "\n" + r.text;
      expect(all).not.toContain("the's ");
      expect(all).not.toContain("the organizer's ");
    }
  });
});

describe("renderChainDailyReminder", () => {
  const base = {
    to: "alice@example.com",
    memberName: "Alice",
    prayerText: "O Jesus, I surrender myself to You.",
    prayerInstructions: "Pray once daily.",
    customPrayerText: null,
    day: 5,
    chainUrl: "https://prayertrains.com/chain/denis-wilson-9ghj",
    markCompleteUrl: "https://prayertrains.com/chain/denis-wilson-9ghj/complete?day=5",
    unsubscribeUrl: "https://prayertrains.com/api/chain/unsubscribe?id=abc",
    otherMembersCount: 4,
    ...surrenderNovenaInputs,
  };

  it("subject + H1 use possessive when a real name is provided", () => {
    const r = renderChainDailyReminder({ ...base, organizerName: "Jilu Chengat" });
    expect(r.subject).toBe("Day 5 of Jilu's Surrender Novena for Denis Wilson");
    // Apostrophe in the template `'s` is not escaped (only ${eOrgFirst} is).
    expect(r.html).toContain("Jilu's Surrender Novena for Denis Wilson");
  });

  it("subject + H1 drop possessive when organizerName is null", () => {
    const r = renderChainDailyReminder({ ...base, organizerName: null });
    expect(r.subject).toBe("Day 5 of the Surrender Novena for Denis Wilson");
    // H1 mirrors the chain detail page (PR #30): no "[name]'s" prefix.
    expect(r.html).toContain("Surrender Novena for Denis Wilson");
    expect(r.html).not.toContain("the's Surrender Novena");
    expect(r.html).not.toContain("the organizer's Surrender Novena");
  });

  it("custom-prayer attribution falls back to neutral label when anonymous", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: null,
      customPrayerText: "A prayer my mother taught me.",
    });
    expect(r.html).toContain("A personal prayer included");
    expect(r.html).not.toContain("A prayer from the organizer");
    expect(r.html).not.toContain("A prayer from the");
  });

  it("custom-prayer attribution uses 'A prayer from X' when named", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu",
      customPrayerText: "A prayer my mother taught me.",
    });
    expect(r.html).toContain("A prayer from Jilu");
  });

  it("'praying with X today' line drops the 'with X' suffix when anonymous", () => {
    const r = renderChainDailyReminder({ ...base, organizerName: null });
    expect(r.html).toContain("4 other people are praying today.");
    expect(r.html).not.toContain("praying with today");
    expect(r.html).not.toContain("praying with the today");
  });

  it("'praying with X today' line uses singular 'is' when count is 1", () => {
    // Pin the existing pluralization contract — neither anonymous nor
    // named branch should regress this.
    const r = renderChainDailyReminder({
      ...base,
      organizerName: null,
      otherMembersCount: 1,
    });
    expect(r.html).toContain("1 other person is praying today.");
  });

  it("does not render the 'others praying' line when count is zero", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: null,
      otherMembersCount: 0,
    });
    expect(r.html).not.toContain("praying today.");
    expect(r.html).not.toContain("other person");
    expect(r.html).not.toContain("other people");
  });

  it("never produces broken-grammar substrings under any organizerName input", () => {
    for (const organizerName of [null, "", "   ", "Jilu", "Jilu Chengat"]) {
      const r = renderChainDailyReminder({ ...base, organizerName });
      const all = r.subject + "\n" + r.html + "\n" + r.text;
      expect(all).not.toContain("the's ");
      expect(all).not.toContain("the&#39;s ");
      expect(all).not.toContain("the organizer's ");
      expect(all).not.toContain("the organizer&#39;s ");
    }
  });

  it("omits the daily reflection card when dailyReflection is null/undefined", () => {
    // Default state: dailyReflection isn't passed, or the lookup
    // returned null because the prayer type has no dailyReflections
    // array. Email must not render an empty "Day N reflection" card.
    const r = renderChainDailyReminder({ ...base, organizerName: "Jilu" });
    expect(r.html).not.toContain("Day 5 reflection");
    expect(r.html).not.toContain("reflection</p>");
    expect(r.text).not.toContain("Day 5 reflection:");
  });

  it("renders the daily reflection card when dailyReflection is provided", () => {
    const reflection =
      "Why do you confuse yourselves by worrying? Leave the care of your affairs to me and everything will be peaceful.";
    const r = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu",
      dailyReflection: reflection,
    });
    expect(r.html).toContain("Day 5 reflection");
    expect(r.html).toContain("Why do you confuse yourselves");
    expect(r.text).toContain("Day 5 reflection:");
    expect(r.text).toContain("Why do you confuse yourselves");
  });

  it("escapes HTML special characters in the daily reflection (XSS guard)", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu",
      dailyReflection: "<script>alert(1)</script>",
    });
    expect(r.html).not.toContain("<script>alert");
    expect(r.html).toContain("&lt;script&gt;");
  });

  // ─── Phase 2 locale plumbing (PR B) ───────────────────────────
  //
  // Pin the contract that `language` selects the correct email
  // dictionary at render time. These tests cover the four critical
  // paths: subject + H1 + body chrome + plaintext alternate.

  it("renders Spanish chrome when language='es' is passed (named)", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu Chengat",
      language: "es",
    });
    // Subject uses colon-separated "Día N: {prayer} de {orgFirst} por {name}"
    // — colon avoids gendered article "de la" which doesn't agree with
    // English prayer names (Phase 3 will translate the names).
    expect(r.subject).toContain("Día 5:");
    expect(r.subject).toContain("de Jilu");
    expect(r.subject).toContain("por Denis Wilson");
    // "Day N of M" day-badge becomes "Día N de M"
    expect(r.html).toContain("Día 5 de");
    // Greeting line in Spanish
    expect(r.html).toContain("Tómate un momento, Alice.");
    // CTA + footer links
    expect(r.html).toContain("Ya recé hoy");
    expect(r.html).toContain("Cancelar suscripción");
    // No English chrome leaked through
    expect(r.html).not.toContain("Take a moment");
    expect(r.html).not.toContain("Unsubscribe</a>");
    expect(r.html).not.toContain("I prayed today</a>");
  });

  it("renders Spanish chrome when language='es' is passed (anonymous)", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: null,
      language: "es",
    });
    // Anonymous subject path. No "de {name}" possessive; colon-separated.
    expect(r.subject).toMatch(/^Día 5: Surrender Novena por Denis Wilson$/);
    // Plural Spanish for the "X others praying" line
    expect(r.html).toContain("4 otras personas están rezando hoy.");
    expect(r.html).not.toContain("praying today.");
  });

  it("falls back to English when language is omitted or unsupported", () => {
    // Omitted → "en" default
    const omitted = renderChainDailyReminder({ ...base, organizerName: "Jilu" });
    expect(omitted.subject).toBe(
      "Day 5 of Jilu's Surrender Novena for Denis Wilson",
    );
    // Unsupported locale → graceful fallback to English (the dict
    // loader handles this so a stale DB value can't crash the cron).
    const unsupported = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu",
      language: "klingon",
    });
    expect(unsupported.subject).toBe(
      "Day 5 of Jilu's Surrender Novena for Denis Wilson",
    );
  });

  it("uses the locale-aware recipient-phrase prefix (Spanish 'por')", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu",
      language: "es",
    });
    // Subject + H1 must use "por Denis Wilson" (Catholic prayer
    // register), not "for Denis Wilson" or "para Denis Wilson".
    expect(r.subject).toContain("por Denis Wilson");
    expect(r.html).toContain("por Denis Wilson");
    expect(r.html).not.toContain("for Denis Wilson");
    expect(r.html).not.toContain("para Denis Wilson");
  });

  it("Spanish plaintext fallback localizes CTA + reflection labels", () => {
    const r = renderChainDailyReminder({
      ...base,
      organizerName: "Jilu",
      dailyReflection: "Confía en Mí.",
      language: "es",
    });
    expect(r.text).toContain("Reflexión del día 5:");
    expect(r.text).toContain("Ya recé hoy:");
    expect(r.text).toContain("Visitar la página de oración:");
    expect(r.text).not.toContain("I prayed today:");
    expect(r.text).not.toContain("Day 5 reflection:");
  });
});

// ─── Train daily reminder render coverage (Phase 2 / PR B cleanup) ────
//
// `sendDailyReminder` is now a thin wrapper over `renderTrainDailyReminder`,
// which returns { subject, html, text } purely. These tests pin the
// localization + escape contracts without touching Resend.

describe("renderTrainDailyReminder", () => {
  const base = {
    to: "alice@example.com",
    claimerName: "Alice",
    recipientName: "Denis Wilson",
    prayerName: "Surrender Novena",
    prayerText: "O Jesus, I surrender myself to You.",
    prayerInstructions: "Pray once daily.",
    customPrayerText: null,
    organizerFirstName: "Jilu",
    trainUrl: "https://prayertrains.com/p/the-wilson-family-9ghj",
    completeUrl:
      "https://prayertrains.com/p/the-wilson-family-9ghj/complete?slot=abc&token=def",
    slotId: "slot_abc",
  };

  it("renders English by default", () => {
    const r = renderTrainDailyReminder(base);
    expect(r.subject).toBe(
      "Prayer reminder: Surrender Novena for Denis Wilson",
    );
    expect(r.html).toContain("Today's Prayer for Denis Wilson");
    expect(r.html).toContain("Hi Alice, here's your prayer commitment for today.");
    expect(r.html).toContain(">\n              I prayed\n            </a>");
    expect(r.text).toContain("Today's prayer for Denis Wilson");
    expect(r.text).toContain("I prayed:");
  });

  it("renders Spanish chrome when language='es' is passed", () => {
    const r = renderTrainDailyReminder({ ...base, language: "es" });
    // Subject + H1 + greeting all in Spanish, with "por" (not "for"
    // and not "para") in the recipient phrase.
    expect(r.subject).toBe(
      "Recordatorio de oración: Surrender Novena por Denis Wilson",
    );
    expect(r.html).toContain("Oración de hoy por Denis Wilson");
    expect(r.html).toContain(
      "Hola Alice, este es tu compromiso de oración para hoy.",
    );
    // CTA + view link in Spanish
    expect(r.html).toContain("Ya recé");
    expect(r.html).toContain("Ver el PrayerTrain");
    // Spanish footer (translates the marketing line)
    expect(r.html).toContain(
      "PrayerTrain — Oración organizada para quienes la necesitan",
    );
    // Plaintext localized too
    expect(r.text).toContain("Oración de hoy por Denis Wilson");
    expect(r.text).toContain("Ya recé:");
    expect(r.text).toContain("Ver el PrayerTrain:");
    // No English chrome leaked
    expect(r.html).not.toContain("Today's Prayer for");
    expect(r.html).not.toContain("Hi Alice");
    expect(r.text).not.toContain("I prayed:");
    expect(r.text).not.toContain("View the prayer train:");
  });

  it("falls back to English when language is omitted or unsupported", () => {
    // Same fallback contract as renderChainDailyReminder.
    const unsupported = renderTrainDailyReminder({
      ...base,
      language: "klingon",
    });
    expect(unsupported.subject).toBe(
      "Prayer reminder: Surrender Novena for Denis Wilson",
    );
    expect(unsupported.html).toContain("Today's Prayer for Denis Wilson");

    const empty = renderTrainDailyReminder({ ...base, language: "" });
    expect(empty.subject).toBe(
      "Prayer reminder: Surrender Novena for Denis Wilson",
    );
  });

  it("escapes HTML special characters in user-controlled fields", () => {
    // The recipient name, claimer name, prayer name, prayer text, prayer
    // instructions, custom prayer, and organizer first name are all
    // user-controlled. None of them should render unescaped in the
    // HTML body. Plaintext alternate is intentionally NOT escaped
    // (it's plain text).
    const r = renderTrainDailyReminder({
      ...base,
      recipientName: "<script>alert(1)</script>",
      claimerName: "Maria & José",
      prayerName: "Novena to St. Joseph <em>",
      prayerText: "O glorious St. Joseph & Patron",
      prayerInstructions: "Pray <quietly>",
      customPrayerText: "A family <prayer> & blessing",
      organizerFirstName: "<b>Jilu</b>",
    });
    // Body HTML must never contain the raw script/em tags
    expect(r.html).not.toContain("<script>alert");
    expect(r.html).not.toContain("Novena to St. Joseph <em>");
    expect(r.html).not.toContain("<quietly>");
    expect(r.html).not.toContain("<b>Jilu</b>");
    // Properly escaped substitutions appear instead
    expect(r.html).toContain("&lt;script&gt;");
    expect(r.html).toContain("Maria &amp; José");
    expect(r.html).toContain("Novena to St. Joseph &lt;em&gt;");
    expect(r.html).toContain("O glorious St. Joseph &amp; Patron");
    expect(r.html).toContain("Pray &lt;quietly&gt;");
    expect(r.html).toContain("A family &lt;prayer&gt; &amp; blessing");
    expect(r.html).toContain("&lt;b&gt;Jilu&lt;/b&gt;");
  });

  it("renders custom-prayer attribution with named/anonymous variants in Spanish", () => {
    const named = renderTrainDailyReminder({
      ...base,
      organizerFirstName: "Jilu",
      customPrayerText: "A prayer my mother taught me.",
      language: "es",
    });
    expect(named.html).toContain("Una oración de Jilu");
    // Plaintext too
    expect(named.text).toContain("Una oración de Jilu");

    const anon = renderTrainDailyReminder({
      ...base,
      organizerFirstName: null,
      customPrayerText: "A prayer my mother taught me.",
      language: "es",
    });
    expect(anon.html).toContain("Una oración personal incluida");
    expect(anon.html).not.toContain("Una oración de");
    expect(anon.text).toContain("Una oración personal incluida");
  });
});

describe("renderChainClosingDayEmail", () => {
  const base = {
    to: "alice@example.com",
    memberName: "Alice",
    prayerName: "Surrender Novena",
    recipientName: "Denis Wilson" as string | null,
    closingNote: null as string | null,
    chainUrl: "https://prayertrains.com/chain/denis-wilson-9ghj",
  };

  it("subject keeps 'with X' when a name is provided", () => {
    const r = renderChainClosingDayEmail({ ...base, organizerName: "Jilu" });
    expect(r.subject).toBe(
      "The Surrender Novena is complete — thank you for praying with Jilu",
    );
  });

  it("subject drops 'with X' when organizerName is null", () => {
    const r = renderChainClosingDayEmail({ ...base, organizerName: null });
    expect(r.subject).toBe("The Surrender Novena is complete — thank you for praying");
    expect(r.subject).not.toContain("with the organizer");
    expect(r.subject).not.toContain("with the");
  });

  it("body thank-you keeps 'with X' when a name is provided", () => {
    const r = renderChainClosingDayEmail({ ...base, organizerName: "Jilu" });
    expect(r.html).toContain("Thank you for praying with Jilu for Denis Wilson, Alice.");
  });

  it("body thank-you drops 'with X' when anonymous", () => {
    const r = renderChainClosingDayEmail({ ...base, organizerName: null });
    expect(r.html).toContain("Thank you for praying for Denis Wilson, Alice.");
    expect(r.html).not.toContain("praying with the for");
  });

  it("closing-note attribution uses generic label when anonymous", () => {
    const r = renderChainClosingDayEmail({
      ...base,
      organizerName: null,
      closingNote: "Thank you all for carrying this with us.",
    });
    expect(r.html).toContain("A note from the organizer");
  });

  it("closing-note attribution uses 'A note from X' when named", () => {
    const r = renderChainClosingDayEmail({
      ...base,
      organizerName: "Jilu",
      closingNote: "Thank you all for carrying this with us.",
    });
    expect(r.html).toContain("A note from Jilu");
  });
});

describe("renderChainCancellationNotice", () => {
  const base = {
    to: "alice@example.com",
    memberName: "Alice",
    prayerName: "Surrender Novena",
    recipientName: "Denis Wilson" as string | null,
    intention: "Denis has found out that...",
  };

  it("subject + H1 use possessive when a name is provided", () => {
    const r = renderChainCancellationNotice({ ...base, organizerName: "Jilu" });
    expect(r.subject).toBe(
      "Jilu's Surrender Novena for Denis Wilson has been cancelled",
    );
    expect(r.html).toContain("Jilu&rsquo;s Surrender Novena for Denis Wilson has been cancelled.");
  });

  it("subject + H1 drop possessive when organizerName is null", () => {
    const r = renderChainCancellationNotice({ ...base, organizerName: null });
    expect(r.subject).toBe(
      "The Surrender Novena for Denis Wilson has been cancelled",
    );
    expect(r.html).toContain("The Surrender Novena for Denis Wilson has been cancelled.");
    expect(r.html).not.toContain("the&rsquo;s Surrender Novena");
  });

  it("body 'has closed this' sentence reads cleanly in both modes", () => {
    const named = renderChainCancellationNotice({ ...base, organizerName: "Jilu" });
    expect(named.html).toContain("Jilu has closed this shared prayer");

    const anon = renderChainCancellationNotice({ ...base, organizerName: null });
    expect(anon.html).toContain("The organizer has closed this shared prayer");
  });
});

/**
 * Bouquet-ready emails fire to the organizer when their prayer
 * transitions to COMPLETED (manual close OR cron auto-close path).
 * The email surfaces the spiritual bouquet PDF link so the organizer
 * doesn't have to hunt through the manage page to find it.
 *
 * Originated from end-user feedback: William closed Benji's novena
 * May 6 2026 and asked "shouldn't I get an email with the bouquet?"
 *
 * Same anonymity-aware contract as the rest of the chain emails:
 * organizerName=null routes through the no-name branch (drops
 * possessive constructions, substitutes neutral copy).
 */
describe("renderChainBouquetReady", () => {
  const base = {
    to: "william@example.com",
    prayerName: "Surrender Novena",
    recipientName: "Benji" as string | null,
    bouquetUrl: "https://prayertrains.com/api/bouquet/chain/benji-abc1",
    chainUrl: "https://prayertrains.com/chain/benji-abc1",
  };

  it("uses warm greeting with organizer's name when present", () => {
    const r = renderChainBouquetReady({ ...base, organizerName: "William" });
    expect(r.subject).toBe("Your spiritual bouquet for Benji is ready");
    expect(r.html).toContain("William, the Surrender Novena for Benji is complete.");
    expect(r.text).toContain("William, the Surrender Novena for Benji is complete.");
  });

  it("drops the name from the greeting when organizerName is null", () => {
    const r = renderChainBouquetReady({ ...base, organizerName: null });
    expect(r.subject).toBe("Your spiritual bouquet for Benji is ready");
    expect(r.html).toContain("The Surrender Novena for Benji is complete.");
    expect(r.html).not.toContain(", the Surrender Novena");
  });

  it("subject drops the recipient phrase when no recipient name", () => {
    const r = renderChainBouquetReady({
      ...base,
      organizerName: "William",
      recipientName: null,
    });
    expect(r.subject).toBe("Your spiritual bouquet is ready");
    expect(r.html).toContain("The spiritual bouquet is ready.");
  });

  it("renders the download CTA pointing at the bouquet URL", () => {
    const r = renderChainBouquetReady({ ...base, organizerName: "William" });
    expect(r.html).toContain(base.bouquetUrl);
    expect(r.html).toContain("Download the spiritual bouquet");
  });

  it("renders a link back to the prayer page", () => {
    const r = renderChainBouquetReady({ ...base, organizerName: "William" });
    expect(r.html).toContain(base.chainUrl);
  });

  it("never produces broken-grammar substrings under any organizerName input", () => {
    for (const organizerName of [null, "", "   ", "William", "William Keough"]) {
      const r = renderChainBouquetReady({ ...base, organizerName });
      const all = r.subject + "\n" + r.html + "\n" + r.text;
      expect(all).not.toContain("the's ");
      expect(all).not.toContain("the&#39;s ");
      expect(all).not.toContain("the organizer's ");
      expect(all).not.toContain("the organizer&#39;s ");
    }
  });
});

describe("renderTrainBouquetReady", () => {
  const base = {
    to: "william@example.com",
    recipientName: "Benji",
    bouquetUrl: "https://prayertrains.com/api/bouquet/benji-train-xyz",
    trainUrl: "https://prayertrains.com/p/benji-train-xyz",
  };

  it("uses warm greeting with organizer's name when present", () => {
    const r = renderTrainBouquetReady({ ...base, organizerName: "William" });
    expect(r.subject).toBe("Your spiritual bouquet for Benji is ready");
    expect(r.html).toContain("William, the prayer train for Benji is complete.");
    expect(r.text).toContain("William, the prayer train for Benji is complete.");
  });

  it("drops the name from the greeting when organizerName is null", () => {
    const r = renderTrainBouquetReady({ ...base, organizerName: null });
    expect(r.subject).toBe("Your spiritual bouquet for Benji is ready");
    expect(r.html).toContain("The prayer train for Benji is complete.");
  });

  it("renders the download CTA + link back to the train page", () => {
    const r = renderTrainBouquetReady({ ...base, organizerName: "William" });
    expect(r.html).toContain(base.bouquetUrl);
    expect(r.html).toContain(base.trainUrl);
    expect(r.html).toContain("Download the spiritual bouquet");
  });

  it("never produces broken-grammar substrings under any organizerName input", () => {
    for (const organizerName of [null, "", "   ", "William", "William Keough"]) {
      const r = renderTrainBouquetReady({ ...base, organizerName });
      const all = r.subject + "\n" + r.html + "\n" + r.text;
      expect(all).not.toContain("the's ");
      expect(all).not.toContain("the&#39;s ");
      expect(all).not.toContain("the organizer's ");
      expect(all).not.toContain("the organizer&#39;s ");
    }
  });
});

/**
 * Member-facing variant of the bouquet email. Tone is gracious-
 * thank-you, not "your bouquet" — members joined the prayer rather
 * than organizing it. Used by the resend-chain-bouquet one-off and
 * (potentially) future close flows that want every member to
 * receive the bouquet artifact.
 */
describe("renderChainBouquetForMembers", () => {
  const base = {
    to: "alice@example.com",
    memberName: "Alice",
    prayerName: "Surrender Novena",
    recipientName: "Benji" as string | null,
    bouquetUrl: "https://prayertrains.com/api/bouquet/chain/benji-abc1",
    chainUrl: "https://prayertrains.com/chain/benji-abc1",
  };

  it("uses 'praying with X' phrasing when organizer name is present", () => {
    const r = renderChainBouquetForMembers({ ...base, organizerName: "William" });
    expect(r.subject).toBe("The spiritual bouquet for Benji");
    expect(r.html).toContain("Alice, thank you for praying with William for Benji.");
    expect(r.text).toContain("Alice, thank you for praying with William for Benji.");
  });

  it("drops 'with X' when organizerName is null (anonymous)", () => {
    const r = renderChainBouquetForMembers({ ...base, organizerName: null });
    expect(r.html).toContain("Alice, thank you for joining this prayer for Benji.");
    expect(r.html).not.toContain("praying with the organizer");
    expect(r.html).not.toContain("praying with the for");
  });

  it("subject falls back to prayer name when no recipient", () => {
    const r = renderChainBouquetForMembers({
      ...base,
      organizerName: "William",
      recipientName: null,
    });
    expect(r.subject).toBe("The spiritual bouquet from the Surrender Novena");
  });

  it("renders the download CTA + link back to the prayer page", () => {
    const r = renderChainBouquetForMembers({ ...base, organizerName: "William" });
    expect(r.html).toContain(base.bouquetUrl);
    expect(r.html).toContain(base.chainUrl);
    expect(r.html).toContain("View the spiritual bouquet");
  });

  it("escapes HTML in member name (XSS guard)", () => {
    const r = renderChainBouquetForMembers({
      ...base,
      memberName: "<script>alert(1)</script>",
      organizerName: "William",
    });
    expect(r.html).not.toContain("<script>alert");
    expect(r.html).toContain("&lt;script&gt;");
  });

  it("never produces broken-grammar substrings under any organizerName input", () => {
    for (const organizerName of [null, "", "   ", "William", "William Keough"]) {
      const r = renderChainBouquetForMembers({ ...base, organizerName });
      const all = r.subject + "\n" + r.html + "\n" + r.text;
      expect(all).not.toContain("the's ");
      expect(all).not.toContain("the&#39;s ");
      expect(all).not.toContain("the organizer's ");
      expect(all).not.toContain("the organizer&#39;s ");
    }
  });
});
