import Link from 'next/link';
import type { IaOutilCasMetier } from '@/lib/ia-outils-btp-selection';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  cas: IaOutilCasMetier;
};

export function IaOutilCasMetierCard({ cas }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-display text-lg font-bold text-slate-900">{cas.question}</h3>
      <p className="mt-3 text-base leading-relaxed text-slate-700">{cas.directAnswer}</p>
      <dl className="mt-5 space-y-3 text-sm text-slate-700">
        <div>
          <dt className="font-semibold text-slate-900">Public</dt>
          <dd className="mt-0.5">{cas.professional}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Documents ou informations de départ</dt>
          <dd className="mt-0.5">{cas.inputDocs}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Tâche confiée à l’IA</dt>
          <dd className="mt-0.5">{cas.iaTask}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Livrable attendu</dt>
          <dd className="mt-0.5">{cas.deliverable}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Contrôles humains</dt>
          <dd className="mt-0.5">{cas.humanCheck}</dd>
        </div>
      </dl>
      <p className="mt-5 text-sm text-slate-600">
        Outil : {cas.toolLabel} ({cas.editorLabel}) —{' '}
        <Link href={cas.resourceHref} className={OFC_LINK}>
          {cas.resourceLabel}
        </Link>
        {cas.formationHref && cas.formationLabel ? (
          <>
            {' '}
            ·{' '}
            <Link href={cas.formationHref} className={OFC_LINK}>
              {cas.formationLabel}
            </Link>
          </>
        ) : null}
      </p>
    </article>
  );
}
