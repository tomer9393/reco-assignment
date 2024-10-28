// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import svgr from "vite-plugin-svgr";
// import dts from "vite-plugin-dts";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [svgr(), dts(),react()],
//   server: {
//     proxy: {
//       // Proxy requests starting with /api to the backend server at localhost:5000
//       '/api': {
//         target: 'https://1c00-2a02-908-2540-80e0-21b3-2fbc-fb2c-3b13.ngrok-free.app', // Backend server URL
//         changeOrigin: true,  // Needed for virtual hosted sites
//       }
//     }
//   }
// })


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
        target: 'https://81aa-83-5-154-5.ngrok-free.app/', // Backend server URL
        changeOrigin: true,  // Needed for virtual hosted sites
      }
    }
  }
})
