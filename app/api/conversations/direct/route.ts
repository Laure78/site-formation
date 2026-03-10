import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/conversations/direct
 * Crée ou récupère une conversation privée entre 2 utilisateurs
 * Body: { otherUserId: string }
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const otherUserId = body?.otherUserId as string | undefined;
  if (!otherUserId || otherUserId === user.id) {
    return NextResponse.json({ error: 'otherUserId requis et différent de vous' }, { status: 400 });
  }

  // Chercher une conversation directe existante entre ces 2 users
  const { data: directConvos } = await supabase
    .from('conversations')
    .select('id')
    .eq('type', 'direct');

  let existingDirectId: string | null = null;
  for (const c of directConvos || []) {
    const { data: participants } = await supabase
      .from('conversation_participants')
      .select('user_id')
      .eq('conversation_id', c.id);
    const userIds = new Set((participants || []).map((p) => p.user_id));
    if (userIds.has(user.id) && userIds.has(otherUserId)) {
      existingDirectId = c.id;
      break;
    }
  }

  if (existingDirectId) {
    const { data: conv } = await supabase
      .from('conversations')
      .select('id, type, title, created_at, updated_at')
      .eq('id', existingDirectId)
      .single();
    return NextResponse.json(conv);
  }

  // Créer nouvelle conversation directe
  const { data: newConv, error: createErr } = await supabase
    .from('conversations')
    .insert({
      type: 'direct',
      title: null,
      created_by: user.id,
    })
    .select()
    .single();

  if (createErr) return NextResponse.json({ error: createErr.message }, { status: 500 });

  const { error: p1Err } = await supabase.from('conversation_participants').insert({
    conversation_id: newConv.id,
    user_id: user.id,
    role: 'member',
  });
  const { error: p2Err } = await supabase.from('conversation_participants').insert({
    conversation_id: newConv.id,
    user_id: otherUserId,
    role: 'member',
  });

  if (p1Err || p2Err) {
    await supabase.from('conversations').delete().eq('id', newConv.id);
    return NextResponse.json({ error: 'Erreur lors de l\'ajout des participants' }, { status: 500 });
  }

  return NextResponse.json(newConv);
}
