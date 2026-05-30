import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { AliadoCard, type AliadoCardData } from '@/components/AliadoCard';

export const dynamic = 'force-dynamic';

export default async function AliadosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const aliados = await prisma.aliadoFundador.findMany({
    orderBy: { fechaIncorporacion: 'asc' },
  });

  const cards: AliadoCardData[] = aliados.map((a) => ({
    id: a.id,
    nombre: a.nombre,
    logo: a.logo,
    descripcionCorta: a.descripcionCorta,
    tipo: a.tipo,
    rolEspecifico: a.rolEspecifico,
  }));

  return (
    <main className="min-h-screen bg-petrol-900 px-5 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-black tracking-tight text-cal-50">
          Aliados fundadores
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-body-dark">
          Speculative Futures CDMX es una plataforma neutra con identidad propia. Estas
          son las instituciones que construyen el capítulo con nosotros.
        </p>

        {cards.length === 0 ? (
          <p className="mt-10 text-slate-500">Aún no hay aliados registrados.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((a) => (
              <AliadoCard key={a.id} aliado={a} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
