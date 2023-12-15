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
          'inline-flex items-center rounded-full bg-white px-4 py-1 ring-1 ring-inset ring-slate-200',
          selected && 'text-slate-600 ring-slate-600',
          disabled
            ? 'cursor-not-allowed opacity-50'
            : ' transition hover:translate-y-[-1px]',
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
