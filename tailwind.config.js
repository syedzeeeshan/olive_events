/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#080A08',
        'deep-forest': '#101C15',
        olive: {
          DEFAULT: '#263A2C',
          dark: '#1B2C20',
          light: '#3C5543',
        },
        bone: '#EAE5D8',
        'warm-ivory': '#F4F0E7',
        'aged-gold': {
          DEFAULT: '#B89B5E',
          light: '#D4AF37',
          dark: '#8C7441',
          subtle: 'rgba(184, 155, 94, 0.15)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '.25em',
        ultra: '.35em',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
