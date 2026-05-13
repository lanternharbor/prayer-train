"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { setLocale } from "@/lib/i18n-actions";
import {
  locales,
  LOCALE_LABELS,
  type Locale,
} from "@/i18n/config";

/**
 * Locale switcher. Renders as a compact dropdown of the supported
 * locale labels. Clicking an entry calls the setLocale server action,
 * which writes the NEXT_LOCALE cookie and revalidates the current path
 * so all server components re-render with the new dictionary.
 *
 * Receives the active locale from its server-component parent (the
 * Header) rather than reading the cookie itself, so the initial render
 * matches what the server rendered (no hydration flicker).
 *
 * Accessibility: the underlying control is a `<select>` for native
 * keyboard support + the most accessible default. The styling layer
 * matches the rest of the header nav so it doesn't look like a
 * native form control.
 */
export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    if (next === currentLocale) return;
    startTransition(async () => {
      await setLocale(next, pathname || "/");
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
