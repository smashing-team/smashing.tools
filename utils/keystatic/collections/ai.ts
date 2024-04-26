import { collection, fields } from "@keystatic/core";

import {
  baseSchema,
  content,
  heroSlider,
  pricing,
  subCategoryAI,
} from "../index";

export const ai = collection({
  previewUrl: process.env.NODE_ENV !== "production" ? "/ai/{slug}" : undefined,
  label: "AI Tools",
  slugField: "name",
  entryLayout: "form",
  path: "content/ai/*",
  format: { contentField: "content" },
  schema: {
    ...baseSchema("ai"),
    repositoryUrl: fields.url({
      label: "Repository URL",
    }),
    previewUrl: fields.url({
      label: "Preview/Demo URL",
    }),
    content,
    heroSlider: heroSlider("ai"),
    attrs: fields.object(
      {
        pricing,
        subCategoryAI,
      },
      { label: "Attributes", layout: [12, 12] }
    ),
  },
});
