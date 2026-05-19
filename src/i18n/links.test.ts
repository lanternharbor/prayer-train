import { describe, expect, it } from "vitest";
import { pathForLocale } from "./links";

describe("pathForLocale", () => {
  it("returns the bare path for the default locale (clean URL)", () => {
    expect(pathForLocale("en", "/signin")).toBe("/signin");
  });

  it("prefixes the locale for non-default locales", () => {
    expect(pathForLocale("es", "/signin")).toBe("/es/signin");
    expect(pathForLocale("pt-BR", "/signin")).toBe("/pt-BR/signin");
    expect(pathForLocale("fil", "/dashboard")).toBe("/fil/dashboard");
    expect(pathForLocale("pl", "/p/some-slug")).toBe("/pl/p/some-slug");
  });

  it("preserves query strings", () => {
    expect(
      pathForLocale("es", "/signin?callbackUrl=%2Fes%2Fcreate%2Ftrain"),
    ).toBe("/es/signin?callbackUrl=%2Fes%2Fcreate%2Ftrain");
  });

  it("adds a leading slash if the caller forgot one", () => {
    expect(pathForLocale("es", "signin")).toBe("/es/signin");
  });

  it("returns the bare root for the default locale", () => {
    expect(pathForLocale("en", "/")).toBe("/");
  });

  it("prefixes the root for non-default locales", () => {
    expect(pathForLocale("es", "/")).toBe("/es/");
  });
});
