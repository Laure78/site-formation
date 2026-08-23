import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  formatIndicateurSatisfactionLibelle,
  formatIndicateurSatisfactionSousTexte,
  getMethodeCalculSatisfactionParagraph,
  INDICATEURS_REALISATION_ASSIDUITE_A_VENIR,
} from '@/lib/data/indicateurs-resultats';
import { QUALIOPI_MENTION_PERIMETRE } from '@/config/qualiopi';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';

export const revalidate = 3600;

const PAGE_TITLE = 'Indicateurs de résultats — OFC formation BTP';
const PAGE_DESCRIPTION = `${formatIndicateurSatisfactionLibelle()}. Questionnaires à chaud — indicateur 2 Qualiopi, OFC Création d'Entreprise.`;

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.indicateursResultats,
});

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

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-lg font-semibold text-slate-900">{formatIndicateurSatisfactionLibelle()}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          {formatIndicateurSatisfactionSousTexte()}
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {INDICATEURS_REALISATION_ASSIDUITE_A_VENIR}
      </p>

      <article className="mt-12 space-y-6 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Méthode de calcul</h2>
          <p className="mt-4">{getMethodeCalculSatisfactionParagraph()}</p>
        </section>

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
