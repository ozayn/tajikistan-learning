/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716b',
          600: '#57534e',
          700: '#44403c',
          800: '#292423',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      fontSize: {
        base: '1.0625rem', // 17px - more comfortable body text
        sm: '0.9375rem', // 15px
        lg: '1.125rem', // 18px
      },
      lineHeight: {
        relaxed: '1.75', // Better spacing for reading
        loose: '2', // For headings
      },
    },
  },
  plugins: [],
}
