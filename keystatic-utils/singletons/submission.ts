import { fields, singleton } from '@keystatic/core';

export const submission = singleton({
  previewUrl: '/submission',
  label: 'Submission Guidelines',
  path: 'src/content/pages/submission',
  entryLayout: 'content',
  format: { contentField: 'content' },
  schema: {
    content: fields.document({
      label: 'Content',
      formatting: true,
      dividers: true,
      links: true,
      images: undefined,
      tables: true,
    }),
  },
});
