export const SITE_TITLE = 'smashing.tools';
export const SITE_DESCRIPTION =
  'Curated list of starter tools for your next project';
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

export type CategorySlugs = '/' | '/code' | '/design';
