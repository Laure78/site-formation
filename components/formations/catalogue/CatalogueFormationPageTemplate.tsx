import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Download } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { FormationHeroPhoto } from '@/components/formations/FormationCourseHero';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import {
  SESSION_DUREE_LIBELLE,
  MENTION_ABONNEMENTS_IA_HORS_FORFAIT,
  libelleTarifIntraParSession,
  libelleTarifInterParParticipant,
  getTarifGrilleFromDureeLibelle,
} from '@/lib/tarifs-sessions';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode } from '@/data/formations';
import { PHOTOS } from '@/lib/photos';
import {
  formatNoteSatisfactionAffichageComplet,
  formatPeriodeReferenceAffichage,
  formatVolumeProsFormesBtpLibelle,
} from '@/lib/data/indicateurs-resultats';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { FormationBeworkPasserelle } from '@/components/formations/FormationBeworkPasserelle';
import { TrainingFinalCta, TrainingObjectives, TrainingQuickFacts } from '@/components/formations/training';
import { trainingCategoryBadge, trainingDevisHref } from '@/lib/training-page-helpers';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import type { FAQItem } from '@/lib/faq';
import { getRelatedCatalogueFormations } from '@/lib/catalogue-formation-related';
import { CatalogueFormationRelated } from '@/components/formations/catalogue/CatalogueFormationRelated';

type Props = {
  content: CatalogueFormationPageContent;
  /** Accordéon ou liste programme — spécifique à la formation. */
  programme: ReactNode;
  faqItems: readonly FAQItem[];
  faqSectionId: string;
  h1Id: string;
  /** Ex. encart événement AO sur NIV-02. */
  afterObjectives?: ReactNode;
};

const PORTRAIT = PHOTOS.portraitPro2026;

