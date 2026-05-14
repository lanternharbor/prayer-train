"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { setLocale } from "@/lib/i18n-actions";
import {
  locales,
  LOCALE_LABELS,
  type Locale,
} from "@/i18n/config";
import { localizedHref, stripLocale } from "@/i18n/links";

/**
 * Locale switcher.
 *
 * Phase α: switches the URL (router.push) AND writes the cookie.
 *
 * - URL change is the SEO-correct primary action: a Spanish-cookie
 *   visitor on /en/browse who clicks "Español" navigates to
 *   /es/browse, where Spanish content is canonical for the URL.
 * - Cookie write persists the choice so internal `<Link>` clicks
 *   that consume `useLocale()` produce locale-prefixed hrefs on the
 *   next visit too (without re-clicking the switcher).
 * - We do NOT auto-redirect on first visit; Google guidelines treat
 *   that as cloaking-adjacent. The cookie's job is to remember an
 *   EXPLICIT choice for next time, not to override the URL.
 */
export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as Locale;
    if (next === currentLocale) return;

    // Build the target URL: strip the current locale prefix (if any)
    // from the pathname, then re-apply the new locale. This keeps the
    // user on the same logical page they were on (e.g. /en/browse →
    // /es/browse, /en/p/the-spina-fam → /es/p/the-spina-fam).
    const bare = stripLocale(pathname || "/");
    const target = localizedHref(next, bare);

    startTransition(async () => {
      // Write the cookie first so the next visit honors the choice
      // even on bare URLs. The server action's revalidatePath is fine
      // — Next will treat the upcoming navigation as the fresh render.
      await setLocale(next, target);
      router.push(target);
      router.refresh();
    });
  };

  return (
    <label className="relative inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
      <span className="sr-only">
        Change language / Cambiar idioma
      </span>
      <Languages
        className="w-4 h-4 shrink-0"
        aria-hidden="true"
      />
      <select
        value={currentLocale}
        onChange={onChange}
        disabled={isPending}
        aria-label="Change language"
        className="appearance-none bg-transparent pr-5 pl-1 py-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded cursor-pointer"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
      {/* Custom dropdown caret since we hid the native one for styling */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-xs"
      >
        ▾
      </span>
    </label>
  );
}
