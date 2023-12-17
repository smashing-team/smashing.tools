import React from 'react';
import { twMerge } from 'tailwind-merge';

import Facet from '@/components/react/Facet';
import FacetSection from '@/components/react/FacetSection';
import Query from '@/utils/query';

export function AllFacets({
  facets,
}: {
  facets: any; // TODO: type this
}): React.ReactElement {
  const facetEntries = Object.entries(facets || {});
  const filtered = facetEntries.some(([_, values]: any) =>
    values.some((val: any) => val.checked),
  );

  return (
    <div className="static mt-2 hidden h-full border-t bg-white px-4 pb-8 dark:bg-transparent lg:block">
      {filtered && (
        <div className="group relative flex">
          <button
            onClick={Query.clear}
            className={twMerge(
              'absolute right-0 top-4 ml-auto inline-flex items-center rounded-full  px-4 py-1 text-xs shadow-sm ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800',
            )}
          >
            Clear filters
          </button>
        </div>
      )}
      {facetEntries.map(([facet, values]: any) => (
        <FacetSection key={facet} title={facet}>
          {values?.map((f: any) => (
            <Facet
              key={f.value}
              title={f.value}
              count={f.count}
              selected={f.checked}
              disabled={f.disabled}
              onClick={() => {
                Query.toggle(facet, f.value);
              }}
            />
          ))}
        </FacetSection>
      ))}
    </div>
  );
}
