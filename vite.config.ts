import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";

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
    nitro({ preset: "node-server" }),
    react(),
  ],
});
