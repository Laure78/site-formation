import type { ReactNode } from 'react';
import Link from 'next/link';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { FormationBeworkPasserelle } from '@/components/formations/FormationBeworkPasserelle';
import { CatalogueFormationRelated } from '@/components/formations/catalogue/CatalogueFormationRelated';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import {
  TrainingDeliverables,
  TrainingFAQ,
  TrainingFinalCta,
  TrainingHero,
  TrainingMethod,
  TrainingNavigation,
  TrainingOutcomes,
  TrainingPainPoints,
  TrainingPracticalInfo,
  TrainingPricing,
  TrainingProgram,
  TrainingTrainer,
  TrainingTrustBar,
} from '@/components/formations/training';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { getRelatedCatalogueFormations } from '@/lib/catalogue-formation-related';
import { getFormationByCode, isFormationSurDevis } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import {
  trainingCategoryBadge,
  trainingDevisHref,
} from '@/lib/training-page-helpers';

type Props = {
  content: CatalogueFormationPageContent;
  /** Accordéon ou liste programme — si absent, utilise content.programModules. */
  programme?: ReactNode;
  faqItems?: readonly FAQItem[];
  faqSectionId?: string;
  h1Id?: string;
  afterObjectives?: ReactNode;
  afterDeliverables?: ReactNode;
  customHero?: ReactNode;
  tariffsSection?: ReactNode;
  programmeSupplement?: ReactNode;
  afterProgrammeSupplement?: ReactNode;
  beforeTariffs?: ReactNode;
};

/**
 * Template de référence des fiches formation catalogue.
 * Contenu = `CatalogueFormationPageContent` + `data/formations` (tarifs, effectifs, durée).
 */
