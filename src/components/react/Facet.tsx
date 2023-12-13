import React from 'react';
import { twMerge } from 'tailwind-merge';

const Facet = ({
  title,
  count,
  selected = false,
}: {
  title: string;
  count: number;
  selected?: boolean;
}) => {
  return (
    <li className="group relative flex" data-active={selected && 'on'}>
      <button
        className={twMerge(
          'inline-flex items-center rounded-full bg-white px-4 py-1  ring-1 ring-inset ring-slate-200',
          selected && 'text-blue-600 ring-blue-600',
        )}
      >
        <span className="text-sm font-normal">{title}</span>
        <span className="ml-3 h-3.5 w-px bg-blue-600/20"></span>
        <span className="ml-3 font-mono text-xs" aria-hidden="true">
          {count}
        </span>
      </button>
    </li>
  );
};

export default Facet;
