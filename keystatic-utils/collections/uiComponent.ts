import { collection, fields } from '@keystatic/core';
import {
  baseSchema,
  componentCount,
  content,
  framework,
  heroSlider,
  language,
  pageExampleCount,
  pricing,
  styling,
  uiLibrary,
} from 'keystatic-utils';

export const uiComponent = collection({
  previewUrl:
    process.env.NODE_ENV !== 'production' ? '/ui-component/{slug}' : undefined,
  label: 'UI Components',
  slugField: 'name',
  entryLayout: 'form',
  path: 'src/content/ui-component/*',
  format: { contentField: 'content' },
  schema: {
    ...baseSchema,
    repositoryUrl: fields.url({
      label: 'Repository URL',
    }),
    previewUrl: fields.url({
      label: 'Preview/Demo URL',
    }),
    content,
    heroSlider,
    attrs: fields.object(
      {
        pricing,
        language,
        uiLibrary,
        framework,
        styling,
        componentCount,
        pageExampleCount,
      },
      { label: 'Attributes', layout: [12, 4, 4, 4, 4, 4, 4] },
    ),
  },
});
