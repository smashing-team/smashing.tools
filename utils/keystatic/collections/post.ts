import { collection } from "@keystatic/core";

import { basePostSchema, content, heroSlider } from "../index";

export const post = collection({
  previewUrl:
    process.env.NODE_ENV !== "production" ? "/post/{slug}" : undefined,
  label: "Posts",
  slugField: "name",
  entryLayout: "content",
  path: "static/content/post/*",
  format: { contentField: "content" },
  schema: {
    ...basePostSchema,
    content,
    heroSlider: heroSlider("post"),
  },
});
