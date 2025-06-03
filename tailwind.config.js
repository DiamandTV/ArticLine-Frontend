/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ⬅️ supporta `.dark` class
  theme: {
    boxShadow:{
      //'store-button-box-shadow-right': '1px -10px 0 red',
      // 'store-button-box-shadow-left': '-1px -10px 0 red'
    },
    extend: {
      spacing:{
        'df':'1.5rem',
        'mb-df':'0.5rem'
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
        liondales:['Liondales','sans-serif']
      },
      backgroundColor: {
        'primary-a0': 'var(--clr-primary-a0)',
        'primary-a10': 'var(--clr-primary-a10)',
        'primary-a20': 'var(--clr-primary-a20)',
        'primary-a30': 'var(--clr-primary-a30)',
        'primary-a40': 'var(--clr-primary-a40)',
        'primary-a50': 'var(--clr-primary-a50)',

        'surface-a0': 'var(--clr-surface-a0)',
        'surface-a10': 'var(--clr-surface-a10)',
        'surface-a20': 'var(--clr-surface-a20)',
        'surface-a30': 'var(--clr-surface-a30)',
        'surface-a40': 'var(--clr-surface-a40)',
        'surface-a50': 'var(--clr-surface-a50)',

        'surface-tonal-a0': 'var(--clr-surface-tonal-a0)',
        'surface-tonal-a10': 'var(--clr-surface-tonal-a10)',
        'surface-tonal-a20': 'var(--clr-surface-tonal-a20)',
        'surface-tonal-a30': 'var(--clr-surface-tonal-a30)',
        'surface-tonal-a40': 'var(--clr-surface-tonal-a40)',
        'surface-tonal-a50': 'var(--clr-surface-tonal-a50)',

        'dark-a0': 'var(--clr-dark-a0)',
        'light-a0': 'var(--clr-light-a0)',

        'orange-red':'#Ff4500'
      },
      textColor: {
        'primary-a0': 'var(--clr-primary-a0)',
        'primary-a10': 'var(--clr-primary-a10)',
        'primary-a20': 'var(--clr-primary-a20)',
        'primary-a30': 'var(--clr-primary-a30)',
        'primary-a40': 'var(--clr-primary-a40)',
        'primary-a50': 'var(--clr-primary-a50)',

        'surface-a0': 'var(--text-surface-a0)',
        'surface-a10': 'var(--text-surface-a10)',
        'surface-a20': 'var(--text-surface-a20)',
        'surface-a30': 'var(--text-surface-a30)',
        'surface-a40': 'var(--text-surface-a40)',
        'surface-a50': 'var(--text-surface-a50)',

        'surface-tonal-a0': 'var(--clr-surface-tonal-a0)',
        'surface-tonal-a10': 'var(--clr-surface-tonal-a10)',
        'surface-tonal-a20': 'var(--clr-surface-tonal-a20)',
        'surface-tonal-a30': 'var(--clr-surface-tonal-a30)',
        'surface-tonal-a40': 'var(--clr-surface-tonal-a40)',
        'surface-tonal-a50': 'var(--clr-surface-tonal-a50)',

        'dark-a0': 'var(--clr-dark-a0)',
        'light-a0': 'var(--clr-light-a0)',

        'orange-red':'#Ff4500'
      },
      borderColor: {
        'primary-a0': 'var(--clr-primary-a0)',
        'primary-a10': 'var(--clr-primary-a10)',
        'primary-a20': 'var(--clr-primary-a20)',
        'primary-a30': 'var(--clr-primary-a30)',
        'primary-a40': 'var(--clr-primary-a40)',
        'primary-a50': 'var(--clr-primary-a50)',

        'surface-a0': 'var(--clr-surface-a0)',
        'surface-a10': 'var(--clr-surface-a10)',
        'surface-a20': 'var(--clr-surface-a20)',
        'surface-a30': 'var(--clr-surface-a30)',
        'surface-a40': 'var(--clr-surface-a40)',
        'surface-a50': 'var(--clr-surface-a50)',

        'surface-tonal-a0': 'var(--clr-surface-tonal-a0)',
        'surface-tonal-a10': 'var(--clr-surface-tonal-a10)',
        'surface-tonal-a20': 'var(--clr-surface-tonal-a20)',
        'surface-tonal-a30': 'var(--clr-surface-tonal-a30)',
        'surface-tonal-a40': 'var(--clr-surface-tonal-a40)',
        'surface-tonal-a50': 'var(--clr-surface-tonal-a50)',

        'dark-a0': 'var(--clr-dark-a0)',
        'light-a0': 'var(--clr-light-a0)',

        'orange-red':'#Ff4500'
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
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
        }
      )
    })
  ],
}
