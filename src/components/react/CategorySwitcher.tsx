import React from 'react';

const CategorySwitcher = ({
  activeCategory = '/',
}: {
  activeCategory: '/' | '/code' | '/design';
}) => {
  return (
    <section className="mt-4">
      <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden"></div>
      <ul
        role="list"
        className="mt-1 flex justify-center gap-10 text-sm font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-row lg:justify-start lg:gap-2"
      >
        <li
          className="group relative flex pr-1"
          data-active={activeCategory === '/' && 'on'}
        >
          <span className="absolute inset-0 -z-10 scale-75 rounded-lg bg-black/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-data-[active='on']:scale-100 group-data-[active='on']:opacity-100"></span>
          <a
            href="/"
            className="flex items-center rounded-lg px-2"
            aria-label="All tools"
          >
            <svg
              className="h-4 w-4 fill-slate-400 group-hover:fill-slate-600 group-data-[active='on']:fill-slate-600"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88072 3.11929 7 4.5 7C5.88072 7 7 5.88072 7 4.5C7 3.11929 5.88072 2 4.5 2ZM3 4.5C3 3.67157 3.67157 3 4.5 3C5.32843 3 6 3.67157 6 4.5C6 5.32843 5.32843 6 4.5 6C3.67157 6 3 5.32843 3 4.5ZM10.5 2C9.11929 2 8 3.11929 8 4.5C8 5.88072 9.11929 7 10.5 7C11.8807 7 13 5.88072 13 4.5C13 3.11929 11.8807 2 10.5 2ZM9 4.5C9 3.67157 9.67157 3 10.5 3C11.3284 3 12 3.67157 12 4.5C12 5.32843 11.3284 6 10.5 6C9.67157 6 9 5.32843 9 4.5ZM2 10.5C2 9.11929 3.11929 8 4.5 8C5.88072 8 7 9.11929 7 10.5C7 11.8807 5.88072 13 4.5 13C3.11929 13 2 11.8807 2 10.5ZM4.5 9C3.67157 9 3 9.67157 3 10.5C3 11.3284 3.67157 12 4.5 12C5.32843 12 6 11.3284 6 10.5C6 9.67157 5.32843 9 4.5 9ZM10.5 8C9.11929 8 8 9.11929 8 10.5C8 11.8807 9.11929 13 10.5 13C11.8807 13 13 11.8807 13 10.5C13 9.11929 11.8807 8 10.5 8ZM9 10.5C9 9.67157 9.67157 9 10.5 9C11.3284 9 12 9.67157 12 10.5C12 11.3284 11.3284 12 10.5 12C9.67157 12 9 11.3284 9 10.5Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2 block">All</span>
          </a>
        </li>
        <li
          className="group relative flex pr-1"
          data-active={activeCategory === '/code' && 'on'}
        >
          <span className="absolute inset-0 -z-10 scale-75 rounded-lg bg-sky-500/10 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-data-[active='on']:scale-100 group-data-[active='on']:opacity-100"></span>
          <a
            href="/code"
            className="group flex items-center px-2"
            aria-label="Code tools"
          >
            <svg
              className="h-4 w-4 fill-slate-400 group-hover:fill-slate-600 group-data-[active='on']:fill-slate-600"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.96424 2.68571C10.0668 2.42931 9.94209 2.13833 9.6857 2.03577C9.4293 1.93322 9.13832 2.05792 9.03576 2.31432L5.03576 12.3143C4.9332 12.5707 5.05791 12.8617 5.3143 12.9642C5.5707 13.0668 5.86168 12.9421 5.96424 12.6857L9.96424 2.68571ZM3.85355 5.14646C4.04882 5.34172 4.04882 5.6583 3.85355 5.85356L2.20711 7.50001L3.85355 9.14646C4.04882 9.34172 4.04882 9.6583 3.85355 9.85356C3.65829 10.0488 3.34171 10.0488 3.14645 9.85356L1.14645 7.85356C0.951184 7.6583 0.951184 7.34172 1.14645 7.14646L3.14645 5.14646C3.34171 4.9512 3.65829 4.9512 3.85355 5.14646ZM11.1464 5.14646C11.3417 4.9512 11.6583 4.9512 11.8536 5.14646L13.8536 7.14646C14.0488 7.34172 14.0488 7.6583 13.8536 7.85356L11.8536 9.85356C11.6583 10.0488 11.3417 10.0488 11.1464 9.85356C10.9512 9.6583 10.9512 9.34172 11.1464 9.14646L12.7929 7.50001L11.1464 5.85356C10.9512 5.6583 10.9512 5.34172 11.1464 5.14646Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2 block">Code</span>
          </a>
        </li>
        <li
          className="group relative flex pr-1"
          data-active={activeCategory === '/design' && 'on'}
        >
          <span className="absolute inset-0 -z-10 scale-75 rounded-lg bg-amber-500/10 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 group-data-[active='on']:scale-100 group-data-[active='on']:opacity-100"></span>
          <a
            href="/design"
            className="group flex items-center px-2"
            aria-label="Design tools"
          >
            <svg
              className="h-4 w-4 fill-slate-400 group-hover:fill-slate-600 group-data-[active='on']:fill-slate-600"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9C3 6.5 4.5 4.25 7.5 1.5C10.5 4.25 12 6.5 12 9C12 11.4853 9.98528 13.5 7.5 13.5C5.01472 13.5 3 11.4853 3 9ZM10.9524 8.30307C9.67347 7.82121 8.2879 8.46208 6.98956 9.06259C5.9327 9.55142 4.93365 10.0135 4.09695 9.82153C4.03357 9.55804 4 9.28294 4 9C4 7.11203 5.02686 5.27195 7.5 2.87357C9.66837 4.97639 10.725 6.65004 10.9524 8.30307Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className=" sm:ml-2 sm:block">Design</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default CategorySwitcher;
