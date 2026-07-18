/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0B',
        surface: {
          DEFAULT: '#111113',
          light: '#161618',
          lighter: '#1C1C1F',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        accent: {
          cyan: '#22D3EE',
          purple: '#A855F7',
        },
        charcoal: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
        'primary-glow': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'premium': '0 0 50px -12px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px -5px rgba(59, 130, 246, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
