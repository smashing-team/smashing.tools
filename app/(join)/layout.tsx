import { CSPostHogProvider } from "@/components/providers/posthog";
import { ThemeProvider } from "@/components/providers/theme";
import { inter, roboto_mono } from "@/fonts";
import { constructMetadata } from "@/utils/metadata";
import "../globals.css";

export const metadata = constructMetadata({
  title: "Join - smashing.tools",
  canonical: "/join",
});

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} bg-zinc-950`}
      suppressHydrationWarning
    >
      <CSPostHogProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}