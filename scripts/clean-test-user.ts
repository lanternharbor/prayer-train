// Clean-slate diagnostic. Removes the wkeough@gmail.com user so we can
// test Apple sign-in as a brand-new account. Refuses to delete if the
// user has organized any prayer trains, since that would cascade-delete
// real data. Run with: npx tsx scripts/clean-test-user.ts
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const TARGET_EMAIL = "wkeough@gmail.com";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: TARGET_EMAIL },
    include: {
      _count: {
        select: {
          accounts: true,
          sessions: true,
          organizedTrains: true,
          claimedSlots: true,
          guestbookEntries: true,
          trainUpdates: true,
        },
      },
    },
  });

  if (!user) {
    console.log(`no user found for ${TARGET_EMAIL} — already clean`);
    return;
  }

  console.log("found user:", {
    id: user.id,
    email: user.email,
    counts: user._count,
  });

  if (user._count.organizedTrains > 0 || user._count.trainUpdates > 0) {
    console.log(
      `\nREFUSING full delete: user organizes ${user._count.organizedTrains} train(s) and has authored ${user._count.trainUpdates} update(s).`
    );
    console.log("Cleaning up sessions only...");
    const deleted = await prisma.session.deleteMany({
      where: { userId: user.id },
    });
    console.log(`deleted ${deleted.count} session(s)`);
    const tokens = await prisma.verificationToken.deleteMany({
      where: { identifier: TARGET_EMAIL },
    });
    console.log(`deleted ${tokens.count} verification token(s)`);
    return;
  }

  if (user._count.claimedSlots > 0) {
    console.log(
      `\nNote: user has ${user._count.claimedSlots} claimed slot(s). Will null out claimedById on those before deleting.`
    );
    const updated = await prisma.prayerSlot.updateMany({
      where: { claimedById: user.id },
      data: { claimedById: null },
    });
    console.log(`nulled claimedById on ${updated.count} slot(s)`);
  }

  if (user._count.guestbookEntries > 0) {
    console.log(
      `\nNote: user has ${user._count.guestbookEntries} guestbook entry/ies. Will null out authorId on those before deleting.`
    );
    const updated = await prisma.guestbookEntry.updateMany({
      where: { authorId: user.id },
      data: { authorId: null },
    });
    console.log(`nulled authorId on ${updated.count} guestbook entry/ies`);
  }

  // Delete sessions explicitly first (cascade should handle it but be safe)
  const deletedSessions = await prisma.session.deleteMany({
    where: { userId: user.id },
  });
  console.log(`deleted ${deletedSessions.count} session(s)`);

  const deletedAccounts = await prisma.account.deleteMany({
    where: { userId: user.id },
  });
  console.log(`deleted ${deletedAccounts.count} account(s)`);

  // Verification tokens are keyed by identifier (email), not userId
  const deletedTokens = await prisma.verificationToken.deleteMany({
    where: { identifier: TARGET_EMAIL },
  });
  console.log(`deleted ${deletedTokens.count} verification token(s)`);

  // Finally, delete the user
  await prisma.user.delete({ where: { id: user.id } });
  console.log(`\n✓ deleted user ${TARGET_EMAIL}`);
}

main()
  .catch((e) => {
    console.error("error:", e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
