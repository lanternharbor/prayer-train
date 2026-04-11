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
 * Always returned WITHOUT a trailing slash, with all surrounding whitespace
 * stripped (env vars copy-pasted from a dashboard often arrive with a
 * trailing newline that breaks string interpolation into URLs).
 */
export function getBaseUrl(): string {
  const explicit = clean(process.env.NEXTAUTH_URL);
  if (explicit) return explicit;

  const prodHost = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (prodHost) return `https://${prodHost}`;

  const anyHost = clean(process.env.VERCEL_URL);
  if (anyHost) return `https://${anyHost}`;

  return "https://www.ourfaithtrain.com";
}

function clean(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}
