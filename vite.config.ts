import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [imagetools(), sveltekit()],
  server: {
    port: 2222,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
