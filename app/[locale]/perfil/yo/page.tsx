import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { actualizarPerfil } from '@/features/perfil/actions/actualizar-perfil';
import { AppShell } from '@/components/AppShell';
import { FormularioOnboarding } from '@/components/FormularioOnboarding';
import { AvatarUploader } from '@/components/AvatarUploader';
import { RolBadge } from '@/components/RolBadge';

export default async function PerfilPropioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();
  if (!miembro) redirect(`/${locale}/login`);
  if (!miembro.onboardingCompletado) redirect(`/${locale}/onboarding`);

  const [territorios, misTerritorios] = await Promise.all([
    prisma.territorio.findMany({
      where: { capituloId: miembro.capituloId },
      orderBy: { orden: 'asc' },
      select: { id: true, nombre: true, codigo: true },
    }),
    prisma.territorio.findMany({
      where: { miembrosInteresados: { some: { id: miembro.id } } },
      select: { id: true },
    }),
  ]);

  const fechaCompleta = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(
    miembro.fechaRegistro
  );
  const enlaces = Array.isArray(miembro.enlacesExternos)
    ? (miembro.enlacesExternos as string[])
    : [];

  return (
    <AppShell>
      <main className="min-h-screen bg-petrol-900 px-5 py-16">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-tight text-cal-50">Mi perfil</h1>
            <RolBadge rol={miembro.rolContribucion} />
          </div>

          {/* Datos privados (solo visibles para el propio miembro) */}
          <div className="mt-4 rounded-md border border-petrol-700 bg-petrol-800 p-4 text-[13px] text-slate-500">
            <span className="uppercase tracking-[0.08em]">Privado · </span>
            {miembro.email} · miembro desde {fechaCompleta}
          </div>

          <div className="mt-8">
            <AvatarUploader
              nombre={miembro.nombre}
              foto={miembro.foto}
              userId={miembro.userId!}
            />
          </div>

          <div className="mt-10">
            <FormularioOnboarding
              modo="edicion"
              territorios={territorios}
              ocultarCasillaCurador={miembro.rolContribucion !== 'regular'}
              valoresIniciales={{
                nombre: miembro.nombre,
                disciplina: miembro.disciplina ?? '',
                territorios: misTerritorios.map((t) => t.id),
                motivacion: miembro.motivacion ?? '',
                bioCorta: miembro.bioCorta ?? '',
                enlacesExternos: enlaces,
                rolEsCuradorComunidad: miembro.rolContribucion !== 'regular',
              }}
              onSubmit={actualizarPerfil}
            />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
