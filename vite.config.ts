import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) => `laralog.${format}.js`,
      formats: ["es", "cjs"], // Only generate ESM and CommonJS builds
    },
    rollupOptions: {
      external: ["fs", "path", "process", "luxon", "node:fs"], // Mark Node.js modules as external
      output: {
        globals: {
          luxon: "luxon", // Only provide globals for non-Node.js dependencies
        },
      },
    },
  },
  plugins: [dts()],
});
