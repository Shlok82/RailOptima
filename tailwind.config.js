/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./public/**/*.html",
    "./public/js/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",

      // Tailwind ke built-in colors bhi preserve karne hain
      // isliye require karna zaroori hai
      ...require("tailwindcss/colors"),

      // custom colors
      "metro-green": "#00a300",
      "metro-green-dark": "#1e7145",
      "metro-blue": "#2d89ef",
      "metro-blue-dark": "#2b5797",
      "metro-orange": "#e3a21a",
      "metro-red": "#da532c",
    },
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
        "slide-right": "slideRight 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 5px #00a300, 0 0 20px #00a300, 0 0 40px #00a300",
          },
          "50%": {
            boxShadow: "0 0 20px #00a300, 0 0 40px #00a300, 0 0 60px #00a300",
          },
        },
      },
    },
  },
  plugins: [],
};