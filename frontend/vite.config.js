import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/products": "http://localhost:5000/",
      "/api/index": "http://localhost:5000/",
      "/api/users": "http://localhost:5000/",
      "/api/orders": "http://localhost:5000/",
    },
  },
  plugins: [react()],
});
