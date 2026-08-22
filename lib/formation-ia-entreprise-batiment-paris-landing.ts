/**
 * Landing `/formation-ia-entreprise-batiment-paris` — SEO local intra-entreprise.
 */
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_PATH =
  '/formation-ia-entreprise-batiment-paris' as const;

export const FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG: SeoClusterPageConfig = {
  path: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_PATH,
  seo: {
    title: 'Formation IA Entreprise Bâtiment Paris | BTP',
    titleAbsolute: 'Formation IA Entreprise Bâtiment Paris | BTP et ChatGPT',
    description:
      'Formation IA intra entreprise bâtiment à Paris et IDF : ChatGPT, Claude, AO et chantier. Qualiopi, présentiel locaux client. Visio découverte.',
    openGraphTitle: 'Formation IA Entreprise Bâtiment Paris | BTP et ChatGPT',
    keywords: [
      'formation IA entreprise bâtiment Paris',
      'formation IA BTP Paris',
      'formation ChatGPT entreprise bâtiment Paris',
      'formation IA intra entreprise BTP Paris',
      'formateur IA BTP Paris',
    ],
    image: {
      url: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
      width: 1200,
      height: 630,
      alt: 'Formation IA pour entreprises du bâtiment à Paris — Laure Olivié, formatrice Qualiopi',
    },
  },
  h1: 'Formation IA pour les entreprises du bâtiment à Paris',
  subtitle:
    'Formations intra-entreprise à Paris, en petite couronne et en Île-de-France — directement dans vos locaux, adaptées à vos équipes et à vos process.',
  shortAnswer:
    `Formation IA intra entreprise bâtiment Paris et ${IDF_ZONE_INTERVENTION} : ChatGPT, Claude, appels d'offres, chantier et administratif. Qualiopi, présentiel dans vos locaux.`,
  introParagraphs: [
    'Les entreprises du bâtiment à Paris et en Île-de-France font former leurs équipes en intra : direction, conducteurs de travaux, appels d\'offres, administratif et bureaux d\'études — sur leurs documents et leurs outils.',
    'La session se déroule dans vos locaux ou en salle en région parisienne. Le contenu est calibré sur vos cas : devis, DCE, comptes rendus, mémoires techniques ou courriers récurrents.',
    'OFC Création d\'Entreprise intervient dans Paris (75), les Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d\'Oise (95), Yvelines (78), Essonne (91) et Seine-et-Marne (77).',
  ],
  useCasesTitle: 'Thématiques couvertes en formation intra',
  useCases: [
    { title: 'ChatGPT', body: 'Devis, emails, CR, administratif quotidien.' },
    { title: 'Claude AI', body: 'DCE, documents longs, Projects et Cowork.' },
    { title: 'IA générative', body: 'Principes, limites, relecture obligatoire.' },
    { title: 'Appels d\'offres', body: 'Analyse DCE, mémoire technique, conformité.' },
    { title: 'Conduite de travaux', body: 'CR, PPSPS, courriers, suivi réserves.' },
    { title: 'Administratif BTP', body: 'Relances, courriers, reporting direction.' },
    { title: 'Analyse documentaire', body: 'CCTP, CCAP, synthèses et checklists.' },
    { title: 'Communication', body: 'Posts réseaux, visuels chantier — selon besoin.' },
  ],
  publicTitle: 'Profils formés en intra-entreprise',
  publicTargets: [
    'Direction et dirigeants',
    'Conducteurs de travaux',
    'Chargés d\'affaires',
    'Administratif et assistanat',
    'Équipes appels d\'offres',
    'Études et bureaux d\'études',
    'Travaux et encadrement chantier',
    'Maîtrise d\'œuvre et MOEX (selon programme)',
  ],
  specialSection: {
    id: 'local',
    title: 'Intervention à Paris et en Île-de-France',
    paragraphs: [
      'Formations en intra dans vos locaux à Paris et en petite couronne, ou en salle selon votre organisation. Déplacements en grande couronne (78, 91, 77, 95) sur devis.',
      'Modalité exclusivement en présentiel — pas de formation à distance pour les actions Qualiopi catalogue.',
    ],
  },
  faq: [
    {
      q: 'Existe-t-il une formation IA BTP à Paris ?',
      a: 'Oui. Sessions inter en région parisienne et intra directement dans votre entreprise à Paris et en Île-de-France.',
    },
    {
      q: 'Peut-on organiser une formation IA directement dans une entreprise ?',
      a: 'Oui, c\'est la modalité intra privilégiée : vos documents, vos process, vos équipes dans la même salle.',
    },
    {
      q: 'Quels départements sont couverts ?',
      a: `Paris (75) et ${IDF_ZONE_INTERVENTION} : 77, 78, 91, 92, 93, 94, 95.`,
    },
    {
      q: 'Combien de participants en intra ?',
      a: 'Jusqu\'à 12 participants par session catalogue — groupes plus larges sur étude.',
    },
    {
      q: 'Financement OPCO en intra ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE}`,
    },
    {
      q: 'Différence avec la page Formation IA à Paris ?',
      a: `Cette page cible l'<strong>intra-entreprise</strong> et les équipes multi-profils. Pour les sessions inter présentiel Paris, voir aussi <a href="${LINKS.formationIaParis}">Formation IA à Paris</a>.`,
    },
  ],
  courseName: 'Formation IA intra entreprise bâtiment Paris et Île-de-France',
  courseTeaches: [
    'ChatGPT et Claude pour équipes BTP',
    'Formation adaptée aux process internes',
    'Appels d\'offres et conduite de travaux',
    'Administratif et analyse documentaire',
    'Session intra présentiel Paris et IDF',
  ],
  primaryCtaLabel: 'Organiser une formation IA dans mon entreprise',
  midCtaTitle: 'Parler de votre projet intra Paris / IDF',
  midCtaSubtitle: 'Effectif, profils, thématiques et calendrier — visio découverte 30 min.',
  finalCtaTitle: 'Demander un devis formation intra',
  finalCtaSubtitle: 'Devis personnalisé — Paris et Île-de-France.',
  campaignSlug: 'formation-ia-entreprise-batiment-paris',
  programmeRef: 'NIV-01',
  catalogueHref: LINKS.formations,
  catalogueLabel: 'Catalogue des 5 formations IA BTP',
  relatedLinks: [
    { href: LINKS.formationIaParis, label: 'Formation IA à Paris — présentiel' },
    { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP Île-de-France' },
    { href: LINKS.formationChatgptBtp, label: 'Formation ChatGPT pour le BTP' },
    { href: LINKS.formationIaAppelsOffresBtp, label: 'Formation IA appels d\'offres BTP' },
    { href: LINKS.formateurIaBtp, label: 'Formateur IA BTP — Laure Olivié' },
    { href: LINKS.contact, label: 'Contact OFC Création d\'Entreprise' },
  ],
};
