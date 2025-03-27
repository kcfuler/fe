import { defineConfig } from "vite";

export default defineConfig({
  // 配置服务器
  server: {
    port: 3000,
    open: true,
  },
  // 构建配置
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
});
