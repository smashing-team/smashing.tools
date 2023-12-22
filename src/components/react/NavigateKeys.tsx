import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { navigate } from 'astro:transitions/client';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  prevHref?: string;
  nextHref?: string;
};

export function NavigateKeys({ prevHref, nextHref }: Props) {
  const prevLinkRef = useRef<HTMLAnchorElement>(null);
  const nextLinkRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && prevHref) {
        prevLinkRef.current?.setAttribute('data-transitioning', 'true');
        navigate(prevHref);
      } else if (event.key === 'ArrowRight' && nextHref) {
        nextLinkRef.current?.setAttribute('data-transitioning', 'true');
        navigate(nextHref);
      }
    };
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  const loadingIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="hidden h-3 w-3 animate-spin group-data-[transitioning]:block"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 6l0 -3" />
      <path d="M16.25 7.75l2.15 -2.15" />
      <path d="M18 12l3 0" />
      <path d="M16.25 16.25l2.15 2.15" />
      <path d="M12 18l0 3" />
      <path d="M7.75 16.25l-2.15 2.15" />
      <path d="M6 12l-3 0" />
      <path d="M7.75 7.75l-2.15 -2.15" />
    </svg>
  );

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
            ref={prevLinkRef}
            href={prevHref || '#'}
            aria-label="Previous tool"
            onClick={(event) => {
              event.currentTarget.setAttribute('data-transitioning', 'true');
            }}
            className={twMerge(
              'group flex h-5 w-5 items-center justify-center rounded border bg-white text-zinc-900 shadow dark:bg-zinc-900 dark:text-zinc-200',
              !prevHref && 'opacity-50',
            )}
          >
            <ChevronLeftIcon className="group-data-[transitioning]:hidden" />
            {loadingIcon}
          </a>

          <a
            ref={nextLinkRef}
            href={nextHref || '#'}
            onClick={(event) => {
              event.currentTarget.setAttribute('data-transitioning', 'true');
            }}
            aria-label="Next tool"
            className={twMerge(
              'group flex h-5 w-5 items-center justify-center rounded border bg-white text-zinc-900 shadow dark:bg-zinc-900 dark:text-zinc-200',
              !nextHref && 'opacity-50',
            )}
          >
            <ChevronRightIcon className="group-data-[transitioning]:hidden" />
            {loadingIcon}
          </a>
        </div>

        <div className="text-zinc-600 dark:text-zinc-500">Next</div>
      </div>
    </div>
  );
}
