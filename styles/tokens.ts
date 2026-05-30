// Re-export tipado del source of truth en JS plano (styles/tokens.mjs).
// El código TS/TSX importa de '@/styles/tokens'; el generador de CSS importa
// directamente de './tokens.mjs'. Una sola fuente de verdad, sin duplicación.
export {
  color,
  role,
  font,
  tracking,
  space,
  radius,
  motion,
  layout,
  tokens,
  cssVarMap,
} from './tokens.mjs';
