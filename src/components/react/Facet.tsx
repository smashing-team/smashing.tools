import React from 'react';
import { twMerge } from 'tailwind-merge';

const Facet = ({
  title,
  count,
  selected = false,
  disabled = false,
  onClick,
}: {
  title: string;
  count: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <li className="group relative flex" data-active={selected && 'on'}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          'inline-flex items-center rounded-full bg-white px-4 py-1 ring-1 ring-inset ring-zinc-200 dark:bg-transparent dark:text-zinc-200 dark:ring-zinc-800',
          selected && 'text-zinc-600 ring-zinc-600 dark:ring-zinc-400',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <span className="text-sm font-normal">{title}</span>
        <span className="ml-3 h-3.5 w-px bg-zinc-600/20"></span>
        <span className="ml-3 font-mono text-xs" aria-hidden="true">
          {count}
        </span>
      </button>
    </li>
  );
};

export default Facet;
