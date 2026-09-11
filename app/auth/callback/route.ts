import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePostAuthPath } from '@/lib/admin-access';
import type { UserRole } from '@/lib/auth';

/**
 * Callback OAuth / magic link / recovery (échange du code PKCE).
 * Attache les cookies de session sur la réponse de redirection.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextRaw = searchParams.get('next');

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/connexion?error=auth`);
  }

  const cookieBag: { name: string; value: string; options?: Record<string, unknown> }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookieBag.length = 0;
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieBag.push({ name, value, options: options as Record<string, unknown> });
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) {
    // Souvent : lien ouvert dans un autre navigateur (code_verifier PKCE absent).
    const recoveryHint = nextRaw?.includes('reset-password') ? '&reason=recovery' : '';
    return NextResponse.redirect(`${origin}/auth/connexion?error=auth${recoveryHint}`);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .maybeSingle();

  const redirectPath = resolvePostAuthPath(
    nextRaw,
    profile ? { role: profile.role as UserRole } : null,
    data.user.email
  );

  const response = NextResponse.redirect(`${origin}${redirectPath}`);
  for (const c of cookieBag) {
    if (c.options) {
      response.cookies.set(c.name, c.value, c.options);
    } else {
      response.cookies.set(c.name, c.value);
    }
  }
  return response;
}
