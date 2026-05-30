import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createIntlMiddleware(routing);

// Rutas privadas (sin prefijo de locale). Requieren sesión activa.
const PROTECTED = ['/dashboard', '/configuracion', '/curacion', '/onboarding'];

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

  const logicalPath = stripLocale(pathname);
  const locale = localeOf(pathname);
  const isProtected = PROTECTED.some(
    (p) => logicalPath === p || logicalPath.startsWith(p + '/')
  );

  // El i18n siempre debe aplicarse. La capa de sesión es defensiva: si Supabase
  // falla en el edge, no se tumba la página (fail-open) — las rutas públicas
  // siguen sirviéndose y la protección real adicional vive en cada página.
  let user: { id: string } | null = null;
  let supabaseResponse: NextResponse | null = null;
  let supabaseClient: Awaited<ReturnType<typeof updateSession>>['supabase'] | null = null;

  try {
    const res = await updateSession(request);
    user = res.user;
    supabaseResponse = res.supabaseResponse;
    supabaseClient = res.supabase;
  } catch (e) {
    console.error('[middleware] updateSession falló:', e);
  }

  // Protección de rutas privadas: sin sesión → /login.
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // (O6) Onboarding incompleto → /onboarding. Defensivo: si la consulta falla,
  // se deja pasar (la página de destino puede revalidar).
  if (isProtected && user && supabaseClient && logicalPath !== '/onboarding') {
    try {
      const { data: miembro } = await supabaseClient
        .from('miembro')
        .select('onboarding_completado')
        .eq('user_id', user.id)
        .single();
      if (miembro && miembro.onboarding_completado === false) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/onboarding`;
        return NextResponse.redirect(url);
      }
    } catch (e) {
      console.error('[middleware] consulta de onboarding falló:', e);
    }
  }

  // Routing de next-intl (añade prefijo de locale donde falta).
  const intlResponse = intlMiddleware(request);

  // Propaga las cookies de sesión refrescadas, si las hubo.
  if (supabaseResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|.*\\..*).*)'],
};
