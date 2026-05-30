import { prisma } from '@/lib/prisma';

/** Número de RSVPs activos (no cancelados) de un evento. */
export async function contarConfirmados(eventoId: string): Promise<number> {
  return prisma.rSVP.count({
    where: { eventoId, estado: { in: ['registrado', 'asistio'] } },
  });
}

/** Estado de cupo de un evento dado su capacidad y confirmados. */
export function estadoCupo(capacidad: number | null, confirmados: number) {
  if (capacidad === null) return { lleno: false, disponibles: null as number | null };
  return {
    lleno: confirmados >= capacidad,
    disponibles: Math.max(0, capacidad - confirmados),
  };
}
