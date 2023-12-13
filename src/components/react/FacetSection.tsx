import React, { type ReactNode } from 'react';

const FacetSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className="mt-4">
      <h2 className="flex items-center font-sans text-sm font-medium capitalize leading-7 text-slate-900 ">
        <span>{title}</span>
      </h2>
      <ul
        role="list"
        className="mt-1 flex flex-wrap gap-1 text-base font-medium leading-7 text-slate-700 lg:flex-row"
      >
        {children}
      </ul>
    </section>
  );
};

export default FacetSection;
