/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}, ${opacityValue}))`;
    }
    return `rgb(var(${variableName}))`;
  }
}

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '6rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1280px',
        '3xl': '1280px',
        '4xl': '1280px'
      }
    },
    fontFamily: {
      rale: "'RaleWay', sans-serif",
      lilita_one: "'Lilita One', sans-serif"
    },
    extend: {
      colors: {
        primary: withOpacity('--mp-primary-color-rgb'),
        lightprimary: withOpacity('--mp-lightprimary-color-rgb'),
        accent:  withOpacity('--mp-accent-color-rgb'),
        warn: withOpacity('--mp-warn-color-rgb'),
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class', // only generate classes
    }),
  ],
}

