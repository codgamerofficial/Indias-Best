/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FDE047',
          dark: '#FACC15'
        },
        secondary: '#DC2626',
        'background-light': '#F3F4F6',
        'background-dark': '#111827',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1F2937',
        'text-light': '#1F2937',
        'text-dark': '#F3F4F6',
        'text-muted-light': '#6B7280',
        'text-muted-dark': '#9CA3AF',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}