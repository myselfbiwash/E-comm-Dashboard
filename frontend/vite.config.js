import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["./assets/**"],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // Remove the /api prefix from the request path
        },
      },
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "", // Remove the /api prefix from the request path
        },
      },
    },
  },
});