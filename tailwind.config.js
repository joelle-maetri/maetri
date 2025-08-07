/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#5090DA',
        secondary: '#E4B23C',
        accent: '#9333ea'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}