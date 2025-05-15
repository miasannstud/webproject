import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8186,
    proxy: {
      '/api': {
        target: 'http://backend:8286',
        changeOrigin: true,
        secure: false,
      }
    },
  }
})
