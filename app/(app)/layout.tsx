import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { constructMetadata } from "@/utils/metadata";
import { DebugIndicator } from "@/components/blocks/debug-indicator";
import { Header } from "@/components/blocks/header";
import { Suspense } from "react";

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
          </div>
        </ThemeProvider>
        <DebugIndicator {...metadata} />
      </body>
    </html>
  );
}
