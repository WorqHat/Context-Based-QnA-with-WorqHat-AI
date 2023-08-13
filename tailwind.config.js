/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "node_modules/preline/dist/*.js",
    "./views/**/*.html",
    "./views/**/*.ejs",
    "./javascript/**/*.js",
    "./javascript/**/*.jsx",
    "./javascript/**/*.ts",
    "./javascript/**/*.tsx",
    "./index.js",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text)-(orange|green|blue|red|purple|yellow|pink|violet|cyan|fuchsia|lime|teal|emerald)-(50|500)/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("preline/plugin"),
  ],
};
