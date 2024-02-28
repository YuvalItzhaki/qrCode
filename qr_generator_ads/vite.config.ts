import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
    port: 3000,
  },
  build: {
    sourcemap: process.env.NODE_ENV === "development",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
