/**
 * Resolve the public base URL of the deployed app.
 *
 * Preference order:
 *   1. NEXTAUTH_URL — explicitly set, e.g. "https://www.ourfaithtrain.com"
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel sets this on production deploys
 *      (host only, no scheme)
 *   3. VERCEL_URL — Vercel sets this on every deploy (host only, no scheme)
 *   4. Hardcoded production fallback
 *
 * Always returned WITHOUT a trailing slash.
 */
export function getBaseUrl(): string {
  const explicit = process.env.NEXTAUTH_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prodHost) return `https://${prodHost}`;

  const anyHost = process.env.VERCEL_URL;
  if (anyHost) return `https://${anyHost}`;

  return "https://www.ourfaithtrain.com";
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
