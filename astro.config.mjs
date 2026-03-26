import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://stromy.com.au',
  integrations: [mdx(), sitemap(), preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
