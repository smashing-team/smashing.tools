import React from 'react';

import CategorySwitcher from '@/components/react/CategorySwitcher';

export function Sidebar({
  activeCategory = '/',
}: {
  activeCategory: '/' | '/code' | '/design';
}): React.ReactElement {
  return (
    <div className="absolute inset-0 z-50 flex w-56 shrink-0 -translate-x-full flex-col justify-items-start border-r bg-gray-2 shadow-none duration-300 lg:relative lg:translate-x-0 lg:shadow-none">
      <div className="mb-3 flex shrink-0 grow-0 flex-col px-5 py-3">
        <div className="flex items-center justify-between">
          <div>logo</div>
          <div>search</div>
        </div>
      </div>
      <div className="mb-0.5 flex shrink grow flex-col overflow-y-auto">
        <div>
          <div className="px-5 font-medium">Filters</div>
          {/* <select>
            <option value="">all</option>
            <option value="/code">code</option>
            <option value="/design">design</option>
          </select> */}

          <div className="mt-2 px-4">
            <CategorySwitcher activeCategory={activeCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
