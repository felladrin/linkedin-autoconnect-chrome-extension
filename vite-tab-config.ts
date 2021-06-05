import { resolve } from "path";
import { defineConfig } from "vite";

// @ts-prune-ignore-next
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/tab/tab.ts"),
      fileName: "tab",
      formats: ["es"],
    },
    outDir: resolve(__dirname, "dist/tab"),
  },
  base: "/tab/",
});
