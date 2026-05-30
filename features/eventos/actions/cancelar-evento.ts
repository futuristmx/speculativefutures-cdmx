'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { tienePermiso } from '@/lib/auth/permissions';

/** Cancela un evento (estado=cancelado). Solo curador_core (D-S3-1). */
export async function cancelarEvento(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const miembro = await getMiembroActual();
  if (!miembro) return { ok: false, error: 'No hay sesión activa.' };
  if (!tienePermiso(miembro, 'crear_evento')) {
    return { ok: false, error: 'No tienes permiso para cancelar eventos.' };
  }

  const evento = await prisma.evento.findUnique({ where: { id } });
  if (!evento || evento.capituloId !== miembro.capituloId) {
    return { ok: false, error: 'Evento no encontrado.' };
  }

  try {
    await prisma.evento.update({ where: { id }, data: { estado: 'cancelado' } });
    revalidatePath('/[locale]/eventos', 'page');
    revalidatePath(`/[locale]/eventos/${id}`, 'page');
    return { ok: true };
  } catch {
    return { ok: false, error: 'No se pudo cancelar el evento.' };
  }
}
