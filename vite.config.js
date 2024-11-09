import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://tournament-management-system-2.onrender.com", // Adjust if your Express server runs on a different port
    },
  },
});
