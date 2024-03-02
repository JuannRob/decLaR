/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-background": "#f3f3eb",
        "main-color": "#252d35",
      },
    },
  },
  plugins: [],
};