export function TrainingPageTemplate({
  content,
  programme,
  faqItems,
  faqSectionId = 'faq',
  h1Id = 'formation-h1',
  afterObjectives,
  afterDeliverables,
  customHero,
  tariffsSection,
  programmeSupplement,
  afterProgrammeSupplement,
  beforeTariffs,
}: Props) {
  const ref = content.programmeRef;
  const formation = getFormationByCode(ref)!;
  const seo = getFormationCatalogueSeo(ref);
  const pdfHref = content.pdfHref ?? formation.pdfProgramme;
  const related = getRelatedCatalogueFormations(ref);
  const surDevis = isFormationSurDevis(formation);
  const tarifLabel =
    formation.tarifParticipantHt && formation.tarifParticipantHt > 0
      ? libelleTarifParticipantCatalogue(formation.tarifParticipantHt)
      : 'Sur devis';
  const effectifLabel = `${formation.effectifMin} à ${formation.effectifMax} participants`;
  const devisHref = trainingDevisHref(formation.titre);

  const factCards =
    content.heroFactCards ??
    [
      { label: 'Durée', value: formation.duree },
      { label: 'Niveau', value: content.quickFactsLevel },
      { label: 'Format', value: content.formatLabel ?? 'Présentiel' },
      { label: 'Participants', value: effectifLabel },
      ...(content.practiceShare
        ? [{ label: 'Part de pratique', value: content.practiceShare }]
        : []),
      {
        label: content.formatLabel ? 'Présentiel / distanciel' : 'Lieu',
        value: content.formatLabel
          ? `${content.formatLabel}${content.locationLabel ? ` · ${content.locationLabel}` : ''}`
          : (content.locationLabel ?? 'Île-de-France'),
      },
    ].slice(0, 6);

  const programmeHeading =
    content.programmeHeading ?? `Programme — ${formation.duree}`;
  const objectivesTitle =
    content.objectivesTitle ?? 'Après la formation, vous saurez…';

  const finalPrimaryHref = content.finalCta.devisHref ?? LINKS.prendreRdv;
  const finalSecondaryHref = content.finalCta.secondaryHref ?? devisHref;

  return (
    <div className="training-page">
      {customHero ?? (
        <TrainingHero
          titleId={h1Id}
          title={seo.h1}
          subtitle={seo.subtitle}
          lead={
            content.heroPublicLine ? (
              <p>
                <span className="font-medium text-slate-800">Pour qui :</span>{' '}
                {content.heroPublicLine}
              </p>
            ) : undefined
          }
          badges={[
            { label: trainingCategoryBadge(content.parcoursKind), variant: 'category' },
            { label: content.levelBadgeLabel, variant: 'level' },
          ]}
          factCards={factCards}
          priceSlot={
            <div className="space-y-1 text-base text-slate-800">
              <p className="font-semibold">
                {tarifLabel}
                {!surDevis ? <MentionTvaAsterisque /> : null}
              </p>
              <p className="text-sm text-slate-600">{effectifLabel}</p>
            </div>
          }
          catalogueRef={ref}
          primaryCta={{ href: LINKS.contact, label: 'Demander un devis' }}
          secondaryCta={
            pdfHref
              ? { href: pdfHref, label: 'Télécharger le programme', download: true }
              : undefined
          }
          ctaNote={
            <p>
              Réponse sous 48 heures ouvrées · {FINANCEMENT_FORMULATION_COURTE}
            </p>
          }
        />
      )}

      {content.showTrustBar !== false ? (
        <TrainingTrustBar
          programmeVersionLabel={`${formation.programmeVersion} du ${formation.programmeUpdatedAt}`}
        />
      ) : null}

      {content.navItems && content.navItems.length > 0 ? (
        <TrainingNavigation items={content.navItems} />
      ) : null}

      <section className="border-b border-slate-200 bg-white px-4 py-6 md:py-8">
        <div className="mx-auto max-w-3xl">
          <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
        </div>
      </section>

      <TrainingPainPoints title={content.painPointsTitle} items={content.painPoints} />

      <TrainingOutcomes
        outcomes={content.outcomes}
        title={objectivesTitle}
        description={content.outcomesDescription}
        pedagogicalNote={content.pedagogicalNote}
      />

      {afterObjectives}

      <TrainingProgram
        title={programmeHeading}
        description={content.programIntro}
        modules={content.programModules}
        programLinks={content.programLinks}
        pdfHref={programme || content.programModules ? undefined : pdfHref}
      >
        {programme}
      </TrainingProgram>

      {programmeSupplement}
      {afterProgrammeSupplement}

      {content.practicalCase ? (
        <TrainingMethod
          title={content.practicalCase.title}
          paragraphs={content.practicalCase.paragraphs}
          steps={content.practicalCase.steps}
          note={content.practicalCase.note}
        />
      ) : null}

      <TrainingDeliverables
        items={content.deliverables}
        title={content.deliverablesTitle}
        description={content.deliverablesIntro}
      />

      {afterDeliverables}

      {content.publicPrerequisites && content.publicPrerequisites.length > 0 ? (
        <section className="scroll-mt-[calc(var(--site-header-height)+3.25rem)] border-b border-slate-200 bg-white px-4 py-12 md:py-16">
          <div className="mx-auto max-w-[78rem]">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem]">
              Public et prérequis
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-700">{formation.public}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.publicPrerequisites.map((block) => (
                <div key={block.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">{block.title}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-slate-700">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {beforeTariffs}

      {tariffsSection ?? (
        <TrainingPricing
          priceLabel={tarifLabel}
          effectifLabel={effectifLabel}
          durationLabel={formation.duree}
          bullets={[
            `${content.formatLabel ?? 'Présentiel'} — ${content.locationLabel ?? 'Île-de-France'}`,
            'Dans les locaux de l’entreprise ou session collective selon calendrier',
            'Programme adaptable aux besoins de l’équipe',
            ...(content.intraExtraBullets ?? []),
            ...(content.interExtraBullets ?? []),
          ]}
          devisHref={devisHref}
          showTvaAsterisk={!surDevis}
        />
      )}

      <TrainingTrainer title={content.instructorTitle} body={content.instructorBody} />

      {/* Marqueur audit Qualiopi fiches : catalogueRef={ref} */}
      <TrainingPracticalInfo programmeRef={ref} publicCible={formation.public} />

      {related.length > 0 ? <CatalogueFormationRelated items={related} /> : null}

      {content.seoLandingLink ? (
        <div className="border-b border-slate-200 bg-white px-4 py-6 md:py-8">
          <div className="mx-auto max-w-[78rem]">
            <p className="text-base text-slate-700">
              <Link href={content.seoLandingLink.href} className={`font-semibold ${OFC_LINK}`}>
                ← {content.seoLandingLink.label}
              </Link>
            </p>
          </div>
        </div>
      ) : null}

      {faqItems && faqItems.length > 0 ? (
        <TrainingFAQ items={faqItems} id={faqSectionId} />
      ) : null}

      {content.showBeworkPasserelle !== false ? <FormationBeworkPasserelle /> : null}

      <TrainingFinalCta
        variant="dark"
        primaryHref={finalPrimaryHref}
        primaryLabel={
          content.finalCta.primaryLabel ?? 'Échanger sur votre projet de formation'
        }
        secondaryHref={finalSecondaryHref}
        secondaryLabel={content.finalCta.secondaryLabel ?? 'Demander un devis'}
        title={content.finalCta.title}
        description={content.finalCta.description}
        note={content.finalCta.note}
      />
    </div>
  );
}
