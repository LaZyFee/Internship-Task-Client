/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #007991 0%, #78FFD6 100%)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

}