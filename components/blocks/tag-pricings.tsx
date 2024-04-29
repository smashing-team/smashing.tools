import React from "react";

export function TagPricings({
  tags,
}: {
  tags: readonly ("Free" | "Subscription" | "One-time fee")[];
}): React.ReactElement {
  return (
    <div className="flex gap-1 whitespace-nowrap">
      {tags.map((tag: string) => {
        return (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-zinc-200/10 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20"
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
