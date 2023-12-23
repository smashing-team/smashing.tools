import type { CategoryPaths } from '@/consts';

import type { AllItems } from '../pages/[...category].astro';
import {
  getDesignKitFilters,
  getStarterKitFilters,
  getUIComponentFilters,
} from './reader';

const starterKitFilters = getStarterKitFilters();
const designKitFilters = getDesignKitFilters();
const uiComponentFilters = getUIComponentFilters();

const allFilters = [
  ...starterKitFilters,
  ...designKitFilters,
  ...uiComponentFilters,
] as const;

// get unique filters from allFilters
const uniqueFilters = [...new Set(allFilters)];

const getFiltersByCategory = (selectedCategory: CategoryPaths) => {
  switch (selectedCategory) {
    case '/starter-kit':
      return starterKitFilters;
    case '/design-kit':
      return designKitFilters;
    case '/ui-component':
      return uiComponentFilters;
    default:
      return uniqueFilters;
  }
};

// type safe object keys function
export const objKeys = <O extends object>(o: O): (keyof O)[] =>
  Object.keys(o) as (keyof O)[];

export type Facets = Partial<
  Record<
    (typeof uniqueFilters)[number],
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
  activeCategory: CategoryPaths,
  filterredFacets?: Facets,
  searchParams: Record<string, (string | number)[]> = {},
) {
  const facets: Facets = {};

  items.forEach((item) => {
    getFiltersByCategory(activeCategory).forEach((key) => {
      if (!facets[key]) facets[key] = [];

      // @ts-ignore <-- this is fine and safe
      if (item.data.attrs?.[key]) {
        // @ts-ignore <-- this is fine and safe
        const existingFilter = item.data.attrs[key];
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
