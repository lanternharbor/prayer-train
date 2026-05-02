import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { matchesParish } from "@/lib/parish-search";

// Search parishes by name, city, state, or diocese with normalized
// matching. See src/lib/parish-search.ts for the matching rules:
// st/saint equivalence, punctuation-insensitive, multi-token AND
// across the parish's combined fields.
//
// Implementation note: the parish table is small (~100 entries; see
// scripts/seed-parishes.ts) so we fetch the full list and filter in
// memory. Prisma's `contains` operator can't express the normalized
// matching we need without a generated tsvector column, and the
// fetch + filter cost is trivial at this size. Responses are still
// CDN-cached (s-maxage=3600) so repeat queries don't hit the DB.
// If the parish list grows substantially (a few thousand+), revisit
// with a Postgres tsvector or trigram index.
//
// GET /api/parishes?q=st+paul+hingham

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const parishes = await prisma.parish.findMany({
    select: {
      id: true,
      name: true,
      city: true,
      state: true,
      diocese: true,
    },
    orderBy: { name: "asc" },
  });

  const filtered = parishes.filter((p) => matchesParish(q, p));

  return NextResponse.json(filtered.slice(0, 10), {
    headers: {
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
