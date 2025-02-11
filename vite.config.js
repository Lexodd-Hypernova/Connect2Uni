import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy the backend server
        changeOrigin: true,             // Handles CORS from the backend
        secure: false,                  // If you're using HTTPS locally, set to false
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix if needed
      }
    }
  },
  plugins: [react()],
});