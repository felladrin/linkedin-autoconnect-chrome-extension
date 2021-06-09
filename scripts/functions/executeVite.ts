import { resolve } from "path";
import { build, InlineConfig } from "vite";
import { distPath, srcPath } from "../constants/paths.js";

export function executeVite(options: { watch: {} | null; mode: string }) {
  const commonConfig: InlineConfig = { mode: options.mode, clearScreen: false };
  return Promise.all([
    build({
      ...commonConfig,
      build: {
        watch: options.watch,
        rollupOptions: {
          input: {
            popup: resolve(srcPath, "popup/popup.html"),
            options: resolve(srcPath, "options/options.html"),
          },
        },
        chunkSizeWarningLimit: 1000,
        outDir: resolve(distPath, "pages"),
      },
      base: "/pages/",
    }),
    build({
      ...commonConfig,
      build: {
        watch: options.watch,
        lib: {
          entry: resolve(srcPath, "tab/tab.ts"),
          fileName: "tab",
          formats: ["es"],
        },
        outDir: resolve(distPath, "tab"),
      },
      base: "/tab/",
    }),
  ]);
}
