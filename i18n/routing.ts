import { defineRouting } from 'next-intl/routing';

// Configuración de localización. Español primario; inglés selectivo para
// contenido público (lineamientos §5 / observación O10).
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always', // /es/... y /en/...
});

export type Locale = (typeof routing.locales)[number];
