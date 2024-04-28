import { CSPostHogProvider } from "@/components/providers/posthog";
import { inter, roboto_mono } from "@/fonts";
import { constructMetadata } from "@/utils/metadata";
import "../globals.css";

export const metadata = constructMetadata({
  title: "Widget - smashing.tools",
  canonical: "/widget",
});

export default function WidgetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable}`}
      suppressHydrationWarning
    >
      <CSPostHogProvider>
        <body>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
