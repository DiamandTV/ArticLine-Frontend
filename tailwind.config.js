/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ⬅️ supporta `.dark` class
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
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
      },
    },
  },
  plugins: [],
}
