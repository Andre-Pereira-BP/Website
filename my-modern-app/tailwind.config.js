/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#013fa4',
        'primary-light': '#0077c7',
        'primary-dark': '#012d7f',
        'secondary': '#69cd72',
        'dark': '#242424',
        'light': '#f8f9f9',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'ptsans': ['"PT Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}