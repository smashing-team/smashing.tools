import { constructMetadata } from "@/utils/metadata";
import Link from "next/link";
import React from "react";

type PageMetaData = ReturnType<typeof constructMetadata>;

export function DebugIndicator(props: PageMetaData): React.ReactElement {
  if (process.env.NODE_ENV !== "development") {
    return <></>;
  }

  return (
    <div className="fixed hover:bg-zinc-800 hover:text-white opacity-15 hover:opacity-100 bottom-0 right-0 z-50 flex items-center gap-4 justify-center rounded-tl-lg p-3 font-mono text-xs">
      <div>
        <strong>og:</strong>{" "}
        <Link href={props.openGraph?.images.toString()} target="_blank">
          {props.openGraph?.images.toString()}
        </Link>
      </div>
      <div>
        <strong>canonical:</strong> {props.alternates?.canonical?.toString()}
      </div>
      <strong>
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden 3xl:hidden">
          md
        </div>
        <div className="hidden lg:block xl:hidden 2xl:hidden 3xl:hidden">
          lg
        </div>
        <div className="hidden xl:block 2xl:hidden 3xl:hidden">xl</div>
        <div className="hidden 2xl:block 3xl:hidden">2xl</div>
        <div className="hidden 3xl:block">3xl</div>
      </strong>
    </div>
  );
}
