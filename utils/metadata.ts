import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { getBaseUrl } from "@/utils/url";
import { Metadata } from "next";

export function constructMetadata({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = `${getBaseUrl()}/og.png`,
  canonical = getBaseUrl(),
}: {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string | null;
} = {}) {
  return {
    title,
    description,
    applicationName: "smashing.tools",
    keywords:
      "smashing tools, design tools, development tools, starter kits, design kits, ui components, ai tools, dev tools",
    robots: "index, follow",
    alternates: {
      canonical,
      types: {
        "application/rss+xml": [{ url: "/rss.xml", title: "RSS" }],
      },
    },
    icons: {
      icon: {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    },
    // verification: {
    //   google: "1234567890",
    //   yandex: "1234567890",
    // },
    openGraph: {
      title,
      description,
      images: image ? new URL(image) : [],
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      creator: "@needim",
    },
    metadataBase: new URL(getBaseUrl()),
  } satisfies Metadata;
}
