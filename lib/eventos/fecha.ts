// Utilidades de fecha para eventos. Almacenamiento UTC, display CDMX (D-S3-6).

const TZ = 'America/Mexico_City';

/** Fecha + hora en CDMX con etiqueta. Ej: "jue 26 jun 2026, 19:30 (CDMX)". */
export function formatoFechaHoraCDMX(fecha: Date): string {
  const f = new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TZ,
  }).format(fecha);
  return `${f} (CDMX)`;
}

/** Solo fecha en CDMX. Ej: "jue 26 jun 2026". */
export function formatoFechaCDMX(fecha: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: TZ,
  }).format(fecha);
}

/** Componentes UTC para construir un .ics (year, month, day, hour, minute). */
export function partesUTC(fecha: Date): [number, number, number, number, number] {
  return [
    fecha.getUTCFullYear(),
    fecha.getUTCMonth() + 1,
    fecha.getUTCDate(),
    fecha.getUTCHours(),
    fecha.getUTCMinutes(),
  ];
}
