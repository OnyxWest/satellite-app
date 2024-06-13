/** @type {import('tailwindcss').Config} */
/* global module */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {},
      colors: {
          "const-color-white": "#FFFFFF",
          "const-color-black": "#000000",
          "bg-color-0": "#191919",
          "bg-color-1": "#313131",
          "border-color-1": "#606060",
          "text-color-1": "#FFFFFF",
          "text-color-2": "#000000",
      },
  },
  plugins: [],
};