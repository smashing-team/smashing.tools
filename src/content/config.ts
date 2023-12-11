import { defineCollection, type ImageFunction, z } from 'astro:content';

// TODO: add publisher

const CreativeWork = (image: ImageFunction) =>
  z.object({
    name: z.string().describe('The name of the CreativeWork'),
    headline: z
      .string()
      .describe('Short description that summarizes a CreativeWork'),
    datePublished: z.coerce.date().describe('Date of first publication'),
    dateModified: z.coerce
      .date()
      .optional()
      .describe('Last modification of the CreativeWork'),
    dateCreated: z.coerce
      .date()
      .optional()
      .describe('The date on which the CreativeWork was created originally'),
    logo: image()
      .refine((img) => img.width <= 512, {
        message: 'Logo must be at most 512 pixels wide!',
      })
      .describe('Logo of the CreativeWork'),
    url: z.string().url().optional().describe('URL of the CreativeWork'),
    pricing: z
      .array(z.enum(['free', 'subscription', 'one-time-fee']))
      .optional()
      .default([])
      .describe('Pricing model of the CreativeWork'),
  });

const code = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    CreativeWork(image).extend({
      // code specific filters
      repositoryUrl: z
        .string()
        .url()
        .optional()
        .describe('URL of the repository'),
      language: z
        .array(
          z.enum([
            'JavaScript',
            'TypeScript',
            'Python',
            'Ruby',
            'Go',
            'C#',
            'Java',
            'Rust',
          ]),
        )
        .optional()
        .default([])
        .describe('Programming language of the code'),
      runtime: z
        .enum(['Node.js', 'Deno', 'Bun'])
        .optional()
        .describe('Runtime of the code'),
      database: z
        .array(z.enum(['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite']))
        .optional()
        .default([])
        .describe('Database used by the code'),
      style: z
        .array(
          z.enum([
            'CSS',
            'SCSS',
            'Less',
            'Tailwind',
            'Styled Components',
            'Emotion',
            'Stitches',
          ]),
        )
        .optional()
        .default([])
        .describe('Styling method used by the code'),
      uiLibrary: z
        .array(
          z.enum([
            'React',
            'Preact',
            'Vue',
            'Svelte',
            'Angular',
            'Solid',
            'Alpine',
          ]),
        )
        .optional()
        .default([])
        .describe('UI library used by the code'),
      uiKit: z
        .array(
          z.enum([
            'Chakra',
            'DaisyUI',
            'NextUI',
            'Mantine',
            'Material UI',
            'Ant Design',
            'Tamagui',
            'Radix',
            'shadcn/ui',
          ]),
        )
        .optional()
        .default([])
        .describe('UI kit used by the code'),
      framework: z
        .array(
          z.enum([
            'Next.js',
            'Remix',
            'Nuxt.js',
            'Gatsby.js',
            'Redwood',
            'Blitz',
            'Astro',
            'Flask',
            'Django',
            'Rails',
            'Laravel',
            'Django',
          ]),
        )
        .optional()
        .default([])
        .describe('Framework used by the code'),
      api: z
        .array(z.enum(['REST', 'GraphQL', 'gRPC', 'tRPC']))
        .optional()
        .default([])
        .describe('API used by the code'),
      testing: z
        .array(
          z.enum([
            'Jest',
            'Mocha',
            'Cypress',
            'React Testing Library',
            'Testing Library',
            'Playwright',
            'Puppeteer',
            'Percy',
            'Storybook',
          ]),
        )
        .optional()
        .default([])
        .describe('Testing method used by the code'),
      features: z
        .array(
          z.enum([
            'Emails',
            'Login',
            'Multi-tenancy',
            'Single-tenency',
            'Payments',
            'SEO',
            'Testing',
            'Notifications',
            'Artificial Intelligence',
            'SaaS',
            'PWA',
            'Serverless',
            'S3',
            'Web3',
          ]),
        )
        .optional()
        .describe('Features of the code'),
    }),
});

const design = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    CreativeWork(image).extend({
      // design specific filters
      compatibility: z
        .array(
          z.enum([
            'Figma',
            'Figma Styles',
            'Figma AutoLayout',
            'Figma Components',
            'Figma Variables',
            'Figma Variants',
            'Dark mode',
          ]),
        )
        .optional(),
      componentCount: z
        .enum([
          '0-10',
          '11-50',
          '51-100',
          '101-250',
          '251-1000',
          '1000+',
          '5000+',
          '10000+',
        ])
        .optional()
        .describe('Number of components'),
      pageExampleCount: z
        .enum(['0-10', '11-50', '51-100', '101-250', '250+'])
        .optional()
        .describe('Number of page examples'),
    }),
});

export const collections = { code, design };
