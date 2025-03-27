import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
  proxy: {
    '/api': {  // 🔹 All requests starting with "/api" will be proxied
      target: 'advance-todo-back-qh04aj1n8-mukesh-swains-projects.vercel.app',  // 🔹 Your backend server (Node.js + Express)
      changeOrigin: true,  // 🔹 Changes the origin of the request to match the target
      secure: false  // 🔹 Disables SSL verification (useful for HTTP backend)
    }
  }
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
