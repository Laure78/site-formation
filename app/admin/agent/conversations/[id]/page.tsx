import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: conv } = await supabase
    .from('chat_conversations')
    .select('id, created_at, mode, visitor_id')
    .eq('id', id)
    .single();

  const { data: messages } = await supabase
    .from('chat_messages')
    .select('id, role, content, sources, created_at')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true });

  if (!conv) {
    return (
      <div className="p-8">
        <p>Conversation introuvable</p>
        <Link href="/admin/agent" className="text-[var(--accent)] hover:underline">
          Retour
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Link
        href="/admin/agent"
        className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Retour
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-slate-900">
            Conversation
          </h1>
          <span className="text-sm text-slate-500">
            {new Date(conv.created_at).toLocaleString('fr-FR')} — {conv.mode}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {(messages ?? []).map((m: { id: string; role: string; content: string; sources?: { url: string; title: string }[]; created_at: string }) => (
            <div
              key={m.id}
              className={`rounded-xl p-4 ${
                m.role === 'user' ? 'ml-8 bg-slate-100' : 'mr-8 bg-[var(--accent-soft)]'
              }`}
            >
              <p className="text-xs font-medium text-slate-500">{m.role}</p>
              <p className="mt-1 whitespace-pre-wrap text-slate-800">{m.content}</p>
              {m.sources && m.sources.length > 0 && (
                <div className="mt-2 space-y-1">
                  {m.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs text-[var(--accent)] hover:underline"
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
              <p className="mt-1 text-xs text-slate-400">
                {new Date(m.created_at).toLocaleTimeString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
