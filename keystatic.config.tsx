import { collection, config, fields, singleton } from '@keystatic/core';
import { createdAt } from 'custom-fields/createdAt';

const baseSchema = {
  name: fields.slug({
    name: {
      label: 'Name',
      description: 'Tool name',
      validation: { length: { min: 1, max: 100 } },
    },
  }),
  headline: fields.text({
    label: 'Headline',
    description: 'Short description that summarizes the tool',
    validation: { length: { min: 1, max: 200 } },
  }),

  publisher: fields.relationship({
    label: 'Publisher',
    description: 'Publisher of the tool. If doesn’t exist, create a new one.',
    collection: 'profile',
    validation: { isRequired: true },
  }),
  logo: fields.image({
    label: 'Logo',
    directory: 'public/logo',
    description:
      'Logo of the tool. The image should be 1:1 ratio (e.g. 500x500) for best results.',
    validation: {
      isRequired: true,
    },
  }),
  createdAt: createdAt(),
  url: fields.url({
    label: 'URL',
    description: 'Homepage of the tool',
    validation: {
      isRequired: true,
    },
  }),
};
const contentSchema = fields.document({
  label: 'Content',
  formatting: true,
  dividers: true,
  links: true,
  images: undefined,
  tables: true,
});

const pricingSchema = fields.multiselect({
  label: 'Pricing',
  options: [
    { label: 'Free', value: 'Free' },
    { label: 'Subscription', value: 'Subscription' },
    { label: 'One-time fee', value: 'One-time fee' },
  ],
});

