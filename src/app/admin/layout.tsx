import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { notFound, redirect } from "next/navigation";

// Gate for the whole /admin subtree. Anonymous visitors get bounced to
// signin; signed-in non-admins get a flat 404 rather than a 403 so the
// route's existence isn't advertised to anyone who shouldn't see it.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");
  if (!isAdmin(session.user.email)) notFound();
  return children;
}
