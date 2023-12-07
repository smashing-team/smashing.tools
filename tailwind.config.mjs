import * as defaultTheme from "tailwindcss/defaultTheme";
import * as radixColors from "@radix-ui/colors";
import createPlugin from "windy-radix-palette";

const colors = createPlugin({
  colors: {
    gray: radixColors.gray,
    red: radixColors.red,
    yellow: radixColors.yellow,
    green: radixColors.green,
    blue: radixColors.blue,
    indigo: radixColors.indigo,
    violet: radixColors.violet,
  },
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // darkMode: "class",
  theme: {
    // colors: {},
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [colors.plugin],
};
