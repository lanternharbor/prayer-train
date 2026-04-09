import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Search parishes by name, city, or state
// GET /api/parishes?q=st+paul+hingham

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const parishes = await prisma.parish.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
        { diocese: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 10,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      city: true,
      state: true,
      diocese: true,
    },
  });

  return NextResponse.json(parishes, {
    headers: {
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
