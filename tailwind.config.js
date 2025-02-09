// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html,ts,tsx}"],
//   theme: {
//     fontFamily: {
//       sans: ['Inter', 'sans-serif'],
//       chakra: ['Chakra Petch', 'sans-serif'],
//     },
//     extend: {
//       borderImage: {
//         gradient: 'linear-gradient(357.47deg, #005EFF 12.36%, rgba(53, 90, 153, 0) 97.89%)',
//       }
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
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
      animation: {
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "20%": { transform: "translateX(-4px) translateY(-2px) rotate(-2deg)" },
          "40%": { transform: "translateX(4px) translateY(2px) rotate(2deg)" },
          "60%": { transform: "translateX(-3px) translateY(-1px) rotate(-1.5deg)" },
          "80%": { transform: "translateX(3px) translateY(1px) rotate(1.5deg)" },
        },
      },
    },
  },
  plugins: [],
};
