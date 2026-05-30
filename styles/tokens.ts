// =============================================================================
// SPECULATIVE FUTURES CDMX — Design tokens (source of truth ÚNICO)
//
// Este archivo es la única fuente de verdad de los tokens de diseño.
// - El código TS/TSX importa { color, font, ... } o el objeto `tokens`.
// - Las variables CSS (:root { --sf-* }) se GENERAN desde aquí ejecutando
//   `npm run tokens:build`, que escribe styles/tokens.css.
// No editar styles/tokens.css a mano; editar este archivo y regenerar.
// =============================================================================

export const color = {
  // Core palette
  petrol900: '#062424',
  petrol800: '#0B3331',
  petrol700: '#114442',
  slate500: '#547476',
  emerald500: '#439973',
  mint400: '#66EBAC',
  cal50: '#F4F7F5',
  cal0: '#FFFFFF',
  // Text neutrals
  ink900: '#062424',
  ink700: '#1E3B39',
  ink500: '#5A716F',
  lineLight: '#D8E2DF',
  bodyDark: '#C4D6CF',
} as const;

// Roles semánticos (dark-first). Apuntan a colores de la paleta.
export const role = {
  bg: color.petrol900,
  surface: color.petrol800,
  border: color.petrol700,
  text: color.cal50,
  textBody: color.bodyDark,
  textMuted: color.slate500,
  accent: color.mint400,
  link: color.mint400,
} as const;

export const font = {
  sans: "'Gotham', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
} as const;

export const tracking = {
  meta: '0.08em',
  tight: '-0.02em',
} as const;

export const space = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  24: '96px',
  32: '128px',
} as const;

export const radius = {
  sm: '2px',
  md: '4px',
  pill: '999px',
} as const;

export const motion = {
  ease: 'cubic-bezier(.2,.6,.2,1)',
  durFast: '180ms',
  dur: '400ms',
  durSlow: '700ms',
} as const;

export const layout = {
  containerMax: '1280px',
  hairBg:
    'repeating-linear-gradient(to right, rgba(84,116,118,.05) 0 1px, transparent 1px 96px)',
} as const;

export const tokens = { color, role, font, tracking, space, radius, motion, layout };

// Mapeo token → nombre de variable CSS (lo consume el generador).
export const cssVarMap: Record<string, string> = {
  '--sf-petrol-900': color.petrol900,
  '--sf-petrol-800': color.petrol800,
  '--sf-petrol-700': color.petrol700,
  '--sf-slate-500': color.slate500,
  '--sf-emerald-500': color.emerald500,
  '--sf-mint-400': color.mint400,
  '--sf-cal-50': color.cal50,
  '--sf-cal-0': color.cal0,
  '--sf-ink-900': color.ink900,
  '--sf-ink-700': color.ink700,
  '--sf-ink-500': color.ink500,
  '--sf-line-light': color.lineLight,
  '--sf-body-dark': color.bodyDark,
  '--bg': 'var(--sf-petrol-900)',
  '--surface': 'var(--sf-petrol-800)',
  '--border': 'var(--sf-petrol-700)',
  '--text': 'var(--sf-cal-50)',
  '--text-body': 'var(--sf-body-dark)',
  '--text-muted': 'var(--sf-slate-500)',
  '--accent': 'var(--sf-mint-400)',
  '--link': 'var(--sf-mint-400)',
  '--font': font.sans,
  '--tracking-meta': tracking.meta,
  '--tracking-tight': tracking.tight,
  '--s-1': space[1],
  '--s-2': space[2],
  '--s-3': space[3],
  '--s-4': space[4],
  '--s-6': space[6],
  '--s-8': space[8],
  '--s-12': space[12],
  '--s-16': space[16],
  '--s-24': space[24],
  '--s-32': space[32],
  '--r-sm': radius.sm,
  '--r-md': radius.md,
  '--r-pill': radius.pill,
  '--ease': motion.ease,
  '--dur-fast': motion.durFast,
  '--dur': motion.dur,
  '--dur-slow': motion.durSlow,
  '--container-max': layout.containerMax,
  '--hair-bg': layout.hairBg,
};
