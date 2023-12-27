import {
  defineCollection,
  type ImageFunction,
  reference,
  z,
} from 'astro:content';

const astroBaseSchema = (image: ImageFunction) =>
  z.object({
    createdAt: z.coerce.date(),
    name: z.string().min(1).max(100),
    headline: z.string().min(1).max(200),
    publisher: reference('profiles'),
    maker: reference('profiles'),
    logo: image().describe('Logo of the tool'),
    logoDark: image().optional().describe('Logo of the tool'),
    url: z.string().url(),
    previewUrl: z.string().url().optional(),
    heroSlider: z
      .array(
        z.object({
          discriminant: z.string(),
          value: z.object({ image: image() }),
        }),
      )
      .optional()
      .default([]),
  });

const designKit = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    astroBaseSchema(image).extend({
      // design specific filters
      attrs: z.object({
        pricing: z
          .array(z.enum(['Free', 'Subscription', 'One-time fee']))
          .optional()
          .default([])
          .describe('Pricing model of the tool'),
        compatibility: z.array(z.string()).optional(),
        componentCount: z.array(z.string()).optional(),
        uiComponents: z.array(z.string()).optional(),
        pageExampleCount: z.array(z.string()).optional(),
      }),
    }),
});
const starterKit = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    astroBaseSchema(image).extend({
      // starterKit specific filters
      repositoryUrl: z.string().url().optional(),
      attrs: z.object({
        pricing: z
          .array(z.enum(['Free', 'Subscription', 'One-time fee']))
          .optional()
          .default([])
          .describe('Pricing model of the tool'),
        language: z.array(z.string()).optional(),
        styling: z.array(z.string()).optional(),
        database: z.array(z.string()).optional(),
        runtime: z.array(z.string()).optional(),
        uiLibrary: z.array(z.string()).optional(),
        uiComponents: z.array(z.string()).optional(),
        testing: z.array(z.string()).optional(),
        api: z.array(z.string()).optional(),
        framework: z.array(z.string()).optional(),
        features: z.array(z.string()).optional(),
      }),
    }),
});
const uiComponent = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    astroBaseSchema(image).extend({
      // uiComponent specific filters
      repositoryUrl: z.string().url().optional(),
      attrs: z.object({
        pricing: z
          .array(z.enum(['Free', 'Subscription', 'One-time fee']))
          .optional()
          .default([])
          .describe('Pricing model of the tool'),
        language: z.array(z.string()).optional(),
        uiLibrary: z.array(z.string()).optional(),
        framework: z.array(z.string()).optional(),
        styling: z.array(z.string()).optional(),
        componentCount: z.array(z.string()).optional(),
        pageExampleCount: z.array(z.string()).optional(),
      }),
    }),
});

const profile = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1).max(100),
      avatar: image(),
    }),
});

export const collections = {
  'design-kit': designKit,
  'starter-kit': starterKit,
  'ui-component': uiComponent,
  profiles: profile,
};
