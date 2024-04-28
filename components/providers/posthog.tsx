"use client";

import { useUser } from "@/components/providers/user";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://eu.i.posthog.com",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthProvider>{children}</PostHogAuthProvider>
    </PostHogProvider>
  );
}

function PostHogAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, bookmarks } = useUser();

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        name: user.user_metadata.full_name,
        email: user.email,
        avatar: user.user_metadata.avatar_url,
        last_sign_in_at: user.last_sign_in_at,
        bookmarkCount: bookmarks ? bookmarks.length : 0,
      });
    } else {
      posthog.reset();
    }
  }, [user, bookmarks]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
