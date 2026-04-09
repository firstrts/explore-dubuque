import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4F72',
          50: '#E8F1F8',
          100: '#C5D9EC',
          200: '#8FB7D9',
          300: '#5A95C5',
          400: '#2E73B2',
          500: '#1B4F72',
          600: '#163F5B',
          700: '#112F44',
          800: '#0C202E',
          900: '#071018',
        },
        accent: {
          DEFAULT: '#E8A020',
          50: '#FEF7E8',
          100: '#FCEABF',
          200: '#F8D280',
          300: '#F3BB42',
          400: '#E8A020',
          500: '#C4841A',
          600: '#9F6913',
          700: '#7A4F0D',
          800: '#563507',
          900: '#311D03',
        },
        surface: '#F8F6F2',
        brand: {
          text: '#1A1A2E',
          green: '#5A8A6A',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(27, 79, 114, 0.08)',
        'card-hover': '0 8px 24px rgba(27, 79, 114, 0.16)',
      },
    },
  },
  plugins: [],
}

export default config
