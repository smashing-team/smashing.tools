import { SITE_DESCRIPTION, SITE_TITLE } from "@/utils/consts";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    orientation: "any",
    start_url: "/",
    display: "standalone",
    lang: "en-US",
    theme_color: "#000000",
    background_color: "#000000",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "screenshot.jpeg",
        sizes: "900x1600",
        type: "image/jpeg",
      },
    ],
  };
}
