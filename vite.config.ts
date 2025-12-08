import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7164',
        changeOrigin: true,
        secure: false, // Allow self-signed certificates in development
        rewrite: (path) => path, // Keep the /api prefix
      }
    }
  }
})