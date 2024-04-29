import { DebugIndicator } from "@/components/blocks/debug-indicator";
import { Header } from "@/components/blocks/header";
import { CSPostHogProvider } from "@/components/providers/posthog";
import { ThemeProvider } from "@/components/providers/theme";
import UserProvider from "@/components/providers/user";
import { Tables } from "@/supabase/database";
import { constructMetadata } from "@/utils/metadata";
import { createClient } from "@/utils/supabase/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IconAffiliate } from "@tabler/icons-react";
import Script from "next/script";

import IconGithub from "@/components/icons/github";
import IconNetlify from "@/components/icons/netlify";
import IconNextjs from "@/components/icons/nextjs";
import IconSupabase from "@/components/icons/supabase";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <UserProvider user={user} bookmarks={bookmarks}>
        <CSPostHogProvider>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="mx-auto w-full max-w-2xl md:max-w-2xl lg:max-w-3xl">
                <Header />
                {children}
                <div className="mx-4 mt-4 flex flex-col pb-20 align-top text-xs text-zinc-500">
                  <div className="mb-8 items-center flex gap-4 pl-5">
                    <Link
                      href="https://nextjs.org"
                      target="_blank"
                      rel="nofollow"
                      className="items-center flex gap-1"
                    >
                      Built with <IconNextjs className="size-4 inline" />
                    </Link>
                    <Link
                      href="https://www.netlify.com"
                      target="_blank"
                      rel="nofollow"
                      className="items-center flex gap-1"
                    >
                      Deployed on <IconNetlify className="size-4 inline" />
                    </Link>
                    <Link
                      href="https://supabase.com"
                      target="_blank"
                      rel="nofollow"
                      className="items-center flex gap-1"
                    >
                      Powered by <IconSupabase className="size-4 inline" />
                    </Link>
                    <Link
                      href="https://github.com/smashing-team/smashing.tools"
                      target="_blank"
                      rel="nofollow"
                      className="items-center flex gap-1"
                    >
                      Open Source on <IconGithub className="size-4 inline" />
                    </Link>
                  </div>
                  <span className="font-semibold flex mb-1">
                    <IconAffiliate className="mr-1 size-4 shrink-0" /> Affiliate
                    Link Disclosure
                  </span>
                  <p className="pl-5">
                    Some links on this website are affiliate links, meaning if
                    you click on them and make a purchase, we may receive a
                    commission. This supports smashing.tools, enabling us to
                    keep delivering quality content. Thanks for your support!
                  </p>
                </div>
              </div>
              <div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full "></div>
            </ThemeProvider>
            <DebugIndicator />
          </body>
        </CSPostHogProvider>
      </UserProvider>
      <Script
        src="https://eu.umami.is/script.js"
        data-website-id="bc078721-6eb7-4fe1-89dc-7ac6f8de5461"
      />
      <GoogleAnalytics gaId="G-HR9MRJNS4Q" />
    </html>
  );
}
