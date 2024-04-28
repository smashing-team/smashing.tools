import { HeaderGradient } from "@/components/blocks/header-gradient";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Image from "next/image";

import { HeroSlider } from "@/components/blocks/hero-slider";
import { ToolTags } from "@/components/blocks/tool-tags";
import { buttonVariants } from "@/components/button";
import { CATEGORIES, CategoryKeys } from "@/utils/consts";
import { constructMetadata } from "@/utils/metadata";
import { getAllFilters, reader } from "@/utils/reader";
import {
  IconArrowRight,
  IconBrandFigma,
  IconBrandGithub,
  IconExternalLink,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { twMerge } from "tailwind-merge";

export async function generateMetadata({
  params: { category, slug },
}: Props): Promise<Metadata> {
  const activeCategory = CATEGORIES.find((c) => c.slug === `/${category}`)!;

  const item = await reader.collections[
    activeCategory.collection as CategoryKeys
  ].read(slug);

  if (!item) {
    return notFound();
  }

  return constructMetadata({
    title: `${item?.name} - smashing.tools`,
    description: `${item.name} - ${item.headline}`,
    image: `og-image/${category}/${slug}`,
    canonical: `${category}/${slug}`,
  });
}

type Props = {
  params: { category: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function ToolDetail({
  params: { category, slug },
  searchParams,
}: Props) {
  const activeCategory = CATEGORIES.find((c) => c.slug === `/${category}`)!;

  const item = await reader.collections[
    activeCategory.collection as CategoryKeys
  ].read(slug);

  if (!item) {
    return notFound();
  }

  const publisherData = await reader.collections.profile.read(item.publisher);
  const makerData = await reader.collections.profile.read(item.maker);

  const heroSliderImages = (item.heroSlider || [])
    ?.filter((image) => image.discriminant === "heroSlider")
    .map((slide) => {
      return slide.value.image;
    }) as string[];

  const hasDarkLogo = !!item.logoDark;

  const websiteUrl = new URL(item.url);
  websiteUrl.searchParams.append("ref", "smashing.tools");

  // @ts-ignore
  const repoUrl = item?.repositoryUrl ? new URL(item.repositoryUrl) : undefined;
  repoUrl?.searchParams.append("ref", "smashing.tools");

  // @ts-ignore
  const prevUrl = item.previewUrl ? new URL(item.previewUrl) : undefined;
  prevUrl?.searchParams.append("ref", "smashing.tools");

  const allTags = (Object.entries(item.attrs) as [string, string[]][])
    .map(([key, value]) => value?.map((v) => [key, v]))
    .flat();

  return (
    <div>
      <HeaderGradient />
      <div className="mx-auto size-full">
        <header className="px-4">
          <div className="relative z-10 mx-auto">
            <div className="relative block w-24 overflow-hidden">
              <Image
                className={twMerge(
                  "w-full",
                  hasDarkLogo && "block dark:hidden"
                )}
                src={item.logo}
                alt={item.name}
                width={200}
                height={200}
              />
              {item.logoDark && (
                <Image
                  className="hidden w-full dark:block"
                  src={item.logoDark}
                  alt={item.name}
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="mt-6 text-left">
              <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                {item.name}
              </h1>
              <p className="mt-1.5 text-lg font-normal text-zinc-700 dark:text-zinc-200">
                {item.headline}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={twMerge(
                    "inline-flex items-center rounded-lg bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20",
                    activeCategory.category === "ui-component" &&
                      "dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 bg-blue-50 text-blue-700 ring-blue-700/10",
                    activeCategory.category === "design-kit" &&
                      "dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30 bg-purple-50 text-purple-700 ring-purple-700/10",
                    activeCategory.category === "starter-kit" &&
                      "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20 bg-yellow-50 text-yellow-800 ring-yellow-600/20",
                    activeCategory.category === "ai" &&
                      "dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20 bg-red-50 text-red-800 ring-red-600/20",
                    activeCategory.category === "dev" &&
                      "dark:bg-green-400/10 dark:text-green-500 dark:ring-green-400/20 bg-green-50 text-green-800 ring-green-600/20"
                  )}
                >
                  {activeCategory.title}
                </span>
                <ToolTags allTags={allTags} allFilters={getAllFilters()} />
              </div>

              <div data-people className="flex items-center space-x-6">
                {makerData && (
                  <Link className="group" href={`/profile/${item.maker}`}>
                    <div className="mt-6 flex items-center">
                      <div>
                        <Image
                          className="inline-block size-9 rounded-full"
                          src={makerData.avatar}
                          width={36}
                          height={36}
                          alt={makerData.name}
                        />
                      </div>
                      <div className="ml-2">
                        <p className="text-[10px] font-medium text-zinc-500 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-400">
                          Crafted by
                        </p>
                        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-zinc-950 group-hover:underline dark:group-hover:text-zinc-50">
                          {makerData.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
                <Link className="group" href={`/profile/${item.publisher}`}>
                  <div className="mt-6 flex items-center">
                    <div>
                      <Image
                        className="inline-block size-7 rounded-full"
                        src={publisherData!.avatar}
                        alt={publisherData!.name}
                        width={36}
                        height={36}
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-[10px] font-medium text-zinc-500 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-400">
                        Published by
                      </p>
                      <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-zinc-950 group-hover:underline dark:group-hover:text-zinc-50">
                        {publisherData!.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <section className="mt-8">
              <ul
                role="list"
                className="mt-4 flex items-center gap-4 text-base font-medium leading-7"
              >
                <li>
                  <Link
                    target="_blank"
                    href={websiteUrl.toString()}
                    className="flex items-center rounded-3xl bg-zinc-50 dark:bg-white px-5 h-12 text-base font-medium text-zinc-900 ring-inset border border-zinc-300 hover:bg-zinc-100/75 dark:border-zinc-100 dark:hover:bg-white/90 shadow-xl"
                  >
                    <IconExternalLink className="relative -left-0.5 mr-1.5 size-5 text-zinc-400 dark:text-zinc-800" />
                    Website
                  </Link>
                </li>
                {item.buyLink && (
                  <li>
                    <Link
                      target="_blank"
                      href={item.buyLink.toString()}
                      className="relative inline-flex items-center justify-center px-5 h-12 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 pointer-events-none"></span>
                      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                      <span className="relative text-white flex items-center">
                        <IconShoppingCart className="relative -left-0.5 mr-1.5 size-5" />{" "}
                        Buy now
                        <IconArrowRight className="ml-1.5 size-5" />
                      </span>
                    </Link>
                  </li>
                )}
                {repoUrl && (
                  <li>
                    <Link
                      target="_blank"
                      href={repoUrl.toString()}
                      className={buttonVariants({ variant: "link" })}
                    >
                      <IconBrandGithub className="relative -left-0.5 mr-1.5 size-5" />
                      Repository
                    </Link>
                  </li>
                )}
                {prevUrl && (
                  <li>
                    <Link
                      target="_blank"
                      href={prevUrl.toString()}
                      className={buttonVariants({ variant: "link" })}
                    >
                      {prevUrl.toString().includes("figma") ? (
                        <IconBrandFigma className="relative -left-0.5 mr-1.5 size-5" />
                      ) : (
                        <IconExternalLink className="relative -left-0.5 mr-1.5 size-5" />
                      )}
                      Preview
                    </Link>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </header>
        <main>
          {heroSliderImages.length > 0 && (
            <HeroSlider images={heroSliderImages} />
          )}
          <article className="prose prose-zinc relative mx-auto size-full max-w-full mt-8 px-4 pb-8 dark:prose-invert">
            {/* @ts-ignore */}
            <DocumentRenderer document={await item.content()} />
            {/* <NavigateKeys
              client:load
              prevHref={prevSlug && `/${collection}/${prevSlug}/`}
              nextHref={nextSlug && `/${collection}/${nextSlug}/`}
            /> */}
            {item.buyLink && (
              <div>
                <Link
                  target="_blank"
                  href={item.buyLink.toString()}
                  className="relative flex mb-4 no-underline items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                  <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative text-white flex items-center">
                    <IconShoppingCart className="relative -left-0.5 mr-1.5 size-5" />{" "}
                    Buy now
                    <IconArrowRight className="ml-1.5 size-5" />
                  </span>
                </Link>
              </div>
            )}
            <Link
              href={`https://github.com/smashing-team/smashing.tools/issues/new?assignees=&labels=type%3A+content+feedback&projects=&template=03-content.yml&title=%F0%9F%93%9D+Content+Feedback%3A+${item.name}`}
              className="mt-2 text-xs text-zinc-400 no-underline hover:underline dark:text-zinc-500"
              target="_blank"
            >
              Something not right about this content? Let us know!
            </Link>
          </article>
        </main>
      </div>
    </div>
  );
}
