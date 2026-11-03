import type { ProgramWithCurrentVersion } from '@/lib/extranet-formateurs/queries-phase2';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export function ProgramDetailView({ program }: { program: ProgramWithCurrentVersion }) {
  const v = program.current_version;
  if (!v) {
    return <p className="text-sm text-slate-600">Aucune version validée publiée pour ce programme.</p>;
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">{program.title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Version {v.version_label}
          {program.catalogue_code ? ` · ${program.catalogue_code}` : ''}
          {v.duration_hours != null ? ` · ${v.duration_hours} h` : ''}
        </p>
      </header>

      <Block title="Objectifs opérationnels et évaluables">{v.objectives_md || '—'}</Block>
      <Block title="Public concerné">{v.audience || '—'}</Block>
      <Block title="Prérequis">{v.prerequisites || '—'}</Block>
      <Block title="Déroulé pédagogique">{v.schedule_md || '—'}</Block>
      <Block title="Méthodes mobilisées">{v.methods_md || '—'}</Block>
      <Block title="Modalités d’évaluation">{v.evaluation_md || '—'}</Block>
      <Block title="Adaptations possibles">{v.adaptations_md || '—'}</Block>
    </div>
  );
}
