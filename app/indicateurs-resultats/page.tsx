import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  formatDateMiseAJourIndicateurs,
  formatNoteSatisfactionAffichageComplet,
  formatNoteSatisfactionSur5,
  formatPeriodeReferenceAffichage,
  formatTauxPourcentFr,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
import { QUALIOPI_MENTION_PERIMETRE } from '@/config/qualiopi';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';

export const revalidate = 3600;

const PAGE_TITLE = 'Indicateurs de résultats — OFC formation BTP';
const PAGE_DESCRIPTION = `Note de satisfaction ${formatNoteSatisfactionAffichageComplet()} — taux de recommandation, questionnaires à chaud. Indicateur 2 Qualiopi, OFC Création d'Entreprise.`;

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.indicateursResultats,
});

const INDICATEURS_TABLE = [
  {
    label: 'Note de satisfaction (évaluation à chaud, sur 5)',
    value: formatNoteSatisfactionAffichageComplet(),
  },
  {
    label: 'Note moyenne sur 10',
    value: `${indicateursResultats.noteSatisfactionSur10.toFixed(1).replace('.', ',')}/10`,
  },
  {
    label: 'Taux de recommandation',
    value: formatTauxPourcentFr(indicateursResultats.tauxRecommandation),
  },
  {
    label: 'Part de notes ≥ 8/10',
    value: formatTauxPourcentFr(indicateursResultats.partNotesSuperieures8),
  },
  {
    label: 'Nombre de répondants (questionnaires consolidés)',
    value: String(indicateursResultats.nombreRepondants),
  },
  {
    label: 'Période de référence',
    value: formatPeriodeReferenceAffichage(),
  },
  {
    label: 'Date de mise à jour',
    value: formatDateMiseAJourIndicateurs(),
  },
] as const;

export default function IndicateursResultatsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Indicateurs de résultats
      </h1>
      <p className="mt-4 text-slate-600">
        Publication des indicateurs liés à la qualité des actions de formation (indicateur 2 du référentiel
        national qualité Qualiopi) — OFC Création d&apos;Entreprise.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        <strong>Source :</strong> questionnaires de satisfaction à chaud renseignés par les participants en
        fin de session, consolidés sur la période de référence ci-dessous.
      </p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <caption className="sr-only">Indicateurs de résultats Qualiopi</caption>
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                Indicateur
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                Valeur publiée
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {INDICATEURS_TABLE.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="px-4 py-3 font-medium text-slate-800">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-slate-700">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-slate-500">
        Note affichée au format opposable : {formatNoteSatisfactionSur5()} —{' '}
        {indicateursResultats.nombreRepondants} répondants, {formatPeriodeReferenceAffichage()}.
      </p>

      <article className="mt-12 space-y-6 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Certification Qualiopi</h2>
          <p className="mt-4">{QUALIOPI_MENTION_PERIMETRE}</p>
          <QualiopiCertificationNotice className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6" />
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
      </article>
    </div>
  );
}
