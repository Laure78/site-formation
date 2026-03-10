import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const MAX_CONTENT_LENGTH = 10000;
const SPAM_COOLDOWN_MS = 2000;

/**
 * POST /api/messages/send
 * Envoyer un message
 * Body: { conversationId, content, attachmentUrls?: string[], replyToId?: string }
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { conversationId, content, attachmentUrls = [], replyToId } = body;

  if (!conversationId || typeof content !== 'string') {
    return NextResponse.json({ error: 'conversationId et content requis' }, { status: 400 });
  }

  const trimmed = content.trim();
  if (trimmed.length === 0 && attachmentUrls.length === 0) {
    return NextResponse.json({ error: 'Contenu ou pièce jointe requis' }, { status: 400 });
  }
  if (trimmed.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json({ error: 'Message trop long' }, { status: 400 });
  }

  // Anti-spam : vérifier le dernier message de l'user dans cette conv
  const { data: lastMsg } = await supabase
    .from('messages')
    .select('created_at')
    .eq('conversation_id', conversationId)
    .eq('sender_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (lastMsg) {
    const diff = Date.now() - new Date(lastMsg.created_at).getTime();
    if (diff < SPAM_COOLDOWN_MS) {
      return NextResponse.json({ error: 'Attendez quelques secondes entre chaque message' }, { status: 429 });
    }
  }

  const { data: msg, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: trimmed || '(pièce jointe)',
      status: 'sent',
      reply_to_id: replyToId || null,
    })
    .select('id, conversation_id, sender_id, content, status, reply_to_id, created_at, updated_at')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (Array.isArray(attachmentUrls) && attachmentUrls.length > 0) {
    const atts = attachmentUrls.slice(0, 5).map((url: string, i: number) => ({
      message_id: msg.id,
      file_url: url,
      file_name: `attachment-${i + 1}`,
    }));
    await supabase.from('message_attachments').insert(atts);
  }

  return NextResponse.json(msg);
}