const sliderSchema = fields.blocks(
  {
    heroSlider: {
      label: 'Slider Image',
      schema: fields.object({
        image: fields.image({
          label:
            'Choose an image. The image should be 16:10 ratio (e.g. 1600x1000) for best results.',
          directory: 'public/hero',
        }),
      }),
    },
  },
  {
    label: 'Hero Slider',
    description: 'Optional',
    validation: { length: { min: 0, max: 5 } },
  },
);
export default config({
  ui: {
    brand: {
      name: 'smashing.tools',
      mark: () => {
        return <img src="/logo.svg" height={24} />;
      },
    },
    navigation: {
      Tools: ['starterKit', 'uiKit'],
      People: ['profile'],
      ...(process.env.NODE_ENV !== 'production' && { Pages: ['submission'] }),
    },
  },
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'cloud' : 'local',
    branchPrefix: 'tool/',
  },
  ...(process.env.NODE_ENV === 'production' && {
    cloud: { project: 'smashing/tools' },
  }),
  collections: {
    starterKit: collection({
      previewUrl:
        process.env.NODE_ENV !== 'production'
          ? '/starter-kit/{slug}'
          : undefined,
      label: 'Starter Kits',
      slugField: 'name',
      path: 'src/content/starter-kit/*',
      entryLayout: 'form',
      format: { contentField: 'content' },
      schema: {
        ...baseSchema,
        repositoryUrl: fields.url({
          label: 'Repository URL',
        }),
        content: contentSchema,
        heroSlider: sliderSchema,
        attrs: fields.object(
          {
            pricing: pricingSchema,
            language: fields.multiselect({
              label: 'Language',
              options: [
                { label: 'JavaScript', value: 'JavaScript' },
                { label: 'TypeScript', value: 'TypeScript' },
                { label: 'Python', value: 'Python' },
                { label: 'Ruby', value: 'Ruby' },
                { label: 'Go', value: 'Go' },
                { label: 'C#', value: 'C#' },
                { label: 'Java', value: 'Java' },
                { label: 'Rust', value: 'Rust' },
              ],
              defaultValue: ['TypeScript'],
            }),
            style: fields.multiselect({
              label: 'Style',
              options: [
                { label: 'CSS', value: 'CSS' },
                { label: 'SCSS', value: 'SCSS' },
                { label: 'Less', value: 'Less' },
                { label: 'Tailwind', value: 'Tailwind' },
                { label: 'Styled Components', value: 'Styled Components' },
                { label: 'Emotion', value: 'Emotion' },
                { label: 'Stitches', value: 'Stitches' },
              ],
            }),
            database: fields.multiselect({
              label: 'Database',
              options: [
                { label: 'Prisma', value: 'Prisma' },
                { label: 'Drizzle', value: 'Drizzle' },
                { label: 'MySQL', value: 'MySQL' },
                { label: 'MongoDB', value: 'MongoDB' },
                { label: 'PostgreSQL', value: 'PostgreSQL' },
                { label: 'SQLite', value: 'SQLite' },
              ],
            }),
            runtime: fields.multiselect({
              label: 'Runtime',
              options: [
                { label: 'Node.js', value: 'Node.js' },
                { label: 'Deno', value: 'Deno' },
                { label: 'Bun', value: 'Bun' },
              ],
            }),

            uiLibrary: fields.multiselect({
              label: 'UI Library',
              options: [
                { label: 'React', value: 'React' },
                { label: 'Preact', value: 'Preact' },
                { label: 'Vue', value: 'Vue' },
                { label: 'Svelte', value: 'Svelte' },
                { label: 'Angular', value: 'Angular' },
              ],
            }),
            uiKit: fields.multiselect({
              label: 'UI Kit',
              options: [
                { label: 'shadcn/ui', value: 'shadcn/ui' },
                { label: 'Tailwind UI', value: 'Tailwind UI' },
                { label: 'Chakra', value: 'Chakra' },
                { label: 'Mantine', value: 'Mantine' },
                { label: 'Material UI', value: 'Material UI' },
                { label: 'Ant Design', value: 'Ant Design' },
                { label: 'Bootstrap', value: 'Bootstrap' },
                { label: 'Bulma', value: 'Bulma' },
                { label: 'Foundation', value: 'Foundation' },
              ],
            }),

            testing: fields.multiselect({
              label: 'Testing',
              options: [
                { label: 'Jest', value: 'Jest' },
                { label: 'Mocha', value: 'Mocha' },
                { label: 'AVA', value: 'AVA' },
                { label: 'Cypress', value: 'Cypress' },
                {
                  label: 'React testing library',
                  value: 'React testing library',
                },
                { label: 'Playwright', value: 'Playwright' },
                { label: 'TestCafe', value: 'TestCafe' },
                { label: 'Puppeteer', value: 'Puppeteer' },
                { label: 'Selenium', value: 'Selenium' },
                { label: 'WebDriverIO', value: 'WebDriverIO' },
              ],
            }),
            api: fields.multiselect({
              label: 'API',
              options: [
                { label: 'tRPC', value: 'tRPC' },
                { label: 'GraphQL', value: 'GraphQL' },
                { label: 'REST', value: 'REST' },
                { label: 'gRPC', value: 'gRPC' },
              ],
            }),
            framework: fields.multiselect({
              label: 'Framework',
              options: [
                { label: 'Next.js', value: 'Next.js' },
                { label: 'Gatsby', value: 'Gatsby' },
                { label: 'Nuxt', value: 'Nuxt' },
                { label: 'Sapper', value: 'Sapper' },
                { label: 'Blitz', value: 'Blitz' },
                { label: 'Redwood', value: 'Redwood' },
                { label: 'Scout', value: 'Scout' },
                { label: 'Astro', value: 'Astro' },
                { label: 'Eleventy', value: 'Eleventy' },
                { label: 'Gridsome', value: 'Gridsome' },
                { label: 'Hugo', value: 'Hugo' },
                { label: 'Jekyll', value: 'Jekyll' },
                { label: 'SvelteKit', value: 'SvelteKit' },
                { label: 'VuePress', value: 'VuePress' },
                { label: 'Docusaurus', value: 'Docusaurus' },
                { label: 'Gridsome', value: 'Gridsome' },
                { label: 'Hugo', value: 'Hugo' },
                { label: 'Jekyll', value: 'Jekyll' },
                { label: 'SvelteKit', value: 'SvelteKit' },
                { label: 'VuePress', value: 'VuePress' },
                { label: 'Docusaurus', value: 'Docusaurus' },
              ],
            }),
            features: fields.multiselect({
              label: 'Features',
              options: [
                { label: 'Emails', value: 'Emails' },
                { label: 'Login', value: 'Login' },
                { label: 'Multi-tenancy', value: 'Multi-tenancy' },
                { label: 'Single-tenancy', value: 'Single-tenancy' },
                { label: 'Payments', value: 'Payments' },
                { label: 'SEO', value: 'SEO' },
                { label: 'Testing', value: 'Testing' },
                { label: 'Notifications', value: 'Notifications' },
                {
                  label: 'Artificial Intelligence',
                  value: 'Artificial Intelligence',
                },
                { label: 'SaaS', value: 'SaaS' },
                { label: 'PWA', value: 'PWA' },
                { label: 'Serverless', value: 'Serverless' },
                { label: 'S3', value: 'S3' },
                { label: 'Web3', value: 'Web3' },
              ],
            }),
          },
          {
            label: 'Attributes',
            layout: [
              12,
              // ----
              3, 3, 3, 3,
              // ----
              3, 3, 3, 3,
              // ----
              3, 9,
            ],
          },
        ),
      },
    }),
    uiKit: collection({
      previewUrl:
        process.env.NODE_ENV !== 'production' ? '/ui-kit/{slug}' : undefined,
      label: 'UI Kits',
      slugField: 'name',
      entryLayout: 'form',
      path: 'src/content/ui-kit/*',
      format: { contentField: 'content' },
      schema: {
        ...baseSchema,
        previewUrl: fields.url({
          label: 'Preview/Demo URL',
        }),
        content: contentSchema,
        heroSlider: sliderSchema,
        attrs: fields.object(
          {
            pricing: pricingSchema,
            compatibility: fields.multiselect({
              label: 'Compatibility',
              description:
                'Which design tools/features are compatible with the tool?',
              options: [
                { label: 'Figma', value: 'Figma' },
                { label: 'Figma Styles', value: 'Figma Styles' },
                { label: 'Figma AutoLayout', value: 'Figma AutoLayout' },
                { label: 'Figma Components', value: 'Figma Components' },
                { label: 'Figma Variables', value: 'Figma Variables' },
                { label: 'Figma Variants', value: 'Figma Variants' },
                { label: 'Dark mode', value: 'Dark mode' },
              ],
            }),
            componentCount: fields.multiselect({
              label: 'Component Count',
              description: 'How many components are included?',
              options: [
                { label: '0-10', value: '0-10' },
                { label: '11-50', value: '11-50' },
                { label: '51-100', value: '51-100' },
                { label: '101-250', value: '101-250' },
                { label: '251-1000', value: '251-1000' },
                { label: '1000+', value: '1000+' },
                { label: '5000+', value: '5000+' },
                { label: '10000+', value: '10000+' },
              ],
            }),
            pageExampleCount: fields.multiselect({
              label: 'Page Example Count',
              description: 'How many page examples are included?',
              options: [
                { label: '0-10', value: '0-10' },
                { label: '11-50', value: '11-50' },
                { label: '51-100', value: '51-100' },
                { label: '101-250', value: '101-250' },
                { label: '250+', value: '250+' },
              ],
            }),
          },
          { label: 'Attributes', layout: [12, 4, 4, 4] },
        ),
      },
    }),
    profile: collection({
      label: 'Profiles',
      slugField: 'name',
      path: 'src/content/profiles/**',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
            validation: {
              length: { min: 1 },
            },
          },
        }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/avatar',
          description:
            'Avatar of the author. The image should be 1:1 ratio (e.g. 500x500) for best results.',
          validation: {
            isRequired: true,
          },
        }),
      },
    }),
  },
  singletons: {
    submission: singleton({
      previewUrl: '/submission',
      label: 'Submission Guidelines',
      path: 'src/content/pages/submission',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: undefined,
          tables: true,
        }),
      },
    }),
  },
});
