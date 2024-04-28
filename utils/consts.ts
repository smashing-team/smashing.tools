export const SITE_TITLE = "smashing.tools";
export const SITE_DESCRIPTION =
  "Curated best starter kits, UI components, design kits, AI & Dev tools";
export const EMAIL_FROM = "smashing.tools <hi@smashing.tools>";
export const NEWSLETTER_CONFIRM_RESEND_INTERVAL_MINUTES = 0.5;
export const CATEGORIES = [
  {
    category: null,
    slug: "/",
    title: "All tools",
    seoTitle: "smashing.tools",
    collection: "all",
  },
  {
    category: "starter-kit",
    slug: "/starter-kit",
    title: "Starter Kit",
    seoTitle: "Starter kits - smashing.tools",
    collection: "starterKit",
  },
  {
    category: "design-kit",
    slug: "/design-kit",
    title: "Design Kit",
    seoTitle: "Design kits - smashing.tools",
    collection: "designKit",
  },
  {
    category: "ui-component",
    slug: "/ui-component",
    title: "UI Component",
    seoTitle: "UI components - smashing.tools",
    collection: "uiComponent",
  },
  {
    category: "ai",
    slug: "/ai",
    title: "AI Tool",
    seoTitle: "AI tools - smashing.tools",
    collection: "ai",
  },
  {
    category: "dev",
    slug: "/dev",
    title: "Dev Tool",
    seoTitle: "Dev tools - smashing.tools",
    collection: "dev",
  },
  {
    category: "post",
    slug: "/post",
    title: "Post",
    seoTitle: "Posts - smashing.tools",
    collection: "post",
  },
] as const;

export type CATEGORY = (typeof CATEGORIES)[number];

export type CategoryPaths =
  | "/"
  | "/starter-kit"
  | "/design-kit"
  | "/ui-component"
  | "/ai"
  | "/post"
  | "/dev";

export type CategorySlugs =
  | "starter-kit"
  | "design-kit"
  | "ui-component"
  | "ai"
  | "post"
  | "dev";

export type CategoryKeys =
  | "starterKit"
  | "designKit"
  | "uiComponent"
  | "ai"
  | "dev";

export function getCategoryTitle(category: string) {
  return CATEGORIES.find((c) => c.category === category)?.title ?? "";
}

export function getFilterLabel(filterKey: string) {
  const fixedLabels: { [key: string]: string } = {
    componentCount: "Component count",
    pageExampleCount: "Page example count",
    uiComponents: "UI Components",
    uiLibrary: "UI Library",
    api: "API",
    subCategoryAI: "AI Subcategory",
    subCategoryDev: "Dev Subcategory",
  };

  return fixedLabels[filterKey] ?? filterKey;
}
