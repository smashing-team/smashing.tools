"use client";

import {
  IconArtboard,
  IconCode,
  IconComponents,
  IconLayoutGrid,
  IconPackages,
  IconRobot,
  IconRocket,
  IconTerminal2,
} from "@tabler/icons-react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import type { CategoryPaths } from "@/consts";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import Link from "next/link";

const iconClass = cn(
  "size-4 text-zinc-400 group-hover:text-zinc-600 group-data-[active='on']:text-zinc-600 dark:group-hover:text-zinc-100 dark:group-data-[active='on']:text-white"
);

const tabs = [
  // {
  //   name: "Home",
  //   href: "/",
  //   category: "/",
  //   icon: <IconLayoutGrid className={iconClass} />,
  //   classes: "",
  // },
  {
    name: "Starter Kits",
    href: "/starter-kit",
    category: "/starter-kit",
    icon: <IconRocket className={iconClass} />,
    classes: "bg-yellow-600/20 dark:bg-yellow-700",
    textClasses: 'dark:group-data-[active="on"]:text-red-500',
  },
  {
    name: "Design Kits",
    href: "/design-kit",
    category: "/design-kit",
    icon: <IconArtboard className={iconClass} />,
    classes: "bg-purple-600/20 dark:bg-purple-800",
    textClasses: 'dark:group-data-[active="on"]text-yellow-800',
  },
  {
    name: "UI Components",
    href: "/ui-component",
    category: "/ui-component",
    icon: <IconComponents className={iconClass} />,
    classes: "bg-blue-600/20 dark:bg-blue-800",
    textClasses: 'dark:group-data-[active="on"]text-yellow-800',
  },
  {
    name: "AI tools",
    href: "/ai",
    category: "/ai",
    icon: (
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
        className={iconClass}
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
    classes: "bg-red-600/20 dark:bg-red-800",
    textClasses: 'dark:group-data-[active="on"]text-yellow-800',
  },
  {
    name: "Dev tools",
    href: "/dev",
    category: "/dev",
    icon: <IconTerminal2 className={iconClass} />,
    classes: "bg-green-600/20 dark:bg-green-800",
    textClasses: 'dark:group-data-[active="on"]text-yellow-800',
  },
];

export function CatSwitcher({
  activeCategory,
}: {
  activeCategory: CategoryPaths;
}): React.ReactElement {
  const router = useRouter();

  return (
    <div>
      <div className="lg:hidden">
        {/* <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label> */}
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        {/* <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={activeCategory}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select> */}

        <Select
          key="category-switcher"
          defaultValue={activeCategory}
          onValueChange={(value) => router.push(value)}
        >
          <SelectTrigger className="w-full shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] mt-1">
            <SelectValue
              placeholder="Select category"
              className="flex items-center"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="/">
              <div className="flex items-center">
                <IconLayoutGrid className={iconClass} />
                <span className="ml-1.5 block whitespace-nowrap">Home</span>
              </div>
            </SelectItem>
            {tabs.map((tab) => (
              <SelectItem key={tab.name} value={tab.category}>
                <div className="flex items-center">
                  {tab.icon}
                  <span className="ml-1.5 block whitespace-nowrap">
                    {tab.name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative hidden rounded-3xl border border-white/40 p-1 dark:border-transparent lg:block shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px]">
        <div className="absolute left-0 top-0 -z-30 size-full rounded-3xl bg-white dark:bg-zinc-900"></div>
        <nav className="flex justify-between space-x-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              data-active={tab.category === activeCategory ? "on" : "off"}
              className={cn(
                "group relative flex items-center rounded-2xl px-3 py-2 text-sm font-medium"
                // tab.textClasses,
              )}
              aria-current={
                tab.category === activeCategory ? "page" : undefined
              }
            >
              <span
                className={cn(
                  "absolute inset-0 -z-10 scale-75 rounded-2xl bg-zinc-500/10 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-data-[active='on']:scale-100 group-data-[active='on']:opacity-100 dark:bg-white/20",
                  tab.classes
                )}
              ></span>
              {tab.icon}
              <span className="ml-1.5 block whitespace-nowrap">{tab.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
