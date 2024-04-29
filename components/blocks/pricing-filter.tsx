"use client";

import React, { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import type { Facets } from "@/utils/facets";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PricingFilter({
  facets,
}: {
  facets: Facets;
}): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Select
      onValueChange={(value) => {
        if (value === "free+paid") {
          router.push(pathname + "?" + createQueryString("pricing", null));
        } else {
          router.push(pathname + "?" + createQueryString("pricing", value));
        }
      }}
      defaultValue={
        !searchParams.get("pricing")
          ? "free+paid"
          : searchParams.get("pricing") ?? "free+paid"
      }
    >
      <SelectTrigger className="w-[164px] shadow-[rgba(0,_0,_0,_0.15)_0px_20px_40px_-12px] pr-4 hover:bg-zinc-50">
        <div className="flex items-center">
          <IconCurrencyDollar className="size-4 lg:ml-1 mr-1.5 lg:mr-2 text-zinc-400" />
          <SelectValue placeholder="Free + Paid" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem key="free+paid" value="free+paid">
          Free + Paid
        </SelectItem>
        {facets?.pricing?.map(({ value }) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
