/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('webkit-highlight-trans', ['&::-webkit-tap-highlight-color: transparent'])
    })
  ]
}
