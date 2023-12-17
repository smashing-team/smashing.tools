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
} from '@/components/ui/command';

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);

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
      // TODO: type support for pagefind will be added to the window object.
      // @ts-ignore
      const searches = await window.pagefind.search(search);
      // @ts-ignore
      const searchesResult = await Promise.all(
        // @ts-ignore
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
        className="ui-not-focus-visible:outline-none mx-auto flex h-10 w-full max-w-md items-center gap-2 rounded-xl bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
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
          {results.length === 0 ? (
            <CommandEmpty>
              No results for &quot;
              {search}
              &quot;
            </CommandEmpty>
          ) : (
            results?.map((res, index) => (
              <CommandItem className="flex flex-col items-start" key={index}>
                <p className="font-bold">{res.meta.title}</p>
                <span dangerouslySetInnerHTML={{ __html: res.excerpt }}></span>
              </CommandItem>
            ))
          )}
          {search.length === 0 && (
            <React.Fragment>
              <CommandGroup heading="Socials" className="mb-1">
                <CommandItem>
                  <TwitterLogoIcon className="mr-2 h-4 w-4" />
                  <span>Twitter</span>
                </CommandItem>
                <CommandItem>
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  <span>Github</span>
                </CommandItem>
                <CommandItem>
                  <InstagramLogoIcon className="mr-2 h-4 w-4" />
                  <span>Instagram</span>
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
