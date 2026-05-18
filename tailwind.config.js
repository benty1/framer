/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Centralized Semantic Tokens linked to CSS Variables
        app: {
          canvasFrom: 'var(--color-canvas-from)',
          canvasVia: 'var(--color-canvas-via)',
          canvasTo: 'var(--color-canvas-to)',
          panel: 'var(--color-panel)',
          panelSolid: 'var(--color-panel-solid)',
          border: 'var(--color-border)',
          textMain: 'var(--color-text-main)',
          textMuted: 'var(--color-text-muted)',
        },
        // Sophisticated, unified dark-mode neutrals
        zinc: {
          950: '#090d16', // Ultra-deep background canvas
          900: '#111827', // Card & sidebar backgrounds
          800: '#1f2937', // Hover states & elevated elements
          700: '#374151', // Subtle borders and dividers
          400: '#9ca3af', // Secondary text
          100: '#f3f4f6', // Bright primary text
        },
        // High-end electric indigo accent palette
        blue: {
          400: '#818cf8',
          500: '#6366f1', // Primary interactive buttons
          600: '#4f46e5', // Button hover states
          700: '#4338ca', // Active clicks / focus rings
        }
      },
      // Ultra-smooth subtle shadows for card elevation
      boxShadow: {
        'sleek': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
};
