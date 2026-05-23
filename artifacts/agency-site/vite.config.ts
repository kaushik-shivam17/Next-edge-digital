import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({ root: path.resolve(import.meta.dirname, "..") })
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react-vendor";
          if (id.includes("node_modules/framer-motion")) return "motion-vendor";
          if (id.includes("node_modules/lenis")) return "lenis-vendor";
          if (id.includes("node_modules/@radix-ui")) return "radix-vendor";
          if (id.includes("node_modules/lucide-react")) return "lucide-vendor";
          if (id.includes("node_modules/wouter")) return "router-vendor";
        },
      },
    },
  },
  server: {
    port: Number(process.env.VITE_PORT ?? process.env.PORT ?? "3000"),
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: true },
    proxy: {
      "/api": { target: "http://localhost:8080", changeOrigin: true },
    },
  },
  preview: {
    port: Number(process.env.VITE_PORT ?? process.env.PORT ?? "3000"),
    host: "0.0.0.0",
    allowedHosts: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "wouter", "lenis"],
  },
});
