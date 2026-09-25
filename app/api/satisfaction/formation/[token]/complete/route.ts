import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { markQuestionnaireComplete } from '@/lib/training-ops/satisfaction/service';

export async function POST(
  _req: NextRequest,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from('training_participant_satisfaction')
    .select('id, questionnaire_status')
    .eq('access_token', token)
    .maybeSingle();

  if (!row) {
    return NextResponse.json({ error: 'Lien invalide' }, { status: 404 });
  }
  if (row.questionnaire_status === 'complete') {
    return NextResponse.json({ ok: true, already: true });
  }

  await markQuestionnaireComplete(row.id, { origin: 'system' });
  return NextResponse.json({ ok: true });
}
