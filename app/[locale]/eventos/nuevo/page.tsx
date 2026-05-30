import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { tienePermiso } from '@/lib/auth/permissions';
import { crearEvento } from '@/features/eventos/actions/crear-evento';
import { AppShell } from '@/components/AppShell';
import { EventoForm } from '@/components/EventoForm';

export const dynamic = 'force-dynamic';

export default async function NuevoEventoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();
  if (!miembro) redirect(`/${locale}/login?next=/eventos/nuevo`);
  if (!tienePermiso(miembro, 'crear_evento')) redirect(`/${locale}/eventos`);

  const territorios = await prisma.territorio.findMany({
    where: { capituloId: miembro.capituloId },
    orderBy: { orden: 'asc' },
    select: { id: true, nombre: true },
  });

  return (
    <AppShell>
      <main className="min-h-screen bg-petrol-900 px-5 py-16">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="text-3xl font-black tracking-tight text-cal-50">Crear evento</h1>
          <p className="mt-2 text-[15px] text-body-dark">
            La hora se interpreta en horario de CDMX.
          </p>
          <div className="mt-10">
            <EventoForm territorios={territorios} onSubmit={crearEvento} modo="crear" />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
