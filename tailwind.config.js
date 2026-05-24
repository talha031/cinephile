/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['"Epilogue"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

