"use client";

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
import { usePathname, useRouter } from "next/navigation";

export function FiltersDrawer({
  facets = {},
}: {
  facets: Facets;
}): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const facetEntries = Object.entries(facets || {});
  const filtered = facetEntries.some(([_, values]) =>
    values?.some((val) => val.checked)
  );
  const filteredValueCount = facetEntries.reduce(
    (acc, [_, values]) =>
      acc + (values?.filter((val) => val.checked).length || 0),
    0
  );
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 mr-2 -ml-1 text-zinc-400"
          >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
          </svg>
          Filters{" "}
          {filtered && (
            <span className="ml-1 text-xs">
              (
              <span className="tabular-nums font-mono">
                {`${filteredValueCount}`}
              </span>
              )
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%] max-w-xl mx-auto">
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
                  <Button
                    className="grow"
                    onClick={() => router.push(pathname, { scroll: false })}
                  >
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
