'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FileUploadButton } from '@/components/FileUploadButton';

const LESSON_TYPES = [
  { value: 'video', label: 'Vidéo' },
  { value: 'texte', label: 'Texte' },
  { value: 'pdf', label: 'Slides (PDF)' },
  { value: 'quiz', label: 'Quiz' },
];

export default function NouvelleLeconPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const moduleId = params.moduleId as string;
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'texte' | 'pdf' | 'quiz'>('texte');
  const [contentText, setContentText] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: lessons } = await supabase
        .from('lessons')
        .select('order_index')
        .eq('module_id', moduleId)
        .order('order_index', { ascending: false })
        .limit(1);
      const nextOrder = ((lessons?.[0]?.order_index ?? -1) + 1);

      await supabase.from('lessons').insert({
        module_id: moduleId,
        title,
        type,
        content_text: type === 'texte' ? contentText || null : null,
        content_url: (type === 'video' || type === 'pdf') && contentUrl ? contentUrl : null,
        order_index: nextOrder,
        duration_minutes: duration ? parseInt(duration, 10) : null,
      });
      router.push(`/admin/formations/${courseId}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Link href={`/admin/formations/${courseId}`} className="text-sm text-[var(--accent)] hover:underline">← Retour</Link>
      <h1 className="mt-6 font-display text-2xl font-bold">Nouvelle leçon</h1>

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
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        {type === 'texte' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Contenu texte</label>
            <textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
          </div>
        )}
        {(type === 'video' || type === 'pdf') && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              {type === 'video' ? 'Vidéo : URL ou dépôt de fichier' : 'Slides : URL ou dépôt de fichier PDF'}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                placeholder="https://... ou déposez un fichier"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              />
              <FileUploadButton
                accept={type === 'video' ? 'video/*' : '.pdf'}
                onUrl={(url) => setContentUrl(url)}
              />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700">Durée (minutes)</label>
          <input
            type="number"
            min="0"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Ajout…' : 'Ajouter'}
          </button>
          <Link href={`/admin/formations/${courseId}`} className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
        </div>
      </form>
    </div>
  );
}
