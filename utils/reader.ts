import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export type AllItems = Awaited<ReturnType<typeof getAllItems>>;

export const getStarterKitFilters = () => {
  return Object.keys(
    keystaticConfig.collections.starterKit.schema.attrs.fields
  );
};
export const getDesignKitFilters = () => {
  return Object.keys(keystaticConfig.collections.designKit.schema.attrs.fields);
};
export const getUIComponentFilters = () => {
  return Object.keys(
    keystaticConfig.collections.uiComponent.schema.attrs.fields
  );
};
export const getAIFilters = () => {
  return Object.keys(keystaticConfig.collections.ai.schema.attrs.fields);
};
export const getDevFilters = () => {
  return Object.keys(keystaticConfig.collections.dev.schema.attrs.fields);
};

export function getAllFilters() {
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
}

export type TPost = Awaited<
  ReturnType<typeof reader.collections.post.all>
>[0] & { collection: string; collectionSlug: string };

export async function getAllItems() {
  const starterKitItems = (await reader.collections.starterKit.all()) || [];
  const designKitItems = (await reader.collections.designKit.all()) || [];
  const uiComponentItems = (await reader.collections.uiComponent.all()) || [];
  const aiItems = (await reader.collections.ai.all()) || [];
  const devItems = (await reader.collections.dev.all()) || [];
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
}
