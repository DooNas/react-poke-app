/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './src/styles/main.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffcb05',
        second: '#3d7dca',
        third: '#003a70',
        normal: '#A8a77a',
        fire: '#ee8130',
        water: '#6390F0',
        electric: '#dfbc30',
        grass: '#7AC74C',
        ice: '#97d4d2',
        fighting: '#b83e3a',
        poison: '#A33EA1',
        ground: '#e2bf65',
        flying: '#a98ff3',
        psychic: '#f95587',
        bug: '#a6b91a',
        rock: '#b6a136',
        ghost: '#735797',
        dragon: '#6f35fc',
        dark: '#705746',
        steel: '#b7b7ce',
        fairy: '#d685AD',
        none: '#BfBfBf'

      }
    },
  },
  plugins: [],
}

