'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Video,
  FileType,
  Link2,
  HelpCircle,
  Check,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { FileUploadButton } from '@/components/FileUploadButton';
import { LESSON_TYPES, lessonUsesContentUrl, type LessonTypeValue } from '@/lib/lesson-types';

const TYPE_UI: Record<
  LessonTypeValue,
  { icon: typeof FileText; hint: string }
> = {
  texte: { icon: FileText, hint: 'Paragraphes, consignes, prompts à copier' },
  video: { icon: Video, hint: 'Lien YouTube, Vimeo ou URL vidéo' },
  pdf: { icon: FileType, hint: 'Diaporama ou support PDF' },
  lien: { icon: Link2, hint: 'Google Sheets, Docs, Excel Online' },
  quiz: { icon: HelpCircle, hint: 'Questions (configurables ensuite)' },
};

const inputClass =
  'mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#377CF3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20';

export function NouvelleLeconForm({
  courseId,
  moduleId,
  courseTitle,
  moduleTitle,
}: {
  courseId: string;
  moduleId: string;
  courseTitle: string;
  moduleTitle: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<LessonTypeValue>('texte');
  const [contentText, setContentText] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    title.trim().length >= 2 &&
    !(type === 'lien' && !contentUrl.trim()) &&
    !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
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
      const nextOrder = (lessons?.[0]?.order_index ?? -1) + 1;

      const contentTextVal =
        type === 'texte' || type === 'lien' ? contentText?.trim() || null : null;
      const contentUrlVal =
        lessonUsesContentUrl(type) && contentUrl?.trim() ? contentUrl.trim() : null;

      if (type === 'lien' && !contentUrlVal) {
        setError('Collez l’URL du tableau Excel ou Google Sheets.');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('lessons').insert({
        module_id: moduleId,
        title: title.trim(),
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
      router.push(`/admin/formations/${courseId}/modules/${moduleId}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l’enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const backHref = `/admin/formations/${courseId}/modules/${moduleId}`;

  return (
    <div className="mx-auto max-w-2xl pb-28">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link href={`/admin/formations/${courseId}`} className="hover:text-[#377CF3] hover:underline">
          {courseTitle}
        </Link>
        <span aria-hidden>/</span>
        <Link href={backHref} className="max-w-[180px] truncate hover:text-[#377CF3] hover:underline">
          {moduleTitle}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-slate-800">Nouvelle leçon</span>
      </nav>

      <Link
        href={backHref}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#377CF3] hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Retour
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
        Nouvelle leçon
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Module « {moduleTitle} » — choisissez le type puis renseignez le contenu.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <label htmlFor="lesson-title" className="block text-sm font-semibold text-slate-800">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            id="lesson-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
            maxLength={160}
            autoFocus
            placeholder="Ex. : Rédiger un devis avec ChatGPT"
            className={inputClass}
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-slate-800">Type de leçon</p>
          <p className="mt-1 text-xs text-slate-500">Un seul type par leçon</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {LESSON_TYPES.map((t) => {
              const ui = TYPE_UI[t.value];
              const Icon = ui.icon;
              const selected = type === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                    selected
                      ? 'border-[#377CF3] bg-[#377CF3]/5 ring-2 ring-[#377CF3]/20'
                      : 'border-slate-200 bg-[#F8FAFC] hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      selected ? 'bg-[#377CF3] text-white' : 'bg-white text-slate-500'
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                      {t.label}
                      {selected && <Check size={14} className="text-[#377CF3]" strokeWidth={2.5} />}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">{ui.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {type === 'texte' && (
            <div>
              <label htmlFor="content-text" className="block text-sm font-semibold text-slate-800">
                Contenu texte
              </label>
              <textarea
                id="content-text"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                rows={10}
                placeholder="Rédigez le contenu visible par l’apprenant…"
                className={inputClass}
              />
            </div>
          )}

          {type === 'video' && (
            <div className="space-y-2">
              <label htmlFor="video-url" className="block text-sm font-semibold text-slate-800">
                Lien YouTube ou URL vidéo
              </label>
              <input
                id="video-url"
                type="text"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=… ou https://youtu.be/…"
                className={inputClass}
              />
              <p className="text-xs text-slate-500">
                Collez le lien YouTube (watch ou youtu.be) ou une URL vidéo directe.
              </p>
            </div>
          )}

          {type === 'pdf' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                Slides PDF — fichier ou URL
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  placeholder="https://… ou /formations/…/fichier.pdf"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 focus:border-[#377CF3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                />
                <FileUploadButton accept=".pdf,application/pdf" onUrl={(url) => setContentUrl(url)} />
              </div>
              <p className="text-xs text-slate-500">
                Sinon placez le PDF dans <code className="rounded bg-slate-100 px-1">/public/formations/</code> et
                collez le chemin relatif.
              </p>
            </div>
          )}

          {type === 'lien' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="lien-url" className="block text-sm font-semibold text-slate-800">
                  Lien Excel / Google Sheets / Docs <span className="text-red-500">*</span>
                </label>
                <input
                  id="lien-url"
                  type="url"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  required
                  placeholder="https://docs.google.com/spreadsheets/…"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Partage « Toute personne disposant du lien ».
                </p>
              </div>
              <div>
                <label htmlFor="lien-help" className="block text-sm font-semibold text-slate-800">
                  Texte d’aide (optionnel)
                </label>
                <textarea
                  id="lien-help"
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
                  rows={3}
                  placeholder="Ex. : Kit de prompts — ouvrir puis faire une copie."
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {type === 'quiz' && (
            <p className="text-sm text-slate-600">
              La leçon quiz sera créée vide. Vous pourrez ajouter les questions ensuite depuis la fiche
              leçon.
            </p>
          )}

          <div className="mt-6 border-t border-slate-100 pt-5">
            <label htmlFor="duration" className="block text-sm font-semibold text-slate-800">
              Durée estimée (minutes)
            </label>
            <input
              id="duration"
              type="number"
              min={0}
              max={600}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Ex. : 15"
              className={`${inputClass} max-w-[160px]`}
            />
          </div>
        </div>

        {/* Barre d’actions fixe */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-2xl flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={backHref}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2A6BD9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Enregistrement…' : 'Créer la leçon'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
