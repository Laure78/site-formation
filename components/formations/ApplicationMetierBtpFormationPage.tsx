import Link from 'next/link';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationCourseHero } from '@/components/formations/FormationCourseHero';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { ApplicationMetierTarifBlock } from '@/components/formations/ApplicationMetierTarifBlock';
import { ApplicationMetierLearningPath } from '@/components/formations/ApplicationMetierLearningPath';
import { ApplicationMetierParcoursStepNav } from '@/components/formations/ApplicationMetierParcoursStepNav';
import { ApplicationMetierParcoursContinueSection } from '@/components/formations/ApplicationMetierParcoursContinueSection';
import { getFormationByCode, libelleDureeFormation, libelleEffectifMaxFormation } from '@/data/formations';
import { getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import {
  FINANCEMENT_APPLICATION_METIER_BTP_DETAIL,
} from '@/lib/tarifs-applications-metier-btp';
import type { ApplicationMetierNiveauConfig } from '@/lib/parcours-applications-metier-btp-content';
import { buildCatalogueCourseApplicationMetierJsonLd } from '@/lib/schema-catalogue-course-jsonld';
import {
  APPLICATION_METIER_PARCOURS_MOTHER,
  getApplicationMetierParcoursStepByRef,
} from '@/lib/application-metier-btp-parcours-nav';

type Props = {
  config: ApplicationMetierNiveauConfig;
};

export function ApplicationMetierBtpFormationPage({ config }: Props) {
  const formation = getFormationByCode(config.ref)!;
  const parcoursStep = getApplicationMetierParcoursStepByRef(config.ref);
  const courseSchema = buildCatalogueCourseApplicationMetierJsonLd(config.ref);
  const faqSchema = getFAQSchema(config.faq);

  return (
    <div>
      <JsonLd id={`schema-course-${config.ref.toLowerCase()}`} schema={courseSchema} />
      {faqSchema ? <JsonLd id={`schema-faq-${config.slug}`} schema={faqSchema} /> : null}

      <FormationCourseHero
        catalogueRef={config.ref}
        programmePdfAfterHero={false}
        backLink={{
          href: APPLICATION_METIER_PARCOURS_MOTHER.path,
          label: APPLICATION_METIER_PARCOURS_MOTHER.backLabel,
        }}
        refLine={`Intra-entreprise · présentiel · ${libelleDureeFormation(formation)} · ${libelleEffectifMaxFormation(formation)} · ${parcoursStep.stepBadge}`}
        title={config.h1}
        subtitle={config.subtitle}
        badges={['Applications métier', 'Développement assisté par l’IA', 'Organisme Qualiopi']}
        summaryItems={[
          config.promesseRealiste,
          'Compétences transversales — pas un logiciel imposé',
          'Validation métier de votre côté',
        ]}
        ctas={
          <RdvLink
            variant="primary"
            campaign={`application-metier-btp-${config.slug}-hero`}
           />
        }
        footerLinks={
          <>
            <Link href={LINKS.formations} className={OFC_LINK}>
              {APPLICATION_METIER_PARCOURS_MOTHER.linkCatalogueLabel}
            </Link>
          </>
        }
      >
        <p>{config.positionnement}</p>
      </FormationCourseHero>

      <section className="border-b border-slate-200 bg-white px-4 pb-10">
        <div className="mx-auto max-w-4xl space-y-8">
          <ApplicationMetierParcoursStepNav step={parcoursStep} />
          <ApplicationMetierLearningPath currentStep={parcoursStep.step} />
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <ApplicationMetierTarifBlock tarifKey={config.tarifKey} duree={config.duree} />
          <p className="mt-4 text-sm text-slate-600">{FINANCEMENT_APPLICATION_METIER_BTP_DETAIL}</p>
        </div>
      </section>

      <FormationCatalogueGeoSections catalogueRef={config.ref} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            {parcoursStep.stepBadge}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {config.progressionTagline}
          </h2>
          <p className="mt-4 text-slate-600">{config.positionnement}</p>
          <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <strong className="text-slate-900">Prérequis :</strong> {config.prerequis}
          </p>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <ul className="mt-6 space-y-3">
            {config.objectifs.map((obj) => (
              <li key={obj} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} aria-hidden />
                {obj}
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] p-4 text-sm text-slate-800">
            {config.promesseRealiste}
          </p>
        </div>
      </section>

      <section id="programme" className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme — {config.duree}
          </h2>
          <div className="mt-8 space-y-6">
            {config.modules.map((mod, i) => (
              <div
                key={mod.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                  <span className="text-sm text-slate-500">{mod.duree}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {mod.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--accent)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ApplicationMetierParcoursContinueSection step={parcoursStep} />

      {config.casUsageExemples?.length ? (
        <section className={OFC_SEC.muted}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Exemples de cas d&apos;usage
            </h2>
            <p className="mt-3 text-slate-600">
              Illustrations possibles — ce ne sont pas des modules obligatoires du programme.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {config.casUsageExemples.map((cas) => (
                <div key={cas.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{cas.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    {cas.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FormationCatalogueIndicateur1Suite programmeRef={config.ref} />

      <FAQSection items={config.faq} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Prochaine étape
          </h2>
          <p className="mt-3 text-slate-600">
            Échangeons sur votre projet d&apos;application métier — visio découverte de 30 minutes, sans engagement.
          </p>
          <RdvLink
            className="mt-8"
            variant="primary"
            campaign={`application-metier-btp-${config.slug}-footer`}
           />
        </div>
      </section>
    </div>
  );
}
