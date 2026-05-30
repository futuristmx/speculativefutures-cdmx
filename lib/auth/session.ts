import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import type { Miembro } from '@prisma/client';

/** Usuario de Supabase Auth de la request actual, o null. */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Miembro (registro de aplicación) del usuario autenticado, o null. */
export async function getMiembroActual(): Promise<Miembro | null> {
  const user = await getUser();
  if (!user) return null;
  return prisma.miembro.findUnique({ where: { userId: user.id } });
}
