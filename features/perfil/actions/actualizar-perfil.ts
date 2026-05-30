'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth/session';
import { perfilSchema, type PerfilInput } from '@/features/perfil/schema';

/** Actualiza el perfil del miembro autenticado (Bloque 4). */
export async function actualizarPerfil(
  data: PerfilInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await getUser();
  if (!user) return { ok: false, error: 'No hay sesión activa.' };

  const parsed = perfilSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  }
  const d = parsed.data;

  const miembro = await prisma.miembro.findUnique({ where: { userId: user.id } });
  if (!miembro) return { ok: false, error: 'No encontramos tu registro de miembro.' };

  const territorios = await prisma.territorio.findMany({
    where: { id: { in: d.territorios }, capituloId: miembro.capituloId },
    select: { id: true },
  });
  if (territorios.length !== d.territorios.length) {
    return { ok: false, error: 'Uno o más territorios no son válidos.' };
  }

  // Regla de rol: solo se permite regular → curador_comunidad (auto-promoción).
  // Nunca degradar ni saltar a curador_core desde la UI.
  const promueve =
    d.quiereSerCurador && miembro.rolContribucion === 'regular'
      ? { rolContribucion: 'curador_comunidad' as const }
      : {};

  try {
    await prisma.miembro.update({
      where: { userId: user.id },
      data: {
        nombre: d.nombre,
        disciplina: d.disciplina,
        motivacion: d.motivacion,
        bioCorta: d.bioCorta || null,
        enlacesExternos: d.enlacesExternos,
        ...promueve,
        territoriosInteres: { set: d.territorios.map((id) => ({ id })) },
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: 'Error al guardar. Intenta de nuevo.' };
  }
}
