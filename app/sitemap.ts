import { KEYSTATIC } from "@/server/keystatic";
import { getBaseUrl } from "@/utils/url";
import { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const allItems = (await KEYSTATIC.tools()).map((post) => {
    return {
      url: `${getBaseUrl()}/${post.collectionSlug}/${post.slug}`,
      lastModified: post.entry.createdAt,
    };
  });

  const allPosts = (await KEYSTATIC.posts()).map((post) => {
    return {
      url: `${getBaseUrl()}/post/${post.slug}`,
      lastModified: post.entry.createdAt,
    };
  });

  const sortedItems = [...allItems, ...allPosts].sort((a, b) => {
    const aDate = new Date(a.lastModified);
    const bDate = new Date(b.lastModified);
    return bDate.valueOf() - aDate.valueOf();
  });

  const pages = [
    "join",
    "starter-kit",
    "design-kit",
    "ui-component",
    "ai",
    "dev",
  ];

  return [
    {
      url: getBaseUrl(),
      lastModified: new Date(),
    },
    ...pages.map((page) => {
      return {
        url: `${getBaseUrl()}/${page}`,
        lastModified: new Date(),
      };
    }),
    ...sortedItems,
  ];
}
