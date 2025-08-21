/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#D4AF37',
        'brand-dark': '#333333',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
