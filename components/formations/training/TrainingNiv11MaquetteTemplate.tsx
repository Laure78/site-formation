import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  TrainingDeliverables,
  TrainingFAQ,
  TrainingMethod,
  TrainingOutcomes,
} from '@/components/formations/training';
import { TrainingPageLayout } from '@/components/formations/training/TrainingPageLayout';
import { TrainingPresentationExpand } from '@/components/formations/training/TrainingPresentationExpand';
import { TrainingSessionsSection } from '@/components/formations/training/TrainingSessionsSection';
import { TrainingPublicPrerequisitesSection } from '@/components/formations/training/TrainingPublicPrerequisitesSection';
import { TrainingModalitiesSection } from '@/components/formations/training/TrainingModalitiesSection';
import { TrainingParticipantsReviewsSection } from '@/components/formations/training/TrainingParticipantsReviewsSection';
import { TrainingContinueSection } from '@/components/formations/training/TrainingContinueSection';
import { TrainingSidebarCard } from '@/components/formations/training/TrainingSidebarCard';
import { FormateurIntervenantBlock } from '@/components/formateurs/FormateurIntervenantBlock';
import { FormationIaApplicationsSection } from '@/components/formations/ia/FormationIaApplicationsSection';
import { Niv11MaquetteHero } from '@/components/formations/training/niv11-maquette/Niv11MaquetteHero';
import { Niv11MaquetteKeyFacts } from '@/components/formations/training/niv11-maquette/Niv11MaquetteKeyFacts';
import { Niv11MaquetteMetierCards } from '@/components/formations/training/niv11-maquette/Niv11MaquetteMetierCards';
import { Niv11MaquetteProgramSection } from '@/components/formations/training/niv11-maquette/Niv11MaquetteProgramSection';
import { Niv11MaquettePedagogyBanner } from '@/components/formations/training/niv11-maquette/Niv11MaquettePedagogyBanner';
import { Niv11MaquetteFinalCta } from '@/components/formations/training/niv11-maquette/Niv11MaquetteFinalCta';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { formatPrixHt, getFormationByCode, isFormationSurDevis } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationIaApplications } from '@/lib/formation-ia';
import type { FAQItem } from '@/lib/faq';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_SESSION_INTRA_NIV11_HT,
} from '@/lib/tarifs-catalogue-participant';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { catalogueRefShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { isProgrammePdfObsoleteForLegacyCode } from '@/lib/catalogue-2027/pdf-programme';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildFormationPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { TrainingPracticalInfo } from '@/components/formations/training/TrainingPracticalInfo';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { getCataloguePublicSessionsForSlug } from '@/lib/catalogue-public-sessions';
import { CtaVisio } from '@/components/CtaVisio';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';

type Props = {
  content: CatalogueFormationPageContent;
  faqItems?: readonly FAQItem[];
  faqSectionId?: string;
  h1Id?: string;
};

/** Fiche NIV-11 — refonte UI maquette (contenu catalogue + Qualiopi inchangés). */
export async function TrainingNiv11MaquetteTemplate({
  content,
  faqItems,
  faqSectionId = 'faq-niv-11',
  h1Id = 'formation-amo-h1',
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
    libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT);
  const intraPriceLabel =
    priceOverride?.intra ??
    `${formatPrixHt(TARIF_SESSION_INTRA_NIV11_HT)} € HT / session de 4 h`;
  const effectifLabel = `${formation.effectifMin} à ${formation.effectifMax} participants`;
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
  const modules = content.programModules ?? [];
  const objectivesTitle = content.objectivesTitle ?? 'Objectifs pédagogiques';
  const programmeHeading = content.programmeHeading ?? 'Le programme de la formation (4 h)';

  const publicSessions = await getCataloguePublicSessionsForSlug(formation.slug);
  const interInscriptionHref =
    publicSessions.length > 0
      ? `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent(formation.titre)}`
      : undefined;

  const sidebarProps = {
    formationTitle: formation.titre,
    durationLabel: formation.duree,
    interPriceLabel: tarifLabel,
    intraPriceLabel,
    showTvaAsterisk: priceOverride ? false : !surDevis,
    effectifLabel,
    pdfHref,
    interInscriptionHref,
  };

  const heroIntro =
    'Analysez les consultations, préparez vos rapports d’analyse des offres et pilotez les intervenants avec ChatGPT et Claude.';

  return (
    <div className="formation-niv11-maquette training-page pb-24 lg:pb-0">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[80rem] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] lg:items-start lg:gap-8 xl:gap-10">
          <div className="min-w-0">
            <Niv11MaquetteHero
              h1Id={h1Id}
              title={seo.h1}
              subtitle={seo.subtitle}
              intro={heroIntro}
              formationTitle={formation.titre}
              pdfHref={pdfHref}
            />
          </div>
          <aside className="hidden px-4 py-6 lg:block lg:px-0 lg:py-8" aria-label="Tarifs et inscription">
            <div className="sticky top-[calc(var(--site-header-height)+0.75rem)] z-20 max-h-[calc(100dvh-var(--site-header-height)-1rem)] overflow-y-auto overscroll-contain pb-4">
              <TrainingSidebarCard {...sidebarProps} />
            </div>
          </aside>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
        <TrainingSidebarCard {...sidebarProps} />
      </div>

      <Niv11MaquetteKeyFacts effectifMin={formation.effectifMin} effectifMax={formation.effectifMax} />

      <section className="sr-only" aria-label="En bref">
        <div className="mx-auto max-w-[78rem] px-4 py-2">
          <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
        </div>
      </section>

      <div className="space-y-14 py-10 sm:space-y-16">
        <Niv11MaquetteMetierCards formationTitle={formation.titre} pdfHref={pdfHref} />

        {modules.length > 0 ? (
          <Niv11MaquetteProgramSection
            modules={modules}
            programLinks={content.programLinks}
            pdfHref={pdfHref}
            title={programmeHeading}
          />
        ) : null}

        <Niv11MaquettePedagogyBanner />
        <Niv11MaquetteFinalCta formationTitle={formation.titre} pdfHref={pdfHref} />
      </div>

      <TrainingPageLayout sidebar={null}>
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
        <PageMaillageSection key={block.id} {...block} tone="white" className="!px-0" />
      ))}

      {mergedFaqItems.length > 0 ? (
        <TrainingFAQ items={mergedFaqItems} id={faqSectionId} />
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[80rem] gap-2">
          <CtaVisio
            src="formation-niv11-amo-sticky"
            variant="primary"
            className="inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm"
          />
          {pdfHref ? (
            <a
              href={pdfHref}
              download
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
            >
              Programme
            </a>
          ) : (
            <Link
              href={`#${TRAINING_ANCHOR.programme}`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
            >
              Programme
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
