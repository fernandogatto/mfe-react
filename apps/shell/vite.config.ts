import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        customers: "http://localhost:5001/assets/remoteEntry.js",
        products: "http://localhost:5002/assets/remoteEntry.js",
        dashboard: "http://localhost:5003/assets/remoteEntry.js",
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
  },
  server: {
    port: 3000,
    fs: {
      allow: ["../.."],
    },
  },
});
