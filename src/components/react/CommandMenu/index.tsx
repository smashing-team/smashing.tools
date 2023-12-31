import {
  GitHubLogoIcon,
  MagnifyingGlassIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { navigate } from 'astro:transitions/client';
import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/react/ui/command';
import type { PagefindSearchFragment } from '@/types/global';

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<PagefindSearchFragment[]>([]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  React.useEffect(() => {
    const pagefind = async () => {
      const searches = await window.pagefind.search(search);
      const searchesResult = await Promise.all(
        searches.results.map((r) => r.data()),
      );

      setResults(searchesResult.slice(0, 5));
    };

    pagefind();
  }, [search]);

  const handleClose = () => {
    if (search === '') {
      setOpen(false);
    } else {
      setSearch('');
    }
  };

  return (
    <>
      <button
        data-pagefind-ignore
        type="button"
        className="ui-not-focus-visible:outline-none mx-auto flex h-10 w-full max-w-md items-center gap-2 rounded-2xl bg-zinc-50 pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
        onClick={handleToggle}
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
        Search tools...
        <kbd className="ml-auto hidden text-xs font-semibold text-zinc-400 dark:text-zinc-500 lg:block">
          <kbd className="mr-0.5">⌘</kbd>
          <kbd>F</kbd>
        </kbd>
      </button>
      <CommandDialog
        className="!fixed"
        commandProps={{ shouldFilter: false }}
        open={open}
        onOpenChange={setOpen}
        onClose={handleClose}
      >
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Search tool..."
        />
        <CommandList>
          {results.length === 0 ? (
            <CommandEmpty>
              No results for &quot;
              {search}
              &quot;
            </CommandEmpty>
          ) : (
            results?.map((res, index) => (
              <CommandItem key={index} onSelect={() => navigate(res.url)}>
                <a
                  className="flex w-full flex-col items-start overflow-hidden px-2"
                  href={res.url}
                >
                  <p className="font-bold">{res.meta.title} </p>
                  <div className="mb-1.5 w-full truncate opacity-80">
                    {res.meta.headline}
                  </div>

                  <span
                    dangerouslySetInnerHTML={{ __html: res.excerpt }}
                  ></span>
                </a>
              </CommandItem>
            ))
          )}
          {search.length === 0 && (
            <React.Fragment>
              <CommandGroup heading="Socials">
                <CommandItem
                  onSelect={() =>
                    window.open('https://twitter.com/smashingtools', '_blank')
                  }
                >
                  <TwitterLogoIcon className="mr-2 h-4 w-4" />
                  <span>Twitter</span>
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    window.open(
                      'https://github.com/smashing-team/smashing.tools',
                      '_blank',
                    )
                  }
                >
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  <span>Github</span>
                </CommandItem>
              </CommandGroup>
            </React.Fragment>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandMenu;
