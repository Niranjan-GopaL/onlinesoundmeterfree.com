// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production domain (to be registered). Drives canonical URLs + sitemap.
  site: 'https://onlinesoundmeterfree.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
