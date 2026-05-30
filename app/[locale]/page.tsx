import { setRequestLocale } from 'next-intl/server';
import { SiteApp } from '@/components/SiteApp';

// Home. Se sirve siempre con identidad en español (lineamientos §5); el
// segmento [locale] habilita /en para el banner de contenido en inglés.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SiteApp />;
}
