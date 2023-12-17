import React, { useEffect, useState } from 'react';

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
    <button onClick={handleClick}>{theme === 'light' ? '🌙' : '🌞'}</button>
  );
}
