"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { FormattedDate } from "./formatted-date";

export const img = function Img(props: React.ComponentProps<typeof Image>) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 [&+*]:mt-8">
      <Image
        sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
        {...props}
        alt="Image"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
    </div>
  );
};

function ContentWrapper({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div
          className={clsx(
            "mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}

function ArticleHeader({
  slug,
  collection,
  date,
}: {
  slug: string;
  collection: string;
  date: string | Date;
}) {
  return (
    <header className="relative mb-10 xl:mb-0">
      <div className="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
        <Link href={`/${collection}/${slug}`} className="inline-flex">
          <FormattedDate
            date={date}
            className="hidden xl:pointer-events-auto xl:block xl:text-xs/4 xl:font-medium xl:text-white/50"
          />
        </Link>
        <div className="h-[0.0625rem] w-3.5 bg-gray-400 lg:-mr-3.5 xl:mr-0 xl:bg-gray-300" />
      </div>
      <ContentWrapper>
        <div className="flex">
          <Link href={`/${collection}/${slug}`} className="inline-flex">
            <FormattedDate
              date={date}
              className="text-xs/4 font-medium text-gray-500 dark:text-white/50 xl:hidden"
            />
          </Link>
        </div>
      </ContentWrapper>
    </header>
  );
}

export const ArticleItem = function Article({
  slug,
  collection,
  date,
  children,
}: {
  slug: string;
  collection: string;
  date: string | Date;
  children: React.ReactNode;
}) {
  const heightRef = useRef<React.ElementRef<"div">>(null);
  const [heightAdjustment, setHeightAdjustment] = useState(0);

  useEffect(() => {
    if (!heightRef.current) {
      return;
    }

    const observer = new window.ResizeObserver(() => {
      if (!heightRef.current) {
        return;
      }
      const { height } = heightRef.current.getBoundingClientRect();
      const nextMultipleOf8 = 8 * Math.ceil(height / 8);
      setHeightAdjustment(nextMultipleOf8 - height);
    });

    observer.observe(heightRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      id={slug}
      className="scroll-mt-16"
      style={{ paddingBottom: `${heightAdjustment}px` }}
    >
      <div ref={heightRef}>
        <ArticleHeader slug={slug} collection={collection} date={date} />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </article>
  );
};

export const code = function Code({
  highlightedCode,
  ...props
}: React.ComponentPropsWithoutRef<"code"> & { highlightedCode?: string }) {
  if (highlightedCode) {
    return (
      <code {...props} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    );
  }

  return <code {...props} />;
};
