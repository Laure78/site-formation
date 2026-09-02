import Link from 'next/link';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_MENTION_PERIMETRE } from '@/config/qualiopi';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import {
  formatDateMiseAJourIndicateurs,
  formatIndicateurSatisfactionLibelle,
  formatIndicateurSatisfactionSousTexte,
  formatNoteSatisfactionSur5,
  formatPeriodeReferenceAffichage,
  getMethodeCalculSatisfactionParagraph,
  INDICATEUR_NON_PUBLIE_LIBELLE,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
import {
  getIndicateursResultatsPageJsonLd,
  INDICATEURS_RESULTATS_PAGE_DESCRIPTION,
  INDICATEURS_RESULTATS_PAGE_TITLE,
} from '@/lib/schema-indicateurs-resultats-page';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: INDICATEURS_RESULTATS_PAGE_TITLE,
  titleAbsolute: INDICATEURS_RESULTATS_PAGE_TITLE,
  description: INDICATEURS_RESULTATS_PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.indicateursResultats,
});

const AUTRES_INDICATEURS = [
  {
    label: 'Participants accueillis',
    ...indicateursResultats.nonPublies.participantsAccueillis,
  },
  {
    label: 'Taux de réponse',
    ...indicateursResultats.nonPublies.tauxReponse,
  },
  {
    label: 'Heures-stagiaires',
    ...indicateursResultats.nonPublies.heuresStagiaires,
  },
  {
    label: 'Taux d’assiduité',
    ...indicateursResultats.nonPublies.tauxAssiduite,
  },
  {
    label: 'Taux de réalisation des sessions',
    ...indicateursResultats.nonPublies.tauxRealisation,
  },
  {
    label: 'Taux d’abandon',
    ...indicateursResultats.nonPublies.tauxAbandon,
  },
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="font-display text-xl font-bold text-slate-900 md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-slate-700 md:text-base">
        {children}
      </div>
    </section>
  );
}

