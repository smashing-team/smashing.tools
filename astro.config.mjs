import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  devToolbar: {
    enabled: false,
  },
  adapter: netlify(),
});
