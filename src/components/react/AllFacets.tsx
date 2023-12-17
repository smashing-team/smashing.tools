import React from 'react';

import Facet from '@/components/react/Facet';
import FacetSection from '@/components/react/FacetSection';
import Query from '@/utils/query';

export function AllFacets({
  facets,
}: {
  facets: any; // TODO: type this
}): React.ReactElement {
  return (
    <div className="mt-2 hidden h-full border-t bg-white px-4 pb-8 dark:bg-transparent lg:block">
      {Object.entries(facets || {}).map(
        ([facet, values]: any) =>
          values.length > 0 && (
            <FacetSection title={facet}>
              {values?.map((f: any) => (
                <Facet
                  key={f.value}
                  title={f.value}
                  count={f.count}
                  selected={f.checked}
                  onClick={() => {
                    Query.set(facet, f.value);
                  }}
                />
              ))}
            </FacetSection>
          ),
      )}
    </div>
  );
}
