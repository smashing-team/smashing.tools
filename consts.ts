export const SITE_TITLE = "smashing.tools";
export const SITE_DESCRIPTION =
  "A curated collection of the best starter kits, UI components, design kits, AI & Dev tools.";
export const EMAIL_FROM = "smashing.tools <hi@smashing.tools>";
export const NEWSLETTER_CONFIRM_RESEND_INTERVAL_MINUTES = 2;
export const CATEGORIES = [
  {
    category: undefined,
    slug: "/",
    title: "All tools",
  },
  {
    category: "starter-kit",
    slug: "/starter-kit",
    title: "Starter Kit",
  },
  {
    category: "design-kit",
    slug: "/design-kit",
    title: "Design Kit",
  },
  {
    category: "ui-component",
    slug: "/ui-component",
    title: "UI Component",
  },
  {
    category: "ai",
    slug: "/ai",
    title: "AI Tool",
  },
  {
    category: "dev",
    slug: "/dev",
    title: "Dev Tool",
  },
  {
    category: "post",
    slug: "/post",
    title: "Post",
  },
] as const;

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

export function getCategoryTitle(category: CategorySlugs) {
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
