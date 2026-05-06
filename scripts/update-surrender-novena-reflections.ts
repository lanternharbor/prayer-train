/**
 * Populate the Surrender Novena's per-day content on the prod row.
 *
 * Jilu Chengat (May 6 2026) flagged that the daily reflections aren't
 * showing up on the Surrender Novena chains she organized for Denis
 * Wilson. The seed `instructions` field promises them, but the data
 * model only had a single `prayerText` blob until PR #37 landed the
 * `dailyReflections String[]` column (currently empty in prod).
 *
 * This script writes three fields on the existing prod row:
 *   - dailyReflections — nine per-day meditations
 *   - instructions     — adds the "repeat the refrain ten times" detail
 *   - prayerText       — refrain once with "(Repeat ten times.)"
 *
 * The render code on the chain page, in the chain daily reminder
 * email, and on /prayers/[slug] is empty-gated on dailyReflections,
 * so the reflections light up for every active Surrender Novena
 * chain on the next chain-cron tick (08:00 UTC).
 *
 * Source: the widely-circulated English translation of Don Dolindo
 * Ruotolo's "Novena di Abbandono." Operator (William) sourced and
 * approved the specific wording in chat. Light copy normalization
 * applied (curly quotes -> straight ASCII; otherwise verbatim).
 *
 * Hard safety guarantees:
 *
 * 1. **Slug match is hardcoded and exact.** This script can ONLY
 *    update the row where `slug = 'surrender-novena'`. No flag or
 *    argument to target a different prayer.
 * 2. **Updates exactly three fields.** dailyReflections, instructions,
 *    and prayerText. Every other column on the row is left untouched.
 * 3. **Fail-closed pre-flight:** if the target row is missing or
 *    has unexpected shape (daysRequired !== 9, etc.), the script
 *    aborts before issuing any UPDATE.
 * 4. **No cross-row writes.** Every other PrayerType row is
 *    untouched.
 *
 * Run with one of:
 *   npx tsx scripts/update-surrender-novena-reflections.ts
 *     (interactive — prompts for auth phrase)
 *   npx tsx scripts/update-surrender-novena-reflections.ts "yes update surrender novena reflections"
 *     (CLI arg — used when an agent has received explicit auth in chat)
 *
 * The script does not proceed unless either:
 *   (a) STDIN is a TTY and the user types
 *       "yes update surrender novena reflections" at the prompt, OR
 *   (b) the same phrase appears as argv[2].
 *
 * Idempotent: re-running with the same content is a no-op write.
 * Re-running after manual edits in the DB will overwrite whatever
 * was there — so don't run this after Fr. Palladino has tweaked the
 * text directly on the row, only after re-syncing the source-of-truth
 * here.
 */

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const TARGET_SLUG = "surrender-novena";
const AUTH_PHRASE = "yes update surrender novena reflections";

// Mirrors the same fields in prisma/seed.ts so a clean re-seed and
// this targeted script land identical content. If you edit one,
// edit the other.
const NEW_INSTRUCTIONS =
  "Pray once daily for nine consecutive days. Each day has a unique meditation on a different aspect of surrender. After reading the day's meditation, close by repeating the refrain ten times: 'O Jesus, I surrender myself to You, take care of everything!'";

const NEW_PRAYER_TEXT =
  "O Jesus, I surrender myself to You, take care of everything!\n\n(Repeat ten times.)";

