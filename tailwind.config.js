/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'fundo-escuro': '#000000',
        'amarelo-sw': '#e8b23b',
      },
    },
  },
  plugins: [],
};
