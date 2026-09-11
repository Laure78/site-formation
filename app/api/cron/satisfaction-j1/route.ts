/**
 * Cron relance satisfaction J+1 — tous les matins (Europe/Paris).
 *
 * Vercel Cron UTC : 07:00 et 08:00 → n’agit que si l’heure Paris = 9 h
 * (sauf ?force=1 pour test manuel).
 *
 * Rattrapage : toute session terminée depuis ≥ 1 jour sans statut « sent »
 * est traitée (pas de perte si le cron a manqué le jour J+1 exact).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parisDateKey, parisHour } from '@/lib/rdv-datetime';
import { runSatisfactionJ1Reminders } from '@/lib/satisfaction-reminder';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const force = req.nextUrl.searchParams.get('force') === '1';
  const hour = parisHour(now);

  if (!force && hour !== 9) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `Heure Paris = ${hour}h (attendu 9h)`,
    });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ error: 'Config Supabase manquante' }, { status: 500 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY manquant' }, { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const todayParis = parisDateKey(now);

  try {
    const result = await runSatisfactionJ1Reminders(supabase, todayParis);
    return NextResponse.json({
      ok: true,
      todayParis,
      ...result,
      errors: result.errors.length ? result.errors : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[satisfaction-j1]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
