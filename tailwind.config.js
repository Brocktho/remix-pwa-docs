/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        background: "#abbaab",
        backgroundGradient: "#ffffff",
        darkbackground: "#141E30",
        darkbackgroundGradient: "#243B55",
        secondary: "#0a0a0a",
        darksecondary: "#fafafa",
        accent: "#FF3131",
      },
    },
  },
  plugins: [],
};
