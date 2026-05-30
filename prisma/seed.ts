// Seed inicial del MDP. Idempotente.
// Ejecutar: `npm run db:seed`.
//
// Inserta:
//   - 1 capítulo: cdmx
//   - 5 territorios (taxonomía fija)
//   - 1 aliado fundador: Change · Futurist.mx
//   - (O1) 1 Curador Core: se crea su auth.users vía Admin API (lo que dispara
//     el trigger handle_new_user y crea el Miembro con rol 'regular'), y luego
//     se promueve a 'curador_core' por upsert sobre user_id.

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const TERRITORIOS = [
  { codigo: 'futuros', nombre: 'Futuros', orden: 1 },
  { codigo: 'innovacion_negocios', nombre: 'Innovación & Negocios', orden: 2 },
  { codigo: 'ciudad_sistemas_vivos', nombre: 'Ciudad & Sistemas Vivos', orden: 3 },
  { codigo: 'cultura_sociedad', nombre: 'Cultura & Sociedad', orden: 4 },
  { codigo: 'tecnologias_emergentes', nombre: 'Tecnologías Emergentes', orden: 5 },
];

async function main() {
  // 1) Capítulo cdmx
  const capitulo = await prisma.capitulo.upsert({
    where: { codigo: 'cdmx' },
    update: {},
    create: {
      codigo: 'cdmx',
      nombre: 'Speculative Futures CDMX',
      descripcion: 'Capítulo Ciudad de México de la red Speculative Futures.',
      ciudad: 'Ciudad de México',
      pais: 'México',
    },
  });

  // 2) Cinco territorios
  for (const t of TERRITORIOS) {
    await prisma.territorio.upsert({
      where: { capituloId_codigo: { capituloId: capitulo.id, codigo: t.codigo } },
      update: { nombre: t.nombre, orden: t.orden },
      create: { capituloId: capitulo.id, ...t },
    });
  }

  // 3) Aliado fundador: Change · Futurist.mx
  const aliado = await prisma.aliadoFundador.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      capituloId: capitulo.id,
      nombre: 'Change · Futurist.mx',
      descripcionCorta: 'Aliado fundador del capítulo.',
      tipo: 'consultora',
      rolEspecifico: 'intelectual',
      link: 'https://futurist.mx',
    },
  });

  // 4) (O1) Curador Core inicial vía Admin API
  const email = process.env.SEED_CURADOR_CORE_EMAIL;
  if (!email) throw new Error('SEED_CURADOR_CORE_EMAIL no configurada');

  // Crear (o reusar si ya existe) el usuario de auth. createUser dispara el
  // trigger handle_new_user, que inserta el Miembro con rol 'regular'.
  const { data: existingUsers, error: listError } =
    await supabaseAdmin.auth.admin.listUsers();
  if (listError) throw listError;

  let userId = existingUsers.users.find((u) => u.email === email)?.id;

  if (!userId) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (error) throw error;
    userId = data.user.id;
  }

  // Promover/crear Miembro como curador_core. El upsert cubre ambos casos:
  // el trigger ya creó el Miembro (normal) o no existe (defensa).
  await prisma.miembro.upsert({
    where: { userId },
    update: {
      rolContribucion: 'curador_core',
      onboardingCompletado: true,
      aliadoFundadorId: aliado.id,
      rolEnAliado: 'Fundador del capítulo',
    },
    create: {
      userId,
      email,
      capituloId: capitulo.id,
      nombre: 'Curador Core (fundador)',
      rolContribucion: 'curador_core',
      onboardingCompletado: true,
      aliadoFundadorId: aliado.id,
      rolEnAliado: 'Fundador del capítulo',
    },
  });
  console.log(`✓ Curador core inicial: ${email}`);

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
