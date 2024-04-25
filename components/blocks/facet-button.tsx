import React from 'react';
import { twMerge } from 'tailwind-merge';

import Query from '@/utils/query';

interface Props {
  slug: string;
  value: string;
  count: number;
  selected?: boolean;
  disabled?: boolean;
}

const FacetButton: React.FC<Props> = ({
  slug,
  value,
  count,
  selected = false,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      Query.toggle(slug, value);
    }
  };

  return (
    <li className="group relative flex">
      <button
        data-facet={slug}
        data-value={value}
        disabled={disabled}
        className={twMerge(
          'inline-flex items-center rounded-full bg-white px-3 py-1 ring-1 ring-inset ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-950/40 dark:text-zinc-200 dark:ring-zinc-800 dark:hover:bg-zinc-800',
          selected &&
            'bg-zinc-100 text-zinc-600 ring-zinc-300 dark:bg-zinc-800 dark:ring-zinc-700',
          disabled && 'cursor-not-allowed opacity-20',
        )}
        onClick={handleClick}
      >
        <span className="text-sm font-normal">{value}</span>
        <span className="ml-2 h-3.5 w-px bg-zinc-600/20"></span>
        <span
          className="ml-2 font-mono text-xs text-zinc-400 dark:text-zinc-500"
          aria-hidden="true"
        >
          {count}
        </span>
      </button>
    </li>
  );
};

export default FacetButton;
