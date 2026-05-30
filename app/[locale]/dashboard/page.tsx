import Link from 'next/link';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { MiembroAvatar } from '@/components/MiembroAvatar';
import { RolBadge } from '@/components/RolBadge';
import { Card, CardContent } from '@/components/ui/card';

function mensajePorRol(rol: string, tieneAliado: boolean): string {
  if (rol === 'curador_core')
    return 'Como Curador Core, defines el canon editorial del capítulo: publicas señales, apruebas propuestas y creas eventos.';
  if (rol === 'curador_comunidad')
    return 'Como Curador Comunidad, puedes proponer señales. Tus primeras tres pasan por una revisión rápida.';
  if (tieneAliado)
    return 'Representas a un aliado fundador del capítulo. Gracias por construir esto con nosotros.';
  return 'Explora la comunidad, asiste a eventos y, cuando quieras, conviértete en Curador Comunidad para publicar señales.';
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();
  if (!miembro) redirect(`/${locale}/login`);
  if (!miembro.onboardingCompletado) redirect(`/${locale}/onboarding`);

  const territoriosCount = await prisma.territorio.count({
    where: { miembrosInteresados: { some: { id: miembro.id } } },
  });

  const fecha = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  }).format(miembro.fechaRegistro);

  const acciones = [
    {
      titulo: 'Editar mi perfil',
      desc: 'Actualiza tus datos y avatar',
      href: `/${locale}/perfil/yo`,
    },
    {
      titulo: 'Explorar miembros',
      desc: 'Descubre a la comunidad',
      href: `/${locale}/miembros`,
    },
    { titulo: 'Próximos eventos', desc: 'Muy pronto', href: '#', disabled: true },
  ];

  return (
    <main className="min-h-screen bg-petrol-900 px-5 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center gap-4">
          <MiembroAvatar
            nombre={miembro.nombre}
            foto={miembro.foto}
            id={miembro.userId!}
            size={64}
          />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-cal-50">
              Hola, {miembro.nombre.split(' ')[0] || 'miembro'}
            </h1>
            <div className="mt-1.5">
              <RolBadge rol={miembro.rolContribucion} />
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-body-dark">
          {mensajePorRol(miembro.rolContribucion, !!miembro.aliadoFundadorId)}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {acciones.map((a) => (
            <Link
              key={a.titulo}
              href={a.disabled ? '#' : a.href}
              aria-disabled={a.disabled}
              className={a.disabled ? 'pointer-events-none opacity-50' : ''}
            >
              <Card className="h-full transition-colors hover:border-mint-400">
                <CardContent className="p-5">
                  <h3 className="font-bold text-[16px] text-cal-50">{a.titulo}</h3>
                  <p className="mt-1 text-sm text-slate-500">{a.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-[13px] uppercase tracking-[0.08em] text-slate-500">
          Miembro desde {fecha} · {territoriosCount} territorio
          {territoriosCount === 1 ? '' : 's'} de interés
        </p>
      </div>
    </main>
  );
}
