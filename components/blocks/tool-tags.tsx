"use client";

import React, { useState } from "react";

export function ToolTags({
  allTags,
  allFilters,
}: {
  allTags: string[][];
  allFilters: Record<string, string>;
}) {
  const tags = allTags.slice(0, 6);
  const otherTags = allTags.slice(6);
  const hasMoreTags = otherTags.length > 0;

  const [showOtherTags, setShowOtherTags] = useState(false);

  return (
    <React.Fragment>
      {tags?.map(([key, value]) => {
        return (
          <span
            key={key + value}
            className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20"
          >
            {allFilters[`${key}|${value}`]}
          </span>
        );
      })}
      {hasMoreTags && !showOtherTags && (
        <span
          onClick={() => setShowOtherTags(true)}
          className="cursor-pointer p-1 text-xs font-medium text-zinc-400 hover:underline"
        >
          +{otherTags.length} more
        </span>
      )}
      {showOtherTags &&
        otherTags?.map(([key, value]) => {
          return (
            <span
              key={key + value}
              className="inline-flex items-center rounded-full bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20"
            >
              {allFilters[`${key}|${value}`]}
            </span>
          );
        })}
    </React.Fragment>
  );
}
