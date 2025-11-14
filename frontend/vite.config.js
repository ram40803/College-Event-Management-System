import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // ✅ Required to fix "GET /login 404 (Not Found)" issue
    historyApiFallback: true,

    proxy: {
      // 🔹 User service (uncomment if needed)
      '/user-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },

      // 🔹 Event service
      '/event-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },

      // 🔹 Event registration service
      '/event-registration-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
