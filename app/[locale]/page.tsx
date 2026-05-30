import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { contarConfirmados, estadoCupo } from '@/lib/eventos/cupo';
import { SiteApp } from '@/components/SiteApp';
import { BienvenidaMiembro } from '@/components/BienvenidaMiembro';
import { EventoCardHome, type EventoHomeData } from '@/components/EventoCardHome';
import { AliadosTira, type AliadoTiraData } from '@/components/AliadosTira';

export const dynamic = 'force-dynamic';

// Home dinámico (D-S3-9): server component que decide según sesión.
// Preserva el landing (SiteApp: manifiesto, territorios, identidad) y añade
// una banda dinámica encima — próximo evento, aliados, bienvenida.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();

  // Próximo evento (si hay).
  const evento = await prisma.evento.findFirst({
    where: {
      fechaInicio: { gt: new Date() },
      estado: { in: ['programado', 'lleno', 'en_curso', 'pospuesto'] },
    },
    orderBy: { fechaInicio: 'asc' },
  });

  let eventoHome: (EventoHomeData & { ctaLabel: string; ctaHref: string }) | null = null;
  if (evento) {
    const conf = await contarConfirmados(evento.id);
    const { lleno } = estadoCupo(evento.capacidad, conf);
    let miRsvp: 'confirmado' | null = null;
    if (miembro) {
      const r = await prisma.rSVP.findUnique({
        where: { miembroId_eventoId: { miembroId: miembro.id, eventoId: evento.id } },
        select: { estado: true },
      });
      miRsvp =
        r && (r.estado === 'registrado' || r.estado === 'asistio') ? 'confirmado' : null;
    }
    eventoHome = {
      id: evento.id,
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fechaInicio: evento.fechaInicio,
      modalidad: evento.modalidad,
      lleno,
      miRsvp,
      ctaLabel: miembro ? 'Asistir' : 'Inicia sesión para asistir',
      ctaHref: miembro
        ? `/${locale}/eventos/${evento.id}`
        : `/${locale}/login?next=/eventos/${evento.id}`,
    };
  }

  // Aliados fundadores (tira institucional).
  const aliados = await prisma.aliadoFundador.findMany({
    orderBy: { fechaIncorporacion: 'asc' },
    select: { id: true, nombre: true, logo: true, descripcionCorta: true },
  });
  const aliadosTira: AliadoTiraData[] = aliados;

  const hayBanda = miembro || eventoHome || aliadosTira.length > 0;

  return (
    <>
      {hayBanda && (
        <section className="bg-petrol-900 px-5 pt-20 pb-4">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
            {miembro && <BienvenidaMiembro nombre={miembro.nombre} locale={locale} />}
            {eventoHome && (
              <EventoCardHome
                evento={eventoHome}
                locale={locale}
                ctaLabel={eventoHome.ctaLabel}
                ctaHref={eventoHome.ctaHref}
              />
            )}
            {aliadosTira.length > 0 && (
              <AliadosTira aliados={aliadosTira} locale={locale} />
            )}
          </div>
        </section>
      )}
      <SiteApp />
    </>
  );
}
