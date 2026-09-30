import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";

const runningOnVercel = process.env.VERCEL === "1";

export default defineConfig({
  define: {
    __CURATIA_BUILD__: JSON.stringify(process.env.GIT_COMMIT_SHA || process.env.COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "local"),
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    // Keep the local/Hostinger build as a Node server, but let Nitro auto-detect
    // Vercel during preview deployments. This mirrors the project's existing
    // local-vs-cloud split used by Bot Ecosystem.
    nitro(runningOnVercel ? {} : { preset: "node-server" }),
    react(),
  ],
});
