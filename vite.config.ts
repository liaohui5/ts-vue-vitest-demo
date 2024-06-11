/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: [resolve("./src/__tests__/setups/router-mock.ts")],
  },

  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
