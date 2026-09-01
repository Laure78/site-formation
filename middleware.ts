import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { isMiddlewareBypassPath, redirectApexToWww } from '@/lib/middleware/canonical-host';
import { nextWithPathname, withPathnameHeader } from '@/lib/middleware/pathname-header';
import { needsSupabaseSession } from '@/lib/middleware/public-marketing-paths';
import { blockDevApiInProduction, enforceAdminAccess } from '@/lib/middleware/admin-guard';
import { isFormationPathPublished } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';

export async function middleware(request: NextRequest) {
  const apexRedirect = redirectApexToWww(request);
  if (apexRedirect) return apexRedirect;

  const { pathname } = request.nextUrl;

  if (!isFormationPathPublished(pathname)) {
    return NextResponse.redirect(new URL(LINKS.formations, request.url));
  }

  const devBlock = blockDevApiInProduction(request);
  if (devBlock) return devBlock;

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const adminGuard = await enforceAdminAccess(request);
    if (adminGuard) return adminGuard;
  }

  if (isMiddlewareBypassPath(pathname)) {
    return nextWithPathname(request);
  }

  if (!needsSupabaseSession(pathname)) {
    return nextWithPathname(request);
  }

  return withPathnameHeader(request, await updateSession(request));
}

export const config = {
  matcher: [
    /*
     * Toutes les routes sauf assets Next.js et fichiers image du dossier public.
     * L'apex → www s'applique avant le bypass Supabase ; /api/ et /_next/ ne passent pas par updateSession.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|css|js|map)$).*)',
  ],
};
