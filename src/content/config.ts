import { defineCollection, z } from 'astro:content';

const code = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      logo: image().refine((img) => img.width <= 512, {
        message: 'Logo must be at most 512 pixels wide!',
      }),
      // code specific filters
      language: z
        .array(z.enum(['JavaScript', 'TypeScript']))
        .optional()
        .default([]),
    }),
});

const design = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      logo: image().refine((img) => img.width <= 512, {
        message: 'Logo must be at most 512 pixels wide!',
      }),
      // design specific filters
      componentCount: z.number().optional(),
    }),
});

export const collections = { code, design };
