/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundColor: {
        'grey-text': '#9ba6b4',
        'black-text': '#000219',
        'grey-snow': '#f8fafc',
      },
      textColor: {
        'grey-text': '#969fac',
      },
    },
  },
  plugins: [],
};
