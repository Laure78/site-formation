import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  MessageCircle,
  Users,
  FileText,
  RefreshCw,
  ExternalLink,
  Calendar,
} from 'lucide-react';

export default async function AgentDashboardPage() {
  const supabase = await createClient();

  const [
    { data: conversations, count: convCount },
    { data: prospects, count: prospCount },
    { count: chunkCount },
  ] = await Promise.all([
    supabase
      .from('chat_conversations')
      .select('id, created_at, mode', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('chat_prospects')
      .select('id, intent, email, name, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('knowledge_chunks').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: 'Conversations', value: convCount ?? 0, icon: MessageCircle },
    { label: 'Prospects', value: prospCount ?? 0, icon: Users },
    { label: 'Chunks indexés', value: chunkCount ?? 0, icon: FileText },
  ];

  const intentLabels: Record<string, string> = {
    rdv: 'Prendre RDV',
    programme: 'Recevoir programme',
    recontact: 'Être recontacté',
    info: 'Information',
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Agent IA — Chatbot
      </h1>
      <p className="mt-1 text-slate-600">
        Conversations, prospects et base de connaissance
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-slate-900">
            <MessageCircle size={20} strokeWidth={1.5} />
            Dernières conversations
          </h2>
          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
            {(conversations ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">Aucune conversation</p>
            ) : (
              (conversations ?? []).map((c: { id: string; created_at: string; mode: string }) => (
                <Link
                  key={c.id}
                  href={`/admin/agent/conversations/${c.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50"
                >
                  <span className="text-sm text-slate-700">
                    {new Date(c.created_at).toLocaleDateString('fr-FR')} — {c.mode}
                  </span>
                  <ExternalLink size={14} className="text-slate-400" />
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Users size={20} strokeWidth={1.5} />
            Prospects qualifiés
          </h2>
          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
            {(prospects ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">Aucun prospect</p>
            ) : (
              (prospects ?? []).map(
                (p: { id: string; intent: string; email?: string; name?: string; created_at: string }) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {p.name || p.email || '—'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {intentLabels[p.intent] || p.intent} —{' '}
                        {new Date(p.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-slate-900">
          <RefreshCw size={20} strokeWidth={1.5} />
          Base de connaissance
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Pour réindexer le site : <code className="rounded bg-slate-100 px-1">npm run agent:index</code>
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Nécessite OPENAI_API_KEY et SUPABASE_SERVICE_ROLE_KEY. Lancez chaque nuit pour mettre à jour.
        </p>
        <Link
          href="/admin"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
        >
          <Calendar size={16} strokeWidth={1.5} />
          Retour au dashboard
        </Link>
      </div>
    </div>
  );
}
