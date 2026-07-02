import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd2ff",
          300: "#8eb4ff",
          400: "#598cff",
          500: "#3465ff",
          600: "#1e46e6",
          700: "#1836b8",
          800: "#152e91",
          900: "#122668",
        },
        surface: {
          DEFAULT: "#0b1220",
          soft: "#0f172a",
          card: "#111b30",
          border: "#1f2a44",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
