import { cn } from "@/utils/cn";
import { getCategoryTitle } from "@/utils/consts";

export function TagCategory({ collectionSlug }: { collectionSlug: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20",
        collectionSlug === "ui-component" &&
          "dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 bg-blue-50 text-blue-700 ring-blue-700/10",
        collectionSlug === "design-kit" &&
          "dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30 bg-purple-50 text-purple-700 ring-purple-700/10",
        collectionSlug === "starter-kit" &&
          "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20 bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        collectionSlug === "ai" &&
          "dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20 bg-red-50 text-red-800 ring-red-600/20",
        collectionSlug === "dev" &&
          "dark:bg-green-400/10 dark:text-green-500 dark:ring-green-400/20 bg-green-50 text-green-800 ring-green-600/20"
      )}
    >
      {getCategoryTitle(collectionSlug)}
    </span>
  );
}
