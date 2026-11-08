import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  TrainingDeliverables,
  TrainingMethod,
} from '@/components/formations/training';
import { TrainingPageLayout } from '@/components/formations/training/TrainingPageLayout';
import { TrainingPresentationExpand } from '@/components/formations/training/TrainingPresentationExpand';
import { SITE_FORMATION_MODALITE_DETAIL } from '@/lib/site-config';
import { TrainingSessionsSection } from '@/components/formations/training/TrainingSessionsSection';
import { TrainingPublicPrerequisitesSection } from '@/components/formations/training/TrainingPublicPrerequisitesSection';
import { TrainingModalitiesSection } from '@/components/formations/training/TrainingModalitiesSection';
import { TrainingParticipantsReviewsSection } from '@/components/formations/training/TrainingParticipantsReviewsSection';
import { TrainingContinueSection } from '@/components/formations/training/TrainingContinueSection';
import { FormateurIntervenantBlock } from '@/components/formateurs/FormateurIntervenantBlock';
import { FormationIaApplicationsSection } from '@/components/formations/ia/FormationIaApplicationsSection';
import { Niv01MaquetteHero } from '@/components/formations/training/niv01-maquette/Niv01MaquetteHero';
import { Niv01MaquetteTrustBar } from '@/components/formations/training/niv01-maquette/Niv01MaquetteTrustBar';
import { Niv01MaquetteFormatSection } from '@/components/formations/training/niv01-maquette/Niv01MaquetteFormatSection';
import { Niv01MaquetteSkillCards } from '@/components/formations/training/niv01-maquette/Niv01MaquetteSkillCards';
import { Niv01MaquetteProgramSection } from '@/components/formations/training/niv01-maquette/Niv01MaquetteProgramSection';
import { Niv01MaquetteFaqSection } from '@/components/formations/training/niv01-maquette/Niv01MaquetteFaqSection';
import { Niv01MaquetteFinalCta } from '@/components/formations/training/niv01-maquette/Niv01MaquetteFinalCta';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { getFormationByCode, isFormationSurDevis } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationIaApplications } from '@/lib/formation-ia';
import type { FAQItem } from '@/lib/faq';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import {
  buildNiv01MaquetteFeaturedFaq,
  buildNiv01MaquetteSecondaryFaq,
} from '@/lib/formation-niv01-maquette-faq';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import { trainingDevisHref } from '@/lib/training-page-helpers';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { catalogueRefShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { isProgrammePdfObsoleteForLegacyCode } from '@/lib/catalogue-2027/pdf-programme';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildFormationPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { TrainingPracticalInfo } from '@/components/formations/training/TrainingPracticalInfo';
import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  content: CatalogueFormationPageContent;
  faqItems?: readonly FAQItem[];
  faqSectionId?: string;
  h1Id?: string;
};

/**
 * Fiche NIV-01 — refonte UI maquette 2026 (contenu Qualiopi inchangé).
 */
