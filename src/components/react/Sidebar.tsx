import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';

import CategorySwitcher from '@/components/react/CategorySwitcher';
import { ScrollArea } from '@/components/react/ScrollArea';
import Query from '@/utils/query';

export function Sidebar({
  activeCategory = '/',
  facets,
}: {
  activeCategory: '/' | '/code' | '/design';
  facets: any; // TODO: type this
}): React.ReactElement {
  return (
    <div className="absolute inset-0 z-50 flex w-56 shrink-0 -translate-x-full flex-col justify-items-start border-r bg-gray-2 shadow-none duration-300 lg:relative lg:translate-x-0 lg:shadow-none">
      <div className="mb-3 flex shrink-0 grow-0 flex-col px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <svg
              width="28"
              height="28"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.7817 101.628L57.2833 124.483C61.0494 126.908 65.4337 128.197 69.9125 128.197C74.3914 128.197 78.7756 126.908 82.5417 124.483L118.09 101.617"
                stroke="#3F3F46"
                strokeOpacity="0.7"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M27.0492 82.9148C25.4034 81.8446 24.0543 80.3764 23.1268 78.6462C22.1993 76.916 21.7234 74.9797 21.7431 73.0166C21.7629 71.0535 22.2777 69.1272 23.2399 67.416C24.2021 65.7048 25.5805 64.2641 27.2476 63.2273L60.7601 42.3848C63.5336 40.6604 66.7342 39.7466 70.0001 39.7466C73.2659 39.7466 76.4666 40.6604 79.2401 42.3848L112.758 63.2331C114.425 64.27 115.804 65.7107 116.766 67.4219C117.728 69.1331 118.243 71.0594 118.263 73.0224C118.283 74.9855 117.807 76.9218 116.879 78.652C115.952 80.3822 114.603 81.8504 112.957 82.9206L79.5434 104.638C76.7047 106.483 73.3916 107.466 70.0059 107.466C66.6202 107.466 63.3071 106.483 60.4684 104.638L27.0492 82.9148Z"
                fill="#D9D9D9"
                stroke="#D9D9D9"
                strokeWidth="8"
              />
              <path
                d="M27.0492 53.7483C25.4034 52.6781 24.0542 51.2099 23.1267 49.4797C22.1992 47.7495 21.7233 45.8131 21.7431 43.8501C21.7629 41.887 22.2777 39.9607 23.2399 38.2495C24.202 36.5383 25.5805 35.0976 27.2475 34.0608L60.76 13.2183C63.5335 11.4939 66.7342 10.5801 70 10.5801C73.2658 10.5801 76.4665 11.4939 79.24 13.2183L112.758 34.0666C114.425 35.1035 115.804 36.5442 116.766 38.2554C117.728 39.9666 118.243 41.8929 118.263 43.8559C118.283 45.819 117.807 47.7553 116.879 49.4855C115.952 51.2157 114.602 52.6839 112.957 53.7541L79.5433 75.4716C76.7046 77.3169 73.3916 78.299 70.0058 78.299C66.6201 78.299 63.3071 77.3169 60.4683 75.4716L27.0492 53.7483Z"
                fill="#3F3F46"
                stroke="#3F3F46"
                strokeWidth="8"
              />
            </svg>
            <span className="font-semibold">
              <span className="font-light">smashing</span>.tools
            </span>
          </div>
          <div>
            <button className="h-7 w-7 rounded border bg-white-A11 hover:bg-white-A6">
              <MagnifyingGlassIcon className="mx-auto h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <ScrollArea className="px-4">
        <div className="mb-0.5 flex max-w-full shrink grow flex-col gap-6">
          <section>
            <div className="font-medium">Category</div>
            <div className="mt-2">
              <CategorySwitcher activeCategory={activeCategory} />
            </div>

            {/* <pre>
              <code>{JSON.stringify(facets, null, 2)}</code>
            </pre> */}
          </section>
          <section>
            <div className="font-medium">Pricing</div>
            <div className="mt-2">
              {facets.pricing.map((facet: any) => (
                <div key={facet.value}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => Query.set('pricing', facet.value)}
                      checked={facet.checked}
                    />
                    {facet.value} ({facet.count})
                  </label>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
