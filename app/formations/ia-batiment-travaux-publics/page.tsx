import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { ProgrammeAccordionBatiment } from '@/components/formations/ProgrammeAccordionBatiment';
import { FormationHeroPhoto } from '@/components/formations/FormationCourseHero';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_BATIMENT } from '@/lib/faq';
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
import { buildCatalogueCourseIaBtpNiv01JsonLd } from '@/lib/schema-catalogue-course-jsonld';
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

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-01');
const FORMATION = getFormationByCode('NIV-01')!;
const GRILLE = getTarifGrilleFromDureeLibelle(FORMATION.duree);
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-01');
const PORTRAIT = PHOTOS.portraitPro2026;

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  keywords: [
    'formation IA BTP',
    'formation intelligence artificielle bâtiment',
    'formation ChatGPT BTP',
    'IA pour les professionnels du bâtiment',
    'devis BTP avec IA',
    'comptes rendus de chantier avec IA',
    'formation IA Île-de-France',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_BATIMENT);
const courseSchema = buildCatalogueCourseIaBtpNiv01JsonLd();

const HERO_FACTS = [
  '4 heures',
  '70 % de pratique',
  `${FORMATION.effectifMin} à ${FORMATION.effectifMax} participants en intra`,
  'Présentiel en Île-de-France',
] as const;

const PUBLIC_CIBLE_COURT =
  'Dirigeants, conducteurs de travaux, chargés d’affaires, bureaux d’études et fonctions support du BTP.';

const PROBLEMES = [
  {
    title: 'Devis',
    texte: 'Repartir d’une page blanche pour chaque devis ou désignation d’ouvrage.',
  },
  {
    title: 'Comptes rendus',
    texte: 'Rédiger les comptes rendus après les réunions de chantier.',
  },
  {
    title: 'DOE et PV',
    texte: 'Préparer les DOE, PV de réception et suivis de réserves.',
  },
  {
    title: 'Emails clients',
    texte: 'Reformuler les emails et documents destinés aux clients ou fournisseurs.',
  },
] as const;

const RESULTATS = [
  'Formuler une demande précise à une IA',
  'Transformer des notes en compte rendu structuré',
  'Préparer une trame de devis ou une désignation d’ouvrage',
  'Créer une première structure de DOE ou de PV',
  'Contrôler et corriger une réponse générée par l’IA',
] as const;

const LIVRABLES = [
  'Bibliothèque de prompts BTP',
  'Trames de devis, comptes rendus, DOE et PV',
  'Checklist de validation humaine',
  'Certificat de réalisation',
] as const;

const ATELIER_ETAPES = [
  'Vous sélectionnez un document récurrent.',
  'Vous construisez une méthode et un prompt.',
  'Vous repartez avec une trame réutilisable.',
] as const;

export default function FormationIAuServiceDuBatimentPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-01" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-8">
          <div className="min-w-0">
            <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
              Catalogue des formations IA pour le BTP
            </Link>
            <p className="mt-3 inline-flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                {trainingCategoryBadge('usages-ia-btp')}
              </span>
              <span className="rounded-full bg-[#377CF3]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#377CF3]">
                Niveau 1 · Débutant
              </span>
            </p>
            <h1
              id="formation-niv-01-h1"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">{CATALOGUE_SEO.subtitle}</p>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Public : {PUBLIC_CIBLE_COURT}
            </p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {HERO_FACTS.map((fact) => (
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

            <FormationHeroOutilsNote catalogueRef="NIV-01" className="mt-5" />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.contact}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Demander un devis
              </Link>
              <a
                href={LINKS.pdfProgrammeIaBtpNiveau1BatimentTp}
                download
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
              >
                <Download size={18} aria-hidden />
                Télécharger le programme
              </a>
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
          { label: 'Niveau', value: 'Débutant' },
          { label: 'Public', value: PUBLIC_CIBLE_COURT },
          {
            label: 'Tarif',
            value: `Intra ${libelleTarifIntraParSession(GRILLE.intraHT)} · Inter dès ${libelleTarifInterParParticipant(GRILLE.interHT!)}`,
          },
        ]}
      />

      <TrainingObjectives
        objectives={RESULTATS}
        title="À l’issue de la formation, vous saurez…"
        description="Vous apprenez à préparer et structurer une première version de devis, soumise au contrôle du professionnel. L’IA n’établit ni les prix, ni les métrés, ni la conformité aux DTU."
      />

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
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Vous perdez du temps sur ces tâches ?
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {PROBLEMES.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-base text-slate-700">{item.texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Programme — {SESSION_DUREE_LIBELLE}</h2>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Quatre modules d’une heure. 70&nbsp;% de pratique. ChatGPT et Claude comme outils d’assistance —
            jamais comme substitut à votre expertise.
          </p>
          <ProgrammeAccordionBatiment />
          <p className="mt-4 text-base text-slate-700">
            Pour analyser un DCE et structurer un mémoire technique, voir la{' '}
            <Link href={LINKS.formationAO} className={OFC_LINK}>
              formation IA appels d&apos;offres BTP
            </Link>
            . Pour configurer des assistants réutilisables après les bases, voir la{' '}
            <Link href={LINKS.formationAssistantsIaPersonnalisesBtp} className={OFC_LINK}>
              formation assistants IA personnalisés pour le BTP
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Travaillez sur vos propres documents
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Les exercices peuvent être réalisés à partir de vos devis, comptes rendus, DOE, PV ou emails. Les
            documents doivent être anonymisés avant leur utilisation dans un outil d’intelligence artificielle.
          </p>
          <ol className="mt-5 space-y-2">
            {ATELIER_ETAPES.map((etape, index) => (
              <li key={etape} className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base">
                <span className="font-display font-bold text-[#377CF3]">{index + 1}.</span>
                <span className="text-slate-800">{etape}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Ce que vous emportez</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {LIVRABLES.map((item) => (
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
              </ul>
            </article>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {MENTION_ABONNEMENTS_IA_HORS_FORFAIT}
          </p>
          <MentionTVA className="mt-2" />
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Financement possible par votre OPCO selon les critères, plafonds et budgets en vigueur. Un reste à
            charge peut s’appliquer.{' '}
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
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Une formation conçue pour les professionnels du BTP
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Laure Olivié, formatrice en IA générative appliquée au BTP, s’appuie sur une expérience du
              bâtiment et des travaux publics. Organisme OFC Création d’Entreprise, certifié Qualiopi. Références
              vérifiables : FFB Grand Paris, CSFE, CNAM Entreprise, Le Moniteur Formations.
            </p>
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
            </p>
          </div>
        </div>
      </section>

      {/* Marqueur audit Qualiopi fiches : catalogueRef="NIV-01" */}
      <CatalogueInfosPratiques
        programmeRef="NIV-01"
        compact
        publicCible={FORMATION.public}
      />
      <FAQSection
        items={FAQ_BATIMENT}
        title="Questions fréquentes"
        id="faq-niv-01"
        className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10"
      />

      <FormationBeworkPasserelle />

      <TrainingFinalCta
        devisHref={trainingDevisHref(FORMATION.titre)}
        title="Parlons de votre projet de formation"
        description="Un échange de 30 minutes pour définir vos cas d’usage, le nombre de participants et les possibilités de financement."
        secondaryHref={LINKS.prendreRdv}
        secondaryLabel="Échanger sur votre projet"
      />
    </div>
  );
}
