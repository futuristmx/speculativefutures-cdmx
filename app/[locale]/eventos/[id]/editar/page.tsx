import { redirect, notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { tienePermiso } from '@/lib/auth/permissions';
import { editarEvento } from '@/features/eventos/actions/editar-evento';
import { AppShell } from '@/components/AppShell';
import { EventoForm, type EventoFormValores } from '@/components/EventoForm';
import type { EventoInput } from '@/features/eventos/schema';
import type { UbicacionJson } from '@/lib/eventos/ubicacion';

// UTC almacenado → string datetime-local en hora CDMX (UTC-6).
function utcADatetimeLocalCDMX(fecha: Date): string {
  const cdmx = new Date(fecha.getTime() - 6 * 60 * 60 * 1000);
  return cdmx.toISOString().slice(0, 16);
}

export const dynamic = 'force-dynamic';

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();
  if (!miembro) redirect(`/${locale}/login?next=/eventos/${id}/editar`);
  if (!tienePermiso(miembro, 'crear_evento')) redirect(`/${locale}/eventos/${id}`);

  const evento = await prisma.evento.findUnique({ where: { id } });
  if (!evento) notFound();

  const territorios = await prisma.territorio.findMany({
    where: { capituloId: miembro.capituloId },
    orderBy: { orden: 'asc' },
    select: { id: true, nombre: true },
  });

  const ubic = (evento.ubicacion as UbicacionJson | null) ?? {};
  const ponentes = (Array.isArray(evento.ponentes) ? evento.ponentes : []) as unknown as {
    nombre: string;
    bio?: string;
    enlace?: string;
  }[];

  const valores: EventoFormValores = {
    titulo: evento.titulo,
    descripcion: evento.descripcion,
    modalidad: evento.modalidad,
    territorioId: evento.territorioId ?? '',
    fechaInicioLocal: utcADatetimeLocalCDMX(evento.fechaInicio),
    fechaFinLocal: evento.fechaFin ? utcADatetimeLocalCDMX(evento.fechaFin) : '',
    capacidad: evento.capacidad,
    ubicacion: ubic,
    ponentes,
  };

  // Wrapper server action: fija el id y delega en editarEvento.
  async function onSubmit(data: EventoInput) {
    'use server';
    return editarEvento(id, data);
  }

  return (
    <AppShell>
      <main className="min-h-screen bg-petrol-900 px-5 py-16">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="text-3xl font-black tracking-tight text-cal-50">
            Editar evento
          </h1>
          <div className="mt-10">
            <EventoForm
              territorios={territorios}
              valores={valores}
              onSubmit={onSubmit}
              modo="editar"
            />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
