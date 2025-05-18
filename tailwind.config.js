/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/portfolio-mono/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        times: ['Times New Roman', 'serif'],
        mono: ['Courier New', 'monospace'],
        condensed: ['"Times New Roman MT Condensed"', 'Times New Roman', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      colors: {
        background: {
          light: '#ffffff',
          dark: '#000000',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        }
      }
    },
  },
  plugins: [],
};