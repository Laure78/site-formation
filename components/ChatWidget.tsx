'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '@/lib/agent/suggestions';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { trackCtaRdvClick } from '@/lib/cta-analytics';

const CHAT_WIDGET_RDV = LINKS.prendreRdv;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Rend l'email professionnel cliquable (mailto) dans les réponses de l'assistant */
function formatAssistantContent(text: string) {
  const email = SITE_CONFIG.email;
  const parts = text.split(new RegExp(`(${escapeRegExp(email)})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === email.toLowerCase() ? (
      <a
        key={i}
        href={`mailto:${email}`}
        className="font-medium text-[var(--accent)] underline underline-offset-2 hover:text-blue-800"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { url: string; title: string }[];
}

const CTAS = [
  { label: 'Prendre rendez-vous', href: CHAT_WIDGET_RDV, intent: 'rdv' as const },
  { label: 'Recevoir le programme', intent: 'programme' as const },
  { label: 'Être recontacté', intent: 'recontact' as const },
];

function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('chat_visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('chat_visitor_id', id);
  }
  return id;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage: Message = { role: 'user', content: text.trim() };
    setMessages((m) => [...m, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          conversationId,
          visitorId: getVisitorId(),
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');

      setConversationId(data.conversationId);
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: data.message,
          sources: data.sources,
        },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Désolé, une erreur est survenue. Réessayez ou écrivez à ${SITE_CONFIG.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (q: string) => send(q);

  const handleCtaClick = async (cta: (typeof CTAS)[number]) => {
    if (cta.href) {
      if (cta.intent === 'rdv') {
        trackCtaRdvClick('chat-widget-rdv', window.location.pathname);
      }
      window.location.href = cta.href;
      return;
    }
    await fetch('/api/chat/prospect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId,
        intent: cta.intent,
        visitorId: getVisitorId(),
      }),
    });
    if (cta.intent === 'rdv') {
      trackCtaRdvClick('chat-widget-rdv', window.location.pathname);
    }
    window.location.href = cta.intent === 'programme' ? '/contact' : CHAT_WIDGET_RDV;
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={24} strokeWidth={1.5} />
      </button>

      {/* Panneau chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[min(80vh,520px)] w-[min(400px,calc(100vw-3rem))] flex-col rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <p className="font-display font-semibold text-slate-900">Assistant Laure</p>
              <p className="text-xs text-slate-500">Formation IA pour le BTP</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  Bonjour ! Je suis l&apos;assistant de Laure Olivié. Posez-moi vos questions sur les formations IA pour le BTP.
                </p>
                <p className="text-sm text-slate-600">
                  Pour l&apos;écrire directement :{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-medium text-[var(--accent)] underline underline-offset-2 hover:text-blue-800"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="text-xs font-medium text-slate-500">Questions fréquentes :</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.slice(0, 6).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSuggestion(q)}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    m.role === 'user'
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">
                    {m.role === 'assistant' ? formatAssistantContent(m.content) : m.content}
                  </p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2 space-y-1 border-t border-slate-200/50 pt-2">
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
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-2">
                  <Loader2 size={18} className="animate-spin text-slate-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CTAs si intérêt formations */}
          {messages.length > 2 && (
            <div className="border-t border-slate-200 px-4 py-2">
              <p className="mb-2 text-xs font-medium text-slate-600">Souhaitez-vous :</p>
              <div className="flex flex-wrap gap-2">
                {CTAS.map((cta) =>
                  cta.href ? (
                    <a
                      key={cta.intent}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <button
                      key={cta.intent}
                      type="button"
                      onClick={() => handleCtaClick(cta)}
                      className="rounded-lg bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                    >
                      {cta.label}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            className="border-t border-slate-200 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Posez votre question..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white disabled:opacity-50"
              >
                <Send size={18} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
