// Compatibilidad: la API histórica (C, FONT, meta, HAIR) que consumen los
// componentes existentes se deriva del source of truth único (styles/tokens.ts).
// No hay valores duplicados aquí; todo proviene de styles/tokens.ts.
import { color, font } from '@/styles/tokens';

export const C = {
  PETROL: color.petrol900,
  PETROL8: color.petrol800,
  PETROL7: color.petrol700,
  SLATE: color.slate500,
  EMERALD: color.emerald500,
  MINT: color.mint400,
  CAL: color.cal50,
  BODY: color.bodyDark,
  INK9: color.ink900,
  INK7: color.ink700,
  INK5: color.ink500,
  LINE: color.lineLight,
} as const;

export const FONT = font.sans;

export const meta: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  color: C.SLATE,
};

export const HAIR: React.CSSProperties = {
  backgroundImage: 'var(--hair-bg)',
};
