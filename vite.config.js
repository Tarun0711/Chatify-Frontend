import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env file
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          // target: env.VITE_BACKEND_URL,
          // target: "https://chat-app-server-utev.onrender.com",
          target: "https://chatiify-backend.onrender.com/",
        },
      },
    },
    // define: {
    //   // Expose environment variables to your application
    //   'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
    //   // Add more environment variables as needed
    // }
  }
})
