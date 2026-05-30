'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { contarConfirmados, estadoCupo } from '@/lib/eventos/cupo';
import { generarIcs } from '@/lib/eventos/ical';
import { ubicacionTexto, type UbicacionJson } from '@/lib/eventos/ubicacion';
import { enviarEmailRsvp } from '@/features/rsvp/email';

const MODALIDAD_TEXTO: Record<string, string> = {
  online: 'Online',
  presencial: 'Presencial',
  hibrido: 'Híbrido',
};

/** Confirma el RSVP del miembro a un evento (D-S3-7). Envía email con .ics. */
export async function confirmarRsvp(
  eventoId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const miembro = await getMiembroActual();
  if (!miembro) return { ok: false, error: 'Inicia sesión para asistir.' };
  if (!miembro.onboardingCompletado) {
    return { ok: false, error: 'Completa tu onboarding antes de registrarte a eventos.' };
  }

  const evento = await prisma.evento.findUnique({ where: { id: eventoId } });
  if (!evento) return { ok: false, error: 'Evento no encontrado.' };
  if (evento.estado === 'cancelado')
    return { ok: false, error: 'Este evento fue cancelado.' };

  // Cupo (excluye al propio miembro si ya tenía registro activo).
  const confirmados = await contarConfirmados(eventoId);
  const existente = await prisma.rSVP.findUnique({
    where: { miembroId_eventoId: { miembroId: miembro.id, eventoId } },
  });
  const yaActivo = existente && existente.estado !== 'cancelado';
  if (!yaActivo) {
    const { lleno } = estadoCupo(evento.capacidad, confirmados);
    if (lleno) return { ok: false, error: 'El evento está lleno.' };
  }

  try {
    await prisma.rSVP.upsert({
      where: { miembroId_eventoId: { miembroId: miembro.id, eventoId } },
      update: { estado: 'registrado', fechaCancelacion: null },
      create: { miembroId: miembro.id, eventoId, estado: 'registrado' },
    });
  } catch {
    return { ok: false, error: 'No se pudo confirmar tu asistencia.' };
  }

  // Email de confirmación con .ics (no bloquea el resultado si falla).
  const ubic = (evento.ubicacion as UbicacionJson | null) ?? null;
  const ubicTxt = ubicacionTexto(evento.modalidad, ubic);
  const ics = generarIcs({
    id: evento.id,
    titulo: evento.titulo,
    descripcion: evento.descripcion,
    fechaInicio: evento.fechaInicio,
    fechaFin: evento.fechaFin,
    ubicacionTexto: ubicTxt,
  });
  await enviarEmailRsvp({
    para: miembro.email,
    nombre: miembro.nombre.split(' ')[0] || miembro.nombre,
    eventoId: evento.id,
    titulo: evento.titulo,
    fechaInicio: evento.fechaInicio,
    modalidadTexto: MODALIDAD_TEXTO[evento.modalidad] ?? evento.modalidad,
    ubicacionTexto: ubicTxt,
    ics,
  });

  revalidatePath(`/[locale]/eventos/${eventoId}`, 'page');
  return { ok: true };
}
