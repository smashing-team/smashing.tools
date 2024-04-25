"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

import { useTheme } from "next-themes";

export function ModeToggle({
  align = "start",
}: {
  align?: "center" | "start" | "end";
}) {  
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex size-11 shrink-0 items-center justify-center rounded-3xl transition-colors hover:bg-white dark:hover:bg-zinc-500/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M12 5l0 .01" />
            <path d="M17 7l0 .01" />
            <path d="M19 12l0 .01" />
            <path d="M17 17l0 .01" />
            <path d="M12 19l0 .01" />
            <path d="M7 17l0 .01" />
            <path d="M5 12l0 .01" />
            <path d="M7 7l0 .01" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
