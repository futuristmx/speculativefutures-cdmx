import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Intercambia el code del magic link / OAuth por una sesión y redirige:
// onboarding completo → /dashboard, incompleto → /onboarding.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let destination = '/es/onboarding';
      if (user) {
        const { data: miembro } = await supabase
          .from('miembro')
          .select('onboarding_completado')
          .eq('user_id', user.id)
          .single();
        destination = miembro?.onboarding_completado ? '/es/dashboard' : '/es/onboarding';
      }

      return NextResponse.redirect(`${origin}${next ?? destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/es/login?error=auth`);
}
