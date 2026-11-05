/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          1: '#eabe75',
          2: '#f5d197',
          3: '#fbe3bc',
          4: '#fff0d9',
          5: '#fffaf3',
        },
        ink: '#1f3a4d',
        soft: '#5f6f78',
        sea: {
          DEFAULT: '#13727c',
          hover: '#0e565e',
          light: '#a4f4ff',
        },
        coral: {
          DEFAULT: '#d9684f',
          hover: '#bd553e',
          light: '#fc8368',
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        hand: ['Kalam', '"Comic Sans MS"', 'cursive'],
        caveat: ['Caveat', 'cursive'],
      },
      boxShadow: {
        paper: '0 2px 8px -2px rgba(31, 58, 77, 0.08), 0 1px 3px 0 rgba(31, 58, 77, 0.04)',
        paperLift: '0 8px 18px -4px rgba(31, 58, 77, 0.12), 0 3px 6px -2px rgba(31, 58, 77, 0.06)',
      },
    },
  },
  plugins: [],
};

