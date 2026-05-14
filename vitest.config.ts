import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Minimal Vitest config — no jsdom, no React Testing Library. We only
// test pure functions right now (pluralize, schema builders, Zod
// schemas, escapeHtml). Mirrors the `@/*` alias from tsconfig.json so
// test imports match source imports.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    // `prisma/**` picks up unit tests for the seed scaffolding (pure
    // helpers under prisma/seed/translations/). Anything under prisma/
    // that's *.test.ts is included; DB-touching seed runners themselves
    // are NOT *.test.ts, so this doesn't accidentally execute seed
    // logic.
    include: ["src/**/*.test.ts", "prisma/**/*.test.ts"],
  },
});
