import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

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
