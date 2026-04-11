import { handlers } from "@/lib/auth";

// TEMP: wrap the Auth.js handlers in our own try/catch so any error
// thrown inside them — including ones that escape Auth.js's own logger —
// gets printed to Vercel runtime logs. Remove once Apple sign-in works.
//
// Also captures the response status and selected headers/cookies on the
// way out, so we can see whether the handler is returning 302 to the
// success URL or to the error page.
const wrap =
  (
    kind: "GET" | "POST",
    inner: (req: never, ...rest: never[]) => Promise<Response>
  ) =>
  async (req: Request, ...rest: unknown[]) => {
    const url = new URL(req.url);
    let body: string | null = null;
    if (kind === "POST" && url.pathname.includes("callback")) {
      try {
        const cloned = req.clone();
        body = (await cloned.text()).slice(0, 800);
      } catch {}
    }
    console.error(
      "[probe] auth handler entry",
      kind,
      url.pathname,
      body ? `body[0..800]=${body}` : ""
    );
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (inner as any)(req, ...rest);
      const loc = res.headers.get("location");
      console.error(
        "[probe] auth handler exit",
        kind,
        url.pathname,
        "status=" + res.status,
        loc ? "location=" + loc.slice(0, 200) : ""
      );
      return res;
    } catch (e) {
      const err = e as Error & { cause?: unknown };
      console.error(
        "[probe] auth handler THREW",
        kind,
        url.pathname,
        err?.name ?? "?",
        err?.message ?? "(no message)",
        err?.stack?.split("\n").slice(0, 6).join(" || ") ?? ""
      );
      if (err?.cause) {
        try {
          const cause = err.cause as { err?: Error; [k: string]: unknown };
          if (cause?.err instanceof Error) {
            console.error(
              "[probe] auth handler cause",
              cause.err.name,
              cause.err.message,
              cause.err.stack?.split("\n").slice(0, 6).join(" || ") ?? ""
            );
          } else {
            console.error("[probe] auth handler cause (raw)", String(err.cause));
          }
        } catch {
          console.error("[probe] auth handler cause unprintable");
        }
      }
      throw e;
    }
  };

export const GET = wrap("GET", handlers.GET);
export const POST = wrap("POST", handlers.POST);
