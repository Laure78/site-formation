import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { ProgrammeAccordionAppelsOffre } from '@/components/formations/ProgrammeAccordionAppelsOffre';
import { FormationHeroPhoto } from '@/components/formations/FormationCourseHero';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_APPELS_OFFRE } from '@/lib/faq';
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
import { buildCatalogueCourseIaAppelsOffreNiv02JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode } from '@/data/formations';
import { PHOTOS } from '@/lib/photos';
import {
  formatNoteSatisfactionAffichageComplet,
  formatPeriodeReferenceAffichage,
  formatVolumeProsFormesBtpLibelle,
} from '@/lib/data/indicateurs-resultats';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-02');
const FORMATION = getFormationByCode('NIV-02')!;
const GRILLE = getTarifGrilleFromDureeLibelle(FORMATION.duree);
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-02');
const PORTRAIT = PHOTOS.portraitPro2026;
const PDF_HREF = LINKS.pdfProgrammeFormationAoBtpDetail2026;

const MAIL_PROGRAMME = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — formation IA appels d’offres BTP (NIV-02)')}`;

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationAO,
  keywords: [
    'formation IA appels d\'offres BTP',
    'analyser un DCE avec l\'IA',
    'mémoire technique avec IA',
    'formation appels d\'offres bâtiment',
    'IA chiffrage BTP',
    'analyse CCTP DPGF',
    'formation Claude BTP',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_APPELS_OFFRE);
const courseSchema = buildCatalogueCourseIaAppelsOffreNiv02JsonLd();

const HERO_FACTS = [
  '4 heures',
  '75 % de pratique',
  'Présentiel en Île-de-France',
  'Niveau intermédiaire',
  'Dossier fil rouge BTP',
] as const;

const PROBLEMES = [
  {
    title: 'Pièces dispersées',
    texte: 'Les informations utiles sont réparties entre RC, CCTP, CCAP, DPGF et annexes.',
  },
  {
    title: 'Écarts CCTP / DPGF',
    texte: 'Des incohérences entre pièces créent un risque d’oubli ou de mauvaise interprétation.',
  },
  {
    title: 'Contrôle du chiffrage',
    texte: 'Sans checklist, une prestation ou une exigence peut passer à côté.',
  },
  {
    title: 'Mémoire technique',
    texte: 'Le plan est difficile à aligner sur les critères et pondérations du RC.',
  },
] as const;

const RESULTATS = [
  'Organiser les pièces d’un DCE avant analyse',
  'Extraire les exigences importantes avec leurs sources',
  'Comparer le RC, le CCTP, le CCAP et la DPGF',
  'Créer une checklist des points à vérifier avant le chiffrage',
  'Structurer un mémoire technique selon les critères du RC',
  'Réutiliser une méthode de travail sur les prochains dossiers',
] as const;

const WORKFLOW = [
  'Organiser les pièces.',
  'Extraire les exigences.',
  'Croiser les documents.',
  'Préparer les points de chiffrage.',
  'Structurer le mémoire technique.',
  'Contrôler l’offre avant dépôt.',
] as const;

const LIVRABLES = [
  'Grille de lecture du DCE',
  'Tableau de comparaison CCTP–DPGF',
  'Checklist des points de chiffrage',
  'Trame de questions à adresser à la MOE',
  'Structure de mémoire technique',
  'Checklist avant dépôt',
  'Bibliothèque de prompts',
  'Méthode de validation humaine',
] as const;

const IA_LIMITS = [
  {
    iaAide: 'Synthétiser une pièce',
    validation: 'L’interprétation contractuelle',
  },
  {
    iaAide: 'Extraire des exigences',
    validation: 'Les prestations du lot',
  },
  {
    iaAide: 'Comparer deux documents',
    validation: 'Les quantités et métrés',
  },
  {
    iaAide: 'Préparer une checklist',
    validation: 'Les prix et marges',
  },
  {
    iaAide: 'Structurer un mémoire technique',
    validation: 'Les moyens et engagements remis',
  },
] as const;

const ATELIER_ETAPES = [
  'Sélection et anonymisation des documents.',
  'Analyse guidée du dossier fil rouge.',
  'Création d’une méthode réutilisable.',
] as const;

export default function FormationIAAppelsOffreBTPPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-02" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-8">
          <div className="min-w-0">
            <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
              Catalogue des formations IA pour le BTP
            </Link>
            <p className="mt-3 inline-flex rounded-full border border-[#377CF3]/25 bg-[#377CF3]/5 px-3 py-1 text-sm font-semibold text-[#377CF3]">
              Niveau 2 · Appels d’offres BTP · 4 heures
            </p>
            <h1
              id="formation-niv-02-h1"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">{CATALOGUE_SEO.subtitle}</p>
            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Bases de l’IA générative requises. Abonnement professionnel à l’outil utilisé pendant la session
              (non inclus dans le tarif).
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

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.contact}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Demander un devis
              </Link>
              <a
                href={PDF_HREF}
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
            Vos réponses aux appels d’offres mobilisent trop de temps ?
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

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Après la formation, vous saurez…
          </h2>
          <ul className="mt-5 space-y-2">
            {RESULTATS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            En quatre heures, l’entreprise construit une méthode guidée pour analyser un DCE, sécuriser la
            préparation de son chiffrage et structurer un mémoire technique avec l’aide de l’IA — pas une offre
            prête à déposer sans contrôle humain.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Travaillez sur un véritable dossier de l’entreprise
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Avant la session, l’entreprise sélectionne un DCE représentatif, un ancien devis et, si elle en dispose,
            une trame de mémoire technique. Ces documents servent de fil rouge pendant les exercices.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            La formation s’appuie sur un dossier fil rouge sélectionné avec l’entreprise avant la session. En
            interentreprises, des dossiers pédagogiques anonymisés peuvent être utilisés.
          </p>
          <ol className="mt-5 space-y-2">
            {ATELIER_ETAPES.map((etape, index) => (
              <li
                key={etape}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base"
              >
                <span className="font-display font-bold text-[#377CF3]">{index + 1}.</span>
                <span className="text-slate-800">{etape}</span>
              </li>
            ))}
          </ol>
          <aside
            className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-800"
            role="note"
          >
            Les documents doivent être anonymisés. Les informations sensibles, personnelles ou couvertes par une
            obligation de confidentialité ne doivent pas être déposées dans un outil IA sans cadre adapté.
          </aside>
        </div>
      </section>

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme — {SESSION_DUREE_LIBELLE}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Atelier collectif, 75&nbsp;% de pratique. Accueil, quatre modules et bilan — total 4 heures.
          </p>
          <ProgrammeAccordionAppelsOffre />
          <p className="mt-4 text-base text-slate-700">
            Pour les bases IA avant ce niveau, voir la{' '}
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className={OFC_LINK}>
              formation IA BTP niveau 1
            </Link>
            . Pour le cadre marchés publics :{' '}
            <Link href={LINKS.formationIaMarchePublicTravaux} className={OFC_LINK}>
              formation IA marché public de travaux
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Workflow en six étapes</h2>
          <ol className="mt-5 space-y-2">
            {WORKFLOW.map((step, index) => (
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

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Ce que vous emportez</h2>
          <p className="mt-2 text-base text-slate-600">
            Une bibliothèque de trames et d’assistants à personnaliser — selon l’avancement du groupe.
          </p>
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
                {IA_LIMITS.map((row) => (
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

      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Public et prérequis</h2>
          <p className="mt-3 text-base text-slate-700">
            Dirigeants de PME du BTP, responsables d’affaires, chargés d’études, conducteurs de travaux,
            responsables appels d’offres et artisans répondant déjà à des consultations.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Prérequis pédagogiques</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-slate-700">
                <li>Connaître le fonctionnement général d’un appel d’offres</li>
                <li>Avoir les bases d’une IA générative (ou le niveau 1)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Prérequis techniques</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-slate-700">
                <li>Ordinateur et accès aux outils utilisés</li>
                <li>Abonnement professionnel à l’outil de session</li>
                <li>Documents du fil rouge, anonymisés</li>
              </ul>
            </div>
          </div>
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
                <li>Dossier fil rouge de l’entreprise</li>
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
                <li>Dossier pédagogique commun</li>
                <li>Session maintenue sous réserve d’un nombre minimum d’inscrits</li>
              </ul>
            </article>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{MENTION_ABONNEMENTS_IA_HORS_FORFAIT}</p>
          <MentionTVA className="mt-2" />
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Financement possible par votre OPCO selon votre éligibilité, les plafonds applicables et les budgets
            disponibles. Un reste à charge peut s’appliquer.{' '}
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
              Une formation conçue par une spécialiste de l’IA appliquée au BTP
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Laure Olivié, OFC Création d’Entreprise (Qualiopi). Expérience du bâtiment et des travaux publics,
              spécialisation IA appliquée aux métiers du BTP. Références : FFB Grand Paris, CSFE, CNAM Entreprise,
              Lefebvre Dalloz.
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
              <Link href={LINKS.qualiopi} className={OFC_LINK}>
                Certification Qualiopi
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Marqueur audit Qualiopi fiches : catalogueRef="NIV-02" */}
      <CatalogueInfosPratiques
        programmeRef="NIV-02"
        compact
        publicCible={FORMATION.public}
      />
      <FAQSection
        items={FAQ_APPELS_OFFRE}
        title="Questions fréquentes"
        id="faq-niv-02"
        className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10"
      />

      <section className="bg-[#377CF3] px-4 py-8 md:py-10 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Analysez un dossier réel avec votre équipe
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            Lors d’un rendez-vous de 30 minutes, nous vérifions vos objectifs, vos prérequis et le dossier qui
            pourra servir de fil rouge pendant la formation.
          </p>
          <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href={LINKS.prendreRdv}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3]"
            >
              Prendre rendez-vous
            </Link>
            <a
              href={MAIL_PROGRAMME}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white"
            >
              Demander le programme
            </a>
          </div>
          <p className="mt-4 text-sm text-blue-100">{SITE_CONFIG.email}</p>
          <p className="mt-3 text-sm text-blue-100">
            <Link href={LINKS.tutoAnalyseDce} className="underline hover:text-white">
              Tutoriel analyser un DCE
            </Link>
            {' · '}
            <Link href={LINKS.guideRepondreAoBtpOfc2026} className="underline hover:text-white">
              Guide répondre aux AO
            </Link>
            {' · '}
            <Link href={LINKS.ressources} className="underline hover:text-white">
              Ressources
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
