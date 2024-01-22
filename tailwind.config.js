/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        vetnam: ["Be Vietnam Pro", "sans-serif"],
      },
      colors: {
        grey15: "#262626",
        grey20: "#333333",
        grey30: "#4C4C4D",
        grey35: "#59595A",
        white95: "#F1F1F3",
        white97: "#F7F7F8",
        white99: "#FCFCFD",
        ornge50: "#FF9500",
        svgbg: "#FFF4E5",
        planred:"#FFEACC"
      },
    },
  },
  plugins: [],
};
