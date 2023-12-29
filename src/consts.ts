export const SITE_TITLE = 'smashing.tools';
export const SITE_DESCRIPTION =
  'Curated list of ui kits, ui components, design kits for your next project';
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
    category: 'design-kit',
    slug: '/design-kit',
    title: 'Design Kit',
  },
  {
    category: 'ui-component',
    slug: '/ui-component',
    title: 'UI Component',
  },
] as const;

export type CategoryPaths =
  | '/'
  | '/starter-kit'
  | '/design-kit'
  | '/ui-component';

export type CategorySlugs = 'starter-kit' | 'design-kit' | 'ui-component';

export function getCategoryTitle(category: CategorySlugs) {
  return CATEGORIES.find((c) => c.category === category)?.title ?? '';
}

export function getFilterLabel(filterKey: string) {
  const fixedLabels: { [key: string]: string } = {
    componentCount: 'Component count',
    pageExampleCount: 'Page example count',
    uiComponents: 'UI Components',
    uiLibrary: 'UI Library',
    api: 'API',
  };

  return fixedLabels[filterKey] ?? filterKey;
}
