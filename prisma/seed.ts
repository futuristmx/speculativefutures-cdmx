// Seed inicial del MDP. Idempotente (upsert por claves únicas).
// Ejecutar: `npm run db:seed`.
//
// Inserta:
//   - 1 capítulo: cdmx
//   - 5 territorios (taxonomía fija)
//   - 1 aliado fundador: Change · Futurist.mx
//   - (O1) 1 Miembro curador_core, email vía SEED_CURADOR_CORE_EMAIL
//
// Nota (O1): este Miembro curador_core se inserta SIN user_id de auth.users
// (queda null) porque el fundador aún no ha hecho login. Cuando el fundador
// se registre con ese mismo email vía magic link, el trigger handle_new_user
// no duplica (el reconcilio email→user_id se documenta en el README como
// operación de configuración). El propósito del seed es garantizar que exista
// al menos un curador_core para arrancar la curación.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  // 4) (O1) Curador Core inicial
  const email = process.env.SEED_CURADOR_CORE_EMAIL;
  if (!email) {
    console.warn(
      '⚠ SEED_CURADOR_CORE_EMAIL no definida — se omite el curador core inicial.'
    );
  } else {
    await prisma.miembro.upsert({
      where: { capituloId_email: { capituloId: capitulo.id, email } },
      update: { rolContribucion: 'curador_core' },
      create: {
        capituloId: capitulo.id,
        nombre: 'Curador Core (fundador)',
        email,
        rolContribucion: 'curador_core',
        onboardingCompletado: true,
        aliadoFundadorId: aliado.id,
        rolEnAliado: 'Fundador del capítulo',
      },
    });
    console.log(`✓ Curador core inicial: ${email}`);
  }

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
