import type { ReactNode } from 'react';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import {
  TrainingDeliverables,
  TrainingFAQ,
  TrainingFinalCta,
  TrainingHero,
  TrainingMethod,
  TrainingOutcomes,
  TrainingProgram,
  TrainingSection,
  TrainingTrustBar,
} from '@/components/formations/training';
import { TrainingNavigationWithSpy } from '@/components/formations/training/TrainingNavigationWithSpy';
import { TrainingPageLayout } from '@/components/formations/training/TrainingPageLayout';
import { TrainingPresentationExpand } from '@/components/formations/training/TrainingPresentationExpand';
import { TrainingSessionsSection } from '@/components/formations/training/TrainingSessionsSection';
import { TrainingSidebarCard } from '@/components/formations/training/TrainingSidebarCard';
import { TrainingPublicPrerequisitesSection } from '@/components/formations/training/TrainingPublicPrerequisitesSection';
import { TrainingModalitiesSection } from '@/components/formations/training/TrainingModalitiesSection';
import { TrainingParticipantsReviewsSection } from '@/components/formations/training/TrainingParticipantsReviewsSection';
import { TrainingContinueSection } from '@/components/formations/training/TrainingContinueSection';
import { FormateurIntervenantBlock } from '@/components/formateurs/FormateurIntervenantBlock';
import { FormationIaApplicationsSection } from '@/components/formations/ia/FormationIaApplicationsSection';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { getFormationByCode, isFormationSurDevis } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationIaApplications } from '@/lib/formation-ia';
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import { trainingDevisHref } from '@/lib/training-page-helpers';
import { buildTrainingFicheNavItems, TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { catalogueRefShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { isProgrammePdfObsoleteForLegacyCode } from '@/lib/catalogue-2027/pdf-programme';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildFormationPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { TrainingPracticalInfo } from '@/components/formations/training/TrainingPracticalInfo';
import { getCataloguePublicSessionsForSlug } from '@/lib/catalogue-public-sessions';

type Props = {
  content: CatalogueFormationPageContent;
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
  afterIaLimits?: ReactNode;
};

/**
 * Template de référence des fiches formation catalogue (UX type GERESO).
 * Contenu = `CatalogueFormationPageContent` + `data/formations`.
 */
export async function TrainingPageTemplate({
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
  afterIaLimits,
}: Props) {
  const ref = content.programmeRef;
  const formation = getFormationByCode(ref)!;
  const seo = getFormationCatalogueSeo(ref);
  const rawPdfHref = content.pdfHref ?? formation.pdfProgramme;
  const pdfHref = isProgrammePdfObsoleteForLegacyCode(ref) ? undefined : rawPdfHref;
  const maillageBlocks = buildFormationPageMaillageBlocks(ref as FormationCatalogueCode).filter(
    (b) => b.id !== 'parcours-metier',
  );
  const surDevis = isFormationSurDevis(formation);
  const tarifLabel =
    formation.tarifParticipantHt && formation.tarifParticipantHt > 0
      ? libelleTarifParticipantCatalogue(formation.tarifParticipantHt)
      : 'Sur devis';
  const effectifLabel = `${formation.effectifMin} à ${formation.effectifMax} participants`;
  const devisHref = trainingDevisHref(formation.titre);
  const formatLabel = content.formatLabel ?? 'Présentiel';
  const locationLabel = content.locationLabel ?? 'Île-de-France';
  const hasFaq = Boolean(faqItems && faqItems.length > 0);
  const infosPratiques = getInfosPratiquesForCatalogue(ref);
  const hasModalitesSection =
    (infosPratiques.methodes?.length ?? 0) > 0 ||
    Boolean(infosPratiques.modalitePedagogique) ||
    (infosPratiques.modalitesEvaluation?.length ?? 0) > 0 ||
    Boolean(infosPratiques.modalitesAcces) ||
    Boolean(infosPratiques.accessibiliteHandicap);
  const iaApplications = getFormationIaApplications(ref);
  const hasProgramme = Boolean(
    programme || (content.programModules && content.programModules.length > 0),
  );
  const showFinancementOpcoEtendu = catalogueRefShowsFinancementOpcoEtendu(ref);
  const hasPublicPrerequisSection =
    Boolean(formation.public) ||
    Boolean(content.publicPrerequisites?.length) ||
    Boolean(infosPratiques.prerequis?.trim());

  const publicSessions = await getCataloguePublicSessionsForSlug(formation.slug);
  const interInscriptionHref =
    publicSessions.length > 0
      ? `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent(formation.titre)}`
      : undefined;

  const factCards = [
    { label: 'Durée', value: formation.duree },
    { label: 'Format', value: `${formatLabel} · ${locationLabel}` },
    { label: 'Effectif', value: effectifLabel },
  ];

  const navItems =
    content.navItems ??
    buildTrainingFicheNavItems({
      hasPublicPrerequis: hasPublicPrerequisSection,
      hasModalites: hasModalitesSection,
      hasProgramme,
      hasApplicationsIa: Boolean(iaApplications),
      hasFaq,
      faqSectionId,
      hasFinancementOpcoEtendu: showFinancementOpcoEtendu,
      hasAvis: true,
    });

  const programmeHeading = content.programmeHeading ?? 'Programme de la formation';
  const objectivesTitle = content.objectivesTitle ?? 'Objectifs pédagogiques';

  const finalPrimaryHref = content.finalCta.devisHref ?? LINKS.prendreRdv;
  const finalSecondaryHref = content.finalCta.secondaryHref ?? devisHref;

  const sidebarProps = {
    formationTitle: formation.titre,
    durationLabel: formation.duree,
    interPriceLabel: tarifLabel,
    intraPriceLabel: surDevis ? 'Tarif sur devis' : undefined,
    showTvaAsterisk: !surDevis,
    effectifLabel,
    pdfHref,
    interInscriptionHref,
  };

  return (
    <div className="training-page">
      {customHero ? (
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[78rem] px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] lg:items-start lg:gap-8 xl:gap-10">
            <div className="min-w-0 [&>section]:border-b-0">{customHero}</div>
            <aside className="hidden py-8 lg:block" aria-label="Tarifs et inscription">
              <div className="sticky top-[calc(var(--site-header-height)+0.75rem)] z-20 max-h-[calc(100dvh-var(--site-header-height)-1rem)] overflow-y-auto overscroll-contain pb-4">
                <TrainingSidebarCard {...sidebarProps} />
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <TrainingHero
          titleId={h1Id}
          title={seo.h1}
          subtitle={seo.subtitle}
          lead={<p className="text-base leading-relaxed text-slate-600">{content.programIntro}</p>}
          badges={[{ label: content.levelBadgeLabel, variant: 'level' as const }]}
          factCards={factCards}
          media={null}
          priceSlot={
            <div className="space-y-1 text-base text-slate-800 lg:hidden">
              <p className="font-semibold">
                {tarifLabel}
                {!surDevis ? <MentionTvaAsterisque /> : null}
              </p>
              <p className="text-sm text-slate-600">{effectifLabel}</p>
            </div>
          }
          textLink={content.seoLandingLink}
          commercialAside={<TrainingSidebarCard {...sidebarProps} />}
          hideHeroCtasFromLg
          showQualiopiInfoLink={false}
        />
      )}

      {content.showTrustBar !== false ? (
        <TrainingTrustBar
          programmeVersionLabel={`Programme mis à jour le ${formation.programmeUpdatedAt} — Référence ${ref}`}
        />
      ) : null}

      {navItems.length > 0 ? <TrainingNavigationWithSpy items={navItems} /> : null}

      <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
        <div className="mx-auto max-w-[78rem]">
          <TrainingSidebarCard {...sidebarProps} />
        </div>
      </div>

      <TrainingPageLayout sidebar={null}>
        {!customHero ? (
          <section className="border-b border-slate-200 bg-white px-4 py-6 md:py-8">
            <div className="mx-auto max-w-[78rem]">
              <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
            </div>
          </section>
        ) : null}

        <TrainingSection id={TRAINING_ANCHOR.presentation} title="Présentation" tone="white">
          <TrainingPresentationExpand summary={content.programIntro}>
            {content.heroPublicLine ? <p>{content.heroPublicLine}</p> : null}
          </TrainingPresentationExpand>
        </TrainingSection>

        <TrainingOutcomes
          outcomes={content.outcomes}
          title={objectivesTitle}
          description={content.outcomesDescription}
          variant="checklist"
          pedagogicalNote={
            content.pedagogicalNote ??
            'L’IA prépare et structure. Le professionnel contrôle et valide.'
          }
        />

        {afterObjectives}

        {hasPublicPrerequisSection ? (
          <TrainingPublicPrerequisitesSection
            publicLabel={formation.public}
            blocks={content.publicPrerequisites}
            prerequisitesText={infosPratiques.prerequis}
          />
        ) : null}

        <TrainingProgram
          title={programmeHeading}
          modules={programme ? undefined : content.programModules}
          methodsBullets={content.programmeMethodsBullets}
          programLinks={content.programLinks}
          pdfHref={programme ? undefined : pdfHref}
        >
          {programme}
        </TrainingProgram>

        {programmeSupplement}
        {afterProgrammeSupplement}

        {hasModalitesSection ? <TrainingModalitiesSection programmeRef={ref} /> : null}

        <TrainingSessionsSection formationTitle={formation.titre} formationSlug={formation.slug} />

        <TrainingParticipantsReviewsSection programmeRef={ref as FormationCatalogueCode} />

        {content.practicalCase ? (
          <TrainingMethod
            id="cas-fil-rouge"
            title={content.practicalCase.title}
            paragraphs={content.practicalCase.paragraphs}
            steps={content.practicalCase.steps}
            note={content.practicalCase.note}
          />
        ) : null}

        {iaApplications ? (
          <FormationIaApplicationsSection bundle={iaApplications} />
        ) : null}

        {content.workflow && content.workflow.length > 0 ? (
          <TrainingSection id="deroule" title="Déroulement type" tone="muted">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.workflow.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4"
                >
                  <span className="font-display text-lg font-bold text-[#377CF3]" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base text-slate-800">{step}</span>
                </li>
              ))}
            </ol>
          </TrainingSection>
        ) : null}

        {content.iaLimits && content.iaLimits.length > 0 ? (
          <TrainingSection
            id="limites-ia"
            title={content.iaLimitsTitle ?? 'Ce que l’IA aide — ce que vous validez'}
            tone="white"
          >
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full w-full text-left text-sm md:text-base">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      L’IA aide à…
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Vous validez…
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.iaLimits.map((row) => (
                    <tr key={row.iaAide} className="border-t border-slate-100">
                      <td className="px-4 py-3 text-slate-800">{row.iaAide}</td>
                      <td className="px-4 py-3 text-slate-800">{row.validation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TrainingSection>
        ) : null}

        {afterIaLimits}

        <TrainingDeliverables
          items={content.deliverables}
          title={content.deliverablesTitle ?? 'Les + de la formation'}
          description={content.deliverablesIntro}
          id={TRAINING_ANCHOR.atouts}
        />

        {afterDeliverables}
        {beforeTariffs}
        {tariffsSection}

        <FormateurIntervenantBlock
          formationCode={ref}
          title={content.instructorTitle ?? 'Formateur'}
        />

        <TrainingPracticalInfo programmeRef={ref} publicCible={formation.public} />

        {showFinancementOpcoEtendu ? (
          <FinancementOpcoEtenduCourtBlock className="border-b border-slate-200 bg-white px-0 py-8 md:py-10" />
        ) : null}
      </TrainingPageLayout>

      <TrainingContinueSection programmeRef={ref as FormationCatalogueCode} />

      {maillageBlocks.map((block) => (
        <PageMaillageSection key={block.id} {...block} />
      ))}

      {hasFaq ? <TrainingFAQ items={faqItems!} id={faqSectionId} /> : null}

      <TrainingFinalCta
        variant="dark"
        primaryHref={finalPrimaryHref}
        primaryLabel={
          content.finalCta.primaryLabel ?? 'Réservez votre visio découverte gratuite'
        }
        secondaryHref={finalSecondaryHref}
        secondaryLabel={content.finalCta.secondaryLabel ?? 'Demander un devis'}
        title={content.finalCta.title}
        description={content.finalCta.description}
        note={content.finalCta.note ?? 'Rendez-vous découverte · 30 min'}
      />
    </div>
  );
}
