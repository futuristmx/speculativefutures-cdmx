// Utilidades para avatares por defecto (iniciales + color estable por user_id).

const COLORS = ['#114442', '#439973', '#547476', '#1E3B39', '#0B3331', '#3a5c54'];

/** Iniciales (máx 2) a partir del nombre completo. */
export function iniciales(nombre: string): string {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '·';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Color de fondo estable derivado del id (mismo id → mismo color). */
export function colorDeId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return COLORS[hash % COLORS.length];
}
