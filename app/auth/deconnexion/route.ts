import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInternalPath } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';

function redirectAfterLogout(request: NextRequest): NextResponse {
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

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirectAfterLogout(request);
}

/** GET fallback pour lien direct (ex. signet déconnexion) */
export async function GET(request: NextRequest) {
  return POST(request);
}
