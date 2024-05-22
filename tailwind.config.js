/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/templates/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      gray: '#151515',
      pink: '#FDBCBC',
      teal: '#A0B5AA',
      beige: '#EFE9D3',
      'transparent-gray': 'rgba(216, 216, 215, 0.9)',
      'transparent-black': 'rgba(0, 0, 0, 0.3)',
      zinc: colors.zinc,
      red: colors.red,
    },
    fontFamily: {
      'lato': "Lato",
      'virilica': 'Virilica',
    },
    extend: {
      animation: {
        'draw': 'dash 400ms linear alternate forwards',
        'single-ping': 'scale 400ms ease-out',
      },
      keyframes: {
        dash: {
          '0%': {
            strokeDashoffset: 30,
          },
          '100%': {
            strokeDashoffset: 0,
          }
        },
        scale: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.4)'
          }
        }
      }
    },
  },
  plugins: [],
}

