import { CatSwitcher } from "@/components/blocks/cat-switcher";
import { Header } from "@/components/blocks/header";
import { HeaderGradient } from "@/components/blocks/header-gradient";
import { reader } from "@/utils/reader";
import { IconInfoCircle } from "@tabler/icons-react";

export default async function Home() {
  const starterKitItems = await reader.collections.starterKit.all();
  const designKitItems = await reader.collections.designKit.all();
  const uiComponentItems = await reader.collections.uiComponent.all();
  const aiItems = await reader.collections.ai.all();
  const devItems = await reader.collections.dev.all();
  return (
    <>
      <HeaderGradient />
      <div className="mx-auto w-full max-w-2xl md:max-w-2xl lg:max-w-3xl">
        <Header user={null} />
        <div className="-mt-2.5 px-4">
          <CatSwitcher activeCategory={"/"} />
        </div>
        <div className="mt-3.5 flex items-center px-4">
          {/* <PricingFilter currentUrl={search} facets={facets} client:load /> */}
          <div className="grow"></div>
          {/* <FiltersDrawer facets={facets} client:load /> */}
        </div>
        <pre>{JSON.stringify(starterKitItems, null, 2)}</pre>
        <p className="mx-4 flex pb-8 align-top text-xs text-zinc-500">
          <IconInfoCircle className="mr-1 size-4 shrink-0" />
          <span>
            <span className="font-semibold">Affiliate Link Disclosure</span>
            <br />
            Some of the links on this website are affiliate links, which means
            that if you click on them and make a purchase, we may receive a
            commission. This helps support smashing.tools and allows us to
            continue to provide quality content and recommendations. Thank you
            for your support!
          </span>
        </p>
      </div>
    </>
  );
}
