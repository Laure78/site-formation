import Link from 'next/link';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import { QualiopiCertificationNotice } from '@/components/QualiopiCertificationNotice';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_MENTION_PERIMETRE } from '@/config/qualiopi';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
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

function MetaTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-[#F2F2F2] px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium text-slate-900">{children}</dd>
    </div>
  );
}

export default function IndicateursResultatsPage() {
  return (
    <div className="px-4 py-10 sm:px-6 md:py-12 lg:px-8">
      <div className={OFC_SECTION_INNER}>
        <JsonLd
          id="schema-indicateurs-resultats"
          schema={getIndicateursResultatsPageJsonLd()}
        />

        <Breadcrumb
          className="mb-6 text-sm"
          items={[
            { label: 'Accueil', href: LINKS.home },
            { label: 'Indicateurs de résultats', href: LINKS.indicateursResultats },
          ]}
        />

        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            {QUALIOPI_LEGAL.raisonSociale} — indicateur 2 Qualiopi
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Indicateurs de résultats des formations OFC
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Résultats consolidés des actions de formation sur la période et le périmètre indiqués.
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetaTile label="Période">
              <span className="tabular-nums">{formatPeriodeReferenceAffichage()}</span>
            </MetaTile>
            <MetaTile label="Consolidation">
              <span className="tabular-nums">{formatDateMiseAJourIndicateurs()}</span>
            </MetaTile>
            <MetaTile label="Méthodologie">
              v{indicateursResultats.methodologyVersion}
            </MetaTile>
            <MetaTile label="Périmètre">
              <span className="text-sm font-normal leading-snug text-slate-800">
                {indicateursResultats.scopeLabel}
              </span>
            </MetaTile>
          </dl>
        </header>

        <article className="mt-10 space-y-10 md:mt-12 md:space-y-12">
          <Section id="resultats-principaux" title="Résultats publiés">
            <div className="rounded-2xl border border-[#377CF3]/25 bg-white p-6 shadow-sm lg:grid lg:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:p-8">
              <div className="min-w-0 border-b border-slate-100 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
                  Satisfaction à chaud
                </p>
                <p className="mt-2 font-display text-4xl font-bold tabular-nums text-slate-900 md:text-5xl">
                  {formatNoteSatisfactionSur5()}
                </p>
                <p className="mt-3 text-base font-semibold text-slate-900 lg:text-lg">
                  {formatIndicateurSatisfactionLibelle()}
                </p>
              </div>
              <div className="min-w-0 pt-5 lg:pt-0">
                <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                  {formatIndicateurSatisfactionSousTexte()}
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <li>
                    <strong>Base :</strong> {indicateursResultats.nombreRepondants} questionnaires
                    valides
                  </li>
                  <li>
                    <strong>Échelle :</strong> {indicateursResultats.satisfactionScaleMin} à{' '}
                    {indicateursResultats.satisfactionScaleMax}
                  </li>
                  <li className="sm:col-span-2 xl:col-span-1">
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
            </div>
          </Section>

          <Section id="autres-indicateurs" title="Autres indicateurs">
            <p>
              Les indicateurs ci-dessous ne sont pas publiés tant que leurs numérateurs et
              dénominateurs ne sont pas consolidés de façon vérifiable.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Indicateurs non publiés pour la période {formatPeriodeReferenceAffichage()}
                </caption>
                <thead>
                  <tr className="border-b border-slate-200 bg-[#F2F2F2]">
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900 lg:px-6">
                      Indicateur
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900 lg:w-40">
                      Statut
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900 lg:px-6">
                      Motif
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AUTRES_INDICATEURS.map((item) => (
                    <tr key={item.label} className="border-b border-slate-100 last:border-0">
                      <th scope="row" className="px-4 py-3 font-medium text-slate-900 lg:px-6">
                        {item.label}
                      </th>
                      <td className="px-4 py-3 text-slate-700">{INDICATEUR_NON_PUBLIE_LIBELLE}</td>
                      <td className="px-4 py-3 text-slate-600 lg:px-6">{item.motif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="methodologie" title="Méthodologie">
            <details className="group rounded-xl border border-slate-200 bg-white open:shadow-sm">
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-slate-900 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] [&::-webkit-details-marker]:hidden lg:px-6">
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
              <div className="space-y-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-700 lg:px-6">
                <p>{getMethodeCalculSatisfactionParagraph()}</p>
                <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                      Consolidation périodique — dernière : {formatDateMiseAJourIndicateurs()}
                    </dd>
                  </div>
                </dl>
              </div>
            </details>

            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="rounded-xl border border-slate-200 bg-[#F2F2F2] p-5 lg:p-6">
                <h3 className="font-semibold text-slate-900">Périmètre et exclusions</h3>
                <p className="mt-2">{indicateursResultats.scopeLabel}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {indicateursResultats.scopeExclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 lg:p-6">
                <h3 className="font-semibold text-slate-900">Limites des données</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {indicateursResultats.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="amelioration-continue" title="Comment ces résultats sont utilisés">
            {indicateursResultats.improvementActions.length === 0 ? (
              <p className="max-w-4xl">
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
              <ul className="grid gap-3 lg:grid-cols-2">
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
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,22rem)] lg:items-start lg:gap-8">
              <div className="min-w-0 space-y-4">
                <p>{QUALIOPI_MENTION_PERIMETRE}</p>
                <p className="text-sm text-slate-600">
                  Organisme : {QUALIOPI_LEGAL.raisonSociale} · Certificateur :{' '}
                  {QUALIOPI_LEGAL.organismeCertificateur} · Certificat n°{' '}
                  {QUALIOPI_LEGAL.certificatNumero} · Validité {QUALIOPI_LEGAL.certificatValidite}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
              </div>
              <QualiopiCertificationNotice
                showIndicateursLink={false}
                className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:mt-0 lg:p-6"
              />
            </div>
          </Section>
        </article>
      </div>
    </div>
  );
}
