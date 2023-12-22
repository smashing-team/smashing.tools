import { createReader } from '@keystatic/core/reader';

import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export const getStarterKitFilters = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { pricing, ...filters } =
    keystaticConfig.collections.starterKit.schema.attrs.fields;
  return Object.keys(filters);
};
export const getUIKitFilters = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { pricing, ...filters } =
    keystaticConfig.collections.uiKit.schema.attrs.fields;
  return Object.keys(filters);
};

export function getStarterKits() {
  return reader.collections.starterKit.all();
}
export function getUIKits() {
  return reader.collections.uiKit.all();
}
export function getProfiles() {
  return reader.collections.profile.all();
}
