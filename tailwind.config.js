/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      chakra: ['Chakra Petch', 'sans-serif'],
    },
    extend: {
      borderImage: {
        gradient: 'linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)',
      },
    },
  },
  plugins: [],
}
