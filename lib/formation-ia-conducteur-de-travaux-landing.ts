/**
 * Landing `/formation-ia-conducteur-de-travaux` — cluster SEO métier CDT.
 */
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH = '/formation-ia-conducteur-de-travaux' as const;

export const FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG: SeoClusterPageConfig = {
  path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
  seo: {
    title: 'Formation IA Conducteur de Travaux | IA chantier',
    titleAbsolute: 'Formation IA Conducteur de Travaux | IA appliquée au chantier',
    description:
      'Formation IA conducteur de travaux : CR, PPSPS, DOE, planning et courriers chantier. Présentiel IDF, Qualiopi. Visio découverte gratuite.',
    openGraphTitle: 'Formation IA Conducteur de Travaux | IA appliquée au chantier',
    keywords: [
      'formation IA conducteur de travaux',
      'IA conducteur de travaux',
      'ChatGPT conducteur de travaux',
      'Claude conducteur de travaux',
      'IA chantier',
      'IA gestion de chantier',
    ],
    image: {
      url: '/images/formation-ia-conducteur-travaux-plans.webp',
      width: 1200,
      height: 630,
      alt: 'Formation intelligence artificielle pour conducteurs de travaux — plans et suivi chantier',
    },
  },
  h1: 'Formation IA pour Conducteurs de Travaux',
  subtitle:
    'Comptes rendus, réunions, synthèses documentaires, réserves, planning et courriers MOA/MOE — avec ChatGPT et Claude, sur vos dossiers réels.',
  shortAnswer:
    'Formation IA conducteur de travaux BTP : CR, PPSPS, DOE, analyse CCTP, courriers et suivi sous-traitants. 4 h en présentiel, Qualiopi, exercices terrain.',
  introParagraphs: [
    'Un conducteur de travaux consacre une part importante de sa semaine à l\'administratif : comptes rendus, courriers, synthèses de documents, préparation de réunions et suivi des réserves. L\'IA ne remplace pas le jugement terrain — elle accélère la formalisation.',
    'En formation, vous travaillez sur des situations réelles : notes de réunion transformées en CR, analyse d\'un extrait CCTP, courrier de relance sous-traitant, tableau de suivi des retards. ChatGPT et Claude sont présentés comme outils complémentaires selon le type de document.',
    'Sessions en présentiel en Île-de-France — intra dans vos locaux ou inter en salle. Organisme certifié Qualiopi.',
  ],
  useCasesTitle: 'Usages IA directement liés au métier de conducteur de travaux',
  useCases: [
    { title: 'Compte rendu de chantier', body: 'Notes brutes ou dictée → CR structuré avec actions, réserves et participants.' },
    { title: 'Préparation de réunion', body: 'Ordre du jour, points à aborder, synthèse des dossiers en cours.' },
    { title: 'Synthèse de documents', body: 'CCTP, avenants, courriers MOE — points clés en quelques minutes de lecture assistée.' },
    { title: 'Suivi des réserves', body: 'PV de réception, listes de réserves, relances par lot et responsable.' },
    { title: 'Analyse de plans et documents', body: 'Extraction des exigences techniques et des interfaces lots.' },
    { title: 'Préparation de PPSPS', body: 'Trame réglementaire adaptée au type de chantier — validation SST.' },
    { title: 'Préparation de DOE', body: 'Classement par chapitre, pièces manquantes, page de garde.' },
    { title: 'Courriers de chantier', body: 'Mails et courriers formels MOA/MOE, sous-traitants, fournisseurs.' },
    { title: 'Relances', body: 'Planning, livraisons, réserves — ton factuel et traçable.' },
    { title: 'Planning et retards', body: 'Synthèse des causes, impacts et propositions de reprise.' },
    { title: 'Tableaux de suivi', body: 'Avancement par lot, actions, échéances — à partir de vos listes.' },
    { title: 'Analyse contractuelle', body: 'Clauses CCAP sensibles, pénalités, délais — aide à la lecture, pas substitut juridique.' },
    { title: 'Suivi des sous-traitants', body: 'Courriers, demandes de pièces, coordination planning.' },
    { title: 'E-mails MOA/MOE', body: 'Demandes d\'exécution, réserves, coordination — format professionnel.' },
  ],
  publicTitle: 'Public concerné',
  publicTargets: [
    'Conducteurs de travaux',
    'Chefs de chantier',
    'Chargés d\'affaires terrain',
    'Responsables travaux',
    'Assistants travaux',
  ],
  specialSection: {
    id: 'terrain',
    title: 'Une formation IA conçue pour le terrain',
    paragraphs: [
      'Les exercices reprennent des situations rencontrées par les conducteurs de travaux : réunion de chantier du matin, relance sous-traitant en fin de journée, lecture d\'un avenant avant négociation.',
      'Vous repartez avec des prompts réutilisables et une méthode en trois temps : capturer l\'information, structurer avec l\'IA, relire et valider avant diffusion.',
    ],
  },
  faq: [
    {
      q: 'ChatGPT peut-il aider un conducteur de travaux ?',
      a: 'Oui, pour structurer des CR, rédiger des courriers, synthétiser des documents et préparer des réunions. La validation et la signature restent à votre charge.',
    },
    {
      q: 'Claude est-il adapté aux documents de chantier ?',
      a: 'Claude gère bien les documents longs (CCTP, DCE). ChatGPT convient aux formats courts (emails, CR). La formation compare les usages selon vos cas.',
    },
    {
      q: 'Peut-on former toute l\'équipe travaux en intra ?',
      a: 'Oui. Session intra dans vos locaux, contenu adapté à vos trames et process internes.',
    },
    {
      q: 'Quelle durée et quel format ?',
      a: 'Session catalogue de 4 heures en présentiel. Programme NIV-03 conduite de travaux disponible en catalogue.',
    },
    {
      q: 'Financement OPCO possible ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE}`,
    },
  ],
  courseName: 'Formation IA pour conducteurs de travaux BTP',
  courseTeaches: [
    'Comptes rendus de chantier avec l\'IA',
    'PPSPS et documents QSE assistés',
    'Courriers et emails MOA/MOE',
    'Synthèse CCTP et suivi réserves',
    'DOE et tableaux de suivi chantier',
  ],
  primaryCtaLabel: 'Former mes conducteurs de travaux à l\'IA',
  midCtaTitle: 'Parler de votre besoin conducteur de travaux',
  midCtaSubtitle: 'Identifions ensemble vos priorités : CR, PPSPS, courriers ou analyse documentaire.',
  finalCtaTitle: 'Demander un devis formation intra',
  finalCtaSubtitle: 'Formation dans vos locaux — équipes travaux et conducteurs.',
  campaignSlug: 'formation-ia-conducteur-de-travaux',
  programmeRef: 'NIV-03',
  catalogueHref: LINKS.formationConduiteTravauxSuiviChantier,
  catalogueLabel: 'NIV-03 — Conduite de travaux & suivi chantier',
  relatedLinks: [
    { href: LINKS.formationChatgptBtp, label: 'Formation ChatGPT pour le BTP' },
    { href: LINKS.formationIaAppelsOffresBtp, label: 'Formation IA appels d\'offres BTP' },
    { href: LINKS.formationClaudeBtp, label: 'Formation Claude pour le bâtiment' },
    { href: '/formation-ia-btp', label: 'Formation IA pour le BTP — pilier' },
    { href: LINKS.iaCompteRenduChantier, label: 'Comptes rendus de chantier avec l\'IA' },
  ],
};
