import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs/promises';
// eslint-disable-next-line import/no-extraneous-dependencies
import satori from 'satori';
import sharp from 'sharp';

// @TODOS:
// * satori kütüphanesi eslint hatası fırlatıyor.
// * font
// * UI

export async function getStaticPaths() {
  const [post1, post2] = await Promise.all([
    await getCollection('starter-kit'),
    await getCollection('ui-kit'),
  ]);
  const posts = [...post1, ...post2];
  return posts.map((item) => ({
    params: { route: item.slug },
    props: item,
  }));
}

export const GET: APIRoute = async function get({ props, url }) {
  const robotoData = await fs.readFile(
    './public/fonts/roboto/Roboto-Regular.ttf',
  );

  const svg = await satori(
    // @ts-ignore
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
        },
        children: [
          {
            type: 'img',
            props: {
              src: `${url.origin}/logo/${props.slug}/${props.data.logo}`,
              style: {
                width: '200px',
                height: '200px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: 40,
                fontWeight: 600,
                fontSize: 32,
              },
              children: props.data.name,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: 10,
                fontSize: 18,
              },
              children: props.data.headline,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Roboto',
          data: robotoData,
          weight: 'normal',
          style: 'normal',
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
