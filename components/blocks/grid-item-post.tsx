import { cn } from "@/utils/cn";
import { TPost, reader } from "@/utils/reader";
import { IconConfetti } from "@tabler/icons-react";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

export async function GridItemPost({ item }: { item: TPost }) {
  let relatedItem;

  if (item.entry.designKit) {
    relatedItem = await reader.collections.designKit.read(item.entry.designKit);
  } else if (item.entry.uiComponent) {
    relatedItem = await reader.collections.uiComponent.read(
      item.entry.uiComponent
    );
  } else if (item.entry.starterKit) {
    relatedItem = await reader.collections.starterKit.read(
      item.entry.starterKit
    );
  } else if (item.entry.dev) {
    relatedItem = await reader.collections.dev.read(item.entry.dev);
  } else if (item.entry.ai) {
    relatedItem = await reader.collections.ai.read(item.entry.ai);
  }

  if (!relatedItem) return <></>;

  const maker = relatedItem.maker
    ? await reader.collections.profile.read(relatedItem.maker)
    : undefined;

  const hasDarkLogo = !!relatedItem?.logoDark;

  return (
    <li className="col-span-1">
      <div className="group relative rounded-2xl border border-sky-200/50 bg-sky-100/50 dark:border-transparent dark:bg-sky-900/20 shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px]">
        <div
          className={cn(
            "absolute -inset-px rounded-2xl border-2 border-transparent opacity-0 transition-all [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.sky.200),theme(colors.sky.200),theme(colors.sky.500))_border-box] group-hover:opacity-100",
            "dark:[--quick-links-hover-bg:#022f3f]",
            "dark:[background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.sky.800),theme(colors.sky.800),theme(colors.sky.500))_border-box]"
          )}
        ></div>

        <div className="relative overflow-hidden rounded-3xl p-6">
          <div className="relative inline-block">
            <Image
              className={twMerge(
                "h-12 w-12 shrink-0",
                hasDarkLogo && "block dark:hidden"
              )}
              src={relatedItem.logo}
              alt={relatedItem.name}
              width={48}
              height={48}
            />
            {relatedItem.logoDark && (
              <Image
                className="hidden size-12 shrink-0 dark:block"
                src={relatedItem.logoDark}
                alt={relatedItem.name}
              />
            )}
            {maker && (
              <Image
                className="absolute -bottom-2 -right-2 inline-block size-5 rounded-full bg-white ring-2 ring-white dark:bg-zinc-900 dark:ring-zinc-900 dark:group-hover:ring-zinc-800"
                src={maker.avatar}
                alt={maker.name}
                width={20}
                height={20}
              />
            )}
          </div>
          <h2 className="mt-4 font-sans text-base text-zinc-900 dark:text-white">
            <Link
              href={`/${item.collection}/${item.slug}`}
              className="flex items-center space-x-2 font-medium"
            >
              <span className="absolute -inset-px rounded-3xl"></span>
              {item.entry.name}
            </Link>
          </h2>
          <p className="mt-1 truncate text-sm text-zinc-700 dark:text-zinc-200">
            {item.entry.headline}
          </p>

          <div className="mt-4 flex items-center gap-3 pt-2 text-xs text-zinc-700 dark:text-zinc-400">
            <div className="whitespace-nowrap font-medium">
              <span
                className={cn(
                  "inline-flex items-center rounded-lg bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ",
                  "bg-yellow-400 text-yellow-950 ring-yellow-500"
                )}
              >
                <IconConfetti className="mr-1 size-3.5" />
                {item.entry.postType}
              </span>
            </div>
            <div className="grow"></div>
            <time>{dayjs().to(item.entry.createdAt)}</time>
          </div>
        </div>
      </div>
    </li>
  );
}
