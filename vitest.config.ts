import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Minimal Vitest config — no jsdom, no React Testing Library. We only
// test pure functions right now (pluralize, schema builders), so Node
// is the only environment needed. Mirrors the `@/*` alias from
// tsconfig.json so test imports match source imports.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
