/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#000000",
        secondary: "#111111",
        tertiary: "#222222",
        quaternary: "#333333",
        quinary: "#444444",
        senary: "#555555",
        picolo: "#4E46B4",
        del: "#EB5757",
        mature:"#2E7D321F",
        baby: "#FEF3C7",
        old: "#5C33CF1F",
        grayhead:"#4D5959",
        graydata:"#393F4C",
        grayside:"#595D62",
        graycontent:"#838383",
        grayborder:"#E2E2E2",
        graybg:"#F5F5F5",
      },
    },
  },
  plugins: [],
}

