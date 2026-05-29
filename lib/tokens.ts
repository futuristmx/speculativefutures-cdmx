export const C = {
  PETROL:  '#062424',
  PETROL8: '#0B3331',
  PETROL7: '#114442',
  SLATE:   '#547476',
  EMERALD: '#439973',
  MINT:    '#66EBAC',
  CAL:     '#F4F7F5',
  BODY:    '#C4D6CF',
  INK9:    '#062424',
  INK7:    '#1E3B39',
  INK5:    '#5A716F',
  LINE:    '#D8E2DF',
} as const;

export const FONT = "'Gotham', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";

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
