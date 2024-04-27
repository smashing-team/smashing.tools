"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { useRouter } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import { signout } from "@/server/actions/signout";

export function UserNav({ user }: { user: User }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 shrink-0 rounded-full"
        >
          <Avatar className="size-8 shadow-md">
            <AvatarImage
              src={user?.user_metadata.avatar_url}
              alt={user?.user_metadata.user_name}
              width={44}
              height={44}
            />
            <AvatarFallback className="text-xs">
              {user?.user_metadata.full_name
                .split(" ")
                .map((name: string) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata.full_name}
            </p>
            <p className="text-xs leading-none text-zinc-400">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              router.push("/bookmarks");
            }}
          >
            Bookmarks
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              router.push("/settings");
            }}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            signout();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
