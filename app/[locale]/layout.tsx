import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/styles/tokens.css'; // variables CSS generadas desde styles/tokens.ts
import '../globals.css';

export const metadata: Metadata = {
  title: 'Speculative Futures CDMX',
  description:
    'Comunidad interdisciplinaria para imaginar, cuestionar y activar futuros posibles desde Ciudad de México.',
  openGraph: {
    title: 'Speculative Futures CDMX',
    description:
      'Comunidad para imaginar, cuestionar y activar futuros posibles desde CDMX.',
    locale: 'es_MX',
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
