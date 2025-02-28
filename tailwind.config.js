/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-gray": "#252A34",
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
        'desktop-sm': '1247px',
        'tablet-lg': '1121px',
        'tablet': '915px',
        'mini-tab': "560px",
        "moblie": "392px",
      }
    },
  },
  plugins: [],
}