import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Check, Euro } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_FORMATIONS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import {
  libelleTarifParticipant,
  tarifHtDepuisBadgeCatalogue,
  SESSION_DUREE_LIBELLE,
  ENCART_TARIFS_COMMERCIAUX,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Catalogue formations IA BTP — Qualiopi Constructys | Laure Olivié',
  description:
    '7 formations IA BTP Qualiopi de 4h : devis, CCTP/DCE, appels d\'offres, chantier, RH. 100 % finançable Constructys. Diagnostic gratuit en visio.',
  path: '/formations',
  keywords: [
    'formation IA BTP',
    'formation ChatGPT entreprise BTP',
    'catalogue formation IA BTP',
    'formations IA bâtiment',
    'mémoire technique BTP',
    'appel d\'offre BTP',
    'rédaction mémoire technique',
    'IA devis bâtiment',
    'IA gestion chantier',
    'automatisation tâches administratives BTP',
    'formation IA TPE PME BTP',
    'IA pour PME bâtiment',
    'formation IA Qualiopi',
    'OPCO Constructys',
    'formation IA PME BTP',
  ],
  image: {
    url: PHOTOS.formationIaBtpSalleInteractive2026.src,
    width: PHOTOS.formationIaBtpSalleInteractive2026.width,
    height: PHOTOS.formationIaBtpSalleInteractive2026.height,
    alt: PHOTOS.formationIaBtpSalleInteractive2026.alt,
  },
});

/** Tri catalogue : dé puis avancé. */
const LEVEL_RANK: Record<string, number> = { DÉBUTANT: 0, AVANCÉ: 1 };

const FORMATIONS_UNSORTED = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service du bâtiment",
    href: '/formations/ia-au-service-du-batiment',
    /** Même visuel que la fiche formation dédiée */
    visuel: PHOTOS.formationIABtpVisioBureau2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Identifier les usages IA utiles dans le BTP",
      "Accélérer la rédaction de devis et messages clients",
      "Structurer l'administratif (CR, relances, modèles)",
      "Repartir avec des trames et prompts prêts à l'emploi",
    ],
  },
  {
    ref: 'BTP-02',
    level: 'AVANCÉ' as const,
    title: "Répondre aux appels d'offre avec l'IA",
    href: '/formations/ia-appels-offre-btp',
    visuel: PHOTOS.btpFormationChantierPlans2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Analyser un DCE rapidement et structurer les critères d'évaluation",
      "Rédiger mémoires techniques et chiffrages avec méthode et assistant IA",
      "Bibliothèque de prompts et templates par métier pour les marchés BTP",
      "Créer et paramétrer un assistant IA DCE / mémoire adapté à votre entreprise",
      "Sécuriser le process : confidentialité, relecture humaine — Qualiopi, OPCO Constructys",
    ],
  },
  {
    ref: 'BTP-03',
    level: 'AVANCÉ' as const,
    title: "Formation IA pour la Fonction RH dans le BTP",
    href: '/formations/ia-rh-btp',
    visuel: PHOTOS.btpFormationBureauConseil2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Automatiser le recrutement et la sélection",
      "Piloter la GEPP et anticiper les compétences",
      "Créer des tableaux de bord RH opérationnels",
      "Construire un assistant IA RH sur-mesure",
    ],
  },
  {
    ref: 'BTP-04',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service des Travaux Publics",
    href: '/formations/ia-travaux-publics',
    visuel: PHOTOS.btpFormationChantierEquipe2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Réponse aux consultations : DCE, trames, synthèses et check-lists",
      "Documents de chantier et reporting avec protocole de validation",
      "Templates TP, assistants par rôle et charte d'usage IA en entreprise",
    ],
  },
  {
    ref: 'BTP-05',
    level: 'DÉBUTANT' as const,
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    visuel: PHOTOS.formationSensibilisationAssistantsIaBtp2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Sensibilisation à l'IA et usages terrain (supports PDF)",
      "Banque de prompts par métier (Excel)",
      "Concevoir des assistants IA personnalisés",
      "Ressources plateforme en prolongement — Qualiopi, OPCO Constructys",
    ],
  },
  {
    ref: 'BTP-06',
    level: 'AVANCÉ' as const,
    title: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    href: '/formations/ia-architecture-claude-dpgf',
    visuel: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      'DPGF, métrés et planning GANTT avec Claude AI et Google Sheets',
      'CR de chantier, situations de travaux, PV de réception (Google Docs)',
      'Courriers et actes de marché via connecteur Google Drive',
      'Bibliothèque de prompts et flux opérationnels pour le cabinet',
    ],
  },
  {
    ref: 'BTP-07',
    level: 'AVANCÉ' as const,
    title: 'Formation IA analyse CCTP & DCE — répondre aux appels d’offres',
    href: LINKS.formationIaCctpAnalyseDceBtp,
    visuel: PHOTOS.btpFormationChantierPlans2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      'Lire un CCTP et un DCE rapidement avec une méthode IA encadrée',
      'Croiser exigences techniques, DPGF et critères pour cadrer le chiffrage',
      'Préparer un mémoire technique aligné et sécuriser les relectures',
      'Industrialiser prompts et assistants pour les marchés publics et privés',
    ],
  },
];

