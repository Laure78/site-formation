import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/messages?conversationId=...&limit=50&before=...
 * Messages d'une conversation (pagination)
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversationId');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);
  const before = searchParams.get('before'); // cursor pagination

  if (!conversationId) {
    return NextResponse.json({ error: 'conversationId requis' }, { status: 400 });
  }

  let query = supabase
    .from('messages')
    .select(`
      id,
      conversation_id,
      sender_id,
      content,
      status,
      pinned_by,
      pinned_at,
      reply_to_id,
      created_at,
      updated_at
    `)
    .eq('conversation_id', conversationId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (before) {
    query = query.lt('created_at', before);
  }

  const { data: messages, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const msgs = (messages || []).reverse();

  const { data: attachments } = await supabase
    .from('message_attachments')
    .select('*')
    .in('message_id', msgs.map((m) => m.id));

  const attachmentsByMessage = new Map<string, typeof attachments>();
  for (const a of attachments || []) {
    const list = attachmentsByMessage.get(a.message_id) || [];
    list.push(a);
    attachmentsByMessage.set(a.message_id, list);
  }

  const senderIds = [...new Set(msgs.map((m) => m.sender_id))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .in('id', senderIds);
  const profileMap = new Map((profiles || []).map((p) => [p.id, p]));

  const withAttachments = msgs.map((m) => ({
    ...m,
    attachments: attachmentsByMessage.get(m.id) || [],
    sender: profileMap.get(m.sender_id) ?? { id: m.sender_id, full_name: null, email: null },
  }));

  return NextResponse.json({ messages: withAttachments });
}
