import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInternalPath } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';

function buildLogoutRedirect(request: NextRequest): NextResponse {
  const nextRaw = request.nextUrl.searchParams.get('next');

  // Raccourci : page de connexion avec retour vers /admin
  if (nextRaw === 'admin-login' || nextRaw === 'login') {
    return NextResponse.redirect(
      new URL(`${LINKS.authConnexion}?next=/admin`, request.url),
      302
    );
  }

  const safeNext = sanitizeInternalPath(nextRaw);
  if (safeNext) {
    return NextResponse.redirect(new URL(safeNext, request.url), 302);
  }

  return NextResponse.redirect(new URL('/', request.url), 302);
}

async function signOutAndRedirect(request: NextRequest): Promise<NextResponse> {
  const response = buildLogoutRedirect(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  await supabase.auth.signOut();
  return response;
}

export async function POST(request: NextRequest) {
  return signOutAndRedirect(request);
}

/** GET fallback pour lien direct (ex. signet déconnexion) */
export async function GET(request: NextRequest) {
  return signOutAndRedirect(request);
}
