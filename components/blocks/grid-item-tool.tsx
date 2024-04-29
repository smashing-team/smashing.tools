import { BookmarkToggle } from "@/components/blocks/bookmark-toggle";
import { TagPricings } from "@/components/blocks/tag-pricings";
import { TTools } from "@/server/keystatic";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TagCategory } from "./tag-category";

export function GridItemTool({
  item,
}: {
  item: TTools[number];
}): React.ReactElement {
  const hasDarkLogo = false;
  return (
    <li className="col-span-1">
      <div className="group relative rounded-2xl border border-zinc-200 bg-white/50 dark:border-transparent dark:bg-zinc-800/30 shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px]">
        <div
          className={cn(
            "absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 transition-all [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.zinc.50)),var(--quick-links-hover-bg,theme(colors.neutral.50)))_padding-box,linear-gradient(to_top,theme(colors.zinc.300),theme(colors.zinc.300),theme(colors.zinc.500))_border-box] group-hover:opacity-100",
            "dark:[--quick-links-hover-bg:theme(colors.zinc.800)]",
            "dark:[background:linear-gradient(var(--quick-links-hover-bg,theme(colors.zinc.50)),var(--quick-links-hover-bg,theme(colors.neutral.50)))_padding-box,linear-gradient(to_top,theme(colors.zinc.700),theme(colors.zinc.700),theme(colors.zinc.500))_border-box]"
          )}
        ></div>

        <BookmarkToggle collection={item.collection} slug={item.slug} />

        <div className="relative overflow-hidden rounded-md p-6">
          <div className="relative inline-block">
            <Image
              className={cn(
                "h-12 w-12 shrink-0",
                hasDarkLogo && "block dark:hidden"
              )}
              src={item.entry.logo}
              alt={item.entry.name}
              width={48}
              height={48}
            />
            {item.entry.logoDark && (
              <Image
                className="hidden size-12 shrink-0 dark:block"
                src={item.entry.logoDark}
                alt={item.entry.name}
              />
            )}
          </div>
          <h2 className="mt-4 font-sans text-base text-zinc-900 dark:text-white">
            <Link
              href={`/${item.collectionSlug}/${item.slug}`}
              className="flex items-center space-x-2 font-semibold text-lg"
            >
              <span className="absolute -inset-px rounded-md"></span>
              {item.entry.name}
            </Link>
          </h2>
          <p className="mt-1 truncate text-sm text-zinc-700 dark:text-zinc-200">
            {item.entry.headline}
          </p>

          <div className="mt-3 flex items-center gap-3 pt-2 text-xs text-zinc-700 dark:text-zinc-400">
            <div className="whitespace-nowrap font-medium">
              <TagCategory collectionSlug={item.collectionSlug} />
            </div>
            <div className="grow"></div>
            <TagPricings tags={item.entry.attrs.pricing} />
          </div>
        </div>
      </div>
    </li>
  );
}
