import { fields } from '@keystatic/core';
import { createdAt } from 'keystatic-utils/createdAt';

export const baseSchema = {
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
  maker: fields.relationship({
    label: 'Maker',
    description: 'Maker of the tool. If doesn’t exist, create a new one.',
    collection: 'profile',
    validation: { isRequired: true },
  }),
  logo: fields.image({
    label: 'Logo',
    directory: 'public/logo',
    description:
      'Logo of the tool. The image should be 1:1 ratio (e.g. 200x200) for best results.',
    validation: {
      isRequired: true,
    },
  }),
  logoDark: fields.image({
    label: 'Logo for Dark mode',
    directory: 'public/logo',
    description:
      'It will be used when the background is dark. The image should be 1:1 ratio (e.g. 200x200) for best results.',
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

export const content = fields.document({
  label: 'Content',
  formatting: true,
  dividers: true,
  links: true,
  images: undefined,
  tables: true,
});

export const compatibility = fields.multiselect({
  label: 'Compatibility',
  description: 'Which design tools/features are compatible with the tool?',
  options: [
    { label: 'Figma', value: 'Figma' },
    { label: 'Figma Styles', value: 'Figma Styles' },
    { label: 'Figma AutoLayout', value: 'Figma AutoLayout' },
    { label: 'Figma Components', value: 'Figma Components' },
    { label: 'Figma Variables', value: 'Figma Variables' },
    { label: 'Figma Variants', value: 'Figma Variants' },
    { label: 'Framer Library', value: 'Framer Library' },
    { label: 'React Library', value: 'React Library' },
    { label: 'Dark mode', value: 'Dark mode' },
  ],
});

export const componentCount = fields.multiselect({
  label: 'Component count',
  description: 'How many components are included?',
  options: [
    { label: '0-10 components', value: '0-10' },
    { label: '11-50 components', value: '11-50' },
    { label: '51-100 components', value: '51-100' },
    { label: '101-250 components', value: '101-250' },
    { label: '251-1000 components', value: '251-1000' },
    { label: '1000+ components', value: '1000+' },
    { label: '5000+ components', value: '5000+' },
    { label: '10000+ components', value: '10000+' },
  ],
});

export const pageExampleCount = fields.multiselect({
  label: 'Page example count',
  description: 'How many page examples are included?',
  options: [
    { label: '0-10 examples', value: '0-10' },
    { label: '11-50 examples', value: '11-50' },
    { label: '51-100 examples', value: '51-100' },
    { label: '101-250 examples', value: '101-250' },
    { label: '250+ examples', value: '250+' },
  ],
});

export const pricing = fields.multiselect({
  label: 'Pricing',
  options: [
    { label: 'Free', value: 'Free' },
    { label: 'Subscription', value: 'Subscription' },
    { label: 'One-time fee', value: 'One-time fee' },
  ],
});

export const styling = fields.multiselect({
  label: 'Styling',
  options: [
    { label: 'Unstyled', value: 'Unstyled' },
    { label: 'Tailwind', value: 'Tailwind' },
    { label: 'CSS', value: 'CSS' },
    { label: 'CSS Modules', value: 'CSS Modules' },
    { label: 'Vanilla extract', value: 'Vanilla extract' },
    { label: 'Saas', value: 'Saas' },
    { label: 'Less', value: 'Less' },
    { label: 'Styled Components', value: 'Styled Components' },
    { label: 'StyleX', value: 'StyleX' },
    { label: 'Emotion', value: 'Emotion' },
    { label: 'Stitches', value: 'Stitches' },
  ],
});

export const framework = fields.multiselect({
  label: 'Framework',
  options: [
    { label: 'Astro', value: 'Astro' },
    { label: 'Next.js', value: 'Next.js' },
    { label: 'Remix', value: 'Remix' },
    { label: 'Qwik', value: 'Qwik' },
    { label: 'Nuxt.js', value: 'Nuxt.js' },
    { label: 'Vite', value: 'Vite' },
    { label: 'Gatsby', value: 'Gatsby' },
    { label: 'Blitz', value: 'Blitz' },
    { label: 'RedwoodJS', value: 'RedwoodJS' },
    { label: 'SvelteKit', value: 'SvelteKit' },
    { label: 'Laravel', value: 'Laravel' },
  ],
});

export const testing = fields.multiselect({
  label: 'Testing',
  options: [
    { label: 'Jest', value: 'Jest' },
    { label: 'Playwright', value: 'Playwright' },
    { label: 'Cypress', value: 'Cypress' },
    { label: 'Vitest', value: 'Vitest' },
    { label: 'Mocha', value: 'Mocha' },
    { label: 'AVA', value: 'AVA' },
    {
      label: 'React testing library',
      value: 'React testing library',
    },
    { label: 'Puppeteer', value: 'Puppeteer' },
    { label: 'Selenium', value: 'Selenium' },
  ],
});

export const runtime = fields.multiselect({
  label: 'Runtime',
  options: [
    { label: 'Node.js', value: 'Node.js' },
    { label: 'Bun', value: 'Bun' },
    { label: 'Deno', value: 'Deno' },
  ],
});

export const language = fields.multiselect({
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
});

export const api = fields.multiselect({
  label: 'API',
  options: [
    { label: 'tRPC', value: 'tRPC' },
    { label: 'GraphQL', value: 'GraphQL' },
    { label: 'REST', value: 'REST' },
    { label: 'gRPC', value: 'gRPC' },
  ],
});

export const features = fields.multiselect({
  label: 'Features',
  options: [
    { label: 'Emails', value: 'Emails' },
    { label: 'Authentication', value: 'Authentication' },
    { label: 'Multi-tenancy', value: 'Multi-tenancy' },
    { label: 'Single-tenancy', value: 'Single-tenancy' },
    { label: 'Payments', value: 'Payments' },
    { label: 'SEO', value: 'SEO' },
    { label: 'Testing', value: 'Testing' },
    { label: 'Notifications', value: 'Notifications' },
    {
      label: 'AI',
      value: 'AI',
    },
    { label: 'SaaS', value: 'SaaS' },
    { label: 'PWA', value: 'PWA' },
    { label: 'Serverless', value: 'Serverless' },
    { label: 'S3', value: 'S3' },
    { label: 'Web3', value: 'Web3' },
  ],
});

export const database = fields.multiselect({
  label: 'Database',
  options: [
    { label: 'Prisma', value: 'Prisma' },
    { label: 'Drizzle', value: 'Drizzle' },
    { label: 'MySQL', value: 'MySQL' },
    { label: 'MongoDB', value: 'MongoDB' },
    { label: 'PostgreSQL', value: 'PostgreSQL' },
    { label: 'SQLite', value: 'SQLite' },
  ],
});

export const uiLibrary = fields.multiselect({
  label: 'UI Library',
  options: [
    { label: 'React', value: 'React' },
    { label: 'Preact', value: 'Preact' },
    { label: 'Solid', value: 'Solid' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Svelte', value: 'Svelte' },
    { label: 'Angular', value: 'Angular' },
  ],
});

export const uiComponents = fields.multiselect({
  label: 'UI Components',
  options: [
    { label: 'shadcn/ui', value: 'shadcn/ui' },
    { label: 'Radix Primitives', value: 'Radix Primitives' },
    { label: 'Radix UI', value: 'Radix UI' },
    { label: 'Tailwind UI', value: 'Tailwind UI' },
    { label: 'Chakra', value: 'Chakra' },
    { label: 'Mantine', value: 'Mantine' },
    { label: 'Material UI', value: 'Material UI' },
    { label: 'Ant Design', value: 'Ant Design' },
    { label: 'Bootstrap', value: 'Bootstrap' },
    { label: 'Bulma', value: 'Bulma' },
    { label: 'Foundation', value: 'Foundation' },
  ],
});

export const heroSlider = fields.blocks(
  {
    heroSlider: {
      label: 'Slider Image',
      schema: fields.object({
        image: fields.image({
          label:
            'Choose an image. The image should be 16:10 ratio (e.g. 800x500) for best results.',
          directory: 'public/hero',
        }),
      }),
    },
  },
  {
    label: 'Showroom Slider',
    description: 'Optional',
    validation: { length: { min: 0, max: 5 } },
  },
);
