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

function getSiteUrl() {
  if (process.env.URL) {
    return process.env.URL;
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4321';
  }
  return 'https://smashing.tools';
}

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: getSiteUrl(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
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
