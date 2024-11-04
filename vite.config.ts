import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr(), dts()],
  server: {
    proxy: {
      // Proxy requests starting with /api to the backend server at localhost:5000
      '/api': {
        target: 'https://2ab8-77-89-209-166.ngrok-free.app/', // Backend server URL
        changeOrigin: true,  // Needed for virtual hosted sites
      }
    }
  }
})
