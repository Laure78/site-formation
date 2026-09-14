import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { canAccessAdmin } from '@/lib/admin-access';
import { isAdmin, type UserRole } from '@/lib/auth';

function isAdminApiPath(pathname: string): boolean {
  return pathname.startsWith('/api/admin');
}

function loginRedirect(request: NextRequest): NextResponse {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/auth/connexion';
  loginUrl.search = '';
  loginUrl.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

async function resolveRole(
  userId: string,
  sessionClient: ReturnType<typeof createServerClient>
): Promise<UserRole> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (serviceKey && url) {
    try {
      const admin = createSupabaseClient(url, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data } = await admin.from('profiles').select('role').eq('id', userId).maybeSingle();
      if (data?.role) return data.role as UserRole;
    } catch {
      // fallback session client
    }
  }

  const { data: profile } = await sessionClient
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();
  return (profile?.role ?? 'apprenant') as UserRole;
}

/**
 * Protège /admin/* et /api/admin/* avant le rendu.
 * Rafraîchit aussi la session Supabase (cookies).
 */
export async function enforceAdminAccess(request: NextRequest): Promise<NextResponse | null> {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isAdminApiPath(request.nextUrl.pathname)) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    return loginRedirect(request);
  }

  const role = await resolveRole(user.id, supabase);

  if (!canAccessAdmin({ role }, user.email)) {
    if (isAdminApiPath(request.nextUrl.pathname)) {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }
    const deniedUrl = request.nextUrl.clone();
    deniedUrl.pathname = '/espace-apprenant';
    deniedUrl.search = '';
    deniedUrl.searchParams.set('admin', 'denied');
    return NextResponse.redirect(deniedUrl);
  }

  // Garde-fou : isAdmin sans allowlist ne doit jamais passer (canAccessAdmin couvre les deux).
  if (!isAdmin(role)) {
    if (isAdminApiPath(request.nextUrl.pathname)) {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }
    return NextResponse.redirect(new URL('/espace-apprenant', request.url));
  }

  return response;
}

/** Bloque les routes /api/dev/* en production. */
export function blockDevApiInProduction(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV === 'production' && request.nextUrl.pathname.startsWith('/api/dev/')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return null;
}
