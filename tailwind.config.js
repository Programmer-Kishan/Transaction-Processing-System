/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grayish-white": "#F6F1F1",
        "whiteish-blue": "#AFD3E2",
        "mat-blue": "#19A7CE",
        "dark-blue": "#146C94"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      },
      screens: {
        'tablet': '915px',
        "moblie": "392px",
      }
    },
  },
  plugins: [],
}