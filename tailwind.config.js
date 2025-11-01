/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space-blue': '#0C1A2E',
        'digital-blue': '#002B5B',
        'electric-blue': '#0AB5FF',
        'graphite-gray': '#2C2F38',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [],
}

