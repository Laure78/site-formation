import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { appendTimeline } from '@/lib/training-ops/satisfaction/service';
import { getGoogleReviewUrl, getSatisfactionSettings } from '@/lib/training-ops/satisfaction/settings';

/**
 * Redirect traçable vers l’URL Google (avis public) — ne préremplit ni note ni contenu.
 */
export async function GET(req: NextRequest) {
  const ps = req.nextUrl.searchParams.get('ps');
  const parsed = z.string().uuid().safeParse(ps);
  if (!parsed.success) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from('training_participant_satisfaction')
    .select('id')
    .eq('id', parsed.data)
    .maybeSingle();

  const settings = await getSatisfactionSettings();
  const target = getGoogleReviewUrl(settings);

  if (row) {
    await appendTimeline(
      supabase,
      row.id,
      'google_link_clicked',
      'Lien avis Google ouvert',
      'system',
    );
  }

  return NextResponse.redirect(target, { status: 302 });
}
