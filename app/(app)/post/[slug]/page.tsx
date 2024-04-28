import { HeaderGradient } from "@/components/blocks/header-gradient";
import { HeroSlider } from "@/components/blocks/hero-slider";
import { KEYSTATIC } from "@/server/keystatic";
import { constructMetadata } from "@/utils/metadata";
import { DocumentRenderer } from "@keystatic/core/renderer";
import {
  IconArrowRight,
  IconConfetti,
  IconExternalLink,
  IconShoppingCart,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { twMerge } from "tailwind-merge";

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const item = await KEYSTATIC.entry.post(slug);

  if (!item) {
    return notFound();
  }

  return constructMetadata({
    title: `${item?.name} - smashing.tools`,
    description: `${item.name} - ${item.headline}`,
    canonical: `post/${slug}`,
  });
}

type Props = {
  params: { slug: string };
};
export default async function PostDetail({ params: { slug } }: Props) {
  const item = await KEYSTATIC.entry.post(slug);

  if (!item) {
    return notFound();
  }

  let relatedItem;

  if (item.designKit) {
    relatedItem = await KEYSTATIC.entry.designKit(item.designKit);
  } else if (item.uiComponent) {
    relatedItem = await KEYSTATIC.entry.uiComponent(item.uiComponent);
  } else if (item.starterKit) {
    relatedItem = await KEYSTATIC.entry.starterKit(item.starterKit);
  } else if (item.dev) {
    relatedItem = await KEYSTATIC.entry.dev(item.dev);
  } else if (item.ai) {
    relatedItem = await KEYSTATIC.entry.ai(item.ai);
  }

  if (!relatedItem) {
    return notFound();
  }

  const heroSliderImages = (item.heroSlider || [])
    ?.filter((image) => image.discriminant === "heroSlider")
    .map((slide) => {
      return slide.value.image;
    }) as string[];

  const hasDarkLogo = !!relatedItem.logoDark;
  const buyUrl = relatedItem.buyLink;
  const publisherData = await KEYSTATIC.entry.profile(item.publisher);
  const makerData = await KEYSTATIC.entry.profile(relatedItem.maker);

  const readmore = new URL(item.readmoreUrl || "");
  readmore.searchParams.append("ref", "smashing.tools");

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
                src={relatedItem.logo}
                alt={relatedItem.name}
                width={200}
                height={200}
              />
              {relatedItem.logoDark && (
                <Image
                  className="hidden w-full dark:block"
                  src={relatedItem.logoDark}
                  alt={relatedItem.name}
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
                    "inline-flex items-center rounded-lg bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ",
                    "bg-yellow-400 text-yellow-950 ring-yellow-500"
                  )}
                >
                  <IconConfetti className="mr-1 size-3.5" />
                  {item.postType}
                </span>
              </div>

              <div data-people className="flex items-center space-x-6">
                {makerData && (
                  <Link
                    className="group"
                    href={`/profile/${relatedItem.maker}`}
                  >
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
                    href={readmore.toString() || relatedItem.url.toString()}
                    className="flex items-center rounded-3xl bg-zinc-50 dark:bg-white px-5 h-12 text-base font-medium text-zinc-900 ring-inset border border-zinc-300 hover:bg-zinc-100/75 dark:border-zinc-100 dark:hover:bg-white/90 shadow-xl"
                  >
                    <IconExternalLink className="relative -left-0.5 mr-1.5 size-5 text-zinc-400 dark:text-zinc-800" />
                    Read more
                  </Link>
                </li>
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
            {buyUrl && (
              <div>
                <Link
                  target="_blank"
                  href={buyUrl.toString()}
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
