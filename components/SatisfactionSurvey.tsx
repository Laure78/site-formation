'use client';

import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { QualiopiWordmark } from '@/components/QualiopiLogo';

interface Props {
  courseId: string;
  courseTitle: string;
  onSubmitted?: () => void;
}

export function SatisfactionSurvey({ courseId, courseTitle, onSubmitted }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteGlobale, setNoteGlobale] = useState(0);
  const [noteContenu, setNoteContenu] = useState(0);
  const [noteUtilite, setNoteUtilite] = useState(0);
  const [commentaire, setCommentaire] = useState('');

  const submit = async () => {
    if (noteGlobale < 1) return;
    setLoading(true);
    try {
      const res = await fetch('/api/satisfaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          noteGlobale,
          noteContenu: noteContenu || null,
          noteUtilite: noteUtilite || null,
          commentaire: commentaire.trim() || null,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        onSubmitted?.();
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="font-semibold text-emerald-800">Merci pour votre évaluation !</p>
        <p className="mt-1 text-sm text-emerald-700">
          Votre retour m&apos;aide à améliorer mes formations.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-slate-900">
        Évaluation de satisfaction — {courseTitle}
      </h3>
      <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-slate-600">
        <span>Cette évaluation est utilisée pour notre démarche qualité</span>
        <QualiopiWordmark />
        <span>. Merci de votre retour.</span>
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Note globale *</label>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNoteGlobale(n)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                  noteGlobale >= n ? 'bg-amber-400 text-amber-900' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Star size={20} strokeWidth={2} fill={noteGlobale >= n ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Qualité du contenu</label>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNoteContenu(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                  noteContenu >= n ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Utilité professionnelle</label>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNoteUtilite(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                  noteUtilite >= n ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Commentaire (optionnel)</label>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="Vos remarques ou suggestions..."
          />
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={loading || noteGlobale < 1}
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-medium text-white disabled:opacity-50 hover:bg-[var(--accent)]/90"
        >
          <Send size={18} strokeWidth={1.5} />
          {loading ? 'Envoi...' : 'Envoyer l\'évaluation'}
        </button>
      </div>
    </div>
  );
}
