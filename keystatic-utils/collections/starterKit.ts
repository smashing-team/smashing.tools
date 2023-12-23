import { collection, fields } from '@keystatic/core';
import {
  api,
  baseSchema,
  content,
  database,
  features,
  framework,
  heroSlider,
  language,
  pricing,
  runtime,
  styling,
  testing,
  uiComponents,
  uiLibrary,
} from 'keystatic-utils';

export const starterKit = collection({
  previewUrl:
    process.env.NODE_ENV !== 'production' ? '/starter-kit/{slug}' : undefined,
  label: 'Starter Kits',
  slugField: 'name',
  path: 'src/content/starter-kit/*',
  entryLayout: 'form',
  format: { contentField: 'content' },
  schema: {
    ...baseSchema,
    repositoryUrl: fields.url({
      label: 'Repository URL',
    }),
    content,
    heroSlider,
    attrs: fields.object(
      {
        pricing,
        language,
        styling,
        database,
        runtime,
        uiLibrary,
        uiComponents,
        testing,
        api,
        framework,
        features,
      },
      {
        label: 'Attributes',
        layout: [
          12,
          // ----
          3, 3, 3, 3,
          // ----
          3, 3, 3, 3,
          // ----
          3, 9,
        ],
      },
    ),
  },
});
