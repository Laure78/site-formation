import type { ReactNode } from 'react';
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
  TrainingSection,
  TrainingTrainer,
  TrainingTrustBar,
} from '@/components/formations/training';
import type {
  CatalogueFormationPageContent,
  CatalogueNavItem,
} from '@/lib/catalogue-formation-page-content';
import { getRelatedCatalogueFormations } from '@/lib/catalogue-formation-related';
import { getFormationByCode, isFormationSurDevis } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import {
  trainingCategoryBadge,
  trainingDevisHref,
} from '@/lib/training-page-helpers';

type Props = {
  content: CatalogueFormationPageContent;
  /** Accordéon ou liste programme — si présent, prioritaire sur content.programModules. */
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

function buildDefaultNav(
  content: CatalogueFormationPageContent,
  faqSectionId: string,
  hasFaq: boolean,
): CatalogueNavItem[] {
  const items: CatalogueNavItem[] = [
    { href: '#programme', label: 'Programme' },
    { href: '#objectifs', label: 'Objectifs' },
    { href: '#pour-qui', label: 'Pour qui ?' },
  ];
  if (content.practicalCase) {
    items.push({ href: '#modalites', label: 'Modalités' });
  }
  items.push(
    { href: '#tarifs-modalites', label: 'Tarif' },
    { href: '#formatrice', label: 'Formatrice' },
  );
  if (hasFaq) {
    items.push({ href: `#${faqSectionId}`, label: 'FAQ' });
  }
  return items;
}

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
  afterIaLimits,
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
  const formatLabel = content.formatLabel ?? 'Présentiel';
  const locationLabel = content.locationLabel ?? 'Île-de-France';
  const hasFaq = Boolean(faqItems && faqItems.length > 0);

  const factCards =
    content.heroFactCards ??
    [
      { label: 'Durée', value: formation.duree },
      { label: 'Niveau', value: content.quickFactsLevel },
      { label: 'Format', value: formatLabel },
      { label: 'Participants', value: effectifLabel },
      ...(content.practiceShare
        ? [{ label: 'Part de pratique', value: content.practiceShare }]
        : []),
      { label: 'Lieu', value: locationLabel },
    ].slice(0, 6);

  const navItems = content.navItems ?? buildDefaultNav(content, faqSectionId, hasFaq);

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
          textLink={content.seoLandingLink}
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

      {navItems.length > 0 ? <TrainingNavigation items={navItems} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-6 md:py-8">
        <div className="mx-auto max-w-3xl">
          <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
        </div>
      </section>

      <TrainingPainPoints
        title={content.painPointsTitle}
        items={content.painPoints}
        id={content.painPointsSectionId}
      />

      <TrainingOutcomes
        outcomes={content.outcomes}
        title={objectivesTitle}
        description={content.outcomesDescription}
        pedagogicalNote={
          content.pedagogicalNote ??
          'L’IA prépare et structure. Le professionnel contrôle et valide.'
        }
      />

      {afterObjectives}

      <TrainingProgram
        title={programmeHeading}
        description={content.programIntro}
        modules={programme ? undefined : content.programModules}
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

      {content.workflow && content.workflow.length > 0 ? (
        <TrainingSection id="deroule" title="Déroulement type" tone="muted">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.workflow.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4"
              >
                <span
                  className="font-display text-lg font-bold text-[#377CF3]"
                  aria-hidden
                >
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
          title="Ce que l’IA aide — ce que vous validez"
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
        title={content.deliverablesTitle ?? 'Ce que vous emportez'}
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
            `${formatLabel} — ${locationLabel}`,
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

      {hasFaq ? <TrainingFAQ items={faqItems!} id={faqSectionId} /> : null}

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
        note={content.finalCta.note ?? 'Rendez-vous découverte · 30 min'}
      />
    </div>
  );
}
