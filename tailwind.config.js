/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        border: '#222222',
        accent: '#F5A623',
        text: {
          primary: '#FFFFFF',
          secondary: '#888888',
          muted: '#555555',
        },
      },
    },
  },
  plugins: [],
}