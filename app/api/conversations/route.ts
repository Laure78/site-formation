import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/conversations
 * Liste des conversations de l'utilisateur (course + direct)
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'course' | 'direct' | null (= all)

  let query = supabase
    .from('conversations')
    .select(`
      id,
      type,
      course_id,
      title,
      created_by,
      created_at,
      updated_at,
      course:courses(id, title, slug)
    `)
    .order('updated_at', { ascending: false });

  if (type === 'course') {
    query = query.eq('type', 'course');
  } else if (type === 'direct') {
    query = query.eq('type', 'direct');
  }

  const { data: convos, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Filtrer : pour course, garder seulement ceux auxquels l'user a accès
  const filtered = (convos || []).filter((c) => {
    if (c.type === 'course') {
      return c.course_id != null;
    }
    return true;
  });

  // Pour chaque conv, vérifier l'accès via une requête séparée ou RLS
  // RLS doit déjà filtrer - si on a des résultats, c'est que l'user a accès
  const withLastMessage = await Promise.all(
    filtered.slice(0, 50).map(async (conv) => {
      const { data: lastMsg } = await supabase
        .from('messages')
        .select('id, content, sender_id, created_at, status')
        .eq('conversation_id', conv.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const { data: unread } = await supabase
        .from('unread_counts')
        .select('count')
        .eq('user_id', user.id)
        .eq('conversation_id', conv.id)
        .single();

      return {
        ...conv,
        last_message: lastMsg,
        unread_count: unread?.count ?? 0,
      };
    })
  );

  return NextResponse.json({ conversations: withLastMessage });
}
