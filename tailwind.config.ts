import type { Config } from 'tailwindcss';

// Tailwind para shadcn/ui. Los colores mapean a las variables CSS generadas
// desde styles/tokens.mjs (identidad SF CDMX: Gotham, paleta petróleo/menta).
const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta del proyecto
        petrol: {
          900: 'var(--sf-petrol-900)',
          800: 'var(--sf-petrol-800)',
          700: 'var(--sf-petrol-700)',
        },
        slate: { 500: 'var(--sf-slate-500)' },
        emerald: { 500: 'var(--sf-emerald-500)' },
        mint: { 400: 'var(--sf-mint-400)' },
        cal: { 50: 'var(--sf-cal-50)', 0: 'var(--sf-cal-0)' },
        ink: {
          900: 'var(--sf-ink-900)',
          700: 'var(--sf-ink-700)',
          500: 'var(--sf-ink-500)',
        },
        line: { light: 'var(--sf-line-light)' },
        body: { dark: 'var(--sf-body-dark)' },
        // Roles semánticos (shadcn los espera con estos nombres)
        background: 'var(--bg)',
        foreground: 'var(--text)',
        border: 'var(--border)',
        input: 'var(--sf-petrol-700)',
        ring: 'var(--sf-mint-400)',
        primary: { DEFAULT: 'var(--sf-mint-400)', foreground: 'var(--sf-petrol-900)' },
        secondary: { DEFAULT: 'var(--sf-petrol-800)', foreground: 'var(--sf-cal-50)' },
        muted: { DEFAULT: 'var(--sf-petrol-800)', foreground: 'var(--sf-slate-500)' },
        accent: { DEFAULT: 'var(--sf-petrol-700)', foreground: 'var(--sf-cal-50)' },
        destructive: { DEFAULT: '#b54a4a', foreground: '#ffffff' },
        card: { DEFAULT: 'var(--sf-petrol-800)', foreground: 'var(--sf-cal-50)' },
        popover: { DEFAULT: 'var(--sf-petrol-800)', foreground: 'var(--sf-cal-50)' },
      },
      borderRadius: {
        // Radios del sistema SF CDMX (no los defaults de shadcn)
        lg: 'var(--r-md)', // 4px
        md: 'var(--r-md)',
        sm: 'var(--r-sm)', // 2px
      },
      fontFamily: {
        sans: ['Gotham', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
