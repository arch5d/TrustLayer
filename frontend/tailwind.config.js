/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F17',
        card: '#111827',
        primary: '#4F46E5',
        safe: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79,70,229,0.35), 0 0 28px rgba(79,70,229,0.18)',
        glowSoft: '0 0 0 1px rgba(79,70,229,0.20), 0 0 18px rgba(79,70,229,0.10)'
      }
    }
  },
  plugins: []
};

