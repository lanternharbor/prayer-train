"use client";

import Link, { type LinkProps } from "next/link";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { useLocale } from "@/i18n/locale-context";
import { localizedHref } from "@/i18n/links";
import { type Locale } from "@/i18n/config";

/**
 * Drop-in replacement for `next/link` `<Link>` that prefixes the
 * locale automatically.
 *
 * The `href` should be the **bare** path (e.g. `/browse`,
 * `/prayers/${slug}`, `/p/${slug}`); the component reads the active
 * locale from `useLocale()` (populated by the LocaleProvider in the
 * root layout) and prepends it: `/browse` → `/en/browse` for English,
 * `/browse` → `/es/browse` for Spanish.
 *
 * Bypasses (passes through unchanged):
 *   - external URLs (http://, https://, mailto:, tel:)
 *   - anchor-only links (`#foo`)
 *   - API routes (`/api/...`)
 *   - already-prefixed paths (`/en/...`, `/es/...`) — defensive
 *     against double-prefixing if a caller forgot to switch from
 *     a hardcoded path
 *
 * The optional `locale` prop overrides the context for a single
 * link (rare — used by the LocaleSwitcher to render explicit
 * cross-locale targets). Server components shouldn't usually need it;
 * the LocaleProvider in the layout makes the context available
 * everywhere by the time any client component renders.
 *
 * For href values that aren't strings (e.g., `{ pathname, query }`
 * objects), the component falls through to `<Link>` without
 * modifying — those are rare in this codebase and not the audit
 * target. If we start using URL objects, this would need to grow a
 * pathname-rewrite branch.
 */
type LocaleLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  /** Override the active locale for this specific link. */
  locale?: Locale;
};

// eslint-disable-next-line react/display-name
export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  function LocaleLink({ href, locale: localeOverride, ...rest }, ref) {
    const ctxLocale = useLocale();
    const locale = localeOverride ?? ctxLocale;
    const localized = localizedHref(locale, href);
    // Pass through every other prop verbatim — `prefetch`, `replace`,
    // `scroll`, `shallow`, `passHref`, `legacyBehavior`, `className`,
    // children, etc. all go straight to next/link's <Link>.
    return <Link {...(rest as LinkProps)} href={localized} ref={ref} />;
  },
);
