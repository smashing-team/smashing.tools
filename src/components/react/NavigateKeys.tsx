import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { navigate } from 'astro:transitions/client';
import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  prevHref?: string;
  nextHref?: string;
};

export function NavigateKeys({ prevHref, nextHref }: Props) {
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && prevHref) navigate(prevHref);
      else if (event.key === 'ArrowRight' && nextHref) navigate(nextHref);
    };
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  return (
    <div
      data-pagefind-ignore
      className={twMerge(
        'fixed bottom-4 left-1/2 hidden -translate-x-1/2 lg:block',
        !prevHref && !nextHref && 'hidden',
      )}
    >
      <div className="flex h-8 items-center space-x-1.5 rounded-lg border bg-zinc-50 px-2 text-xs text-gray-500 dark:bg-zinc-900">
        <div className="text-zinc-600 dark:text-zinc-500">Prev</div>

        <div className="flex items-center space-x-0.5">
          <a
            href={prevHref || '#'}
            aria-label="Previous tool"
            className={twMerge(
              'flex h-5 w-5 items-center justify-center rounded border bg-white text-zinc-900 shadow dark:bg-zinc-900 dark:text-zinc-200',
              !prevHref && 'opacity-50',
            )}
          >
            <ChevronLeftIcon />
          </a>

          <a
            href={nextHref || '#'}
            aria-label="Next tool"
            className={twMerge(
              'flex h-5 w-5 items-center justify-center rounded border bg-white text-zinc-900 shadow dark:bg-zinc-900 dark:text-zinc-200',
              !nextHref && 'opacity-50',
            )}
          >
            <ChevronRightIcon />
          </a>
        </div>

        <div className="text-zinc-600 dark:text-zinc-500">Next</div>
      </div>
    </div>
  );
}