function refNum(ref: string) {
  return parseInt(ref.replace(/\D/g, ''), 10);
}

const FORMATIONS = [...FORMATIONS_UNSORTED].sort((a, b) => {
  const lr = LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
  if (lr !== 0) return lr;
  return refNum(a.ref) - refNum(b.ref);
});

function buildFormationsCourseListJsonLd(): Record<string, unknown> {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
  const organizationId = `${baseUrl}/#educational-organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': organizationId,
        name: 'OFC Création d\'Entreprise',
        url: baseUrl,
        sameAs: 'https://www.linkedin.com/in/laure-olivie',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi',
          credentialCategory: 'certification',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/formations#course-list`,
        name: 'Catalogue des formations IA BTP',
        description:
          '7 formations IA BTP Qualiopi de 4 h : devis, CCTP/DCE, appels d\'offres, chantier, RH. 100 % finançable Constructys.',
        numberOfItems: FORMATIONS.length,
        itemListElement: FORMATIONS.map((cours, i) => {
          const nn = cours.ref.replace(/^BTP-/, '');
          const slug = cours.href.replace(/^\/formations\//, '').replace(/\/$/, '');
          const courseUrl = `${baseUrl}${cours.href}`;
          const cardImageUrl = `${baseUrl}/images/formation-${slug}-carte-btp-${nn}.png`;
          const price = tarifHtDepuisBadgeCatalogue(cours.level);
          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Course',
              '@id': `${courseUrl}#course`,
              name: cours.title,
              url: courseUrl,
              courseCode: cours.ref,
              description: cours.objectifs.join(' · '),
              duration: 'PT4H',
              courseMode: ['onsite', 'online'],
              inLanguage: 'fr-FR',
              availableLanguage: 'fr',
              provider: { '@id': organizationId },
              offers: {
                '@type': 'Offer',
                price,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: courseUrl,
                category: 'Formation professionnelle',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.85',
                reviewCount: String(SOCIAL_PROOF.PROFESSIONALS_TRAINED),
                bestRating: '5',
              },
              image: cardImageUrl,
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'onsite',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'FR',
                    addressRegion: 'Île-de-France',
                  },
                },
                courseWorkload: 'PT4H',
                inLanguage: 'fr-FR',
              },
            },
          };
        }),
      },
    ],
  };
}

