"use client";

import { ModeToggle } from "@/components/blocks/mode-toggle";
import { UserNav } from "@/components/blocks/user-nav";
import { buttonVariants } from "@/components/button";
import { useUser } from "@/components/providers/user";
import { IconLogin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { user } = useUser();

  return (
    <header className="mt-5 min-h-16">
      <div className="flex items-center gap-3 p-0 px-4">
        <Link href="/" className="shrink-0 rounded-full shadow-lg">
          <Image
            src="/smashing-tools-icon-v2-dark.svg"
            alt="smashing.tools"
            className="mx-auto block size-10 dark:hidden"
            width={40}
            height={40}
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
            priority
          />
          <Image
            src="/smashing-tools-icon-v2.svg"
            alt="smashing.tools"
            width={40}
            height={40}
            className="mx-auto hidden size-10 dark:block"
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
            priority
          />
        </Link>
        <div className="grow"></div>
        <div className="flex items-center gap-2 relative">
          {/* <CommandMenu client:idle /> */}
          <ModeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Link className={buttonVariants()} title="Login" href="/join">
              <IconLogin className="me-2 size-4" />
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
