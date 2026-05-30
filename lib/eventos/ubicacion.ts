import type { ModalidadEvento } from '@prisma/client';

export interface UbicacionJson {
  urlOnline?: string;
  plataforma?: string;
  direccion?: string;
  mapsUrl?: string;
}

/** Texto plano de ubicación según modalidad (para email, .ics, etc.). */
export function ubicacionTexto(
  modalidad: ModalidadEvento,
  u: UbicacionJson | null
): string {
  if (!u) return '';
  const partes: string[] = [];
  if (modalidad === 'online' || modalidad === 'hibrido') {
    if (u.plataforma || u.urlOnline) {
      partes.push([u.plataforma, u.urlOnline].filter(Boolean).join(': '));
    }
  }
  if (modalidad === 'presencial' || modalidad === 'hibrido') {
    if (u.direccion) partes.push(u.direccion);
  }
  return partes.join(' · ');
}
