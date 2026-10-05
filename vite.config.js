import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          gsap: ['gsap', '@gsap/react'],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://talha-portfolio.free.nf",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
