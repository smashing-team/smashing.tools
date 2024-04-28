import { CatSwitcher } from "@/components/blocks/cat-switcher";
import { FiltersDrawer } from "@/components/blocks/filters-drawer";
import { GridList } from "@/components/blocks/grid-list";
import { HeaderGradient } from "@/components/blocks/header-gradient";
import { PricingFilter } from "@/components/blocks/pricing-filter";
import { KEYSTATIC } from "@/server/keystatic";
import { CATEGORIES, SITE_DESCRIPTION } from "@/utils/consts";
import { getFacets, uniqueFilters } from "@/utils/facets";
import { constructMetadata } from "@/utils/metadata";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { category: Array<string> };
  searchParams: { [key: string]: string | Array<string> | undefined };
};

export async function generateMetadata(
  { params: { category = [] }, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const activeCategory = CATEGORIES.find(
    (c) => c.slug === `/${category.join("/")}`
  )!;

  return constructMetadata({ title: activeCategory?.seoTitle });
}

export default async function Home({
  params: { category = [] },
  searchParams,
}: Props) {
  const activeCategory = CATEGORIES.find(
    (c) => c.slug === `/${category.join("/")}`
  )!;
  let allItems = await KEYSTATIC.tools();
  let items = allItems;

  if (!activeCategory) {
    return notFound();
  }

  // Filtering items based on activeCategory
  if (activeCategory?.category) {
    items = items.filter(
      (item) => item.collection === activeCategory.collection
    );
  }

  // Filtering items based on searchParams
  if (Object.values(searchParams).length) {
    items = items.filter((item) => {
      for (const key in searchParams) {
        if (!uniqueFilters.includes(key)) {
          return true;
        }

        const params = Array.isArray(searchParams[key])
          ? searchParams[key]
          : [searchParams[key]];

        if (
          // @ts-ignore
          !params?.every((el) => item.entry.attrs?.[key]?.includes(el))
        ) {
          return false;
        }
      }
      return true;
    });
  }

  let selectedItems = allItems;

  // TODO: do we need to filter items again here?
  switch (activeCategory?.category) {
    case "starter-kit":
      selectedItems = allItems.filter(
        (item) => item.collection === "starterKit"
      );
      break;
    case "design-kit":
      selectedItems = allItems.filter(
        (item) => item.collection === "designKit"
      );
      break;
    case "ui-component":
      selectedItems = allItems.filter(
        (item) => item.collection === "uiComponent"
      );
      break;
    case "ai":
      selectedItems = allItems.filter((item) => item.collection === "ai");
      break;
    case "dev":
      selectedItems = allItems.filter((item) => item.collection === "dev");
      break;
    default:
      selectedItems = allItems;
  }

  const filteredFacets = getFacets(items, activeCategory?.slug);
  const facets = getFacets(
    activeCategory?.slug === "/" ? allItems : selectedItems,
    activeCategory?.slug,
    filteredFacets,
    searchParams
  );

  return (
    <div>
      <h1 className="sr-only">{SITE_DESCRIPTION}</h1>
      <HeaderGradient />
      <div className="-mt-2.5 px-4">
        <CatSwitcher activeCategory={activeCategory?.slug} />
      </div>
      <div className="mt-3.5 flex items-center px-4">
        <PricingFilter facets={facets} />
        <div className="grow"></div>
        <FiltersDrawer facets={facets} />
      </div>
      <GridList items={items} activeCategory={activeCategory} />
    </div>
  );
}
