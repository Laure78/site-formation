import {
  TARIF_APPLICATION_METIER_BTP_CUMUL_NIVEAUX_HT,
  TARIF_APPLICATION_METIER_BTP_NIV1_HT,
  TARIF_APPLICATION_METIER_BTP_NIV2_HT,
  TARIF_APPLICATION_METIER_BTP_NIV3_HT,
  TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT,
  TARIF_SESSION_INTRA_MENTION,
  FINANCEMENT_APPLICATION_METIER_BTP,
  FINANCEMENT_APPLICATION_METIER_BTP_DETAIL,
  formatMontantHtApplicationMetier,
  libelleAvantageParcoursApplicationMetierBtp,
  libelleTarifApplicationMetierBtp,
  libelleTarifApplicationMetierBtpDureeSession,
} from '@/lib/tarifs-applications-metier-btp';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { PARCOURS_APPLICATIONS_METIER } from '@/lib/parcours-applications-metier-btp-content';

const NIVEAUX_TARIFS = [
  { key: 'niveau-1' as const, duree: '7 h', label: 'Niveau 1 — Concevoir' },
  { key: 'niveau-2' as const, duree: '7 h', label: 'Niveau 2 — Connecter' },
  { key: 'niveau-3' as const, duree: '7 h', label: 'Niveau 3 — Intégrer l’IA et industrialiser' },
];

/** Section tarifs — page pilier parcours applications métier BTP. */
export function ApplicationMetierParcoursTarifsSection() {
  return (
    <section className={OFC_SEC.white}>
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Tarifs</h2>
        <p className="mt-2 text-sm text-slate-600">{TARIF_SESSION_INTRA_MENTION}</p>

        <div className="mt-8 space-y-4">
          {NIVEAUX_TARIFS.map((n) => (
            <div
              key={n.key}
              className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <p className="font-semibold text-slate-900">{n.label}</p>
              <p className="text-sm font-medium text-slate-800">
                {libelleTarifApplicationMetierBtpDureeSession(n.duree, n.key)}
                <MentionTvaAsterisque />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 shadow-sm">
          <h3 className="font-display text-xl font-bold text-slate-900">Parcours complet — 21 heures</h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Les trois niveaux représentent normalement :{' '}
            {formatMontantHtApplicationMetier(TARIF_APPLICATION_METIER_BTP_NIV1_HT)} +{' '}
            {formatMontantHtApplicationMetier(TARIF_APPLICATION_METIER_BTP_NIV2_HT)} +{' '}
            {formatMontantHtApplicationMetier(TARIF_APPLICATION_METIER_BTP_NIV3_HT)} ={' '}
            <strong>{formatMontantHtApplicationMetier(TARIF_APPLICATION_METIER_BTP_CUMUL_NIVEAUX_HT)}</strong>
          </p>
          <p className="mt-4 font-display text-2xl font-bold text-slate-900">
            Tarif parcours complet :{' '}
            {formatMontantHtApplicationMetier(TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT)}
            <MentionTvaAsterisque />
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">
            {libelleAvantageParcoursApplicationMetierBtp()}
          </p>
          <p className="mt-4 text-sm text-slate-600">
            {libelleTarifApplicationMetierBtp('parcours-complet')} — trois sessions de 7 h.
          </p>
          <p className="mt-4 text-sm text-slate-500">{PARCOURS_APPLICATIONS_METIER.parcoursCompletPrudence}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">Financement</h3>
          <p className="mt-3 text-sm text-slate-600">{FINANCEMENT_APPLICATION_METIER_BTP}</p>
          <p className="mt-2 text-sm text-slate-500">{FINANCEMENT_APPLICATION_METIER_BTP_DETAIL}</p>
        </div>
      </div>
    </section>
  );
}
