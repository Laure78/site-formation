import { NextResponse } from 'next/server';
import { searchSite, type SiteSearchScope } from '@/lib/site-search';

export const dynamic = 'force-dynamic';

function parseScope(value: string | null): SiteSearchScope {
  return value === 'ressources' ? 'ressources' : 'all';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const scope = parseScope(searchParams.get('scope'));
  const limitRaw = Number(searchParams.get('limit') ?? '12');
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 24) : 12;

  if (q.length < 2) {
    return NextResponse.json({ results: [], query: q, scope });
  }

  const results = searchSite(q, scope, limit).map(({ score: _score, keywords: _kw, ...rest }) => rest);

  return NextResponse.json(
    { results, query: q, scope },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    },
  );
}
