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
    category: 'starter-kit',
    slug: '/starter-kit',
    title: 'Starter Kit',
  },
  {
    category: 'ui-kit',
    slug: '/ui-kit',
    title: 'UI Kit',
  },
] as const;

export type CategorySlugs = '/' | '/starter-kit' | '/ui-kit';
