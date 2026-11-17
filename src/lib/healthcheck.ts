/**
 * Healthchecks.io heartbeat for the daily crons.
 *
 * Before Nov 2026 the crons pinged the plain success URL after every
 * run, even when every email send had failed. Oct 25 - Nov 5 2026 the
 * train cron ran daily with sent=0 and every reminder rejected by
 * Resend; the monitor stayed green for 11 days. Now a run that tried to
 * send and delivered nothing pings the `/fail` endpoint instead, which
 * Healthchecks treats as an immediate alert.
 */

export type CronRunStats = {
  sent: number;
  errors: number;
};

/**
 * A run is unhealthy when it hit errors and delivered nothing. A run
 * with errors but some sends is a partial failure (one bad address, a
 * one-off rate-limit drop); those are logged per slot and do not page.
 * A run with zero errors and zero sends is a quiet day, not a failure.
 */
export function isUnhealthyRun({ sent, errors }: CronRunStats): boolean {
  return errors > 0 && sent === 0;
}

/**
 * Healthchecks signals failure via `<ping-url>/fail`. Insert the
 * suffix before any query string and tolerate a trailing slash.
 */
export function healthcheckPingUrl(baseUrl: string, stats: CronRunStats): string {
  if (!isUnhealthyRun(stats)) return baseUrl;
  const [path, query] = baseUrl.split("?", 2);
  const failPath = `${path.replace(/\/+$/, "")}/fail`;
  return query === undefined ? failPath : `${failPath}?${query}`;
}

/**
 * Post the heartbeat. Never throws: a Healthchecks outage must not
 * fail or mask the cron run itself.
 */
export async function pingHealthcheck(
  baseUrl: string | undefined,
  stats: CronRunStats,
  body: string,
  logPrefix: string,
): Promise<void> {
  if (!baseUrl) return;
  try {
    await fetch(healthcheckPingUrl(baseUrl, stats), { method: "POST", body });
  } catch (e) {
    console.error(`${logPrefix} healthcheck ping failed:`, e);
  }
}
