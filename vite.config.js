import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — rarely changes, cached long-term
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Data layer
          'data-vendor': ['@tanstack/react-query', 'axios'],
          // UI libraries
          'ui-vendor': ['react-icons', 'lucide-react', 'react-toastify'],
        },
      },
    },
    // Increase chunk size warning limit (vendor chunks will be larger)
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller output
    target: 'es2020',
  },
})
