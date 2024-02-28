import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "tests/cy-component-tests/*.cy.ts",
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig: {
        configFile: "vite.config.ts",
      },
    },
  },
});
