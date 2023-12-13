import React from 'react';

import { useQuery } from '@/utils/hooks/useQuery';

export function Sidebar({
  activeCategory = '/',
  facets,
}: {
  activeCategory: '/' | '/code' | '/design';
  facets: any; // TODO: type this
}): React.ReactElement {
  const { queryObject, setQueryObject } = useQuery();

  return (
    <section>
      <div className="font-medium">Pricing</div>
      <div className="mt-2">
        {facets.pricing.map((facet: any) => (
          <div key={facet.value}>
            <label>
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => {
                  setQueryObject('pricing', facet.value);
                }}
                checked={queryObject?.pricing?.includes(facet.value)}
              />
              {facet.value}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
