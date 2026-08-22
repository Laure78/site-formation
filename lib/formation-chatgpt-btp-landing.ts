/**
 * Landing `/formation-chatgpt-btp` — cluster SEO « formation ChatGPT BTP ».
 */
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const FORMATION_CHATGPT_BTP_PATH = '/formation-chatgpt-btp' as const;

export const FORMATION_CHATGPT_BTP_CONFIG: SeoClusterPageConfig = {
  path: FORMATION_CHATGPT_BTP_PATH,
  seo: {
    title: 'Formation ChatGPT BTP | IA bâtiment',
    titleAbsolute: 'Formation ChatGPT BTP | IA pour les entreprises du bâtiment',
    description:
      'Formation ChatGPT BTP en présentiel : devis, CR, emails et analyse documentaire pour les pros du bâtiment. Qualiopi, IDF. Visio découverte.',
    openGraphTitle: 'Formation ChatGPT BTP | IA pour les entreprises du bâtiment',
    keywords: [
      'formation ChatGPT BTP',
      'ChatGPT bâtiment',
      'ChatGPT pour le BTP',
      'formation ChatGPT bâtiment',
      'intelligence artificielle bâtiment',
      'IA générative BTP',
      'ChatGPT conducteur de travaux',
    ],
    image: {
      url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
      width: 1024,
      height: 682,
      alt: 'Formation ChatGPT pour les professionnels du BTP — session en présentiel',
    },
  },
  h1: 'Formation ChatGPT pour le BTP',
  subtitle:
    'Apprenez à utiliser ChatGPT sur vos documents de chantier, devis, emails et dossiers administratifs — en présentiel, avec vos cas réels.',
  shortAnswer:
    'Formation pratique ChatGPT BTP : comptes rendus, devis, analyse CCTP/CCAP, emails et mémoires techniques. Session 4 h en présentiel Île-de-France, organisme Qualiopi.',
  introParagraphs: [
    "Dans une entreprise du bâtiment, ChatGPT devient utile lorsqu'il est branché sur vos formats métier : compte rendu de chantier, relance client, synthèse de CCTP ou brouillon de mémoire technique. Ce n'est pas un gadget marketing — c'est un assistant de rédaction et de structuration, sous votre relecture.",
    "Un conducteur de travaux peut transformer ses notes de réunion en compte rendu structuré en quelques minutes. Un responsable administratif peut accélérer les courriers récurrents. Un chargé d'affaires peut cadrer la lecture d'un DCE avant la réunion Go/No Go.",
    "Cette formation ChatGPT BTP est conçue exclusivement pour les professionnels du bâtiment et des travaux publics : vocabulaire chantier, documents contractuels, contraintes Qualiopi et confidentialité des données entreprise.",
  ],
  useCasesTitle: 'Cas d\'usage ChatGPT dans une entreprise du bâtiment',
  useCases: [
    { title: 'Comptes rendus de chantier', body: 'Notes vocales ou listes à puces → CR structuré avec actions, réserves et prochaine réunion.' },
    { title: 'Préparation de devis', body: 'Templates intelligents par corps de métier, descriptions de prestations et conditions de paiement.' },
    { title: 'Analyse de documents', body: 'Synthèse de CCTP, CCAP, plans de prévention et pièces administratives longues.' },
    { title: 'Rédaction d\'e-mails', body: 'Relances clients, courriers MOA/MOE, demandes fournisseurs — ton professionnel BTP.' },
    { title: 'Relances clients et impayés', body: 'Formulations factuelles, références contractuelles, escalade progressive.' },
    { title: 'Préparation de PPSPS', body: 'Trame des chapitres réglementaires à partir du type de chantier — validation SST obligatoire.' },
    { title: 'Préparation de procédures internes', body: 'Modèles de courriers, checklists et trames réutilisables par service.' },
    { title: 'Analyse de CCTP et CCAP', body: 'Points de vigilance, clauses sensibles, incohérences potentielles avant chiffrage.' },
    { title: 'Mémoires techniques et appels d\'offres', body: 'Structure de brouillon, reformulation par critère de notation — sans remplacer l\'expertise métier.' },
    { title: 'Synthèse de documents de chantier', body: 'PV, DOE, réserves : regroupement et mise en forme à partir de notes terrain.' },
    { title: 'Préparation de DOE', body: 'Plan de classement par chapitre, détection des pièces manquantes.' },
    { title: 'Organisation administrative', body: 'Tableaux de suivi, priorités hebdomadaires, modèles de reporting direction.' },
  ],
  publicTitle: 'Public concerné',
  publicTargets: [
    'Conducteurs de travaux',
    'Chargés d\'affaires',
    'Assistants travaux',
    'Responsables administratifs',
    'Dirigeants BTP',
    'Économistes',
    'Bureaux d\'études',
    'Responsables appels d\'offres',
  ],
  faq: [
    {
      q: 'Comment utiliser ChatGPT dans le BTP ?',
      a: 'En cadrant le contexte chantier (lot, MOA/MOE, type de document) dans le prompt, puis en relisant systématiquement le brouillon avant envoi. La formation couvre cette méthode sur vos documents réels.',
    },
    {
      q: 'ChatGPT peut-il remplacer un conducteur de travaux ?',
      a: 'Non. ChatGPT accélère la rédaction et la structuration — comptes rendus, emails, synthèses. Les décisions terrain, la signature et la responsabilité contractuelle restent humaines.',
    },
    {
      q: 'Mes données chantier sont-elles protégées ?',
      a: `Selon votre outil et votre abonnement, des règles de confidentialité s'appliquent. La formation aborde les bonnes pratiques RGPD et les choix Enterprise/Pro adaptés aux entreprises BTP.`,
    },
    {
      q: 'Faut-il savoir coder pour suivre la formation ?',
      a: 'Non. Un navigateur web et vos documents métier suffisent. Aucun prérequis technique avancé.',
    },
    {
      q: 'Peut-on financer la formation ChatGPT BTP ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE} Détails sur la <a href="${LINKS.financement}">page financement Constructys</a>.`,
    },
    {
      q: 'Quelle différence avec une formation IA généraliste ?',
      a: 'Cette formation utilise le vocabulaire BTP (CCTP, DPGF, CR, PPSPS, DOE) et des exercices sur vos dossiers — pas des cas marketing ou développement web.',
    },
  ],
  courseName: 'Formation ChatGPT pour le BTP',
  courseTeaches: [
    'Utiliser ChatGPT pour les devis BTP',
    'Rédiger des comptes rendus de chantier',
    'Analyser CCTP et CCAP avec l\'IA',
    'Emails professionnels et relances clients',
    'Prompts adaptés aux métiers du bâtiment',
  ],
  primaryCtaLabel: 'Demander une formation ChatGPT BTP',
  midCtaTitle: 'Parler de votre besoin ChatGPT BTP',
  midCtaSubtitle:
    '30 minutes pour identifier vos cas d\'usage prioritaires : devis, CR, administratif ou appels d\'offres.',
  finalCtaTitle: 'Organiser une formation intra ChatGPT',
  finalCtaSubtitle:
    'Session dans vos locaux ou en salle — contenu adapté à vos process et à vos équipes.',
  campaignSlug: 'formation-chatgpt-btp',
  programmeRef: 'NIV-01',
  catalogueHref: LINKS.formationIaBtpNiveau1BatimentTp,
  catalogueLabel: 'NIV-01 — L\'IA au service du bâtiment et des travaux publics',
  relatedLinks: [
    { href: '/formation-ia-btp', label: 'Formation IA pour le BTP — page pilier' },
    { href: LINKS.formationConducteurTravaux, label: 'IA pour les conducteurs de travaux' },
    { href: LINKS.formationIaAppelsOffresBtp, label: 'Formation IA appels d\'offres BTP' },
    { href: LINKS.formationClaudeBtp, label: 'Formation Claude pour le bâtiment' },
    { href: LINKS.formationIaEntrepriseBatimentParis, label: 'Formation IA BTP en Île-de-France' },
    { href: LINKS.aPropos, label: 'Laure Olivié — à propos' },
  ],
};
