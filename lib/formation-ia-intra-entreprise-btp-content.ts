/**
 * Contenu page `/formation-ia-intra-entreprise-btp` — formation IA intra-entreprise BTP.
 * Une URL unique par destination sur la page (netlinking).
 */
import { CPB_NOM_COMPLET, CPB_OFFICIAL_URL } from '@/lib/cpb';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { ALT_LOGO_CPB } from '@/lib/client-logos';

export const INTRA_PATH = LINKS.formationIaIntraEntrepriseBtp;

export const INTRA_META = {
  title: 'Formation IA intra-entreprise BTP | Laure Olivié',
  description:
    'Formez vos équipes BTP à l’IA en présentiel en Île-de-France. Formation IA pour le BTP : catalogue ou parcours sur mesure, cas métier et devis.',
  h1: 'Formation IA intra-entreprise : faites progresser vos équipes BTP',
  eyebrow: 'Formation IA en entreprise · BTP · Île-de-France',
  intro:
    'Formez vos collaborateurs ensemble, à partir de leurs besoins et de leurs documents métier. Choisissez une formation du catalogue ou construisons un parcours adapté à votre entreprise.',
} as const;

export const INTRA_HERO_FACTS = [
  'Présentiel en Île-de-France',
  'Session dédiée à votre équipe',
  'Cas pratiques BTP',
  'Programme et devis personnalisés',
] as const;

export const INTRA_FORMATS = [
  {
    id: 'catalogue',
    title: 'Une formation du catalogue pour votre équipe',
    text: 'Vous avez identifié un programme qui répond à votre besoin. Organisez une session dédiée à vos collaborateurs, avec des exercices contextualisés à votre activité.',
    points: [
      'Programme et objectifs pédagogiques déjà définis.',
      'Exemples adaptés à vos métiers.',
      'Dates convenues selon les disponibilités.',
      'Organisation précisée lors du cadrage.',
    ],
    ctaLabel: 'Voir les programmes',
    ctaHref: LINKS.formations,
  },
  {
    id: 'sur-mesure',
    title: 'Un parcours construit autour de vos usages',
    text: 'Vos équipes ont plusieurs besoins ou des niveaux différents. Construisons une progression adaptée à leurs missions, à vos outils et à vos priorités.',
    points: [
      'Analyse des usages et du niveau des participants.',
      'Sélection des compétences à développer.',
      'Enchaînement de modules cohérents.',
      'Exercices et livrables définis ensemble.',
    ],
    ctaLabel: 'Échanger sur mon parcours',
    /** Distinct de `/prendre-rdv` (CTA hero) — netlinking. */
    ctaHref: LINKS.contact,
  },
] as const;

export const INTRA_BENEFICES = [
  {
    title: 'Vos documents métier',
    text: 'Devis, CCTP, CCAP, comptes rendus, plannings et courriers servent de supports aux exercices, après anonymisation si nécessaire.',
  },
  {
    title: 'Des méthodes communes',
    text: 'Construisez des consignes, trames et habitudes de vérification réutilisables par l’équipe.',
  },
  {
    title: 'Une organisation adaptée',
    text: 'Définissez les groupes et les dates en tenant compte des missions et des contraintes de chantier.',
  },
  {
    title: 'Une prise en main progressive',
    text: 'Avancez selon les acquis des participants, des premiers usages aux assistants et outils métier.',
  },
] as const;

export const INTRA_CAS_USAGE = [
  {
    title: 'Études et appels d’offres',
    text: 'Analyser un DCE, repérer les exigences et structurer un mémoire technique.',
    /** Landing métier — évite le doublon avec la fiche catalogue du footer. */
    href: LINKS.formationIaAppelsOffresBtp,
    linkLabel: 'Formation IA appels d’offres BTP',
  },
  {
    title: 'Devis et chiffrage',
    text: 'Préparer les désignations, organiser les données et contrôler les informations manquantes.',
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    linkLabel: 'Programme IA études de prix et chiffrage',
  },
  {
    title: 'Conduite de travaux',
    text: 'Structurer les comptes rendus, extraire les actions et préparer le suivi documentaire.',
    href: LINKS.formationIaConducteurDeTravaux,
    linkLabel: 'Formation IA conducteur de travaux',
  },
  {
    title: 'Administration et relation client',
    text: 'Rédiger des courriers, préparer les relances et organiser les informations.',
    href: LINKS.formationIaAssistanteTravaux,
    linkLabel: 'Formation IA assistants travaux',
  },
  {
    title: 'Assistants IA et Skills',
    text: 'Formaliser les méthodes de l’entreprise dans des consignes réutilisables.',
    href: LINKS.formationMaitriserClaudeAiBtp,
    linkLabel: 'Programme Maîtriser Claude AI',
  },
  {
    title: 'Outils métier sur mesure',
    text: 'Concevoir une première version testable d’un outil de planning, de suivi ou de gestion avec l’IA.',
    /** Parcours applications métier — distinct de la fiche NIV-03 du footer. */
    href: LINKS.formationApplicationMetierBtpNiveau1,
    linkLabel: 'Créer sa première application métier BTP',
  },
] as const;

export const INTRA_VALIDATION_NOTE =
  'Les productions de l’IA restent soumises à la validation du professionnel, notamment pour les prix, les quantités et les exigences techniques.';

