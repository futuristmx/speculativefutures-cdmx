import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createIntlMiddleware(routing);

// Rutas privadas (sin prefijo de locale). Requieren sesión activa.
const PROTECTED = ['/dashboard', '/configuracion', '/curacion', '/onboarding'];

// Quita el prefijo /es o /en para evaluar la ruta lógica.
function stripLocale(pathname: string): string {
  const seg = pathname.split('/')[1];
  if (routing.locales.includes(seg as 'es' | 'en')) {
    return pathname.slice(seg.length + 1) || '/';
  }
  return pathname;
}

function localeOf(pathname: string): string {
  const seg = pathname.split('/')[1];
  return routing.locales.includes(seg as 'es' | 'en') ? seg : routing.defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Excepciones: callback de auth y API no llevan prefijo de locale ni i18n.
  if (pathname.startsWith('/auth') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 1) Refresca la sesión de Supabase (cookies). El cliente Supabase es
  // edge-safe (usa fetch); Prisma 6 NO corre en edge, por eso aquí se lee el
  // estado de onboarding vía Supabase, no vía Prisma.
  const { supabaseResponse, supabase, user } = await updateSession(request);

  const logicalPath = stripLocale(pathname);
  const locale = localeOf(pathname);
  const isProtected = PROTECTED.some(
    (p) => logicalPath === p || logicalPath.startsWith(p + '/')
  );

  // 2) Protección de rutas privadas: sin sesión → /login.
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // 3) (O6) Onboarding incompleto → /onboarding, salvo que ya esté ahí.
  if (isProtected && user && logicalPath !== '/onboarding') {
    const { data: miembro } = await supabase
      .from('miembro')
      .select('onboarding_completado')
      .eq('user_id', user.id)
      .single();
    if (miembro && miembro.onboarding_completado === false) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/onboarding`;
      return NextResponse.redirect(url);
    }
  }

  // 4) Routing de next-intl (añade prefijo de locale donde falta).
  const intlResponse = intlMiddleware(request);

  // Propaga las cookies de sesión refrescadas a la respuesta de intl.
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  // Excluye estáticos y assets. Incluye todo lo demás para i18n + sesión.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|.*\\..*).*)'],
};
