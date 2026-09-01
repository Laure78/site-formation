import { NextRequest, NextResponse } from 'next/server';

export const PATHNAME_HEADER = 'x-pathname';

/** En-tête interne pour lire le pathname côté serveur (fil d'Ariane, CTA conditionnels). */
export function withPathnameHeader(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  response.headers.set(PATHNAME_HEADER, request.nextUrl.pathname);
  return response;
}

export function nextWithPathname(request: NextRequest): NextResponse {
  return withPathnameHeader(request, NextResponse.next());
}
