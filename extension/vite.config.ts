import { copyFileSync } from "node:fs";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        contentScript: "src/content-script.ts",
        background: "src/background.ts"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  },
  plugins: [
    {
      name: "copy-extension-assets",
      closeBundle() {
        copyFileSync("manifest.json", "dist/manifest.json");
        copyFileSync("src/styles.css", "dist/styles.css");
      }
    }
  ]
});
