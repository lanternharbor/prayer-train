/**
 * Email dictionary loader.
 *
 * Synchronous accessor (unlike the UI dictionary's lazy async loader)
 * because the email send path lives in cron + server actions where we
 * want minimal overhead per dispatch. Both locales are small JSON-like
 * objects, so eager import is fine.
 *
 * Falls back to English when the requested language isn't supported.
 * The PrayerTrain.language / PrayerChain.language columns are typed
 * `String` in Prisma, so a stale value (e.g. a future locale that was
 * later removed) won't crash the cron — it just degrades to English
 * for that row. The DB stays correct; only the rendered output falls
 * back.
 */
import { en, type EnglishEmailDictionary } from "./en";
import { es } from "./es";
import { ptBR } from "./pt-BR";
import { fil } from "./fil";

const dictionaries: Record<string, EnglishEmailDictionary> = {
  en,
  es,
  // BCP 47 string key — matches PrayerTrain.language / PrayerChain.language
  // values written by the create flow ("pt-BR", not "ptBR").
  "pt-BR": ptBR,
  fil,
};

export type EmailDictionary = EnglishEmailDictionary;

export function getEmailDictionary(language: string): EmailDictionary {
  return dictionaries[language] ?? dictionaries.en;
}

// Re-export the canonical type so callers don't need a second import.
export type { EnglishEmailDictionary };
