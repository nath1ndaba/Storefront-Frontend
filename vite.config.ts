import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        sourcemap: false
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://storefrontapi.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path
            }
        }
    }
})