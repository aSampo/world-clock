/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#EEEEEE',
      'light-blue': '#00ADB5',
      'gray-dark': '#393E46',
      'black': '#222831'
    },
    fontFamily: {
      lato: ['Lato']
    }
  },
  plugins: [],
}