import { resolve } from "path";
import { build, InlineConfig } from "vite";
import { distPath, srcPath } from "../constants/paths.js";

export function executeVite(options: { mode: string }) {
  const commonConfig: InlineConfig = { mode: options.mode, clearScreen: false };
  const watch = options.mode === "development" ? {} : null;

  return Promise.all([
    build({
      ...commonConfig,
      build: {
        watch,
        rollupOptions: {
          input: {
            popup: resolve(srcPath, "popup.html"),
            options: resolve(srcPath, "options.html"),
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
        watch,
        lib: {
          entry: resolve(srcPath, "tab.ts"),
          fileName: "tab",
          formats: ["es"],
        },
        outDir: resolve(distPath, "tab"),
      },
      base: "/tab/",
    }),
  ]);
}
