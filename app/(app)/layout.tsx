import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { constructMetadata } from "@/utils/metadata";
import { DebugIndicator } from "@/components/blocks/debug-indicator";
import { Header } from "@/components/blocks/header";
import { Suspense } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = constructMetadata();

export default function RootLayout({
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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto w-full max-w-2xl md:max-w-2xl lg:max-w-3xl">
            <Suspense fallback={<div className="mt-5 min-h-16"></div>}>
              <Header />
            </Suspense>
            {children}
            <p className="mx-4 mt-4 flex pb-20 align-top text-xs text-zinc-500">
              <IconInfoCircle className="mr-1 size-4 shrink-0" />
              <span>
                <span className="font-semibold">Affiliate Link Disclosure</span>
                <br />
                Some of the links on this website are affiliate links, which
                means that if you click on them and make a purchase, we may
                receive a commission. This helps support smashing.tools and
                allows us to continue to provide quality content and
                recommendations. Thank you for your support!
              </span>
            </p>
          </div>
          <div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full "></div>
        </ThemeProvider>
        <DebugIndicator />
      </body>
    </html>
  );
}
