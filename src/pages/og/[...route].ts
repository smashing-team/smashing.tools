import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const [starterKits, uiKits] = await Promise.all([
  await getCollection('starter-kit'),
  await getCollection('ui-kit'),
]);

const collectionEntries = [...starterKits, ...uiKits];

const pages = Object.fromEntries(
  collectionEntries.map(({ slug, data }) => [slug, data]),
) as {
  [k: string]: { name: string; headline: string; logo: string };
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (path, page) => {
    const item = page as { name: string; headline: string; logo: string };
    return {
      title: item.name,
      description: item.headline,
      logo: {
        path: `./public/logo/${path}/${item.logo}`,
        size: [200],
      },
      font: {
        title: {
          families: ['Inter'],
          weight: 'Medium',
        },
        description: {
          families: ['Inter'],
          weight: 'Normal',
        },
      },
      fonts: [
        'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
        'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf',
      ],
      bgImage: {
        path: `./public/og-background.png`,
      },
    };
  },
});
