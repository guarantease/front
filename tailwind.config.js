/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-400': '#FFA63E',
        'primary-300': '#FFD19B',
        'primary-500': '#FF8A00',

        'black': '#171717',
        'dark': '#353535',
        'white': '#FFFFFF',

        'error': '#FA3535',
        'success': '#20BF55',
      },
      fontFamily: {
        'sans': ['Satoshi Variable'],
      }
    },
  },
  plugins: [],
}

