"use client";

import React from "react";

import { getFilterLabel } from "@/consts";
interface Props {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<Props> = ({ title, children }) => {
  return (
    <section className="mb-4">
      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-zinc-100 dark:border-zinc-600/10"></div>
        </div> */}
        <div className="relative flex justify-start">
          <span className="bg-white pr-2 text-sm font-semibold text-zinc-700 first-letter:uppercase dark:bg-zinc-950 dark:text-zinc-300">
            {getFilterLabel(title)}
          </span>
        </div>
      </div>
      <ul
        role="list"
        className="mt-2 flex flex-wrap gap-0.5 text-base font-medium leading-7 text-slate-700 lg:flex-row"
      >
        {children}
      </ul>
    </section>
  );
};

export default FilterSection;
