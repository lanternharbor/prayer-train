import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { notFound, redirect } from "next/navigation";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "../globals.css";

// /admin lives outside the [locale] tree, so this is its OWN root
// layout: it must define <html>/<body> and import globals.css directly.
// Without this file declaring those, Next 16 mounts the page without
// the project's CSS — which is what produced the unstyled raw-HTML
// render we shipped in PR #149.
//
// Multiple root layouts are supported per Next 16 (see
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md).
// The tradeoff is that navigating from /admin to /[locale]/anything
// (and vice versa) causes a full page load instead of a client-side
// transition — fine for a tool one person uses.

const heading = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

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
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-body">
        {children}
      </body>
    </html>
  );
}
