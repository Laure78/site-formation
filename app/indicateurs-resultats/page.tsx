import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { formatPersonnesFormeesCount } from '@/lib/constants';
import { QUALIOPI_STATS, QUALIOPI_SATISFACTION_SOURCING } from '@/config/qualiopi';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';

// À mettre à jour chaque année — source : registre des sessions OFC
const INDICATEURS_QUALIOPI = {
  anneeReference: '2025',
  dateMiseAJour: QUALIOPI_STATS.DATE_MAJ,
  tauxRealisation: '100 %',
  tauxAssiduite: '98 %',
} as const;

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Indicateurs de résultats — OFC formation BTP',
  description:
    'Note moyenne de satisfaction, nombre de stagiaires formés, taux de réalisation et d\'assiduité — indicateur 2 Qualiopi. OFC Création d\'Entreprise.',
  path: '/indicateurs-resultats',
});

function isIndicateurAffichable(value: string | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !/^\{\{[^}]+\}\}$/.test(trimmed);
}

function IndicateurCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  if (!isIndicateurAffichable(value)) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default function IndicateursResultatsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Indicateurs de résultats
      </h1>
      <p className="mt-4 text-slate-600">
        Publication des indicateurs liés à la qualité des actions de formation (indicateur 2 du référentiel
        Qualiopi) — OFC Création d&apos;Entreprise.
      </p>
      <p className="mt-2 text-sm font-medium text-slate-700">
        Mis à jour le : {INDICATEURS_QUALIOPI.dateMiseAJour} · Année de référence :{' '}
        {INDICATEURS_QUALIOPI.anneeReference}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <IndicateurCard
          label="Note moyenne de satisfaction (évaluation à chaud)"
          value={QUALIOPI_STATS.NOTE_MOYENNE}
          hint={QUALIOPI_SATISFACTION_SOURCING}
        />
        <IndicateurCard
          label="Nombre de stagiaires formés (cumul)"
          value={formatPersonnesFormeesCount()}
          hint={`Période de référence : ${QUALIOPI_STATS.PERIODE_DEBUT} — ${QUALIOPI_STATS.PERIODE_FIN}`}
        />
        <IndicateurCard
          label="Taux de réalisation des sessions"
          value={INDICATEURS_QUALIOPI.tauxRealisation}
          hint="Sessions réalisées / sessions planifiées sur l'année de référence"
        />
        <IndicateurCard
          label="Taux d'assiduité des stagiaires"
          value={INDICATEURS_QUALIOPI.tauxAssiduite}
          hint="Présence effective / présence attendue (feuilles d'émargement)"
        />
      </div>

      <article className="mt-12 space-y-6 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Méthode de calcul</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <strong>Satisfaction :</strong> questionnaire à chaud en fin de session (échelle 1–5), consolidé
              annuellement — {QUALIOPI_SATISFACTION_SOURCING}
            </li>
            <li>
              <strong>Réalisation :</strong> nombre de sessions effectivement animées rapporté aux sessions
              conventionnées sur la période.
            </li>
            <li>
              <strong>Assiduité :</strong> heures de présence effective des stagiaires (émargement) rapportées aux
              heures prévues à la convention.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Amélioration continue</h2>
          <p className="mt-4">
            Les résultats alimentent le plan d&apos;amélioration continue de l&apos;organisme. Toute réclamation
            ou suggestion peut être adressée via la{' '}
            <Link href={LINKS.reclamations} className="font-medium text-[#377CF3] hover:underline">
              procédure de réclamation
            </Link>
            .
          </p>
        </section>

        <QualiopiCertificationNotice className="rounded-2xl border border-slate-200 bg-slate-50 p-6" />
      </article>
    </div>
  );
}
