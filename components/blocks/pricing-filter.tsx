import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import type { Facets } from "@/utils/facets";
import Query from "@/utils/query";

export function PricingFilter({
  facets,
  currentUrl,
}: {
  facets: Facets;
  currentUrl: string;
}): React.ReactElement {
  const searchParams = Query.parseSearchParam(currentUrl);
  return (
    <Select
      onValueChange={(value) => {
        if (value === "free+paid") {
          Query.remove("pricing");
        } else Query.set("pricing", value);
      }}
      defaultValue={
        !searchParams.pricing
          ? "free+paid"
          : (searchParams.pricing[0] as string)
      }
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Free + Paid" />
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
