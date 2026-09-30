import { NextRequest, NextResponse } from 'next/server';

/**
 * Auth cron fail-closed : CRON_SECRET obligatoire + Bearer exact.
 * Si le secret est absent en environnement, l’endpoint refuse (évite l’ouverture
 * accidentelle lorsque `if (secret && …)` laissait passer sans secret).
 */
export function assertCronAuthorized(
  req: NextRequest
): NextResponse | null {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    console.error('[cron] CRON_SECRET manquant — endpoint refusé');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
