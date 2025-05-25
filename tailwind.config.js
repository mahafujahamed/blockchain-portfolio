/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Adjust to match your theme
        'primary-light': '#38bdf8',
      },
    },
  },

  plugins: [],
};
