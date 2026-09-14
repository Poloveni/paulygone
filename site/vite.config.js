import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mentions: resolve(__dirname, 'mentions-legales.html'),
      },
    },
  },
});
