/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff2d55',
          blue: '#0ff',
          purple: '#b026ff',
          yellow: '#ffed4a'
        },
        cyber: {
          black: '#0a0a0f',
          darker: '#16161d',
          dark: '#1a1a23',
          primary: '#2b2b3d',
          light: '#3f3f5c'
        }
      },
      boxShadow: {
        'neon-pink': '0 0 5px theme(colors.neon.pink), 0 0 20px theme(colors.neon.pink)',
        'neon-blue': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
        'neon-purple': '0 0 5px theme(colors.neon.purple), 0 0 20px theme(colors.neon.purple)'
      }
    },
  },
  plugins: [],
};