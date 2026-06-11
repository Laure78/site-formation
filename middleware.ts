import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { isMiddlewareBypassPath, redirectApexToWww } from '@/lib/middleware/canonical-host';

export async function middleware(request: NextRequest) {
  const apexRedirect = redirectApexToWww(request);
  if (apexRedirect) return apexRedirect;

  const { pathname } = request.nextUrl;
  if (isMiddlewareBypassPath(pathname)) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const req = new NextRequest(request.url, { headers: requestHeaders });
  return updateSession(req);
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
