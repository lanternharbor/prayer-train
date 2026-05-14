import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { esTranslations } from "./seed/translations/es";
import { ptBRTranslations } from "./seed/translations/pt-BR";
import { filTranslations } from "./seed/translations/fil";
import { plTranslations } from "./seed/translations/pl";
import type { PrayerTranslationSeed } from "./seed/translations/types";
import { buildTranslationUpsertData } from "./seed/translations/upsert-data";

/**
 * Idempotent seed runner for PrayerTypeTranslation rows.
 *
 * - Pulls each per-locale translations array
 * - Resolves prayerSlug → prayerTypeId via a single findMany lookup
 * - Upserts on the (prayerTypeId, locale) unique constraint
 * - Logs per-row results: created / updated / skipped (no matching slug)
 *
 * Run with:  npm run seed:translations
 *
 * Safe to re-run. The seed file IS the source of truth — re-running
 * with a partial entry will set previously-populated fields back to
 * null, which is the intended GitOps semantics. To preserve a field,
 * keep it in the seed entry. To remove a field, delete it from the
 * entry and re-run.
 *
 * Reviewer signoff workflow:
 *   1. Reviewer reads the seed entry (or runs the seed first to
 *      check the rendered fallback experience)
 *   2. Reviewer adds `reviewedAt: new Date("YYYY-MM-DD")` to the
 *      entry
 *   3. PR with the date change + the reviewer's name in commit msg
 *   4. After merge, run `npm run seed:translations` against prod
 *   5. The translation goes live for visitors in the matching locale
 */
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface LocaleBundle {
  locale: string;
  rows: PrayerTranslationSeed[];
}

const bundles: LocaleBundle[] = [
  { locale: "es", rows: esTranslations },
  { locale: "pt-BR", rows: ptBRTranslations },
  { locale: "fil", rows: filTranslations },
  { locale: "pl", rows: plTranslations },
];

async function main() {
  const totalRows = bundles.reduce((sum, b) => sum + b.rows.length, 0);
  console.log(
    `\n🌐 Seeding PrayerTypeTranslation — ${bundles.length} locales, ` +
      `${totalRows} total rows authored.\n`,
  );

  if (totalRows === 0) {
    console.log(
      "  (No translation rows in any locale file yet. Phase ε editorial " +
        "work hasn't started. This is a no-op.)\n",
    );
    return;
  }

  // One round-trip to build the slug → id lookup; reused across every
  // bundle. Saves N round-trips when seed runs grow.
  const allPrayers = await prisma.prayerType.findMany({
    select: { id: true, slug: true },
  });
  const slugToId = new Map(allPrayers.map((p) => [p.slug, p.id]));

  let upserted = 0;
  let reviewed = 0;
  let skipped = 0;

  for (const { locale, rows } of bundles) {
    if (rows.length === 0) {
      console.log(`[${locale}] (empty — skipping)`);
      continue;
    }
    console.log(`[${locale}] ${rows.length} entries`);
    for (const row of rows) {
      const prayerTypeId = slugToId.get(row.prayerSlug);
      if (!prayerTypeId) {
        console.warn(
          `  ! skipped: no PrayerType row for slug "${row.prayerSlug}". ` +
            `Run prisma/seed.ts first if this is a new prayer.`,
        );
        skipped++;
        continue;
      }
      const data = buildTranslationUpsertData(row);
      await prisma.prayerTypeTranslation.upsert({
        where: {
          prayerTypeId_locale: { prayerTypeId, locale },
        },
        update: data,
        create: { prayerTypeId, locale, ...data },
      });
      upserted++;
      if (data.reviewedAt) reviewed++;
      const status = data.reviewedAt
        ? `✓ reviewed ${data.reviewedAt.toISOString().slice(0, 10)}`
        : "○ unreviewed (English fallback at read time)";
      console.log(`  + ${row.prayerSlug.padEnd(40)} ${status}`);
    }
  }

  console.log(
    `\n${upserted} translation rows upserted (${reviewed} reviewed → live, ` +
      `${upserted - reviewed} unreviewed → English fallback). ${skipped} skipped.\n`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
