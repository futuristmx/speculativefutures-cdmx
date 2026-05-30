import { createEvent, type EventAttributes } from 'ics';
import { partesUTC } from './fecha';

interface EventoIcal {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date | null;
  ubicacionTexto: string;
}

/** Genera el contenido .ics de un evento (fechas en UTC). Devuelve el string o null. */
export function generarIcs(e: EventoIcal): string | null {
  const base = {
    start: partesUTC(e.fechaInicio),
    startInputType: 'utc' as const,
    startOutputType: 'utc' as const,
    title: e.titulo,
    description: e.descripcion,
    location: e.ubicacionTexto || undefined,
    organizer: {
      name: 'Speculative Futures CDMX',
      email: 'no-reply@speculativefutures.mx',
    },
    productId: 'speculativefutures-cdmx',
    uid: `${e.id}@speculativefutures.mx`,
  };

  // El tipo de `ics` exige `end` o `duration` al construir (es un union).
  const attrs: EventAttributes = e.fechaFin
    ? { ...base, end: partesUTC(e.fechaFin), endInputType: 'utc', endOutputType: 'utc' }
    : { ...base, duration: { hours: 2 } };

  const { error, value } = createEvent(attrs);
  if (error || !value) return null;
  return value;
}
