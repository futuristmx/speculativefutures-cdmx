import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { tienePermiso } from '@/lib/auth/permissions';
import { contarConfirmados, estadoCupo } from '@/lib/eventos/cupo';
import { formatoFechaHoraCDMX } from '@/lib/eventos/fecha';
import { ubicacionTexto, type UbicacionJson } from '@/lib/eventos/ubicacion';
import { ModalidadBadge } from '@/components/ModalidadBadge';
import { TerritorioBadge } from '@/components/TerritorioBadge';
import { AsistentesGrid, type AsistenteMini } from '@/components/AsistentesGrid';
import { RsvpPanel } from '@/components/RsvpPanel';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

interface Ponente {
  nombre: string;
  bio?: string;
  enlace?: string;
}

export default async function EventoDetallePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const evento = await prisma.evento.findUnique({
    where: { id },
    include: { territorio: { select: { nombre: true, codigo: true } } },
  });
  if (!evento) notFound();

  const miembro = await getMiembroActual();
  const puedeEditar = miembro ? tienePermiso(miembro, 'crear_evento') : false;

  const confirmados = await contarConfirmados(evento.id);
  const { lleno } = estadoCupo(evento.capacidad, confirmados);

  // Estado de RSVP del miembro actual.
  let miRsvp: 'registrado' | 'cancelado' | 'asistio' | 'no_asistio' | null = null;
  if (miembro) {
    const r = await prisma.rSVP.findUnique({
      where: { miembroId_eventoId: { miembroId: miembro.id, eventoId: evento.id } },
      select: { estado: true },
    });
    miRsvp = r?.estado ?? null;
  }

  // Asistentes (solo visibles a miembros autenticados — D-S3-2).
  let asistentes: AsistenteMini[] = [];
  if (miembro) {
    const rsvps = await prisma.rSVP.findMany({
      where: { eventoId: evento.id, estado: { in: ['registrado', 'asistio'] } },
      include: { miembro: { select: { userId: true, nombre: true, foto: true } } },
      orderBy: { fechaRegistro: 'asc' },
    });
    asistentes = rsvps.map((r) => ({
      userId: r.miembro.userId!,
      nombre: r.miembro.nombre,
      foto: r.miembro.foto,
    }));
  }

  const ubic = (evento.ubicacion as UbicacionJson | null) ?? null;
  const ubicTxt = ubicacionTexto(evento.modalidad, ubic);
  const ponentes = (Array.isArray(evento.ponentes)
    ? evento.ponentes
    : []) as unknown as Ponente[];

  const estadoPanel:
    | 'anonimo'
    | 'sin_rsvp'
    | 'confirmado'
    | 'lleno'
    | 'cancelado_evento' =
    evento.estado === 'cancelado'
      ? 'cancelado_evento'
      : !miembro
        ? 'anonimo'
        : miRsvp === 'registrado' || miRsvp === 'asistio'
          ? 'confirmado'
          : lleno
            ? 'lleno'
            : 'sin_rsvp';

  return (
    <AppShell>
      <main className="min-h-screen bg-petrol-900 px-5 py-16">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}/eventos`}
              className="text-sm text-mint-400 hover:underline"
            >
              ← Todos los eventos
            </Link>
            {puedeEditar && (
              <Link href={`/${locale}/eventos/${evento.id}/editar`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-6 text-[14px] uppercase tracking-[0.08em] text-mint-400">
            {formatoFechaHoraCDMX(evento.fechaInicio)}
          </div>
          <h1 className="mt-2 text-[clamp(28px,5vw,44px)] font-black leading-[1.05] tracking-tight text-cal-50">
            {evento.titulo}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <ModalidadBadge modalidad={evento.modalidad} />
            {evento.territorio && (
              <TerritorioBadge
                nombre={evento.territorio.nombre}
                codigo={evento.territorio.codigo}
              />
            )}
          </div>

          <p className="mt-8 whitespace-pre-wrap text-[17px] leading-relaxed text-body-dark">
            {evento.descripcion}
          </p>

          {ubicTxt && (
            <div className="mt-6 rounded-md border border-petrol-700 bg-petrol-800 p-4">
              <span className="text-[12px] uppercase tracking-[0.08em] text-slate-500">
                Dónde
              </span>
              <p className="mt-1 text-[15px] text-cal-50">{ubicTxt}</p>
              {ubic?.mapsUrl && (
                <a
                  href={ubic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-mint-400 hover:underline"
                >
                  Ver en mapa
                </a>
              )}
            </div>
          )}

          {ponentes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-[13px] uppercase tracking-[0.08em] text-slate-500">
                Ponentes
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                {ponentes.map((p, i) => (
                  <li key={i}>
                    <p className="font-medium text-cal-50">{p.nombre}</p>
                    {p.bio && <p className="text-sm text-body-dark">{p.bio}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 rounded-md border border-petrol-700 bg-petrol-800 p-6">
            <RsvpPanel eventoId={evento.id} locale={locale} estado={estadoPanel} />
          </div>

          {miembro && (
            <div className="mt-8">
              <h2 className="mb-3 text-[13px] uppercase tracking-[0.08em] text-slate-500">
                Asistentes
              </h2>
              <AsistentesGrid asistentes={asistentes} />
            </div>
          )}
        </div>
      </main>
    </AppShell>
  );
}
