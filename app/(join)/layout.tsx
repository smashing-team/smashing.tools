import { ThemeProvider } from "@/components/providers/theme";
import { inter, roboto_mono } from "@/fonts";
import { constructMetadata } from "@/utils/metadata";
import "../globals.css";

export const metadata = constructMetadata({
  title: "Join - smashing.tools",
  canonical: "/join",
});

export default function RootLayout({
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
    </html>
  );
}
