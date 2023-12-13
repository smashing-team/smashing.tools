import * as defaultTheme from 'tailwindcss/defaultTheme';
import * as radixColors from '@radix-ui/colors';
import tailwindTypeography from '@tailwindcss/typography';
import createPlugin from 'windy-radix-palette';

const colors = createPlugin({
  colors: {
    gray: radixColors.gray,
    grayA: radixColors.grayA,
    blue: radixColors.blue,
    blueA: radixColors.blueA,
    // white: radixColors.whiteA,
    // black: radixColors.blackA,
  },
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi-Variable', 'Inter', ...defaultTheme.fontFamily.sans],
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
  plugins: [colors.plugin, tailwindTypeography],
};
