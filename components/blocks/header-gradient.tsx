import React from "react";

export function HeaderGradient(): React.ReactElement {
  return (
    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
      <div className="absolute left-1/2 top-[-14.5px] ml-[-41.5rem] h-[25rem] w-[80rem] dark:[mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-emerald-600 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-sky-700/30 dark:to-emerald-500/30 dark:opacity-100">
          <svg
            aria-hidden="true"
            className="absolute -inset-y-1/2 inset-x-0 h-[200%] w-full skew-x-[18deg] fill-white/10 stroke-black/50 mix-blend-overlay dark:fill-black/20"
          >
            <defs>
              <pattern
                id=":S2:"
                width="72"
                height="56"
                patternUnits="userSpaceOnUse"
                x="-12"
                y="4"
              >
                <path d="M.5 56V.5H72" fill="none"></path>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#:S2:)"
            ></rect>
          </svg>
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
        </svg>
      </div>
    </div>
  );
}
