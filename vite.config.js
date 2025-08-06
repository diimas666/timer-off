// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/timer-off/', // 👈 важно!
  plugins: [react()],
});
