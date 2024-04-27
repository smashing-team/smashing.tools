"use client";

import { useUser } from "@/components/providers/user";
import { bookmarkToggle } from "@/server/actions";
import { useState } from "react";

export function BookmarkToggle({
  collection,
  slug,
}: {
  collection: string;
  slug: string;
}) {
  const { bookmarks } = useUser();
  const [disabled, setDisabled] = useState(false);

  const isChecked = !!bookmarks?.find(
    (bookmarkedItem) =>
      bookmarkedItem.collection === collection &&
      bookmarkedItem.content_id === slug
  );

  async function toggle(collection: string, slug: string, checked: boolean) {
    setDisabled(true);
    await bookmarkToggle(collection, slug, checked);
    setDisabled(false);
  }

  return (
    <button
      data-collection={collection}
      data-value={slug}
      data-checked={isChecked.toString()}
      data-bookmark
      disabled={disabled}
      onClick={async () => {
        toggle(collection, slug, isChecked);
      }}
      aria-label="Bookmark"
      className="group absolute right-2 top-2 z-50 flex size-12 items-center justify-center rounded-md text-zinc-500 opacity-100 transition-all hover:scale-110 group-hover:opacity-100 data-[checked=true]:opacity-100 dark:text-zinc-400 lg:opacity-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-5 transition-all group-data-[checked=true]:fill-red-600 group-data-[checked=true]:stroke-red-600 dark:group-data-[checked=true]:fill-red-500 dark:group-data-[checked=true]:stroke-red-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
        </>
      </svg>
    </button>
  );
}
