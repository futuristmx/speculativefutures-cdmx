'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth/session';
import { perfilSchema, type PerfilInput } from '@/features/perfil/schema';

/** Completa el onboarding del miembro autenticado (Bloque 2). */
export async function completarOnboarding(
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

  // Validar que los territorios existen en el capítulo del miembro.
  const territorios = await prisma.territorio.findMany({
    where: { id: { in: d.territorios }, capituloId: miembro.capituloId },
    select: { id: true },
  });
  if (territorios.length !== d.territorios.length) {
    return { ok: false, error: 'Uno o más territorios no son válidos.' };
  }

  try {
    await prisma.miembro.update({
      where: { userId: user.id },
      data: {
        nombre: d.nombre,
        disciplina: d.disciplina,
        motivacion: d.motivacion,
        bioCorta: d.bioCorta || null,
        enlacesExternos: d.enlacesExternos,
        onboardingCompletado: true,
        // Auto-promoción opcional a curador_comunidad; nunca a curador_core.
        ...(d.quiereSerCurador && miembro.rolContribucion === 'regular'
          ? { rolContribucion: 'curador_comunidad' as const }
          : {}),
        territoriosInteres: {
          set: d.territorios.map((id) => ({ id })),
        },
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, error: 'Error al guardar. Intenta de nuevo.' };
  }
}
