/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#0F172A",
        primary: "#FFFFFF",
      },
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
      },
    },
  },
  plugins: [],
};
