/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        severe: "#FFBFAD",
        priority: "#FFE6B7",
        routine: "#C8DAF6",
      },
    },
  },
  plugins: [],
};
