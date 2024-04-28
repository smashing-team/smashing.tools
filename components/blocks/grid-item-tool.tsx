import { BookmarkToggle } from "@/components/blocks/bookmark-toggle";
import { TTools } from "@/server/keystatic";
import { cn } from "@/utils/cn";
import { getCategoryTitle } from "@/utils/consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

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
              <span
                className={twMerge(
                  "inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20",
                  item.collection === "uiComponent" &&
                    "dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 bg-blue-50 text-blue-700 ring-blue-700/10",
                  item.collection === "designKit" &&
                    "dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30 bg-purple-50 text-purple-700 ring-purple-700/10",
                  item.collection === "starterKit" &&
                    "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20 bg-yellow-50 text-yellow-800 ring-yellow-600/20",
                  item.collection === "ai" &&
                    "dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20 bg-red-50 text-red-800 ring-red-600/20",
                  item.collection === "dev" &&
                    "dark:bg-green-400/10 dark:text-green-500 dark:ring-green-400/20 bg-green-50 text-green-800 ring-green-600/20"
                )}
              >
                {getCategoryTitle(item.collectionSlug)}
              </span>
            </div>
            <div className="grow"></div>
            <div className="flex gap-1 whitespace-nowrap">
              {item.entry.attrs.pricing.map((v: string) => {
                return (
                  <span
                    key={v}
                    className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20"
                  >
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
