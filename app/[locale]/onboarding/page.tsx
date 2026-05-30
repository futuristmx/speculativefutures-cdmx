import { getTranslations, setRequestLocale } from 'next-intl/server';

// Placeholder funcional del onboarding (el formulario enriquecido llega en
// Sprint 2). Esta ruta ya está protegida por el middleware.
export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('onboarding');

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#062424',
        color: '#F4F7F5',
        padding: 24,
        fontFamily: "'Gotham', system-ui, sans-serif",
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 12px' }}>{t('titulo')}</h1>
      <p style={{ color: '#C4D6CF', maxWidth: 420, lineHeight: 1.6 }}>
        {t('bienvenida')}
      </p>
      <p style={{ color: '#547476', fontSize: 14, marginTop: 16 }}>{t('proximamente')}</p>
    </main>
  );
}
