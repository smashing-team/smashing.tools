import { GridList } from "@/components/blocks/grid-list";
import { HeaderGradientProtected } from "@/components/blocks/header-gradient-protected";
import { CATEGORIES } from "@/consts";
import { constructMetadata } from "@/utils/metadata";
import { getAllItems } from "@/utils/reader";
import { createClient } from "@/utils/supabase/server";
import { IconBookmarksFilled } from "@tabler/icons-react";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Bookmarks",
  description: "Your bookmarks on smashing.tools",
});

export default async function ProfileDetail() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/join");
  }

  const bookmarksResponse = await supabase.from("bookmark").select("*");
  const bookmarks = !bookmarksResponse.error ? bookmarksResponse.data : [];
  const allItems = await getAllItems();

  const creatorItems = allItems.filter((item) =>
    bookmarks.find((bookmark) => bookmark.content_id === item.slug)
  );

  return (
    <div>
      <HeaderGradientProtected />
      <div className="mx-auto size-full px-4">
        <div className="center-h mb-6 flex">
          <div>
            <span className="text-2xl font-semibold">Your bookmarks</span>
            <span
              className="text-sm text-zinc-600 dark:text-zinc-400 ml-1"
              id="bookmark-count"
            >
              ({creatorItems.length})
            </span>
            <p className="mt-2 text-sm text-zinc-500">
              These are the bookmarks you&apos;ve saved.
            </p>
          </div>
          <div className="flex grow"></div>
        </div>
        {creatorItems.length ? (
          <GridList
            excludePosts
            activeCategory={CATEGORIES[0]}
            full
            withoutPadding
            items={creatorItems}
          />
        ) : (
          <div className="flex flex-col items-center">
            <span className="mb-6 mt-10 inline-flex size-14 items-center justify-center rounded-full bg-zinc-100 ring-8 ring-zinc-50 dark:bg-zinc-800 dark:ring-zinc-900">
              <IconBookmarksFilled className="size-7 text-zinc-500" />
            </span>
            <>
              <p className="text-zinc-500">
                You haven&apos;t bookmarked any tool yet.
              </p>
              <a
                className="text-indigo-600 underline dark:text-indigo-400"
                href="/"
              >
                Explore the tools!
              </a>
            </>
          </div>
        )}
      </div>
    </div>
  );
}
