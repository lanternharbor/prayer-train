import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const trains = await prisma.prayerTrain.findMany({
    select: { id: true, slug: true, recipientName: true, status: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  console.table(trains.map(t => ({
    id: t.id.slice(0, 8) + "...",
    slug: t.slug,
    name: t.recipientName,
    status: t.status,
    created: t.createdAt.toLocaleDateString(),
  })));
  await prisma.$disconnect();
}

main();
