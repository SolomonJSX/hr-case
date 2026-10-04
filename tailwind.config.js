/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/partials/**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1200px',
      },
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        main: '#041020',
        brandBlue: '#356DD4'
      },
    },
  },
  plugins: [],
}