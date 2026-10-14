import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        dev: resolve(import.meta.dirname, "dev.html"),
        design: resolve(import.meta.dirname, "design.html"),
        caseTmwConnect: resolve(import.meta.dirname, "case-tmw-connect.html"),
        caseLaVamosNos: resolve(import.meta.dirname, "case-la-vamos-nos.html"),
        caseTmwpix: resolve(import.meta.dirname, "case-tmwpix.html"),
        caseDashboardCartaoCredito: resolve(import.meta.dirname, "case-dashboard-cartao-credito.html"),
      },
    },
  },
});
