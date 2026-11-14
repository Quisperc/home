import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 新标签页扩展构建：相对路径资源，产物在 dist-ext/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    outDir: "dist-ext",
    emptyOutDir: true,
  },
});