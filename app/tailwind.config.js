/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#121922",
        primary: "#A3BBD9",
        card: "#1e293b",
        textPrimary: "#ffffff",
        textSecondary: "#A3BBD9",
      },
    },
  },
  plugins: [],
}
