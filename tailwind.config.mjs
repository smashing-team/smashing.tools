import * as defaultTheme from 'tailwindcss/defaultTheme';
import tailwindTypeography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Pitagon Sans Mono', ...defaultTheme.fontFamily.mono],
      },
      screens: {
        '3xl': '2000px',
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
    },
  },
  plugins: [tailwindTypeography],
};
