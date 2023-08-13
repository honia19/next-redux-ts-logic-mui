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
    screens: {
      xsm: { max: '576px' }, //Mobile Phones
      sm: { min: '576px', max: '767px' }, //Tablets and Small Laptops
      md: { min: '768px', max: '991px' }, //Larger Tablets and Laptops
      lg: { min: '992px', max: '1199px' }, //Desktops
      xl: { min: '1200px', max: '1535px' }, //Large Desktops and High-Resolution Monitors
      '2xl': { min: '1536px' }, //X-Large Desktops and High-Resolution Monitors
    },
  },
  plugins: [],
};
