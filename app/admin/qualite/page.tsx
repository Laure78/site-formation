import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { QualiteExports } from './QualiteExports';
import { FileText, ClipboardCheck, BarChart3, Star } from 'lucide-react';

export default async function AdminQualitePage() {
  const supabase = await createClient();

  const [
    { count: enrollmentsCount },
    { count: completedCount },
    satisfactionResult,
  ] = await Promise.all([
    supabase.from('enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('progress_percent', 100),
    supabase.from('satisfaction_surveys').select('id, note_globale'),
  ]);
  const satisfaction = satisfactionResult.data ?? [];

  const avgSatisfaction =
    satisfaction.length > 0
      ? Math.round(
          (satisfaction.reduce((s, x) => s + (x.note_globale ?? 0), 0) / satisfaction.length) * 20
        ) // 1-5 → 20-100
      : null;
  const completionRate =
    enrollmentsCount && enrollmentsCount > 0
      ? Math.round(((completedCount ?? 0) / enrollmentsCount) * 100)
      : 0;

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Qualiopi / Qualité</h1>
      <p className="mt-2 text-slate-600">
        Export des preuves et statistiques pour les audits Qualiopi
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <BarChart3 size={24} strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">{enrollmentsCount ?? 0}</p>
          <p className="text-sm text-slate-600">Inscriptions totales</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <ClipboardCheck size={24} strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">{completionRate}%</p>
          <p className="text-sm text-slate-600">Taux de complétion (100%)</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Star size={24} strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">
            {avgSatisfaction !== null ? `${avgSatisfaction}%` : '—'}
          </p>
          <p className="text-sm text-slate-600">Satisfaction moyenne</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <FileText size={24} strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">{satisfaction?.length ?? 0}</p>
          <p className="text-sm text-slate-600">Questionnaires satisfaction</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-slate-900">Exporter les preuves Qualiopi</h2>
        <p className="mt-1 text-sm text-slate-600">
          Générez les documents nécessaires pour justifier la conformité lors d&apos;un audit.
        </p>
        <div className="mt-6">
          <QualiteExports />
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-display text-lg font-semibold text-slate-900">Éléments tracés</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Connexions et sessions (table session_logs)
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Progression par module et leçon
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Résultats aux quiz
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Évaluations de satisfaction
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Feuilles d&apos;émargement numériques
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Attestations de formation
          </li>
        </ul>
      </div>
    </div>
  );
}
