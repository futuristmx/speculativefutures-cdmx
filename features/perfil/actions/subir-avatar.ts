'use server';
import sharp from 'sharp';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/lib/auth/session';

const TIPOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 2 * 1024 * 1024; // 2MB

/** Sube y redimensiona el avatar del miembro (Bloque 4 / D-S2-3). */
export async function subirAvatar(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const user = await getUser();
  if (!user) return { ok: false, error: 'No hay sesión activa.' };

  const file = formData.get('avatar');
  if (!(file instanceof File)) return { ok: false, error: 'No se recibió archivo.' };
  if (!TIPOS.includes(file.type)) {
    return { ok: false, error: 'Formato no permitido. Usa JPG, PNG o WebP.' };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'La imagen no puede exceder 2MB.' };
  }

  // Redimensionar a máx 512×512, convertir a WebP.
  const input = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  try {
    output = await sharp(input)
      .resize(512, 512, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return { ok: false, error: 'No se pudo procesar la imagen.' };
  }

  // Subir al bucket avatars/ en carpeta del usuario (avatars/{uid}/avatar.webp).
  const supabase = await createClient();
  const path = `${user.id}/avatar.webp`;
  const { error: upErr } = await supabase.storage
    .from('avatars')
    .upload(path, output, { contentType: 'image/webp', upsert: true });
  if (upErr) return { ok: false, error: 'No se pudo subir la imagen.' };

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  // Cache-bust para que la nueva imagen se vea de inmediato.
  const url = `${data.publicUrl}?v=${Date.now()}`;

  try {
    await prisma.miembro.update({ where: { userId: user.id }, data: { foto: url } });
  } catch {
    return { ok: false, error: 'Imagen subida pero no se pudo guardar en el perfil.' };
  }

  return { ok: true, url };
}
