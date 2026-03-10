'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { MessageCircle, Send, Paperclip, ChevronRight, BookOpen } from 'lucide-react';
import { useRealtimeMessages } from '@/lib/messaging/use-realtime-messages';

interface Course {
  id: string;
  title: string;
  slug: string;
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  attachments?: { file_url: string; file_name: string | null }[];
  sender?: { full_name: string | null; email: string | null };
}

interface Conversation {
  id: string;
  type: string;
  course_id?: string | null;
  title?: string | null;
  course?: { title: string } | null;
  last_message?: { content: string; created_at: string } | null;
  unread_count?: number;
}

export function MessagesClient({
  userId,
  courses,
  isStaff = false,
}: {
  userId: string;
  courses: Course[];
  isStaff?: boolean;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchConversations = useCallback(async () => {
    const res = await fetch('/api/conversations');
    if (!res.ok) return;
    const { conversations: convos } = await res.json();
    setConversations(convos ?? []);
    if (!selectedId && convos?.length > 0) {
      setSelectedId(convos[0].id);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchConversations().finally(() => setLoading(false));
  }, [fetchConversations]);

  const fetchMessages = useCallback(async (convId: string) => {
    const res = await fetch(`/api/messages?conversationId=${convId}`);
    if (!res.ok) return;
    const { messages: msgs } = await res.json();
    setMessages(msgs ?? []);
  }, []);

  useEffect(() => {
    if (selectedId) {
      fetchMessages(selectedId);
    } else {
      setMessages([]);
    }
  }, [selectedId, fetchMessages]);

  const onNewMessage = useCallback(
    (payload: { id: string; sender_id: string; content: string; created_at: string }) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === payload.id)) return prev;
        return [...prev, { ...payload, attachments: [], sender: undefined }];
      });
    },
    []
  );

  useRealtimeMessages(selectedId, onNewMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const ensureCourseConversation = async (courseId: string) => {
    const res = await fetch(`/api/conversations/course/${courseId}`);
    if (!res.ok) return;
    const conv = await res.json();
    setConversations((prev) => {
      const exists = prev.some((c) => c.id === conv.id);
      if (exists) return prev;
      return [{ ...conv, unread_count: 0 }, ...prev];
    });
    setSelectedId(conv.id);
  };

  const sendMessage = async () => {
    const content = input.trim();
    if ((!content && attachments.length === 0) || !selectedId || sending) return;

    setSending(true);
    setInput('');
    const urls = [...attachments];
    setAttachments([]);

    const res = await fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: selectedId,
        content: content || '(pièce jointe)',
        attachmentUrls: urls,
      }),
    });

    setSending(false);
    if (res.ok) {
      const msg = await res.json();
      setMessages((prev) => [...prev, { ...msg, sender: undefined }]);
      fetchConversations();
    } else {
      const { error } = await res.json();
      alert(error || 'Erreur envoi');
      setInput(content);
      setAttachments(urls);
    }
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 10 * 1024 * 1024) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/messages/upload', { method: 'POST', body: formData });
    setUploading(false);
    e.target.value = '';

    if (res.ok) {
      const { url } = await res.json();
      setAttachments((prev) => [...prev, url].slice(-5));
    }
  };

  const selected = conversations.find((c) => c.id === selectedId);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-r border-slate-200 md:w-80 md:max-w-xs">
        <div className="border-b border-slate-200 p-4">
          <h2 className="font-display text-lg font-semibold text-slate-900">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {courses.length > 0 && (
            <div className="border-b border-slate-100 p-2">
              <p className="px-2 py-1 text-xs font-medium uppercase text-slate-500">
                Discussions de cours
              </p>
              {courses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => ensureCourseConversation(c.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedId === c.id ? 'bg-[var(--accent-soft)]' : 'hover:bg-slate-50'
                  }`}
                >
                  <BookOpen size={18} className="text-[var(--accent)]" />
                  <span className="truncate text-sm font-medium text-slate-900">{c.title}</span>
                  <ChevronRight size={16} className="ml-auto text-slate-400" />
                </button>
              ))}
            </div>
          )}
          <div className="p-2">
            <p className="px-2 py-1 text-xs font-medium uppercase text-slate-500">
              Conversations
            </p>
            {conversations.length === 0 ? (
              <p className="px-3 py-4 text-sm text-slate-500">
                Aucune conversation. Rejoignez une discussion de cours ci-dessus.
              </p>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedId === c.id ? 'bg-[var(--accent-soft)]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-slate-500" />
                    <span className="truncate text-sm font-medium text-slate-900">
                      {c.course?.title ?? c.title ?? 'Conversation'}
                    </span>
                    {(c.unread_count ?? 0) > 0 && (
                      <span className="ml-auto rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">
                        {c.unread_count}
                      </span>
                    )}
                  </div>
                  {c.last_message && (
                    <p className="truncate pl-6 text-xs text-slate-500">
                      {c.last_message.content.slice(0, 40)}...
                    </p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main chat */}
      <main className="flex flex-1 flex-col bg-white">
        {selected ? (
          <>
            <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
              <MessageCircle size={20} className="text-[var(--accent)]" />
              <h2 className="font-display font-semibold text-slate-900">
                {selected.course?.title ?? selected.title ?? 'Discussion'}
              </h2>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender_id === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        m.sender_id === userId
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      {m.sender_id !== userId && m.sender && (
                        <p className="mb-1 text-xs font-medium opacity-80">
                          {m.sender.full_name ?? m.sender.email ?? 'Utilisateur'}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap break-words">{m.content}</p>
                      {(m.attachments?.length ?? 0) > 0 && (
                        <div className="mt-2 space-y-1">
                          {(m.attachments ?? []).map((a, i) => (
                            <a
                              key={i}
                              href={a.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs underline"
                            >
                              {a.file_name ?? 'Pièce jointe'}
                            </a>
                          ))}
                        </div>
                      )}
                      <p className="mt-1 text-right text-xs opacity-70">
                        {new Date(m.created_at).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="border-t border-slate-200 p-4">
              {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachments.map((url, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-100 px-2 py-1 text-xs"
                    >
                      Fichier {i + 1}{' '}
                      <button
                        type="button"
                        onClick={() => setAttachments((p) => p.filter((_, j) => j !== i))}
                        className="ml-1 text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt,.csv"
                  onChange={uploadFile}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || attachments.length >= 5}
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  title="Joindre un fichier"
                >
                  <Paperclip size={20} strokeWidth={1.5} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  placeholder="Écrivez votre message..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={sending || (input.trim().length === 0 && attachments.length === 0)}
                  className="rounded-xl bg-[var(--accent)] p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  title="Envoyer"
                >
                  <Send size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-slate-500">
            <MessageCircle size={48} strokeWidth={1} className="mb-4" />
            <p>Sélectionnez une conversation ou rejoignez une discussion de cours</p>
          </div>
        )}
      </main>
    </div>
  );
}
