import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { getMiembroActual } from '@/lib/auth/session';
import { completarOnboarding } from '@/features/onboarding/actions/completar-onboarding';
import { AppShell } from '@/components/AppShell';
import { FormularioOnboarding } from '@/components/FormularioOnboarding';
import { WIsotype } from '@/components/ui/WIsotype';

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const miembro = await getMiembroActual();
  if (!miembro) redirect(`/${locale}/login`);
  if (miembro.onboardingCompletado) redirect(`/${locale}/dashboard`);

  const territorios = await prisma.territorio.findMany({
    where: { capituloId: miembro.capituloId },
    orderBy: { orden: 'asc' },
    select: { id: true, nombre: true, codigo: true },
  });

  return (
    <AppShell>
      <main className="min-h-screen bg-petrol-900 px-5 py-16">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8">
            <WIsotype size={44} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-cal-50">
            Completa tu perfil
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-body-dark">
            Cuéntanos quién eres para sumarte a la comunidad. Toma menos de dos minutos.
          </p>
          <div className="mt-10">
            <FormularioOnboarding
              modo="onboarding"
              territorios={territorios}
              valoresIniciales={{ nombre: miembro.nombre || '' }}
              onSubmit={completarOnboarding}
            />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
