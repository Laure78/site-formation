'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FileUploadButton } from '@/components/FileUploadButton';
import { LESSON_TYPES, lessonUsesContentUrl, type LessonTypeValue } from '@/lib/lesson-types';

export default function NouvelleLeconPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const moduleId = params.moduleId as string;
  const [title, setTitle] = useState('');
  const [type, setType] = useState<LessonTypeValue>('texte');
  const [contentText, setContentText] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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

      const contentTextVal =
        type === 'texte' || type === 'lien' ? (contentText?.trim() || null) : null;
      const contentUrlVal =
        lessonUsesContentUrl(type) && contentUrl?.trim() ? contentUrl.trim() : null;

      if (type === 'lien' && !contentUrlVal) {
        setError('Collez l’URL du tableau Excel ou Google Sheets.');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('lessons').insert({
        module_id: moduleId,
        title,
        type,
        content_text: contentTextVal,
        content_url: contentUrlVal,
        order_index: nextOrder,
        duration_minutes: duration ? parseInt(duration, 10) : null,
      });

      if (insertError) {
        setError(insertError.message);
        return;
      }
      router.push(`/admin/formations/${courseId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Link href={`/admin/formations/${courseId}`} className="text-sm text-[var(--accent)] hover:underline">← Retour</Link>
      <h1 className="mt-6 font-display text-2xl font-bold">Nouvelle leçon</h1>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
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
            onChange={(e) => setType(e.target.value as LessonTypeValue)}
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
            <p className="text-xs text-slate-500">
              Collez le lien de la vidéo YouTube (ex : youtube.com/watch?v=xxx) ou une URL vidéo directe (Vimeo, etc.)
            </p>
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
                placeholder="https://... ou /formations/.../mon-fichier.pdf"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              />
              <FileUploadButton
                accept=".pdf,application/pdf"
                onUrl={(url) => setContentUrl(url)}
              />
            </div>
            <p className="text-xs text-slate-500">
              Si &quot;Déposer&quot; ne fonctionne pas : placez votre PDF dans <code className="bg-slate-100 px-1 rounded">/public/formations/</code> puis collez le chemin relatif.
            </p>
          </div>
        )}
        {type === 'lien' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Lien du tableau Excel / Google Sheets
              </label>
              <input
                type="url"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                required
                placeholder="https://docs.google.com/spreadsheets/d/… ou lien Excel Online"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              />
              <p className="text-xs text-slate-500">
                Partagez le fichier en « Toute personne disposant du lien », puis collez l’URL ici. Formats : Google Sheets, Excel Online, OneDrive, SharePoint, ou fichier .xlsx hébergé.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Texte d’aide (optionnel)
              </label>
              <textarea
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                rows={3}
                placeholder="Ex. : Kit de prompts Devis & Chiffrage — ouvrir puis faire une copie."
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
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
