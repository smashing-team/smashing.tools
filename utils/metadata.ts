import { SITE_DESCRIPTION, SITE_TITLE } from "@/utils/consts";
import { getBaseUrl } from "@/utils/url";
import { Metadata } from "next";

export function constructMetadata({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = `og.png`,
  canonical,
}: {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string | null;
} = {}) {
  const canonicalUrl = canonical
    ? new URL(`${getBaseUrl()}/${canonical}`)
    : getBaseUrl();
  return {
    title,
    description,
    applicationName: "smashing.tools",
    robots: "index, follow",
    alternates: {
      canonical: canonicalUrl,
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
      type: "website",
      url: canonicalUrl,
      images: image ? new URL(`${getBaseUrl()}/${image}`) : [],
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
