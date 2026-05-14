import "server-only";
import {
  defaultLocale,
  isLocale,
  type Locale,
} from "./config";

/**
 * Lazy dictionary loader. Mirrors the pattern from the official Next 16
 * App Router i18n guide (node_modules/next/dist/docs/01-app/02-guides/
 * internationalization.md). Each locale's messages file is loaded on
 * demand and tree-shaken when not used.
 *
 * Marked `server-only` so accidental client-side imports fail at build
 * time — dictionaries can be large and we don't want them in the
 * browser bundle. Pages should pass needed strings down to client
 * components as plain props.
 */
const dictionaries = {
  en: () => import("./messages/en.json").then((m) => m.default),
  es: () => import("./messages/es.json").then((m) => m.default),
  "pt-BR": () => import("./messages/pt-BR.json").then((m) => m.default),
  fil: () => import("./messages/fil.json").then((m) => m.default),
} as const;

/**
 * The dictionary shape. Pinned to the English file (the canonical
 * source) so every other locale's JSON is forced to declare the same
 * keys — a missing key surfaces as a TypeScript error at the callsite.
 */
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

/**
 * Load the messages dictionary for a given locale. Falls back to the
 * default locale if the requested one isn't supported (defensive guard
 * — `isLocale` is the canonical check, but this gives us a graceful
 * runtime fallback if a stale cookie somehow contains a removed
 * locale code).
 */
export async function getDictionary(locale: string): Promise<Dictionary> {
  const safe: Locale = isLocale(locale) ? locale : defaultLocale;
  return dictionaries[safe]();
}
