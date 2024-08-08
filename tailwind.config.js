/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "3xs": "0.5625rem",
        "2xs": "0.625rem",
      },
      colors: {
        success: {
          // 500: "#00a693",
          500: "#03a66d",
          600: "#1d6159",
        },
        error: {
          // 500: "#f6465d",
          500: "#cf304a",
        },
        warning: {
          500: "#d97706",
        },
        primary: {
          50: "#80d8cc",
          100: "#66cac6",
          200: "#4dbcaf",
          300: "#33af99",
          400: "#00A693",
          500: "#008d7c",
          600: "#008165",
          700: "#00754e",
          800: "#006a37",
          900: "#005e20",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

