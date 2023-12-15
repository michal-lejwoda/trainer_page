/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tourists': "url('/public/tourists.jpg')",
      },
      colors: {
        'regal-blue': '#243c5a',
        'lighter-grey': '#A9A9B2',
        'darky-grey': '#283747',
        'even-more-darky-grey': '#333333',
        'background-black-color': '#242424',
        'container-grey': 'rgba(44,44,44,1)',
        'purple-text': '#646cff',
      },
    },
  },
  plugins: [],
}

