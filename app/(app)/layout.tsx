import { DebugIndicator } from "@/components/blocks/debug-indicator";
import { Header } from "@/components/blocks/header";
import { ThemeProvider } from "@/components/providers/theme";
import UserProvider from "@/components/providers/user";
import { inter, roboto_mono } from "@/fonts";
import { Tables } from "@/supabase/database";
import { constructMetadata } from "@/utils/metadata";
import { createClient } from "@/utils/supabase/server";
import { IconAffiliateFilled } from "@tabler/icons-react";
import "../globals.css";

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let bookmarks: Tables<"bookmark">[] = [];

  if (user) {
    const { data } = await supabase.from("bookmark").select("*");
    bookmarks = data ? data : [];
  }

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
          <UserProvider user={user} bookmarks={bookmarks}>
            <div className="mx-auto w-full max-w-2xl md:max-w-2xl lg:max-w-3xl">
              <Header />
              {children}
              <div className="mx-4 mt-4 flex flex-col pb-20 align-top text-xs text-zinc-500">
                <span className="font-semibold flex mb-1">
                  <IconAffiliateFilled className="mr-1 size-4 shrink-0" />{" "}
                  Affiliate Link Disclosure
                </span>
                <p className="pl-5">
                  Some of the links on this website are affiliate links, which
                  means that if you click on them and make a purchase, we may
                  receive a commission. This helps support smashing.tools and
                  allows us to continue to provide quality content and
                  recommendations. Thank you for your support!
                </p>
              </div>
            </div>
            <div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full "></div>
          </UserProvider>
        </ThemeProvider>
        <DebugIndicator />
      </body>
    </html>
  );
}
