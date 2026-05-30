import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

// Sitemap bilingüe básico (se enriquece en Sprint 8 con contenido dinámico).
// Cada ruta pública se declara por locale con alternates hreflang.
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://speculativefutures.mx';

const PUBLIC_PATHS = ['', '/manifiesto', '/territorios', '/eventos', '/aliados'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: `${BASE}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE}/${locale}${path}`])
      ),
    },
  }));
}
