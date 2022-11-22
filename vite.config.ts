import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
const vuePlugin = vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => "model-viewer" === tag,
    },
  },
});

export default defineConfig({
  base: "https://vikpe.org/qw-gfx/",
  define: {
    "process.env": process.env,
  },
  plugins: [vuePlugin],
  build: {
    rollupOptions: {
      input: {
        playerSkin: resolve(__dirname, "index.html"),
        itemModels: resolve(__dirname, "item_models.html"),
      },
    },
  },
});
