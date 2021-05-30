import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/popup.html"),
        options: resolve(__dirname, "src/options/options.html"),
      },
    },
    chunkSizeWarningLimit: 1000,
    outDir: resolve(__dirname, "dist/pages"),
  },
  base: "/pages/",
});
