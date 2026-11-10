import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  TrainingDeliverables,
  TrainingFAQ,
  TrainingMethod,
  TrainingOutcomes,
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
import { TrainingMaquetteMarketing } from '@/components/formations/training/TrainingMaquetteMarketing';
import { Niv13AgentsMetierCards } from '@/components/formations/training/niv13-maquette/Niv13AgentsMetierCards';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { getFormationByCode } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import type { FAQItem } from '@/lib/faq';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { catalogueRefShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { isProgrammePdfObsoleteForLegacyCode } from '@/lib/catalogue-2027/pdf-programme';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildFormationPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { TrainingPracticalInfo } from '@/components/formations/training/TrainingPracticalInfo';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { Clock, MapPin, Percent, Users, Workflow } from 'lucide-react';

type Props = {
  content: CatalogueFormationPageContent;
  faqItems?: readonly FAQItem[];
  faqSectionId?: string;
  h1Id?: string;
};

const NIV13_KEY_FACTS = [
  { icon: Clock, sub: '7 heures' },
  { icon: MapPin, sub: 'Présentiel · Île-de-France' },
  { icon: Users, sub: 'Dirigeants et conducteurs de travaux' },
  { icon: Workflow, sub: 'Make AI Agents' },
  { icon: Percent, sub: '70 % de pratique' },
] as const;

/** Fiche NIV-13 — agents IA autonomes (Make) · maquette catalogue. */
export async function TrainingNiv13MaquetteTemplate({
  content,
  faqItems,
  faqSectionId = 'faq-niv-13',
  h1Id = 'formation-niv-13-h1',
}: Props) {
  const ref = content.programmeRef;
  const formation = getFormationByCode(ref)!;
  const seo = getFormationCatalogueSeo(ref);
  const rawPdfHref = content.pdfHref ?? formation.pdfProgramme;
  const pdfHref =
    rawPdfHref && !isProgrammePdfObsoleteForLegacyCode(ref) ? rawPdfHref : undefined;
  const maillageBlocks = buildFormationPageMaillageBlocks(ref as FormationCatalogueCode).filter(
    (b) => b.id !== 'parcours-metier',
  );
  const infosPratiques = getInfosPratiquesForCatalogue(ref);
  const hasModalitesSection =
    (infosPratiques.methodes?.length ?? 0) > 0 ||
    Boolean(infosPratiques.modalitePedagogique) ||
    (infosPratiques.modalitesEvaluation?.length ?? 0) > 0 ||
    Boolean(infosPratiques.modalitesAcces) ||
    Boolean(infosPratiques.accessibiliteHandicap);
  const showFinancementOpcoEtendu = catalogueRefShowsFinancementOpcoEtendu(ref);
  const hasPublicPrerequisSection =
    Boolean(formation.public) ||
    Boolean(content.publicPrerequisites?.length) ||
    Boolean(infosPratiques.prerequis?.trim());

  const mergedFaqItems = mergeCatalogueFormationFaq(ref, faqItems ?? []);
  const modules = content.programModules ?? [];
  const objectivesTitle = content.objectivesTitle;

  return (
    <div className="formation-niv13-maquette training-page pb-24 lg:pb-0">
      <TrainingMaquetteMarketing
        programmeRef={ref as FormationCatalogueCode}
        h1Id={h1Id}
        heroH1={seo.h1}
        formationTitle={formation.titre}
        effectifMin={formation.effectifMin}
        effectifMax={formation.effectifMax}
        pdfHref={pdfHref}
        programModules={modules}
        programmeHeading={content.programmeHeading}
        indicatorItems={NIV13_KEY_FACTS}
        ctaMode="programme-devis"
      />

      <div className="mx-auto max-w-[80rem] py-10 sm:py-12">
        <Niv13AgentsMetierCards />
      </div>

      <section className="sr-only" aria-label="En bref">
        <div className="mx-auto max-w-[78rem] px-4 py-2">
          <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
        </div>
      </section>

      <TrainingPageLayout sidebar={null}>
        <TrainingSection id={TRAINING_ANCHOR.presentation} title="Présentation" tone="white">
          <p className="mb-4 text-base leading-relaxed text-slate-700">{SITE_FORMATION_MODALITE_DETAIL}</p>
          <TrainingPresentationExpand summary={content.programIntro}>
            {content.heroPublicLine ? <p>{content.heroPublicLine}</p> : null}
          </TrainingPresentationExpand>
        </TrainingSection>

        <TrainingOutcomes
          outcomes={content.outcomes}
          title={objectivesTitle ?? 'Après la formation, vous saurez'}
          description={content.outcomesDescription}
          variant="checklist"
          pedagogicalNote={
            content.pedagogicalNote ??
            'L’agent exécute ce que vous avez configuré — vous gardez la validation avant tout envoi ou engagement.'
          }
        />

        {content.workflow && content.workflow.length > 0 ? (
          <TrainingMethod steps={content.workflow} />
        ) : null}

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

        {content.iaLimits && content.iaLimits.length > 0 ? (
          <TrainingSection
            id="limites-ia"
            title={content.iaLimitsTitle ?? 'Ce que l’agent aide — ce que vous validez'}
            tone="white"
          >
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full w-full text-left text-sm md:text-base">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      L’agent peut…
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
          title={content.deliverablesTitle}
          description={content.deliverablesIntro}
          id={TRAINING_ANCHOR.atouts}
        />

        <FormateurIntervenantBlock formationCode={ref} title={content.instructorTitle ?? 'Formateur'} />

        <TrainingPracticalInfo programmeRef={ref} publicCible={formation.public} />

        {showFinancementOpcoEtendu ? (
          <FinancementOpcoEtenduCourtBlock className="border-b border-slate-200 bg-white px-0 py-8 md:py-10" />
        ) : null}
      </TrainingPageLayout>

      <TrainingContinueSection programmeRef={ref as FormationCatalogueCode} />

      {maillageBlocks.map((block) => (
        <PageMaillageSection key={block.id} {...block} tone="white" className="!px-0" />
      ))}

      {mergedFaqItems.length > 0 ? (
        <TrainingFAQ items={mergedFaqItems} id={faqSectionId} />
      ) : null}
    </div>
  );
}