export const INTRA_PROGRESSION = [
  {
    niveau: 1,
    title: 'Découvrir',
    text: 'Comprendre l’IA et pratiquer sur des tâches simples.',
    duree: '4 h pour « Les bases de l’IA ».',
  },
  {
    niveau: 2,
    title: 'Approfondir',
    text: 'Structurer les usages métier et créer des assistants.',
    duree: 'Format cible : 7 h.',
  },
  {
    niveau: 3,
    title: 'Créer',
    text: 'Concevoir ses outils métier avec l’IA.',
    duree: 'Format cible : 7 h ou 14 h selon le programme.',
  },
] as const;

export const INTRA_PROGRESSION_NOTE =
  'Le point d’entrée dépend des acquis et des objectifs de vos collaborateurs. Les trois niveaux ne sont pas obligatoires.';

export const INTRA_PROGRESSION_EXEMPLE =
  'Exemple de progression : découvrir l’IA → approfondir un usage métier → créer un assistant ou un outil adapté.';

export const INTRA_ETAPES = [
  {
    n: '1',
    title: 'Cadrer le besoin',
    text: 'Identifier les métiers, les participants, les outils et les tâches prioritaires.',
  },
  {
    n: '2',
    title: 'Construire la proposition',
    text: 'Définir les objectifs, le programme, la durée et les modalités dans un devis.',
  },
  {
    n: '3',
    title: 'Préparer et animer la formation',
    text: 'Sélectionner les documents utilisables et alterner démonstrations, exercices et vérifications.',
  },
  {
    n: '4',
    title: 'Faire le bilan',
    text: 'Évaluer les acquis et identifier les usages à poursuivre au retour en entreprise.',
  },
] as const;

export const INTRA_CONFIDENTIALITE = {
  title: 'Pratiquer sur vos documents avec un cadre clair',
  lead:
    'Les exercices peuvent utiliser vos documents professionnels lorsque leur utilisation est autorisée. Les informations sensibles sont retirées ou anonymisées. Si un document ne peut pas être partagé, un cas pédagogique peut être utilisé.',
  points: [
    'Les outils et comptes utilisables sont définis avant la session.',
    'Les règles internes de l’entreprise sont prises en compte.',
    'Les productions sont relues avant utilisation.',
  ],
} as const;

export const INTRA_REF_CPB = {
  name: CPB_NOM_COMPLET,
  text: 'Deux sessions mises en place avec la Chambre des Professionnels du Bois autour du programme “L’IA au service des pros du bâtiment et des travaux publics”.',
  programmeHref: LINKS.formationIaBtpNiveau1BatimentTp,
  programmeLabel: 'Découvrir le programme',
  officialHref: CPB_OFFICIAL_URL,
  officialLabel: 'Découvrir la CPB',
  logoSrc: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
  logoAlt: ALT_LOGO_CPB,
  logoWidth: 400,
  logoHeight: 120,
} as const;

export const INTRA_PRATIQUE = {
  title: 'Organiser votre formation intra-entreprise',
  items: [
    {
      label: 'Lieu',
      text: 'Présentiel en Île-de-France, dans des locaux adaptés convenus ensemble.',
    },
    {
      label: 'Participants',
      text: 'Groupe défini selon le programme et les niveaux.',
    },
    {
      label: 'Matériel',
      text: 'Ordinateur et accès aux outils nécessaires, précisés avant la session.',
    },
    {
      label: 'Tarif',
      text: 'Sur devis selon le programme, la durée, l’effectif et l’adaptation.',
    },
    {
      label: 'Accessibilité',
      text: 'Besoins d’aménagement à signaler lors du cadrage.',
    },
  ],
  financement:
    'Une prise en charge peut être possible selon votre situation et les critères de l’organisme financeur. Elle reste soumise à son accord.',
  financementHref: LINKS.financement,
  financementLabel: 'Financement des formations IA BTP',
} as const;

export const INTRA_FAQ = [
  {
    q: 'Quelle différence entre une formation intra et interentreprises ?',
    a: 'Intra : une session réservée à une même entreprise. Inter : une session réunissant des participants de plusieurs entreprises.',
  },
  {
    q: 'Peut-on adapter les exercices à notre métier ?',
    a: 'Oui, les cas pratiques sont sélectionnés selon les missions et objectifs convenus.',
  },
  {
    q: 'Faut-il déjà maîtriser ChatGPT ou Claude ?',
    a: 'Le niveau 1 s’adresse aux débutants. Les prérequis des autres programmes sont vérifiés lors du cadrage.',
  },
  {
    q: 'Peut-on utiliser nos propres documents ?',
    a: 'Oui, sous réserve des autorisations et précautions de confidentialité nécessaires.',
  },
  {
    q: 'Peut-on former plusieurs équipes ?',
    a: 'Des groupes peuvent être organisés selon les métiers, les niveaux et les disponibilités.',
  },
  {
    q: 'Comment connaître le tarif ?',
    a: 'Un devis est établi après qualification du besoin.',
  },
] as const;

export const INTRA_CONTACT = {
  title: 'Quel usage de l’IA souhaitez-vous développer dans votre entreprise ?',
  text: 'Précisons les métiers concernés, le nombre de participants et vos priorités pour construire une proposition adaptée.',
  /**
   * `/prendre-rdv` = hero ; `/contact` = carte « parcours sur mesure ».
   * Bandeau final : mailto (libellé principal) — netlinking.
   */
  mailtoHref: `mailto:${CONTACT.email}`,
  mailtoLabel: 'Échanger sur mon projet',
  mailtoSecondaryLabel: 'Nous écrire',
} as const;
