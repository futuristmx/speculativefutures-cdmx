'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';

/** Cancela el RSVP del miembro (estado=cancelado, libera cupo). D-S3-5. */
export async function cancelarRsvp(
  eventoId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const miembro = await getMiembroActual();
  if (!miembro) return { ok: false, error: 'No hay sesión activa.' };

  const rsvp = await prisma.rSVP.findUnique({
    where: { miembroId_eventoId: { miembroId: miembro.id, eventoId } },
  });
  if (!rsvp || rsvp.estado === 'cancelado') {
    return { ok: false, error: 'No tienes un RSVP activo en este evento.' };
  }

  try {
    await prisma.rSVP.update({
      where: { miembroId_eventoId: { miembroId: miembro.id, eventoId } },
      data: { estado: 'cancelado', fechaCancelacion: new Date() },
    });
    revalidatePath(`/[locale]/eventos/${eventoId}`, 'page');
    return { ok: true };
  } catch {
    return { ok: false, error: 'No se pudo cancelar tu RSVP.' };
  }
}
