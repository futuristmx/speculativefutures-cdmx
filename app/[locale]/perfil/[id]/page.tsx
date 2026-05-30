import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { MiembroAvatar } from '@/components/MiembroAvatar';
import { RolBadge } from '@/components/RolBadge';
import { TerritorioBadge } from '@/components/TerritorioBadge';

export const dynamic = 'force-dynamic';

export default async function PerfilPublicoPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // Visitante anónimo → login (D-S2-1).
  const actual = await getMiembroActual();
  if (!actual) redirect(`/${locale}/login?next=/perfil/${id}`);

  // Su propio perfil → /perfil/yo.
  if (actual.userId === id) redirect(`/${locale}/perfil/yo`);

  const miembro = await prisma.miembro.findUnique({
    where: { userId: id },
    include: {
      territoriosInteres: {
        orderBy: { orden: 'asc' },
        select: { nombre: true, codigo: true },
      },
      aliadoFundador: { select: { id: true, nombre: true } },
    },
  });
  if (!miembro || !miembro.onboardingCompletado) notFound();

  const fecha = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  }).format(miembro.fechaRegistro);
  const enlaces = Array.isArray(miembro.enlacesExternos)
    ? (miembro.enlacesExternos as string[])
    : [];

  return (
    <main className="min-h-screen bg-petrol-900 px-5 py-16">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href={`/${locale}/miembros`}
          className="text-sm text-mint-400 hover:underline"
        >
          ← Volver a miembros
        </Link>

        <div className="mt-6 flex items-start gap-5">
          <MiembroAvatar
            nombre={miembro.nombre}
            foto={miembro.foto}
            id={miembro.userId!}
            size={88}
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-black tracking-tight text-cal-50">
              {miembro.nombre}
            </h1>
            {miembro.disciplina && (
              <p className="mt-1 text-[16px] text-body-dark">{miembro.disciplina}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <RolBadge rol={miembro.rolContribucion} />
            </div>
          </div>
        </div>

        {miembro.territoriosInteres.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {miembro.territoriosInteres.map((t) => (
              <TerritorioBadge key={t.codigo} nombre={t.nombre} codigo={t.codigo} />
            ))}
          </div>
        )}

        {miembro.motivacion && (
          <p className="mt-8 text-[17px] leading-relaxed text-cal-50">
            {miembro.motivacion}
          </p>
        )}
        {miembro.bioCorta && (
          <p className="mt-4 text-[15px] leading-relaxed text-body-dark">
            {miembro.bioCorta}
          </p>
        )}

        {enlaces.length > 0 && (
          <div className="mt-6 flex flex-col gap-2">
            {enlaces.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-mint-400 hover:underline break-all"
              >
                {url}
              </a>
            ))}
          </div>
        )}

        {miembro.aliadoFundador && (
          <p className="mt-6 text-[14px] text-slate-500">
            Representa a{' '}
            <span className="text-body-dark">{miembro.aliadoFundador.nombre}</span>
          </p>
        )}

        <p className="mt-10 text-[13px] uppercase tracking-[0.08em] text-slate-500">
          Miembro desde {fecha}
        </p>
      </div>
    </main>
  );
}
