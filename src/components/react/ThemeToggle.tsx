import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

  const handleClick = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={handleClick}
      className="flex h-11 w-11 items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      )}
    </button>
  );
}
