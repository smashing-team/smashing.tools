/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { CATEGORIES, CategoryKeys } from "@/consts";
import { reader } from "@/utils/reader";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");
  const activeCategory = CATEGORIES.find((cat) => cat.category === category);

  if (!category || !slug || !activeCategory) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }

  const item = await reader.collections[
    activeCategory.collection as CategoryKeys
  ].read(slug);

  return new ImageResponse(
    (
      <div tw="h-full w-full flex items-start justify-start bg-white">
        <div tw="flex items-start justify-start h-full">
          <img
            style={{ objectFit: "cover" }}
            tw="absolute inset-0 w-full h-full"
            src={"https://smashing.tools/og-bg.png"}
          />
          <div tw="flex flex-col justify-between w-full h-full p-20">
            <div>{/* tool logo */}</div>
            <div tw="flex flex-col">
              <h1 tw="text-[60px] mb-0 text-black font-bold text-left">
                {item?.name}
              </h1>
              <h3 tw="text-[48px] mt-0 text-black font-normal text-left">
                {item?.headline}
              </h3>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
