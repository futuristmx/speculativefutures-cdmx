import Link from 'next/link';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { MiembroCard, type MiembroCardData } from '@/components/MiembroCard';

const POR_PAGINA = 20;

export default async function MiembrosPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  setRequestLocale(locale);

  // Solo miembros autenticados (D-S2-1).
  const actual = await getMiembroActual();
  if (!actual) redirect(`/${locale}/login?next=/miembros`);

  const pagina = Math.max(1, parseInt(page ?? '1', 10) || 1);
  const skip = (pagina - 1) * POR_PAGINA;

  const [miembros, total] = await Promise.all([
    prisma.miembro.findMany({
      where: {
        capituloId: actual.capituloId,
        onboardingCompletado: true,
        estado: 'activo',
      },
      orderBy: { fechaRegistro: 'desc' },
      skip,
      take: POR_PAGINA,
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
    }),
    prisma.miembro.count({
      where: {
        capituloId: actual.capituloId,
        onboardingCompletado: true,
        estado: 'activo',
      },
    }),
  ]);

  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  const cards: MiembroCardData[] = miembros.map((m) => ({
    userId: m.userId!,
    nombre: m.nombre,
    foto: m.foto,
    disciplina: m.disciplina,
    rolContribucion: m.rolContribucion,
    primerTerritorio: m.territoriosInteres[0]?.nombre ?? null,
  }));

  return (
    <main className="min-h-screen bg-petrol-900 px-5 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-black tracking-tight text-cal-50">Miembros</h1>
        <p className="mt-2 text-[15px] text-body-dark">
          {total} {total === 1 ? 'persona' : 'personas'} construyendo futuros desde CDMX.
        </p>

        {cards.length === 0 ? (
          <p className="mt-10 text-slate-500">Aún no hay miembros para mostrar.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((m) => (
              <MiembroCard key={m.userId} miembro={m} locale={locale} />
            ))}
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            {pagina > 1 && (
              <Link
                href={`/${locale}/miembros?page=${pagina - 1}`}
                className="text-sm text-mint-400 hover:underline"
              >
                ← Anterior
              </Link>
            )}
            <span className="text-[13px] uppercase tracking-[0.08em] text-slate-500">
              Página {pagina} de {totalPaginas}
            </span>
            {pagina < totalPaginas && (
              <Link
                href={`/${locale}/miembros?page=${pagina + 1}`}
                className="text-sm text-mint-400 hover:underline"
              >
                Siguiente →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
