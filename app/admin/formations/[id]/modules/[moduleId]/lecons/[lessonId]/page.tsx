'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FileUploadButton } from '@/components/FileUploadButton';
import { Trash2 } from 'lucide-react';

const LESSON_TYPES = [
  { value: 'video', label: 'Vidéo YouTube ou autre' },
  { value: 'texte', label: 'Texte' },
  { value: 'pdf', label: 'Slides PDF' },
  { value: 'quiz', label: 'Quiz' },
] as const;

export default function ModifierLeconPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'texte' | 'pdf' | 'quiz'>('texte');
  const [contentText, setContentText] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const supabase = createClient();
      const { data, error: err } = await supabase
        .from('lessons')
        .select('title, type, content_text, content_url, duration_minutes')
        .eq('id', lessonId)
        .single();
      if (err || !data) {
        setError(err?.message ?? 'Leçon introuvable');
        setFetching(false);
        return;
      }
      setTitle(data.title);
      setType((data.type as typeof type) || 'texte');
      setContentText(data.content_text || '');
      setContentUrl(data.content_url || '');
      setDuration(data.duration_minutes ? String(data.duration_minutes) : '');
      setFetching(false);
    };
    fetchLesson();
  }, [lessonId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const contentTextVal = type === 'texte' ? (contentText?.trim() || null) : null;
      const contentUrlVal = (type === 'video' || type === 'pdf') && contentUrl?.trim() ? contentUrl.trim() : null;

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          title,
          type,
          content_text: contentTextVal,
          content_url: contentUrlVal,
          duration_minutes: duration ? parseInt(duration, 10) : null,
        })
        .eq('id', lessonId);

      if (updateError) {
        setError(updateError.message);
        return;
      }
      router.push(`/admin/formations/${courseId}/modules/${moduleId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Supprimer la leçon « ${title} » ? Cette action est irréversible.`)) return;

    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase.from('lessons').delete().eq('id', lessonId);

      if (deleteError) {
        setError(deleteError.message);
        return;
      }
      router.push(`/admin/formations/${courseId}/modules/${moduleId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-slate-600">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Link
        href={`/admin/formations/${courseId}/modules/${moduleId}`}
        className="text-sm text-[var(--accent)] hover:underline"
      >
        ← Retour au module
      </Link>
      <h1 className="mt-6 font-display text-2xl font-bold">Modifier la leçon</h1>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {LESSON_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        {type === 'texte' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Contenu texte
            </label>
            <textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
        )}
        {type === 'video' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Lien YouTube ou URL vidéo
            </label>
            <input
              type="text"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
        )}
        {type === 'pdf' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Slides PDF : déposer un fichier ou coller une URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                placeholder="https://... ou /formations/appels-offres/mon-fichier.pdf"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              />
              <FileUploadButton
                accept=".pdf,application/pdf"
                onUrl={(url) => setContentUrl(url)}
              />
            </div>
            <p className="text-xs text-slate-500">
              Si &quot;Déposer&quot; ne fonctionne pas : placez votre PDF dans <code className="bg-slate-100 px-1 rounded">/public/formations/appels-offres/</code> puis collez l&apos;URL : <code className="bg-slate-100 px-1 rounded">/formations/appels-offres/votre-fichier.pdf</code>
            </p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Durée (minutes)
          </label>
          <input
            type="number"
            min="0"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
          <Link
            href={`/admin/formations/${courseId}/modules/${moduleId}`}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Annuler
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="ml-auto flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            <Trash2 size={18} strokeWidth={1.5} />
            Supprimer la leçon
          </button>
        </div>
      </form>
    </div>
  );
}
