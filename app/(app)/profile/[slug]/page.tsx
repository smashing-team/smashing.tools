import { GridList } from "@/components/blocks/grid-list";
import { HeaderGradient } from "@/components/blocks/header-gradient";
import { CATEGORIES } from "@/utils/consts";
import { constructMetadata } from "@/utils/metadata";
import { getAllItems, reader } from "@/utils/reader";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const item = await reader.collections.profile.read(slug);

  if (!item) {
    return notFound();
  }

  return constructMetadata({
    title: `${item?.name} - smashing.tools`,
    description: `${item.name} - ${item.bio}`,
    canonical: `profile/${slug}`,
  });
}

type Props = {
  params: { slug: string };
};
export default async function ProfileDetail({ params: { slug } }: Props) {
  const item = await reader.collections.profile.read(slug);

  if (!item) {
    return notFound();
  }

  const allItems = await getAllItems();
  const creatorItems = allItems.filter((item) => item.entry.maker === slug);
  const publishedItems = allItems.filter(
    (item) => item.entry.publisher === slug
  );
  const description =
    item.bio ||
    `${item.name}'s profile on smashing.tools. Find tools crafted and published by ${item.name}.`;
  return (
    <div>
      <HeaderGradient />
      <div className="mx-auto size-full px-4">
        <div>
          <div className="relative z-10 mx-auto pb-4 pt-8">
            <div className="relative block w-24">
              <Image
                className="w-full rounded-full shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px]"
                src={item.avatar}
                alt={item.name}
                width={200}
                height={200}
              />
            </div>
            <div className="mt-6 flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-50">
                {item.name}
              </h1>
              {item.bio && (
                <p className="text-base !mt-1 text-zinc-500 dark:text-zinc-400">
                  {item.bio}
                </p>
              )}
              <div className="flex items-center gap-4">
                {item.twitter && (
                  <Link
                    href={`https://twitter.com/${item.twitter}?ref=smashing.tools`}
                    className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                      </>
                    </svg>
                    {item.twitter}
                  </Link>
                )}
                {item.github && (
                  <Link
                    href={`https://github.com/${item.github}?ref=smashing.tools`}
                    className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                  >
                    <IconBrandGithub
                      name="tabler:brand-github"
                      className="size-4"
                    />
                    {item.github}
                  </Link>
                )}
                {item.website && (
                  <Link
                    target="_blank"
                    href={`${item.website}?ref=smashing.tools`}
                    className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                  >
                    {item.website}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <main className="mt-4">
          {creatorItems.length ? (
            <div className="mb-10">
              <h2 className="mb-4 text-lg text-zinc-700 dark:text-zinc-100 font-semibold  ">
                Discover tools crafted by {item.name}
              </h2>
              <GridList
                activeCategory={CATEGORIES[0]}
                full
                withoutPadding
                items={creatorItems}
                excludePosts
              />
            </div>
          ) : null}
          {publishedItems.length ? (
            <div>
              <h2 className="mb-4 text-lg text-zinc-700 dark:text-zinc-100 font-semibold ">
                Explore tools published by {item.name}
              </h2>
              <GridList
                activeCategory={CATEGORIES[0]}
                full
                withoutPadding
                items={publishedItems}
                excludePosts
              />
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
