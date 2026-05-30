import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { tienePermiso } from '@/lib/auth/permissions';
import { contarConfirmados, estadoCupo } from '@/lib/eventos/cupo';
import { EventoCard, type EventoCardData } from '@/components/EventoCard';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function EventosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();
  const puedeCrear = miembro ? tienePermiso(miembro, 'crear_evento') : false;

  // Eventos futuros, no cancelados, ordenados por fecha asc.
  const eventos = await prisma.evento.findMany({
    where: {
      fechaInicio: { gt: new Date() },
      estado: { in: ['programado', 'lleno', 'en_curso', 'pospuesto'] },
    },
    orderBy: { fechaInicio: 'asc' },
    include: { territorio: { select: { nombre: true, codigo: true } } },
  });

  // RSVPs del miembro actual (para marcar estado en cada card).
  const misRsvps = miembro
    ? await prisma.rSVP.findMany({
        where: { miembroId: miembro.id, estado: { in: ['registrado', 'asistio'] } },
        select: { eventoId: true },
      })
    : [];
  const confirmadosSet = new Set(misRsvps.map((r) => r.eventoId));

  const cards: EventoCardData[] = await Promise.all(
    eventos.map(async (e) => {
      const conf = await contarConfirmados(e.id);
      const { lleno } = estadoCupo(e.capacidad, conf);
      return {
        id: e.id,
        titulo: e.titulo,
        fechaInicio: e.fechaInicio,
        modalidad: e.modalidad,
        territorioNombre: e.territorio?.nombre ?? null,
        territorioCodigo: e.territorio?.codigo ?? null,
        lleno,
        miRsvp: confirmadosSet.has(e.id) ? ('confirmado' as const) : null,
      };
    })
  );

  return (
    <main className="min-h-screen bg-petrol-900 px-5 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-cal-50">Eventos</h1>
            <p className="mt-2 text-[15px] text-body-dark">
              La producción colectiva del capítulo.
            </p>
          </div>
          {puedeCrear && (
            <Link href={`/${locale}/eventos/nuevo`}>
              <Button>Crear evento</Button>
            </Link>
          )}
        </div>

        {cards.length === 0 ? (
          <p className="mt-12 text-slate-500">
            No hay eventos próximos por ahora. Vuelve pronto.
          </p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((e) => (
              <EventoCard key={e.id} evento={e} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
