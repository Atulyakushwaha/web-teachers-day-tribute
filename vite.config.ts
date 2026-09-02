import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Determine base in this order:
  // 1. GitHub Actions + repository (CI sets correct repo name)
  // 2. VITE_BASE environment variable (override)
  // 3. When building for production, use the repo name path
  // 4. Default to root for dev
  base: process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : process.env.VITE_BASE
      ? process.env.VITE_BASE
      : (process.env.NODE_ENV === 'production' ? '/web-teachers-day-tribute/' : '/'),
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Expose both VITE_* (Vite default) and EXPO_PUBLIC_* (Rork's cross-platform
  // public-env convention, written by tools like getOrCreateAuthConfig).
  envPrefix: ["VITE_", "EXPO_PUBLIC_"],
}));
