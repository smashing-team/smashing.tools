import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  MagnifyingGlassIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
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

      setResults(searchesResult);
    };

    pagefind();
  }, [search]);

  return (
    <>
      <button
        type="button"
        className="ui-not-focus-visible:outline-none mx-auto flex h-10 w-full max-w-md items-center gap-2 rounded-xl bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
        onClick={handleToggle}
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
        Search tools...
        <kbd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">⌘</kbd>
          <kbd className="font-sans">F</kbd>
        </kbd>
      </button>
      <CommandDialog
        commandProps={{ shouldFilter: false }}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandSeparator />
          {results.length === 0 ? (
            <CommandEmpty>
              No results for &quot;
              {search}
              &quot;
            </CommandEmpty>
          ) : (
            results?.map((res, index) => (
              <CommandItem key={index}>
                <a className="flex w-full flex-col items-start" href={res.url}>
                  <p className="font-bold">{res.meta.title}</p>
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
                <CommandItem className="!p-0">
                  <a
                    className="flex w-full px-2 py-3"
                    target="_blank"
                    href="https://twitter.com/smashingtools"
                  >
                    <TwitterLogoIcon className="mr-2 h-4 w-4" />
                    <span>Twitter</span>
                  </a>
                </CommandItem>
                <CommandItem className="!p-0">
                  <a
                    className="flex w-full px-2 py-3"
                    target="_blank"
                    href="https://github.com/smashing-team/smashing.tools"
                  >
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    <span>Github</span>
                  </a>
                </CommandItem>
                <CommandItem className="!p-0">
                  <a className="flex w-full px-2 py-3" href="#" target="_blank">
                    <InstagramLogoIcon className="mr-2 h-4 w-4" />
                    <span>İnstagram</span>
                  </a>
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
