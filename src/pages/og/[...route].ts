import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const [starterKits, designKits, uiComponents] = await Promise.all([
  await getCollection('starter-kit'),
  await getCollection('design-kit'),
  await getCollection('ui-component'),
]);

const collectionEntries = [...starterKits, ...designKits, ...uiComponents];

const pages = Object.fromEntries(
  collectionEntries.map(({ slug, collection, data }) => [
    slug,
    { ...data, collection },
  ]),
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (path, page) => {
    const item = page as {
      name: string;
      collection: string;
      headline: string;
      logo: { src: string };
    };
    return {
      title: item.name,
      description: item.headline,
      logo: {
        path: `./src/content/${item.collection}/${path}/logo.${item.logo.src
          .split('.')
          .pop()}`,
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
