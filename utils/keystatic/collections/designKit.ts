import { collection, fields } from "@keystatic/core";
import {
  baseSchema,
  compatibility,
  componentCount,
  content,
  heroSlider,
  pageExampleCount,
  pricing,
} from "../index";

export const designKit = collection({
  previewUrl:
    process.env.NODE_ENV !== "production" ? "/design-kit/{slug}" : undefined,
  label: "Design Kits",
  slugField: "name",
  entryLayout: "form",
  path: "content/design-kit/*",
  format: { contentField: "content" },
  schema: {
    ...baseSchema("design-kit"),
    previewUrl: fields.url({
      label: "Preview/Demo URL",
    }),
    content,
    heroSlider: heroSlider("design-kit"),
    attrs: fields.object(
      {
        pricing,
        compatibility,
        componentCount,
        pageExampleCount,
      },
      { label: "Attributes", layout: [12, 4, 4, 4] }
    ),
  },
});
