const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'header': '4px 5px 11px 3px rgba(0, 0, 0, 1)', // White shadow
      },
      width: {
        'vw-header': 'calc(100% - 30px)',
      },
      screens: {
        'mobile': '740px',
        'bigger': '3000px',
      },
    },
  },
  darkMode: "className",
  plugins: [heroui()],
}

