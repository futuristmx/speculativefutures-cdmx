import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { MiembroCard, type MiembroCardData } from '@/components/MiembroCard';
import { TIPO_LABEL, ROL_LABEL } from '@/components/AliadoCard';

export const dynamic = 'force-dynamic';

export default async function AliadoDetallePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const aliado = await prisma.aliadoFundador.findUnique({ where: { id } });
  if (!aliado) notFound();

  // Lista de miembros vinculados: solo visible a miembros autenticados (D-S3-10).
  const miembroActual = await getMiembroActual();
  let representantes: MiembroCardData[] = [];
  if (miembroActual) {
    const reps = await prisma.miembro.findMany({
      where: { aliadoFundadorId: aliado.id, onboardingCompletado: true },
      select: {
        userId: true,
        nombre: true,
        foto: true,
        disciplina: true,
        rolContribucion: true,
        territoriosInteres: {
          orderBy: { orden: 'asc' },
          take: 1,
          select: { nombre: true },
        },
      },
    });
    representantes = reps.map((m) => ({
      userId: m.userId!,
      nombre: m.nombre,
      foto: m.foto,
      disciplina: m.disciplina,
      rolContribucion: m.rolContribucion,
      primerTerritorio: m.territoriosInteres[0]?.nombre ?? null,
    }));
  }

  const fecha = new Intl.DateTimeFormat('es-MX', {
    month: 'long',
    year: 'numeric',
  }).format(aliado.fechaIncorporacion);

  return (
    <main className="min-h-screen bg-petrol-900 px-5 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/${locale}/aliados`}
          className="text-sm text-mint-400 hover:underline"
        >
          ← Aliados fundadores
        </Link>

        <div className="mt-6 flex items-center gap-5">
          {aliado.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={aliado.logo}
              alt={aliado.nombre}
              className="h-16 w-16 rounded object-contain"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded bg-petrol-700 text-mint-400 font-bold text-2xl">
              {aliado.nombre.charAt(0)}
            </span>
          )}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-cal-50">
              {aliado.nombre}
            </h1>
            <p className="mt-1 text-[12px] uppercase tracking-[0.08em] text-slate-500">
              {TIPO_LABEL[aliado.tipo]} · {ROL_LABEL[aliado.rolEspecifico]} · desde{' '}
              {fecha}
            </p>
          </div>
        </div>

        {aliado.descripcionCorta && (
          <p className="mt-8 text-[17px] leading-relaxed text-body-dark">
            {aliado.descripcionCorta}
          </p>
        )}

        {aliado.link && (
          <a
            href={aliado.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-mint-400 hover:underline"
          >
            {aliado.link}
          </a>
        )}

        {miembroActual && representantes.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-[13px] uppercase tracking-[0.08em] text-slate-500">
              Miembros vinculados
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {representantes.map((m) => (
                <MiembroCard key={m.userId} miembro={m} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
