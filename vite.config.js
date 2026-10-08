import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://Akash-2176.github.io/portfolio/ via gh-pages.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
