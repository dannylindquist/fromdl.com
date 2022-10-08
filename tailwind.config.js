/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,liquid,md,webc}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
