import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Speculative Futures CDMX',
  description: 'Comunidad interdisciplinaria para imaginar, cuestionar y activar futuros posibles desde Ciudad de México.',
  openGraph: {
    title: 'Speculative Futures CDMX',
    description: 'Comunidad para imaginar, cuestionar y activar futuros posibles desde CDMX.',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
