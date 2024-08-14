const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ...colors,
        "accent-green": "#2c9382",
        "accent-tiel": "#1a6874",
        "accent-dark": "#353735",
        default: "#fff",
        secondary: "#F4F4F4",
      },
    },
  },
  plugins: [],
};
