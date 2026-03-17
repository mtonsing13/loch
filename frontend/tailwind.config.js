/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#AACC96',      // light green — accents, buttons
        forest: '#25533f',    // dark green — backgrounds, cards
        blush: '#F4BEAE',     // soft pink — highlights, streaks
      }
    },
  },
  plugins: [],
}
