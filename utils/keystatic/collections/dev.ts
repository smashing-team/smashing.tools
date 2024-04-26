import { collection, fields } from "@keystatic/core";
import {
  baseSchema,
  content,
  heroSlider,
  pricing,
  subCategoryDev,
} from "../index";

export const dev = collection({
  previewUrl: process.env.NODE_ENV !== "production" ? "/dev/{slug}" : undefined,
  label: "Dev Tools",
  slugField: "name",
  entryLayout: "form",
  path: "content/dev/*",
  format: { contentField: "content" },
  schema: {
    ...baseSchema("dev"),
    repositoryUrl: fields.url({
      label: "Repository URL",
    }),
    previewUrl: fields.url({
      label: "Preview/Demo URL",
    }),
    content,
    heroSlider: heroSlider("dev"),
    attrs: fields.object(
      {
        pricing,
        subCategoryDev,
      },
      { label: "Attributes", layout: [12, 12] }
    ),
  },
});
