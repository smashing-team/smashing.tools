import { createReader } from '@keystatic/core/reader';

import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export const getStarterKitFilters = () => {
  return Object.keys(
    keystaticConfig.collections.starterKit.schema.attrs.fields,
  );
};
export const getDesignKitFilters = () => {
  return Object.keys(keystaticConfig.collections.designKit.schema.attrs.fields);
};
export const getUIComponentFilters = () => {
  return Object.keys(
    keystaticConfig.collections.uiComponent.schema.attrs.fields,
  );
};

export function getAllFilters() {
  const designKitFields = {
    ...keystaticConfig.collections.designKit.schema.attrs.fields,
    ...keystaticConfig.collections.starterKit.schema.attrs.fields,
    ...keystaticConfig.collections.uiComponent.schema.attrs.fields,
  };

  const filters: Record<string, string> = {};

  Object.entries(designKitFields).map(([key, filter]) => {
    filter.options.forEach((option) => {
      filters[`${key}|${option.value}`] = option.label;
    });
    return filters;
  });
  // const starterKitFields =
  //   keystaticConfig.collections.starterKit.schema.attrs.fields;
  // const uiComponentFields =
  //   keystaticConfig.collections.uiComponent.schema.attrs.fields;

  return filters;

  // return {[key]: {name: string, label: string}

  // const filters = {
  //   ...designKitFields,
  //   ...starterKitFields,
  //   ...uiComponentFields,
  // };

  // return Object.entries(filters).map(([key, value]) => {
  //   return {
  //     name: key,
  //     options: value.options.map((option) => {
  //       return {
  //         name: option,
  //         label: option,
  //       };
  //     }),
  //   };
  // });
}

export function getStarterKits() {
  return reader.collections.starterKit.all();
}
export function getDesignKits() {
  return reader.collections.designKit.all();
}
export function getProfiles() {
  return reader.collections.profile.all();
}
