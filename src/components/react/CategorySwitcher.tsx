import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { navigate } from 'astro:transitions/client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const toggleGroupItemClasses = twMerge(
  'flex-1 select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-center text-[13px] font-medium leading-none text-blue-11 outline-none',
  'data-[state=on]:bg-blue-4',
);

const CategorySwitcher = ({
  activeCategory = '/',
}: {
  activeCategory: '/' | '/code' | '/design';
}) => {
  return (
    <ToggleGroup.Root
      className="flex rounded-md bg-white-A11 p-[3px] shadow-sm shadow-black-A4"
      type="single"
      defaultValue={activeCategory}
      onValueChange={async (val) => {
        await navigate(val);
      }}
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="/"
        aria-label="All tools"
      >
        All
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="/code"
        aria-label="Code tools"
      >
        Code
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="/design"
        aria-label="Design tools"
      >
        Design
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default CategorySwitcher;
