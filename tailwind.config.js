/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66aaff',
          400: '#338eff',
          500: '#0072ff', // Main primary color
          600: '#005bc9',
          700: '#004494',
          800: '#002e63',
          900: '#001731',
        },
        secondary: {
          50: '#e6f9ff',
          100: '#ccf2ff',
          200: '#99e6ff',
          300: '#66d9ff',
          400: '#33cdff',
          500: '#00c0ff', // Main secondary color
          600: '#009acc',
          700: '#007399',
          800: '#004d66',
          900: '#002633',
        },
        accent: {
          50: '#fff8e6',
          100: '#fff1cc',
          200: '#ffe299',
          300: '#ffd466',
          400: '#ffc533',
          500: '#ffb700', // Main accent color
          600: '#cc9200',
          700: '#996e00',
          800: '#664900',
          900: '#332500',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}