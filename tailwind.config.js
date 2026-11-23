/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pak: { DEFAULT: "#01411C", dark: "#012E14", light: "#E6F2EA", mid: "#0A6B33" },
        sand: "#F8F5EF",
        ink: "#111827",
        ambercta: "#D97706"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
