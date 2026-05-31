import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    // Copiar service-worker.js sin procesarlo
    copyPublicDir: true,
  },
  // Asegurar que el service worker se sirva correctamente
  publicDir: 'public',
})