export function CatalogueFormationPageTemplate({
  content,
  programme,
  faqItems,
  faqSectionId,
  h1Id,
  afterObjectives,
}: Props) {
  const ref = content.programmeRef;
  const FORMATION = getFormationByCode(ref)!;
  const CATALOGUE_SEO = getFormationCatalogueSeo(ref);
  const GRILLE = getTarifGrilleFromDureeLibelle(FORMATION.duree);
  const CATALOGUE_VISUEL = getFormationCatalogueVisuel(ref);
  const pdfHref = content.pdfHref ?? FORMATION.pdfProgramme;
  const related = getRelatedCatalogueFormations(ref);

  const instructorTitle =
    content.instructorTitle ?? 'Une formation conçue pour les professionnels du BTP';
  const instructorBody =
    content.instructorBody ??
    'Laure Olivié, formatrice en IA générative appliquée au BTP, s’appuie sur une expérience du bâtiment et des travaux publics. Organisme OFC Création d’Entreprise, certifié Qualiopi. Références vérifiables : FFB Grand Paris, CSFE, CNAM Entreprise, Le Moniteur Formations.';

  return (
    <>
      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-8">
          <div className="min-w-0">
            <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
              Catalogue des formations IA pour le BTP
            </Link>
            <p className="mt-3 inline-flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                {trainingCategoryBadge(content.parcoursKind)}
              </span>
              <span className="rounded-full bg-[#377CF3]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#377CF3]">
                {content.levelBadgeLabel}
              </span>
            </p>
            <h1
              id={h1Id}
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">{CATALOGUE_SEO.subtitle}</p>
            {content.heroPublicLine ? (
              <p className="mt-2 max-w-2xl text-base text-slate-600">{content.heroPublicLine}</p>
            ) : null}

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {content.heroFacts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base font-medium text-slate-800"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1.5 text-base text-slate-800">
              <p>
                Intra-entreprise : {libelleTarifIntraParSession(GRILLE.intraHT)}
                <MentionTvaAsterisque />
              </p>
              {GRILLE.interHT != null ? (
                <p>
                  Interentreprises : {libelleTarifInterParParticipant(GRILLE.interHT)}
                  <MentionTvaAsterisque />
                </p>
              ) : null}
            </div>

            <FormationHeroOutilsNote catalogueRef={ref} className="mt-5" />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.contact}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Demander un devis
              </Link>
              {pdfHref ? (
                <a
                  href={pdfHref}
                  download
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
                >
                  <Download size={18} aria-hidden />
                  Télécharger le programme
                </a>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Réponse sous 48 heures ouvrées · {FINANCEMENT_FORMULATION_COURTE}
            </p>
            <p className="mt-2 text-sm">
              <a href="#informations-pratiques" className={OFC_LINK}>
                Informations réglementaires Qualiopi
              </a>
            </p>
          </div>

          <div>
            <FormationHeroPhoto
              src={CATALOGUE_VISUEL.src}
              alt={CATALOGUE_VISUEL.alt}
              width={CATALOGUE_VISUEL.width}
              height={CATALOGUE_VISUEL.height}
              title={
                'title' in CATALOGUE_VISUEL && typeof CATALOGUE_VISUEL.title === 'string'
                  ? CATALOGUE_VISUEL.title
                  : undefined
              }
              priority
            />
          </div>
        </div>
      </section>

      <TrainingQuickFacts
        facts={[
          { label: 'Durée', value: FORMATION.duree },
          { label: 'Format', value: 'Présentiel' },
          { label: 'Lieu', value: 'Île-de-France' },
          {
            label: 'Effectif',
            value: `${FORMATION.effectifMin} à ${FORMATION.effectifMax} participants`,
          },
          { label: 'Niveau', value: content.quickFactsLevel },
          { label: 'Public', value: FORMATION.public },
          {
            label: 'Tarif',
            value: `Intra ${libelleTarifIntraParSession(GRILLE.intraHT)}${
              GRILLE.interHT != null
                ? ` · Inter dès ${libelleTarifInterParParticipant(GRILLE.interHT)}`
                : ''
            }`,
          },
        ]}
      />

      <TrainingObjectives
        objectives={content.outcomes}
        title="Après cette formation, vous saurez…"
        description={content.outcomesDescription}
      />

      {afterObjectives}

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-5" aria-label="Preuves et indicateurs">
        <div className="mx-auto max-w-6xl">
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-700 md:text-base">
            <li>Organisme certifié Qualiopi</li>
            <li>Formation spécialisée BTP</li>
            <li>{formatVolumeProsFormesBtpLibelle()}</li>
            <li>
              Satisfaction : {formatNoteSatisfactionAffichageComplet()} ({formatPeriodeReferenceAffichage()})
            </li>
            <li>
              Programme actualisé — {FORMATION.programmeVersion} du {FORMATION.programmeUpdatedAt}
            </li>
          </ul>
          <IndicateursResultatsLink className="mt-2 text-left" />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <ShortAnswerBlock>{CATALOGUE_SEO.enBref}</ShortAnswerBlock>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{content.painPointsTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {content.painPoints.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-base text-slate-700">{item.texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {content.practicalCase ? (
        <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              {content.practicalCase.title}
            </h2>
            {content.practicalCase.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 text-base leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
            <ol className="mt-5 space-y-2">
              {content.practicalCase.steps.map((etape, index) => (
                <li
                  key={etape}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base"
                >
                  <span className="font-display font-bold text-[#377CF3]">{index + 1}.</span>
                  <span className="text-slate-800">{etape}</span>
                </li>
              ))}
            </ol>
            {content.practicalCase.note ? (
              <aside
                className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-800"
                role="note"
              >
                {content.practicalCase.note}
              </aside>
            ) : null}
          </div>
        </section>
      ) : null}

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme — {SESSION_DUREE_LIBELLE}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-slate-600">{content.programIntro}</p>
          {programme}
          {content.programLinks && content.programLinks.length > 0 ? (
            <p className="mt-4 text-base text-slate-700">
              {content.programLinks.map((link, i, arr) => (
                <span key={link.href}>
                  {link.prefix}{' '}
                  <Link href={link.href} className={OFC_LINK}>
                    {link.label}
                  </Link>
                  {i < arr.length - 1 ? '. ' : '.'}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </section>

      {content.workflow && content.workflow.length > 0 ? (
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Workflow en six étapes</h2>
            <ol className="mt-5 space-y-2">
              {content.workflow.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
                >
                  <span className="font-display font-bold text-[#377CF3]">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Ce que vous emportez</h2>
          {content.deliverablesIntro ? (
            <p className="mt-2 text-base text-slate-600">{content.deliverablesIntro}</p>
          ) : null}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {content.deliverables.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-base font-medium text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {content.iaLimits && content.iaLimits.length > 0 ? (
        <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Limites de l’IA</h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="min-w-full text-left text-sm md:text-base">
                <caption className="sr-only">Ce que l’IA peut faire et ce que le professionnel valide</caption>
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                      L’IA peut aider à
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                      Le professionnel doit valider
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {content.iaLimits.map((row) => (
                    <tr key={row.iaAide}>
                      <td className="px-4 py-3 text-slate-700">{row.iaAide}</td>
                      <td className="px-4 py-3 text-slate-700">{row.validation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              L’IA ne garantit ni l’exhaustivité du chiffrage, ni la conformité de l’offre, ni l’interprétation
              juridique des documents contractuels.
            </p>
          </div>
        </section>
      ) : null}

      {content.publicPrerequisites && content.publicPrerequisites.length > 0 ? (
        <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Public et prérequis</h2>
            <p className="mt-3 text-base text-slate-700">{FORMATION.public}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {content.publicPrerequisites.map((block) => (
                <div key={block.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
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

      <section
        id="tarifs-modalites"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10"
        aria-labelledby="tarifs-modalites-title"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="tarifs-modalites-title" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Format et tarifs
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-display text-lg font-semibold text-slate-900">Intra-entreprise</h3>
              <p className="mt-3 font-display text-xl font-bold text-[#377CF3]">
                {libelleTarifIntraParSession(GRILLE.intraHT)}
                <MentionTvaAsterisque />
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-slate-700">
                <li>{SESSION_DUREE_LIBELLE}</li>
                <li>
                  {FORMATION.effectifMin} à {FORMATION.effectifMax} participants
                </li>
                <li>Dans les locaux de l’entreprise</li>
                <li>Programme adaptable aux besoins de l’équipe</li>
                {content.intraExtraBullets?.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-slate-900">Interentreprises</h3>
              {GRILLE.interHT != null ? (
                <p className="mt-3 font-display text-xl font-bold text-[#377CF3]">
                  {libelleTarifInterParParticipant(GRILLE.interHT)}
                  <MentionTvaAsterisque />
                </p>
              ) : null}
              <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-slate-700">
                <li>{SESSION_DUREE_LIBELLE}</li>
                <li>Dates selon le calendrier disponible</li>
                <li>Session maintenue sous réserve d’un nombre minimum d’inscrits</li>
                {content.interExtraBullets?.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{MENTION_ABONNEMENTS_IA_HORS_FORFAIT}</p>
          <MentionTVA className="mt-2" />
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Financement possible par votre OPCO selon les critères, plafonds et budgets en vigueur. Un reste à charge
            peut s’appliquer.{' '}
            <Link href={LINKS.financement} className={OFC_LINK}>
              Financement Constructys — formation IA pour le BTP
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-4xl items-center gap-5 md:grid-cols-[120px_minmax(0,1fr)]">
          <Image
            src={PORTRAIT.src}
            alt={PORTRAIT.alt}
            title={PORTRAIT.title}
            width={PORTRAIT.width}
            height={PORTRAIT.height}
            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white"
            sizes="96px"
          />
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{instructorTitle}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">{instructorBody}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-base">
              <Link href={LINKS.aPropos} className={OFC_LINK}>
                Page À propos — Laure Olivié
              </Link>
              <Link href={LINKS.avisClients} className={OFC_LINK}>
                Avis clients
              </Link>
              <Link href={LINKS.indicateursResultats} className={OFC_LINK}>
                Indicateurs de résultats
              </Link>
              {content.instructorExtraLinks?.map((l) => (
                <Link key={l.href} href={l.href} className={OFC_LINK}>
                  {l.label}
                </Link>
              ))}
            </p>
          </div>
        </div>
      </section>

      <CatalogueInfosPratiques programmeRef={ref} compact publicCible={FORMATION.public} />

      <CatalogueFormationRelated items={related} />

      <FAQSection
        items={faqItems}
        title="Questions fréquentes"
        id={faqSectionId}
        className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10"
      />

      <FormationBeworkPasserelle />

      <TrainingFinalCta
        devisHref={trainingDevisHref(FORMATION.titre)}
        title={content.finalCta.title}
        description={content.finalCta.description}
        secondaryHref={LINKS.prendreRdv}
        secondaryLabel={content.finalCta.secondaryLabel ?? 'Échanger sur votre projet de formation'}
      />
    </>
  );
}
