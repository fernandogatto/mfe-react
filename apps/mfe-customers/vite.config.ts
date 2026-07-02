import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "customers",
      filename: "remoteEntry.js",
      exposes: {
        "./customers": "./src/features/customers/pages/customers-page.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
    fs: {
      allow: ["../.."],
    },
  },
});
