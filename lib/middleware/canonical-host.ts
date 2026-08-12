import { NextRequest, NextResponse } from 'next/server';

/** Hôte canonique du site (avec www). */
export const CANONICAL_WWW_HOST = 'www.laureolivie.fr';

/** Apex sans www — redirigé vers CANONICAL_WWW_HOST. */
export const APEX_HOST = 'laureolivie.fr';

/**
 * Redirection 308 apex → www (chemin + query string conservés).
 * Retourne null si l'hôte n'est pas l'apex ou en dev local (localhost).
 */
export function redirectApexToWww(request: NextRequest): NextResponse | null {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() ?? '';
  if (host !== APEX_HOST) return null;

  const { pathname, search } = request.nextUrl;
  const destination = new URL(`https://${CANONICAL_WWW_HOST}${pathname}${search}`);
  return NextResponse.redirect(destination, 308);
}

/** Chemins laissés passer sans session Supabase (assets, API hors admin, fichiers statiques). */
export function isMiddlewareBypassPath(pathname: string): boolean {
  if (pathname.startsWith('/_next/')) return true;
  if (pathname.startsWith('/api/admin')) return false;
  if (pathname.startsWith('/api/')) return true;
  return /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|css|js|map|txt|xml|webmanifest)$/i.test(
    pathname
  );
}
