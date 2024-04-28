import { GridItemPost } from "@/components/blocks/grid-item-post";
import { GridItemTool } from "@/components/blocks/grid-item-tool";
import { cn } from "@/utils/cn";
import { CATEGORY } from "@/utils/consts";
import { reader, type AllItems } from "@/utils/reader";

export async function GridList({
  items,
  withoutPadding,
  full,
  activeCategory,
  excludePosts = false,
}: {
  withoutPadding?: boolean;
  full?: boolean;
  items: AllItems;
  activeCategory: CATEGORY;
  excludePosts?: boolean;
}) {
  let posts = excludePosts
    ? []
    : (await reader.collections.post.all()).map((item) => ({
        ...item,
        collection: "post",
        collectionSlug: "post",
      }));

  posts = posts.filter((item) => {
    const categoryFilter = {
      "/": true,
      "/design-kit": !!item.entry.designKit,
      "/starter-kit": !!item.entry.starterKit,
      "/ui-component": !!item.entry.uiComponent,
      "/dev": !!item.entry.dev,
      "/ai": !!item.entry.ai,
      "/post": false,
    };
    return categoryFilter[activeCategory.slug] || false;
  });

  const allItems = [...items, ...posts];

  allItems.sort((a, b) => {
    const aDate = new Date(a.entry.createdAt);
    const bDate = new Date(b.entry.createdAt);
    return bDate.valueOf() - aDate.valueOf();
  });

  return (
    <ul
      role="list"
      className={cn(
        "grid grid-cols-1 gap-4 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:p-4 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2",
        withoutPadding && "p-0 lg:p-0",
        full && "sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2"
      )}
    >
      {allItems.map((item) => {
        return item.collection === "post" ? (
          /* @ts-ignore */
          <GridItemPost key={item.collectionSlug + item.slug} item={item} />
        ) : (
          /* @ts-ignore */
          <GridItemTool key={item.collectionSlug + item.slug} item={item} />
        );
      })}
    </ul>
  );
}