export async function TrainingNiv01MaquetteTemplate({
  content,
  faqItems,
  faqSectionId = 'faq-niv-01',
  h1Id = 'formation-niv-01-h1',
}: Props) {
  const ref = content.programmeRef;
  const formation = getFormationByCode(ref)!;
  const seo = getFormationCatalogueSeo(ref);
  const rawPdfHref = content.pdfHref ?? formation.pdfProgramme;
  const pdfHref = isProgrammePdfObsoleteForLegacyCode(ref) ? undefined : rawPdfHref;
  const maillageBlocks = buildFormationPageMaillageBlocks(ref as FormationCatalogueCode).filter(
    (b) => b.id !== 'parcours-metier',
  );
  const priceOverride = content.priceLabelOverride;
  const surDevis = isFormationSurDevis(formation);
  const tarifLabel =
    priceOverride?.inter ??
    (formation.tarifParticipantHt && formation.tarifParticipantHt > 0
      ? libelleTarifParticipantCatalogue(formation.tarifParticipantHt)
      : 'Sur devis');
  const effectifLabel = `${formation.effectifMin} à ${formation.effectifMax} participants`;
  const devisHref = trainingDevisHref(formation.titre);
  const infosPratiques = getInfosPratiquesForCatalogue(ref);
  const hasModalitesSection =
    (infosPratiques.methodes?.length ?? 0) > 0 ||
    Boolean(infosPratiques.modalitePedagogique) ||
    (infosPratiques.modalitesEvaluation?.length ?? 0) > 0 ||
    Boolean(infosPratiques.modalitesAcces) ||
    Boolean(infosPratiques.accessibiliteHandicap);
  const iaApplications = getFormationIaApplications(ref);
  const showFinancementOpcoEtendu = catalogueRefShowsFinancementOpcoEtendu(ref);
  const hasPublicPrerequisSection =
    Boolean(formation.public) ||
    Boolean(content.publicPrerequisites?.length) ||
    Boolean(infosPratiques.prerequis?.trim());

  const mergedFaqItems = mergeCatalogueFormationFaq(ref, faqItems ?? []);
  const featuredFaq = buildNiv01MaquetteFeaturedFaq(mergedFaqItems);
  const secondaryFaq = buildNiv01MaquetteSecondaryFaq(mergedFaqItems, featuredFaq);

  const objectivesTitle = content.objectivesTitle ?? 'Objectifs pédagogiques';
  const programmeHeading = content.programmeHeading ?? 'Programme de la formation';
  const modules = content.programModules ?? [];

  return (
    <div className="formation-niv01-maquette training-page">
      <Niv01MaquetteHero
        h1Id={h1Id}
        title={seo.h1}
        lead={seo.subtitle}
        pdfHref={pdfHref}
      />

      <Niv01MaquetteTrustBar />

      <section className="sr-only" aria-label="En bref">
        <div className="mx-auto max-w-[78rem] px-4 py-2">
          <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
        </div>
      </section>

      <Niv01MaquetteFormatSection
        formationTitle={formation.titre}
        durationLabel={formation.duree}
        interPriceLabel={tarifLabel}
        effectifLabel={effectifLabel}
        showTvaAsterisk={priceOverride ? false : !surDevis}
      />

      <Niv01MaquetteSkillCards
        painPoints={content.painPoints}
        outcomes={content.outcomes}
        outcomesTitle={objectivesTitle}
        outcomesDescription={content.outcomesDescription}
        pedagogicalNote={content.pedagogicalNote}
      />

      {modules.length > 0 ? (
        <Niv01MaquetteProgramSection
          modules={modules}
          programLinks={content.programLinks}
          pdfHref={pdfHref}
          title={programmeHeading}
        />
      ) : null}

      <TrainingPageLayout sidebar={null}>
        <TrainingSection id={TRAINING_ANCHOR.presentation} title="Présentation" tone="white">
          <p className="mb-4 text-base leading-relaxed text-slate-700">{SITE_FORMATION_MODALITE_DETAIL}</p>
          <TrainingPresentationExpand summary={content.programIntro}>
            {content.heroPublicLine ? <p>{content.heroPublicLine}</p> : null}
          </TrainingPresentationExpand>
        </TrainingSection>

        {hasPublicPrerequisSection ? (
          <TrainingPublicPrerequisitesSection
            publicLabel={formation.public}
            blocks={content.publicPrerequisites}
            prerequisitesText={infosPratiques.prerequis}
          />
        ) : null}

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

        <TrainingDeliverables
          items={content.deliverables}
          title={content.deliverablesTitle ?? 'Les + de la formation'}
          description={content.deliverablesIntro}
          id={TRAINING_ANCHOR.atouts}
        />

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

      <Niv01MaquetteFaqSection
        featured={featuredFaq}
        secondary={secondaryFaq}
        id={faqSectionId}
      />

      <Niv01MaquetteFinalCta devisHref={devisHref} pdfHref={pdfHref} />
    </div>
  );
}
