import { KEYSTATIC } from "@/server/keystatic";
import { CATEGORIES, CategoryKeys } from "@/utils/consts";
import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function generateStaticParams() {
  const allItems = await KEYSTATIC.tools();

  return allItems.map((item) => ({
    category: item.collectionSlug,
    slug: item.slug,
  }));
}

export async function GET(
  req: Request,
  { params: { category, slug } }: { params: { category: string; slug: string } }
) {
  const activeCategory = CATEGORIES.find((cat) => cat.category === category);

  if (!category || !slug || !activeCategory) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }

  const item = await KEYSTATIC.entry[activeCategory.collection as CategoryKeys](
    slug
  );

  if (!item) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }

  const itemLogo = await fs.promises.readFile(
    new URL(`../../../../../public${item.logo}`, import.meta.url)
  );

  const itemLogoBase64 = arrayBufferToBase64(itemLogo);

  const SpaceGrotesk = await fs.promises.readFile(
    path.join(
      fileURLToPath(import.meta.url),
      "../../../../../../fonts/SpaceGrotesk-Medium.ttf"
    )
  );
  const SpaceGroteskBold = await fs.promises.readFile(
    path.join(
      fileURLToPath(import.meta.url),
      "../../../../../../fonts/SpaceGrotesk-Bold.ttf"
    )
  );
  const ogBG = await fs.promises.readFile(
    path.join(
      fileURLToPath(import.meta.url),
      "../../../../../../public/og-bg.png"
    )
  );

  const bg = arrayBufferToBase64(ogBG);

  return new ImageResponse(
    (
      <div
        tw="h-full w-full flex items-start justify-start bg-white"
        style={{
          fontFamily: "Space Grotesk",
          backgroundImage: `url(data:image/png;base64,${bg})`,
        }}
      >
        <div tw="flex items-start justify-start h-full">
          <div tw="flex flex-col justify-between w-full h-full p-20">
            <div
              style={{
                width: 200,
                height: 200,
                backgroundImage: `url(data:image/png;base64,${itemLogoBase64})`,
              }}
            ></div>
            <div tw="flex flex-col">
              <h1
                tw="text-[60px] mb-0 text-black font-bold text-left"
                style={{ fontFamily: "Space Grotesk Bold" }}
              >
                {item?.name}
              </h1>
              <div tw="text-[48px] mt-0 text-zinc-600 text-left">
                {item?.headline}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Space Grotesk",
          data: SpaceGrotesk,
          weight: 500 as const,
          style: "normal" as const,
        },
        {
          name: "Space Grotesk Bold",
          data: SpaceGroteskBold,
          weight: 700 as const,
          style: "normal" as const,
        },
      ],
    }
  );
}