const SURRENDER_NOVENA_REFLECTIONS: readonly string[] = [
  // Day 1
  "Why do you confuse yourselves by worrying? Leave the care of your affairs to me and everything will be peaceful. I say to you in truth that every act of true, blind, complete surrender to me produces the effect that you desire and resolves all difficult situations.",

  // Day 2
  "Surrender to me does not mean to fret, to be upset, or to lose hope, nor does it mean offering to me a worried prayer asking me to follow you and change your worry into prayer. It is against this surrender, deeply against it, to worry, to be nervous and to desire to think about the consequences of anything.\n\nIt is like the confusion that children feel when they ask their mother to see to their needs, and then try to take care of those needs for themselves so that their childlike efforts get in their mother's way. Surrender means to placidly close the eyes of the soul, to turn away from thoughts of tribulation and to put yourself in my care, so that only I act, saying, 'You take care of it.'",

  // Day 3
  "How many things I do when the soul, in so much spiritual and material need, turns to me, looks at me and says to me, 'You take care of it,' then closes its eyes and rests. In pain you pray for me to act, but that I act in the way you want. You do not turn to me, instead, you want me to adapt your ideas. You are not sick people who ask the doctor to cure you, but rather sick people who tell the doctor how to. So do not act this way, but pray as I taught you in the Our Father: 'Hallowed be thy Name,' that is, be glorified in my need. 'Thy kingdom come,' that is, let all that is in us and in the world be in accord with your kingdom. 'Thy will be done on Earth as it is in Heaven,' that is, in our need, decide as you see fit for our temporal and eternal life. If you say to me truly: 'Thy will be done,' which is the same as saying: 'You take care of it,' I will intervene with all my omnipotence, and I will resolve the most difficult situations.",

  // Day 4
  "You see evil growing instead of weakening? Do not worry. Close your eyes and say to me with faith: 'Thy will be done, You take care of it.' I say to you that I will take care of it, and that I will intervene as does a doctor and I will accomplish miracles when they are needed. Do you see that the sick person is getting worse? Do not be upset, but close your eyes and say, 'You take care of it.' I say to you that I will take care of it, and that there is no medicine more powerful than my loving intervention. By my love, I promise this to you.",

  // Day 5
  "And then I must lead you on a path different from the one you see, I will prepare you; I will carry you in my arms; I will let you find yourself, like children who have fallen asleep in their mother's arms, on the other bank of the river. What troubles you and hurts you immensely are your reason, your thoughts and worry, and your desire at all costs to deal with what afflicts you.",

  // Day 6
  "You are sleepless; you want to judge everything, direct everything and see to everything and you surrender to human strength, or worse, to men themselves, trusting in their intervention. This is what hinders my words and my views. Oh, how much I wish from you this surrender, to help you; and how I suffer when I see you so agitated! Satan tries to do exactly this: to agitate you and to remove you from my protection and to throw you into the jaws of human initiative. So, trust only in me, rest in me, surrender to me in everything.",

  // Day 7
  "I perform miracles in proportion to your full surrender to me and to your not thinking of yourselves. I sow treasure troves of graces when you are in deepest poverty. No person of reason, no thinker, has ever performed miracles, not even among the saints. He does divine works whosoever surrenders to God. So don't think about it any more, because your mind is acute and for you it is very hard to see evil and to trust in me and to not think of yourself. Do this for all your needs, do this, all of you, and you will see great continual silent miracles. I will take care of things, I promise this to you.",

  // Day 8
  "Close your eyes and let yourself be carried away on the flowing current of my grace; close your eyes and do not think of the present, turning your thoughts away from the future just as you would from temptation. Repose in me, believing in my goodness, and I promise you by my love that if you say, 'You take care of it,' I will take care of it all; I will console you, liberate you and guide you.",

  // Day 9
  "Pray always in readiness to surrender, and you will receive from it great peace and great rewards, even when I confer on you the grace of immolation, of repentance, and of love. Then what does suffering matter? It seems impossible to you? Close your eyes and say with all your soul, 'Jesus, you take care of it.' Do not be afraid, I will take care of things and you will bless my name by humbling yourself. A thousand prayers cannot equal one single act of surrender, remember this well. There is no novena more effective than this.",
];

async function isAuthorized(): Promise<boolean> {
  const cliArg = process.argv[2];
  if (cliArg === AUTH_PHRASE) return true;
  if (!process.stdin.isTTY) return false;
  process.stdout.write(
    `\nAbout to populate PrayerType.dailyReflections for slug='${TARGET_SLUG}' on the prod database.\n` +
      `Type the auth phrase exactly to proceed:\n  ${AUTH_PHRASE}\n> `,
  );
  const line = await new Promise<string>((resolve) => {
    process.stdin.once("data", (data) => resolve(data.toString().trim()));
  });
  return line === AUTH_PHRASE;
}

async function main() {
  if (!(await isAuthorized())) {
    console.error(
      "\nABORT: auth phrase missing or incorrect. No write performed.",
    );
    process.exit(1);
  }

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  // Pre-flight: confirm the row exists and has the shape we expect.
  const before = await prisma.prayerType.findUnique({
    where: { slug: TARGET_SLUG },
    select: {
      id: true,
      slug: true,
      name: true,
      daysRequired: true,
      dailyReflections: true,
    },
  });

  if (!before) {
    console.error(`ABORT: PrayerType '${TARGET_SLUG}' not found.`);
    process.exit(1);
  }

  if (before.daysRequired !== 9) {
    console.error(
      `ABORT: expected daysRequired=9 on '${TARGET_SLUG}', found ${before.daysRequired}.`,
    );
    process.exit(1);
  }

  if (SURRENDER_NOVENA_REFLECTIONS.length !== 9) {
    console.error(
      `ABORT: hardcoded reflections has ${SURRENDER_NOVENA_REFLECTIONS.length} entries, expected 9.`,
    );
    process.exit(1);
  }

  console.log(`Found '${before.name}' (id=${before.id}).`);
  console.log(
    `  Current dailyReflections length: ${before.dailyReflections.length}`,
  );
  console.log(`  About to set:`);
  console.log(`    - dailyReflections: 9 entries (one per novena day)`);
  console.log(`    - instructions:     "...repeat the refrain ten times..."`);
  console.log(`    - prayerText:       refrain + "(Repeat ten times.)"`);

  await prisma.prayerType.update({
    where: { slug: TARGET_SLUG },
    data: {
      dailyReflections: [...SURRENDER_NOVENA_REFLECTIONS],
      instructions: NEW_INSTRUCTIONS,
      prayerText: NEW_PRAYER_TEXT,
    },
  });

  const after = await prisma.prayerType.findUnique({
    where: { slug: TARGET_SLUG },
    select: { dailyReflections: true, instructions: true, prayerText: true },
  });

  console.log(
    `\nSuccess. dailyReflections now has ${after?.dailyReflections.length ?? 0} entries.`,
  );
  console.log(
    `Active Surrender Novena chains will start showing the day-N reflection on the next chain-cron tick.`,
  );

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