export default function FormationsPage() {
  const faqSchema = getFAQSchema(FAQ_FORMATIONS);

  return (
    <>
      <JsonLd id="schema-formations-catalog-graph" schema={buildFormationsCourseListJsonLd()} />
      <JsonLd id="schema-formations-faq" schema={faqSchema} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Formation IA pour le BTP : catalogue Qualiopi, bâtiment et travaux publics
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Formations IA BTP finançables pour dirigeants, artisans et conducteurs de travaux : intelligence
          artificielle bâtiment, formation IA travaux publics et{' '}
          <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] font-medium hover:underline">
            ChatGPT BTP
          </Link>{' '}
          au service des devis, emails, comptes rendus de chantier et appels d&apos;offres. {ENCART_TARIFS_COMMERCIAUX}{' '}
          Méthode 100&nbsp;% terrain, orientée productivité, ou distanciel selon la demande.{' '}
          <RdvLink className="text-[var(--accent)] font-medium hover:underline">
            Prenez rendez-vous
          </RdvLink>
          {' '}pour un diagnostic personnalisé.
        </p>
        <div className="mt-8">
          <ShortAnswerBlock>
            Une formation IA BTP de 4 h suffit pour automatiser une partie de l&apos;administratif et gagner 3 à 5 h
            par semaine sur devis, emails et suivi chantier — sans remplacer le jugement métier.
          </ShortAnswerBlock>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-slate-600">
          Pilier complémentaire (DCE / mémoire technique) :{' '}
          <Link href={LINKS.formationIaAnalyseCctp} className="font-medium text-[var(--accent)] hover:underline">
            formation IA analyse CCTP avec ChatGPT
          </Link>
          .
        </p>
        </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FORMATIONS.map((cours) => {
          const visuel = cours.visuel;
          return (
          <Link
            key={cours.ref}
            href={cours.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-100">
              <Image
                src={visuel.src}
                alt={visuel.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between">
              <span className="text-sm text-slate-500">RÉF: {cours.ref}</span>
              <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                {cours.level}
              </span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold text-slate-900 group-hover:text-[var(--accent)]">
              {cours.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3 rounded-lg bg-slate-50 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} strokeWidth={1.5} />
                {cours.duree}
              </span>
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} strokeWidth={1.5} />
                {cours.effectif}
              </span>
              <span className="flex w-full items-center gap-2 text-sm font-semibold text-slate-800 sm:w-auto">
                <Euro size={16} strokeWidth={1.75} className="text-[var(--accent)]" aria-hidden />
                {libelleTarifParticipant(cours.level)}
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">Objectifs pédagogiques</h3>
            <ul className="mt-2 flex-1 space-y-2">
              {cours.objectifs.map((obj) => (
                <li key={obj} className="flex gap-2 text-sm text-slate-600">
                  <Check size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                  {obj}
                </li>
              ))}
            </ul>
            <span className="mt-6 block w-full rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white transition-colors group-hover:bg-blue-700">
              Voir le programme
            </span>
            </div>
          </Link>
          );
        })}
      </div>

      <section className="mt-16 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Une formation IA BTP pour gagner du temps sur devis, chantier et administratif ?
        </h2>
        <p className="mt-3 text-slate-700">
          Prenez rendez-vous pour échanger sur votre projet et recevoir un devis personnalisé.
        </p>
        <RdvLink className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Prendre rendez-vous pour un diagnostic
        </RdvLink>
      </section>

      <FAQSection
        items={FAQ_FORMATIONS}
        title="Questions fréquentes sur les formations IA BTP"
        subtitle="Vous avez des questions ? Voici les réponses aux interrogations les plus fréquentes."
      />

      <section className="mt-12 border-t border-slate-200 pt-12">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Par métier et par sujet
        </h2>
        <ul className="mt-4 flex flex-wrap gap-4">
          <li>
            <Link href={LINKS.formationYvelines} className="text-[var(--accent)] hover:underline">
              Formation IA BTP Yvelines (78)
            </Link>
          </li>
          <li>
            <Link href={LINKS.formationSaintQuentinYvelines} className="text-[var(--accent)] hover:underline">
              Formation IA BTP Saint-Quentin-en-Yvelines
            </Link>
          </li>
          <li>
            <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] hover:underline">
              ChatGPT pour entreprises BTP
            </Link>
          </li>
          <li>
            <Link href="/ia-devis-batiment" className="text-[var(--accent)] hover:underline">
              IA devis bâtiment
            </Link>
          </li>
          <li>
            <Link href="/ia-conducteur-travaux" className="text-[var(--accent)] hover:underline">
              IA conducteur de travaux
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-[var(--accent)] hover:underline">
              Articles et guides blog
            </Link>
          </li>
        </ul>
      </section>

      <AllerPlusLoin
        links={[
          { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
          { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
          { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
          { href: '/blog', label: 'Articles et guides' },
          { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
        ]}
      />
      </div>
    </>
  );
}
