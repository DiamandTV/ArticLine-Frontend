/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-blue':'#071923',
        'orange-red': 'orangered'
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require('tailwind-scrollbar'),
  //#require('tailwind-scrollbar-hide'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.change-icon-to-white':{
          '&::-ms-reveal ': {
            'filter': 'invert(100%)'
          },

        }
      }
      )
    })
  ],
}

