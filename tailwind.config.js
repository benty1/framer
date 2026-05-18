/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
      },
      boxShadow: {
        'sleek': '0 4px 30px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
