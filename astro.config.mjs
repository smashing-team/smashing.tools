import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify/functions';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import robotsTxt from 'astro-robots-txt';
import pagefind from './src/plugins/pagefind.ts';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://smashing.tools',
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    pagefind(),
    markdoc(),
    keystatic(),
    robotsTxt(),
  ],
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  adapter: netlify(),
});
