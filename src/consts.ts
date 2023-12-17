// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'smashing.tools';
export const SITE_DESCRIPTION =
  'Curated list of tools for designers and developers';
export const CATEGORIES = [
  {
    category: undefined,
    slug: '/',
    title: 'All tools',
  },
  {
    category: 'code',
    slug: '/code',
    title: 'Code tools',
  },
  {
    category: 'design',
    slug: '/design',
    title: 'Design tools',
  },
] as const;
