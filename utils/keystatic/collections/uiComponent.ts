import { collection, fields } from "@keystatic/core";
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
} from "../index";

export const uiComponent = collection({
  previewUrl:
    process.env.NODE_ENV !== "production" ? "/ui-component/{slug}" : undefined,
  label: "UI Components",
  slugField: "name",
  entryLayout: "form",
  path: "content/ui-component/*",
  format: { contentField: "content" },
  schema: {
    ...baseSchema("ui-component"),
    repositoryUrl: fields.url({
      label: "Repository URL",
    }),
    previewUrl: fields.url({
      label: "Preview/Demo URL",
    }),
    content,
    heroSlider: heroSlider("ui-component"),
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
      { label: "Attributes", layout: [12, 4, 4, 4, 4, 4, 4] }
    ),
  },
});
