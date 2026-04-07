import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  // Delete in order to respect foreign key constraints
  const slots = await prisma.prayerSlot.deleteMany({});
  console.log(`Deleted ${slots.count} prayer slots`);

  const guestbook = await prisma.guestbookEntry.deleteMany({});
  console.log(`Deleted ${guestbook.count} guestbook entries`);

  const updates = await prisma.trainUpdate.deleteMany({});
  console.log(`Deleted ${updates.count} train updates`);

  const trains = await prisma.prayerTrain.deleteMany({});
  console.log(`Deleted ${trains.count} faith trains`);

  console.log("\nAll test data cleared!");
  await prisma.$disconnect();
}

main();
