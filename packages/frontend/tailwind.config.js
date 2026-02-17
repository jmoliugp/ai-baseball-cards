/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0f172a',    // slate-900
          secondary: '#1e293b',  // slate-800
          tertiary: '#334155',   // slate-700
        },
        accent: {
          blue: '#3b82f6',       // blue-500
          green: '#10b981',      // emerald-500
          purple: '#a855f7',     // purple-500
          orange: '#f97316',     // orange-500
          yellow: '#eab308',     // yellow-500
        },
      },
    },
  },
  plugins: [],
}

