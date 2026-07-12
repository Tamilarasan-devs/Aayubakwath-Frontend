import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    server: {
      watch: {
        usePolling: true
      },
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://aayubakwath-backend-production-2e7f.up.railway.app',
          changeOrigin: true,
          secure: false,
        }
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
    target: 'es2020',
  }
  };
});
