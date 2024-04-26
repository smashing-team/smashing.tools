import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme";
import { constructMetadata } from "@/utils/metadata";
import { DebugIndicator } from "@/components/blocks/debug-indicator";

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
          {children}
        </ThemeProvider>
        <DebugIndicator {...metadata} />
      </body>
    </html>
  );
}
