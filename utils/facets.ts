import type { CategoryPaths } from "@/utils/consts";

import {
  AllItems,
  getAIFilters,
  getDesignKitFilters,
  getDevFilters,
  getStarterKitFilters,
  getUIComponentFilters,
} from "./reader";

const starterKitFilters = getStarterKitFilters();
const designKitFilters = getDesignKitFilters();
const uiComponentFilters = getUIComponentFilters();
const aiFilters = getAIFilters();
const devFilters = getDevFilters();

const allFilters = [
  ...starterKitFilters,
  ...designKitFilters,
  ...uiComponentFilters,
  ...aiFilters,
  ...devFilters,
] as const;

// get unique filters from allFilters
export const uniqueFilters = [...new Set(allFilters)];

const getFiltersByCategory = (selectedCategory: CategoryPaths) => {
  switch (selectedCategory) {
    case "/starter-kit":
      return starterKitFilters;
    case "/design-kit":
      return designKitFilters;
    case "/ui-component":
      return uiComponentFilters;
    case "/ai":
      return aiFilters;
    case "/dev":
      return devFilters;
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
  searchParams: {
    [key: string]: string | string[] | undefined;
  } = {}
) {
  const facets: Facets = {};

  items.forEach((item: any) => {
    getFiltersByCategory(activeCategory).forEach((key) => {
      if (!facets[key]) facets[key] = [];

      // @ts-ignore <-- this is fine and safe
      if (item.entry.attrs?.[key]) {
        // @ts-ignore <-- this is fine and safe
        const existingFilter = item.entry.attrs[key];

        const check = Array.isArray(searchParams[key])
          ? searchParams[key]
          : [searchParams[key]];
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
                checked: Boolean(check?.includes(value)),
                disabled: false,
              });
            }
          });
          // single value
        } else if (typeof existingFilter === "string") {
          const facet = facets[key]!.find((pr) => pr.value === existingFilter);

          if (facet) {
            facet.count += 1;
          } else {
            facets[key]?.push({
              value: existingFilter,
              count: 1,
              checked: Boolean(check?.includes(existingFilter)),
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
          (i) => i.value === facet.value
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
