import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import type { InterventionReadiness } from '@/lib/extranet-formateurs/qualiopi-compliance';

export function QualiopiReadinessBanner({ readiness }: { readiness: InterventionReadiness }) {
  return (
    <section
      className={`rounded-xl border p-4 shadow-sm ${
        readiness.canIntervene ? 'border-emerald-200 bg-emerald-50/60' : 'border-amber-200 bg-amber-50/60'
      }`}
      aria-labelledby="qualiopi-readiness-title"
    >
      <div className="flex flex-wrap items-start gap-3">
        {readiness.canIntervene ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
        ) : (
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <h2 id="qualiopi-readiness-title" className="font-display text-base font-bold text-slate-900">
            Qualiopi — {readiness.canIntervene ? 'dossier habilitant' : 'dossier à finaliser'}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {readiness.canIntervene
              ? 'Votre habilitation est à jour. Pensez aux pièces de session après chaque intervention.'
              : `${readiness.blockers.length > 0 ? readiness.blockers[0] : 'Complétez votre conformité avant session.'}`}
          </p>
          <Link
            href={LINKS.espaceFormateursConformite}
            className="mt-2 inline-block text-sm font-semibold text-[#377CF3] hover:underline"
          >
            Voir la conformité Qualiopi →
          </Link>
        </div>
      </div>
    </section>
  );
}