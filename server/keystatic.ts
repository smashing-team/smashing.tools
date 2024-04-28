import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import "server-only";

const getReader = cache(() => createReader(process.cwd(), keystaticConfig));

export const KEYSTATIC = {
  entry: {
    starterKit: cache(getReader().collections.starterKit.readOrThrow),
    uiComponent: cache(getReader().collections.uiComponent.readOrThrow),
    designKit: cache(getReader().collections.designKit.readOrThrow),
    ai: cache(getReader().collections.ai.readOrThrow),
    dev: cache(getReader().collections.dev.readOrThrow),
    post: cache(getReader().collections.post.readOrThrow),
    profile: cache(getReader().collections.profile.read),
  },
  tools: cache(async () => {
    const reader = getReader();
    const starterKitItems = await reader.collections.starterKit.all();
    const designKitItems = await reader.collections.designKit.all();
    const uiComponentItems = await reader.collections.uiComponent.all();
    const aiItems = await reader.collections.ai.all();
    const devItems = await reader.collections.dev.all();
    // const postItems = (await reader.collections.post.all()) || [];

    // TODO: Add post items and populate post related data
    // TODO: limit the number of items to show

    const allItems = [
      // ...postItems.map((item) => ({
      //   ...item,
      //   collection: "post",
      // })),
      ...starterKitItems.map((item) => ({
        ...item,
        collection: "starterKit",
        collectionSlug: "starter-kit",
      })),
      ...designKitItems.map((item) => ({
        ...item,
        collection: "designKit",
        collectionSlug: "design-kit",
      })),
      ...uiComponentItems.map((item) => ({
        ...item,
        collection: "uiComponent",
        collectionSlug: "ui-component",
      })),
      ...aiItems.map((item) => ({
        ...item,
        collection: "ai",
        collectionSlug: "ai",
      })),
      ...devItems.map((item) => ({
        ...item,
        collection: "dev",
        collectionSlug: "dev",
      })),
    ];

    const items = allItems;

    items.sort((a, b) => {
      const aDate = new Date(a!.entry.createdAt);
      const bDate = new Date(b!.entry.createdAt);
      return bDate.valueOf() - aDate.valueOf();
    });
    return items;
  }),
  posts: cache(async () => {
    const reader = getReader();
    const postItems = (await reader.collections.post.all()) || [];

    const allItems = [
      ...postItems.map((item) => ({
        ...item,
        collection: "post",
      })),
    ];

    const items = allItems;

    items.sort((a, b) => {
      const aDate = new Date(a!.entry.createdAt);
      const bDate = new Date(b!.entry.createdAt);
      return bDate.valueOf() - aDate.valueOf();
    });
    return items;
  }),
  filters: {
    all: cache(() => {
      const allFields = {
        ...keystaticConfig.collections.designKit.schema.attrs.fields,
        ...keystaticConfig.collections.starterKit.schema.attrs.fields,
        ...keystaticConfig.collections.uiComponent.schema.attrs.fields,
        ...keystaticConfig.collections.ai.schema.attrs.fields,
        ...keystaticConfig.collections.dev.schema.attrs.fields,
      };

      const filters: Record<string, string> = {};

      Object.entries(allFields).map(([key, filter]) => {
        filter.options.forEach((option) => {
          filters[`${key}|${option.value}`] = option.label;
        });
        return filters;
      });

      return filters;
    }),
    starterKit: cache(() =>
      Object.keys(keystaticConfig.collections.starterKit.schema.attrs.fields)
    ),
    designKit: cache(() =>
      Object.keys(keystaticConfig.collections.designKit.schema.attrs.fields)
    ),
    uiComponent: cache(() =>
      Object.keys(keystaticConfig.collections.uiComponent.schema.attrs.fields)
    ),
    ai: cache(() =>
      Object.keys(keystaticConfig.collections.ai.schema.attrs.fields)
    ),
    dev: cache(() =>
      Object.keys(keystaticConfig.collections.dev.schema.attrs.fields)
    ),
  },
};

export type TReader = Awaited<ReturnType<typeof getReader>>;
export type TTools = Awaited<ReturnType<typeof KEYSTATIC.tools>>;
export type TPosts = Awaited<ReturnType<typeof KEYSTATIC.posts>>;
