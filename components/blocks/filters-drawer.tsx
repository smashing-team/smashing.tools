import { IconFilter } from "@tabler/icons-react";
import React from "react";

import FacetButton from "@/components/blocks/facet-button";
import FacetGroup from "@/components/blocks/facet-group";
import { Button } from "@/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer";
import type { Facets } from "@/utils/facets";
import Query from "@/utils/query";

export function FiltersDrawer({
  facets = {},
}: {
  facets: Facets;
}): React.ReactElement {
  const facetEntries = Object.entries(facets || {});
  const filtered = facetEntries.some(([_, values]) =>
    values?.some((val) => val.checked)
  );
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="group">
          <IconFilter className="-ml-1 mr-1 size-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-100" />{" "}
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%]">
        <div className="h-full overflow-y-auto">
          <div className="mx-auto max-w-sm md:max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              {facetEntries?.map(([facet, values]) =>
                facet !== "pricing" ? (
                  <FacetGroup key={facet} title={facet}>
                    {values?.map((f) => (
                      <FacetButton
                        key={facet + f.value}
                        slug={facet}
                        value={f.value}
                        count={f.count}
                        selected={f.checked}
                        disabled={f.disabled}
                      />
                    ))}
                  </FacetGroup>
                ) : null
              )}
            </div>
            <DrawerFooter>
              <div className="flex items-center gap-2">
                {filtered && (
                  <Button className="grow" onClick={() => Query.clear()}>
                    Clear all filters
                  </Button>
                )}

                <DrawerClose asChild>
                  <Button variant="outline" className="grow">
                    Close
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
