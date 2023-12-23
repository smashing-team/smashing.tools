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

export function getStarterKits() {
  return reader.collections.starterKit.all();
}
export function getDesignKits() {
  return reader.collections.designKit.all();
}
export function getProfiles() {
  return reader.collections.profile.all();
}
