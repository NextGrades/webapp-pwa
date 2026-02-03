import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    // TanStack Devtools (dev-only, safe)
    devtools(),

    // TanStack Router plugin (must stay early)
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),

    // React
    viteReact(),

    // Tailwind
    tailwindcss(),

    // ✅ PWA (safe at the end)
    VitePWA({
      strategies: "injectManifest",
      srcDir: "./src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },

      manifest: {
        name: "NextGrades",
        short_name: "NGrades",
        description:
          "App to teach students various subjects through interactive content and quizzes.",
        start_url: ".",
        display: "standalone",
        theme_color: "#22379d",
        background_color: "#ffffff",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,

        runtimeCaching: [
          // SPA navigation (TanStack Router)
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
          },

          // JS & CSS
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
          },

          // Images
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
