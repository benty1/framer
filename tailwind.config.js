/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exposing your centralized tokens to the Tailwind compiler
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
    },
  },
  plugins: [],
}
