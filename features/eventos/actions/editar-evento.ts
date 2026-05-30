'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { tienePermiso } from '@/lib/auth/permissions';
import { eventoSchema, type EventoInput } from '@/features/eventos/schema';
import type { Prisma } from '@prisma/client';

/** Edita un evento existente. Solo curador_core (D-S3-1). */
export async function editarEvento(
  id: string,
  data: EventoInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const miembro = await getMiembroActual();
  if (!miembro) return { ok: false, error: 'No hay sesión activa.' };
  if (!tienePermiso(miembro, 'crear_evento')) {
    return { ok: false, error: 'No tienes permiso para editar eventos.' };
  }

  const parsed = eventoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  }
  const d = parsed.data;

  const evento = await prisma.evento.findUnique({ where: { id } });
  if (!evento || evento.capituloId !== miembro.capituloId) {
    return { ok: false, error: 'Evento no encontrado.' };
  }

  try {
    await prisma.evento.update({
      where: { id },
      data: {
        titulo: d.titulo,
        descripcion: d.descripcion,
        modalidad: d.modalidad,
        estado: d.estado,
        fechaInicio: new Date(d.fechaInicio),
        fechaFin: d.fechaFin ? new Date(d.fechaFin) : null,
        capacidad: d.capacidad ?? null,
        territorioId: d.territorioId || null,
        ubicacion: (d.ubicacion ?? {}) as Prisma.InputJsonValue,
        ponentes: (d.ponentes ?? []) as Prisma.InputJsonValue,
        idiomas: d.idiomas,
      },
    });
    revalidatePath(`/[locale]/eventos/${id}`, 'page');
    revalidatePath('/[locale]/eventos', 'page');
    return { ok: true };
  } catch {
    return { ok: false, error: 'Error al guardar los cambios.' };
  }
}
