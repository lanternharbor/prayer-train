"use client";

import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "./config";

/**
 * Client-side locale context.
 *
 * Server components have access to the active locale via `params.locale`
 * (Next 16 dynamic route param). Client components don't — they need
 * the layout to thread it down through this provider.
 *
 * The root layout (`src/app/[locale]/layout.tsx`) wraps every page in
 * <LocaleProvider value={params.locale}>, so any descendant client
 * component can call `useLocale()` to get the active locale and pass
 * it to `localizedHref(locale, path)` from `./links`.
 *
 * Pattern in client components:
 *   const locale = useLocale();
 *   <Link href={localizedHref(locale, "/browse")}>Find a PrayerTrain</Link>
 *
 * Or wrap a `<Link>` to consume the context automatically — see
 * `src/components/locale-link.tsx`.
 */
const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  value,
  children,
}: {
  value: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
