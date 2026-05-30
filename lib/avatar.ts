// Utilidades para avatares por defecto (iniciales + color estable por user_id).

const COLORS = ['#114442', '#439973', '#547476', '#1E3B39', '#0B3331', '#3a5c54'];

/** Iniciales (máx 2) a partir del nombre completo. */
export function iniciales(nombre: string): string {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '·';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Color de fondo estable derivado del id (O17).
 *
 * Algoritmo: hash polinómico (base 31) sobre los char codes del id, truncado a
 * uint32 con `>>> 0` para evitar overflow de signo, e indexado por módulo sobre
 * la paleta `COLORS`.
 *
 * - Determinista: el mismo id siempre produce el mismo color (clave para que el
 *   avatar de iniciales no "parpadee" entre renders ni entre páginas).
 * - Paleta de 6 matices de la identidad verde del proyecto (`COLORS`).
 * - Distribución: razonablemente uniforme para UUIDs v4 (entrada de alta
 *   entropía); no se garantiza ausencia de colisiones — dos ids distintos
 *   pueden compartir color, lo cual es aceptable para un fondo decorativo.
 */
export function colorDeId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return COLORS[hash % COLORS.length];
}
