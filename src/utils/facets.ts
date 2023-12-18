import type { CategorySlugs } from '@/consts';

import type { AllItems } from '../pages/[...category].astro';

const sharedFilters = ['pricing'] as const;
const codeFilters = [
  'features',
  'language',
  'framework',
  'runtime',
  'api',
  'database',
  'style',
  'testing',
  'uiKit',
  'uiLibrary',
] as const;

const designFilters = [
  'compatibility',
  'componentCount',
  'pageExampleCount',
] as const;

const allFilters = [
  ...sharedFilters,
  ...codeFilters,
  ...designFilters,
] as const;

const getFiltersByCategory = (selectedCategory: CategorySlugs) => {
  switch (selectedCategory) {
    case '/code':
      return [...sharedFilters, ...codeFilters];
    case '/design':
      return [...sharedFilters, ...designFilters];
    default:
      return allFilters;
  }
};

// type safe object keys function
export const objKeys = <O extends object>(o: O): (keyof O)[] =>
  Object.keys(o) as (keyof O)[];

export type Facets = Partial<
  Record<
    (typeof allFilters)[number],
    Array<{
      value: string;
      count: number;
      checked: boolean;
      disabled: boolean;
    }>
  >
>;

export function getFacets(
  items: AllItems,
  activeCategory: CategorySlugs,
  filterredFacets?: Facets,
  searchParams: Record<string, (string | number)[]> = {},
) {
  const facets: Facets = {};

  items.forEach((item) => {
    getFiltersByCategory(activeCategory).forEach((key) => {
      if (!facets[key]) facets[key] = [];

      // @ts-ignore <-- this is fine and safe
      if (item.data[key]) {
        // @ts-ignore <-- this is fine and safe
        const existingFilter = item.data[key];
        // array values
        if (Array.isArray(existingFilter)) {
          existingFilter.forEach((value) => {
            const facet = facets[key]!.find((pr) => pr.value === value);

            if (facet) {
              facet.count += 1;
            } else {
              facets[key]?.push({
                value,
                count: 1,
                checked: Boolean(searchParams[key]?.includes(value)),
                disabled: false,
              });
            }
          });
          // single value
        } else if (typeof existingFilter === 'string') {
          const facet = facets[key]!.find((pr) => pr.value === existingFilter);

          if (facet) {
            facet.count += 1;
          } else {
            facets[key]?.push({
              value: existingFilter,
              count: 1,
              checked: Boolean(searchParams[key]?.includes(existingFilter)),
              disabled: false,
            });
          }
        }
      }
    });
  });

  objKeys(facets).forEach((key) => {
    // if in filtered facets, update counts with filtered facets
    if (filterredFacets) {
      // @ts-ignore <-- this is fine and safe
      facets[key] = facets[key]?.map((facet) => {
        const facetInFiltered = filterredFacets?.[key]?.find(
          (i) => i.value === facet.value,
        );

        if (facetInFiltered) {
          return {
            ...facet,
            count: facetInFiltered.count,
          };
        }

        return { ...facet, disabled: true, count: 0 };
      });
    }

    // remove empty facets
    if (facets[key]?.length === 0) {
      delete facets[key];
    } else {
      // sort facets by name
      // @ts-ignore <-- this is fine and safe
      facets[key] = facets[key]?.sort((a, b) => a.value.localeCompare(b.value));
    }
  });

  return facets;
}
