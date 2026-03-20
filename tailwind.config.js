/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f4',
          100: '#fbe9e9',
          200: '#f6caca',
          300: '#efa2a2',
          400: '#e56c6c',
          500: '#db3f3f',
          600: '#c52a2a',
          700: '#a52121',
          800: '#892020',
          900: '#722020',
        }
      }
    },
  },
  plugins: [],
}
