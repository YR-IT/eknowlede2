import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // assume index.html is in frontend/
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist', // required for Vercel
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
