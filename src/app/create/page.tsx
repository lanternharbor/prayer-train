import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CreateWizard } from "./create-wizard";

export const metadata: Metadata = {
  title: "Start a PrayerTrain",
  description:
    "Create a prayer train for someone in need. Choose their situation, select prayers, and invite your community.",
  alternates: { canonical: "/create" },
};

export default async function CreatePage() {
  // Redirect to signin if not authenticated. The edge proxy also gates
  // this route, but it only checks cookie existence — a stale cookie
  // (e.g. session deleted from DB) passes the proxy but fails here.
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin?callbackUrl=/create");
  }
  const prayerTypes = await prisma.prayerType.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      description: true,
      duration: true,
      difficulty: true,
      daysRequired: true,
      patronSaint: true,
      situationTags: true,
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-3 gold-accent">
          Start a PrayerTrain
        </h1>
        <p className="text-muted-foreground text-lg">
          Create organized prayer coverage for someone in need. We&apos;ll
          generate a calendar that friends and family can sign up for.
        </p>
      </div>

      <CreateWizard prayerTypes={prayerTypes} />
    </div>
  );
}
