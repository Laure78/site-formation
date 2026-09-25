/**
 * Cron — relances satisfaction (sessions training_ops) & avis Google.
 * Vercel : ajouter dans vercel.json (ex. 0 8 * * *).
 */
import { NextRequest, NextResponse } from 'next/server';
import { parisDateKey, parisHour } from '@/lib/rdv-datetime';
import { runTrainingSatisfactionCron } from '@/lib/training-ops/satisfaction/service';

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const force = req.nextUrl.searchParams.get('force') === '1';
  const hour = parisHour(new Date());
  if (!force && hour !== 9) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `Heure Paris = ${hour}h (attendu 9h ou ?force=1)`,
    });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: 'Config Supabase manquante' }, { status: 500 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY manquant' }, { status: 500 });
  }

  const todayParis = parisDateKey(new Date());
  try {
    const result = await runTrainingSatisfactionCron(todayParis);
    return NextResponse.json({ ok: true, todayParis, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[training-satisfaction-cron]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
