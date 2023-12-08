import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testing/setupTests.ts',
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text'],
    },
  },
});