export default function IndicateursResultatsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:py-16">
      <JsonLd
        id="schema-indicateurs-resultats"
        schema={getIndicateursResultatsPageJsonLd()}
      />

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {QUALIOPI_LEGAL.raisonSociale} — indicateur 2 Qualiopi
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
          Indicateurs de résultats des formations OFC
        </h1>
        <p className="mt-4 text-slate-600">
          Résultats consolidés des actions de formation sur la période et le périmètre indiqués.
        </p>
        <dl className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-[#F2F2F2] px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Période
            </dt>
            <dd className="mt-1 font-medium tabular-nums text-slate-900">
              {formatPeriodeReferenceAffichage()}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-[#F2F2F2] px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Consolidation
            </dt>
            <dd className="mt-1 font-medium tabular-nums text-slate-900">
              {formatDateMiseAJourIndicateurs()}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-[#F2F2F2] px-4 py-3 sm:col-span-1">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Méthodologie
            </dt>
            <dd className="mt-1 font-medium text-slate-900">
              v{indicateursResultats.methodologyVersion}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          {indicateursResultats.scopeLabel}
        </p>
      </header>

      <article className="mt-12 space-y-12">
        <Section id="resultats-principaux" title="Résultats publiés">
          <div className="rounded-2xl border border-[#377CF3]/25 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
              Satisfaction à chaud
            </p>
            <p className="mt-2 font-display text-4xl font-bold tabular-nums text-slate-900">
              {formatNoteSatisfactionSur5()}
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {formatIndicateurSatisfactionLibelle()}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {formatIndicateurSatisfactionSousTexte()}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-600">
              <li>
                <strong>Base :</strong> {indicateursResultats.nombreRepondants} questionnaires
                valides
              </li>
              <li>
                <strong>Échelle :</strong> {indicateursResultats.satisfactionScaleMin} à{' '}
                {indicateursResultats.satisfactionScaleMax}
              </li>
              <li>
                <strong>Période :</strong> {formatPeriodeReferenceAffichage()}
              </li>
            </ul>
            <p className="mt-4">
              <a
                href="#methodologie"
                className="text-sm font-medium text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                Voir la méthodologie détaillée
              </a>
            </p>
          </div>
        </Section>

        <Section id="autres-indicateurs" title="Autres indicateurs">
          <p>
            Les indicateurs ci-dessous ne sont pas publiés tant que leurs numérateurs et
            dénominateurs ne sont pas consolidés de façon vérifiable.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Indicateurs non publiés pour la période {formatPeriodeReferenceAffichage()}
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-[#F2F2F2]">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Indicateur
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Statut
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Motif
                  </th>
                </tr>
              </thead>
              <tbody>
                {AUTRES_INDICATEURS.map((item) => (
                  <tr key={item.label} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                      {item.label}
                    </th>
                    <td className="px-4 py-3 text-slate-700">{INDICATEUR_NON_PUBLIE_LIBELLE}</td>
                    <td className="px-4 py-3 text-slate-600">{item.motif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="methodologie" title="Méthodologie">
          <details className="group rounded-xl border border-slate-200 bg-white open:shadow-sm">
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                Satisfaction à chaud
                <span className="text-sm font-normal text-[#377CF3] group-open:hidden">
                  Afficher
                </span>
                <span className="hidden text-sm font-normal text-[#377CF3] group-open:inline">
                  Masquer
                </span>
              </span>
            </summary>
            <div className="space-y-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-700">
              <p>{getMethodeCalculSatisfactionParagraph()}</p>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-900">Définition</dt>
                  <dd className="mt-1">{indicateursResultats.satisfactionQuestion}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Formule</dt>
                  <dd className="mt-1">{indicateursResultats.satisfactionFormule}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Numérateur</dt>
                  <dd className="mt-1">Somme des notes globales valides</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Dénominateur</dt>
                  <dd className="mt-1">
                    {indicateursResultats.nombreRepondants} notes valides (répondants)
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Source</dt>
                  <dd className="mt-1">{indicateursResultats.sourceLabel}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Fréquence</dt>
                  <dd className="mt-1">
                    Consolidation périodique — dernière :{' '}
                    {formatDateMiseAJourIndicateurs()}
                  </dd>
                </div>
              </dl>
            </div>
          </details>

          <div className="rounded-xl border border-slate-200 bg-[#F2F2F2] p-5">
            <h3 className="font-semibold text-slate-900">Périmètre et exclusions</h3>
            <p className="mt-2">{indicateursResultats.scopeLabel}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {indicateursResultats.scopeExclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Limites des données</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {indicateursResultats.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="amelioration-continue" title="Comment ces résultats sont utilisés">
          {indicateursResultats.improvementActions.length === 0 ? (
            <p>
              Les résultats de satisfaction alimentent le suivi qualité interne de l&apos;organisme.
              Aucune action d&apos;amélioration nominative n&apos;est publiée ici (confidentialité des
              sessions et des commentaires). Pour signaler une difficulté :{' '}
              <Link
                href={LINKS.reclamations}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                procédure de réclamation
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-3">
              {indicateursResultats.improvementActions.map((action) => (
                <li
                  key={`${action.constat}-${action.action}`}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <p>
                    <strong>Constat :</strong> {action.constat}
                  </p>
                  <p className="mt-1">
                    <strong>Action :</strong> {action.action}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    État : {action.etat} · Suivi : {action.periodeSuivi}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="transparence" title="Transparence et documents">
          <p>{QUALIOPI_MENTION_PERIMETRE}</p>
          <p className="text-sm text-slate-600">
            Organisme : {QUALIOPI_LEGAL.raisonSociale} · Certificateur :{' '}
            {QUALIOPI_LEGAL.organismeCertificateur} · Certificat n°{' '}
            {QUALIOPI_LEGAL.certificatNumero} · Validité {QUALIOPI_LEGAL.certificatValidite}
          </p>
          <QualiopiCertificationNotice
            showIndicateursLink={false}
            className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
          />
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                href={LINKS.reclamations}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Réclamations
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.accessibiliteHandicap}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Accessibilité des formations
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.contact}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.qualiopi}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Page Qualiopi
              </Link>
            </li>
          </ul>
        </Section>
      </article>
    </div>
  );
}
