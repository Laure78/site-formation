'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, Plus, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function NouveauModuleForm({
  courseId,
  courseTitle,
  nextOrderPreview,
}: {
  courseId: string;
  courseTitle: string;
  nextOrderPreview: number;
}) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdModuleId, setCreatedModuleId] = useState<string | null>(null);

  const titleOk = title.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleOk || loading) return;
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: mods } = await supabase
        .from('modules')
        .select('order_index')
        .eq('course_id', courseId)
        .order('order_index', { ascending: false })
        .limit(1);
      const nextOrder = (mods?.[0]?.order_index ?? -1) + 1;

      const { data: inserted, error: insertError } = await supabase
        .from('modules')
        .insert({ course_id: courseId, title: title.trim(), order_index: nextOrder })
        .select('id')
        .single();

      if (insertError || !inserted) {
        setError(insertError?.message || 'Impossible de créer le module.');
        return;
      }
      setCreatedModuleId(inserted.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  };

  if (createdModuleId) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle2 className="mx-auto text-emerald-600" size={40} strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-xl font-bold text-emerald-950">Module créé</h2>
          <p className="mt-2 text-sm text-emerald-900">
            « {title.trim()} » est prêt. Ajoutez maintenant des leçons (vidéo, PDF, texte…).
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/admin/formations/${courseId}/modules/${createdModuleId}/lecons/nouvelle`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
            >
              <Plus size={18} strokeWidth={2} />
              Ajouter une leçon
            </Link>
            <Link
              href={`/admin/formations/${courseId}/modules/${createdModuleId}`}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50"
            >
              Voir le module
            </Link>
          </div>
          <Link
            href={`/admin/formations/${courseId}`}
            className="mt-4 inline-block text-sm text-emerald-800 hover:underline"
          >
            Retour à la formation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link href="/admin/formations" className="hover:text-[#377CF3] hover:underline">
          Formations
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/admin/formations/${courseId}`}
          className="max-w-[200px] truncate hover:text-[#377CF3] hover:underline"
          title={courseTitle}
        >
          {courseTitle}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-slate-800">Nouveau module</span>
      </nav>

      <Link
        href={`/admin/formations/${courseId}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#377CF3] hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
        Retour
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3]">
            <Layers size={22} strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Nouveau module</h1>
            <p className="mt-1 text-sm text-slate-500">
              Un module regroupe des leçons (ex. « Module 1 — Les bases »). Position prévue : n°
              {nextOrderPreview}.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="module-title" className="block text-sm font-semibold text-slate-800">
              Titre du module <span className="text-red-500">*</span>
            </label>
            <input
              id="module-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={2}
              maxLength={120}
              autoFocus
              placeholder="Ex. : Module 1 — Découvrir ChatGPT pour le chantier"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#377CF3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Choisissez un titre clair pour l’apprenant ({title.trim().length}/120).
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <BookOpen size={16} className="mt-0.5 shrink-0 text-slate-400" strokeWidth={1.75} />
              <p>
                Après création, vous pourrez ajouter des leçons : vidéo YouTube, slides PDF, texte ou
                lien Google Sheets.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              href={`/admin/formations/${courseId}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading || !titleOk}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#2A6BD9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Création…' : 'Créer le module'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
