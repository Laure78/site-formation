/**
 * Données page d'accueil — source unique, valeurs issues du code existant (jamais inventées).
 */
import { getFormationByCode } from '@/data/formations';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import { catalogueNiveauLabel } from '@/lib/formations-catalogue-display';
import {
  formatNoteSatisfactionSur5,
  formatVolumeProsFormesBtp,
} from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';
import {
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import {
  TARIF_INTER_DEV_WEB_IA_HT,
  DEV_WEB_IA_FORMATION_TITRE,
} from '@/lib/formation-developpement-web-ia-content';
import { catalogueCardAnchorId } from '@/lib/formations-catalogue-page-config';
import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_MONITEUR_FORMATIONS,
  CLIENT_LOGOS_MARQUEE,
  LOGO_MONITEUR_FORMATIONS,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';

const FORMATION_HREF_BY_CODE = {
  'NIV-01': LINKS.formationIaBtpNiveau1BatimentTp,
  'NIV-02': LINKS.formationAO,
  'NIV-03': LINKS.formationConduiteTravauxSuiviChantier,
  'NIV-04': LINKS.formationMaitriserClaudeAiBtp,
} as const;

/** Format catalogue affiché sur les cartes accueil (présentiel IDF). */
const ACCUEIL_FORMAT_FORMATION = 'Présentiel · Île-de-France' as const;

/** Ligne compacte hero — modalités commerciales (filtre immédiat). */
export function getAccueilHeroModalitesLine(): string {
  return 'Présentiel · Île-de-France · Vos documents réels · Organisme certifié Qualiopi';
}

/** Ligne tarif NIV-10 accueil — source `TARIF_INTER_DEV_WEB_IA_HT`. */
export function getAccueilDevWebIaEssentialsLine(): string {
  const tarif = formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT);
  return `7 h · ${tarif} € HT / participant (inter) · Présentiel IDF ou visio (inter)`;
}

/** Mise en avant accueil — formation NIV-10 (bloc compact). */
export const ACCUEIL_DEV_WEB_IA_HIGHLIGHT = {
  eyebrow: 'Nouvelle formation · Création avec l’IA',
  title: DEV_WEB_IA_FORMATION_TITRE,
  lead:
    'Partez d’un besoin concret et créez une première version testable d’un site ou d’un outil métier avec l’IA — sans écrire le code vous-même.',
  audience:
    'Pour les équipes et dirigeants du BTP, ainsi que les entrepreneurs et indépendants.',
  examples: ['Outil de suivi', 'Espace client', 'Formulaire ou site vitrine'] as const,
  promiseNote:
    'Première version testable et méthode pour la faire évoluer — pas une application complète prête pour la production.',
  ctaLabel: 'Découvrir la formation',
} as const;

export type AccueilEntreeBesoinCarte = {
  id: string;
  besoin: string;
  publicLabel: string;
  href: string;
  linkLabel: string;
};

/** Entrée par besoin — liens uniques (éviter doublons d’URL sur l’accueil). */
function catalogueFormationHref(code: 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-10'): string {
  return `${LINKS.formations}#${catalogueCardAnchorId(code)}`;
}

export function getAccueilEntreeParBesoinCartes(): readonly AccueilEntreeBesoinCarte[] {
  return [
    {
      id: 'decouvrir',
      besoin: 'Découvrir l’IA',
      publicLabel: 'Premiers pas sur vos documents BTP',
      href: catalogueFormationHref('NIV-01'),
      linkLabel: 'Voir au catalogue',
    },
    {
      id: 'ao',
      besoin: 'Répondre aux appels d’offres',
      publicLabel: 'DCE, chiffrage, mémoire technique',
      href: catalogueFormationHref('NIV-02'),
      linkLabel: 'Voir au catalogue',
    },
    {
      id: 'devis',
      besoin: 'Préparer les devis',
      publicLabel: 'Études de prix et production chiffrée',
      href: LINKS.formationIaEtudesPrixChiffrageBtp,
      linkLabel: 'Voir le programme',
    },
    {
      id: 'chantier',
      besoin: 'Suivre les chantiers',
      publicLabel: 'CR, suivi et fin de chantier',
      href: catalogueFormationHref('NIV-03'),
      linkLabel: 'Voir au catalogue',
    },
    {
      id: 'claude',
      besoin: 'Maîtriser Claude',
      publicLabel: 'Projects, Cowork et Skills pour le BTP',
      href: catalogueFormationHref('NIV-04'),
      linkLabel: 'Voir au catalogue',
    },
    {
      id: 'outil-ia',
      besoin: 'Créer un outil avec l’IA',
      publicLabel: 'Site, app ou outil métier sans coder',
      href: catalogueFormationHref('NIV-10'),
      linkLabel: 'Voir au catalogue',
    },
  ] as const;
}

export const ACCUEIL_PARCOURS_FORMATION_ETAPES = [
  {
    n: '1',
    titre: 'Apporter un cas réel',
    detail: 'Vos devis, DCE, CR ou processus — pas un exercice générique.',
  },
  {
    n: '2',
    titre: 'Pratiquer pendant la formation',
    detail: 'Exercices guidés sur vos situations, avec relecture humaine systématique.',
  },
  {
    n: '3',
    titre: 'Repartir avec une méthode réutilisable',
    detail: 'Prompts, trames et habitudes applicables dès le retour en entreprise.',
  },
] as const;

/** Trois exemples — liens distincts du bloc « entrée par besoin » (devis → landing chiffrage). */
export const ACCUEIL_METHODE_EXEMPLES = [
  {
    id: 'dce',
    titre: 'Analyser un DCE',
    phrase: 'Synthétiser RC, CCTP et CCAP pour cadrer votre réponse.',
    href: LINKS.formationIaAppelsOffresBtp,
    ariaLabel: 'Analyser un DCE — formation IA appels d’offres BTP',
  },
  {
    id: 'cr',
    titre: 'Structurer un compte rendu de chantier',
    phrase: 'Transformer vos notes terrain en CR clair, prêt à relire.',
    href: LINKS.formationConducteurTravaux,
    ariaLabel: 'Compte rendu de chantier — formation IA conducteur de travaux',
  },
  {
    id: 'devis',
    titre: 'Préparer un devis',
    phrase: 'Structurer désignations et libellés à partir de vos modèles.',
    href: LINKS.iaDevis,
    ariaLabel: 'Préparer un devis — méthode IA devis bâtiment',
  },
] as const;

/** Ligne compacte hero — indicateurs réels (Qualiopi, IDF). */
export function getAccueilHeroReassuranceLine(): string {
  return `${formatVolumeProsFormesBtp()} professionnels formés · ${formatNoteSatisfactionSur5()} de satisfaction · Qualiopi · Île-de-France`;
}

/** Preuves hero — items séparés pour une ligne visuelle premium. */
export function getAccueilHeroProofItems(): readonly { value: string; label: string }[] {
  return [
    { value: formatVolumeProsFormesBtp(), label: 'professionnels formés' },
    { value: formatNoteSatisfactionSur5(), label: 'de satisfaction' },
    { value: 'Qualiopi', label: 'organisme certifié' },
    { value: 'Île-de-France', label: 'interventions' },
  ] as const;
}

/** Logos partenaires autorisés sur l'accueil (max 6). */
export const ACCUEIL_LOGOS_PARTENAIRES = [
  CLIENT_LOGOS_MARQUEE.find((l) => l.id === 'ffb-grand-paris-idf')!,
  {
    id: 'ffb-idf-accueil',
    name: 'FFB Île-de-France',
    alt: ALT_LOGO_FFB_OFFICIEL,
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ffbIdf,
    linkTitle: 'Site officiel FFB Île-de-France',
  },
  CLIENT_LOGOS_MARQUEE.find((l) => l.id === 'csfe')!,
  {
    id: 'cnam-accueil',
    name: 'CNAM Entreprises',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    width: 220,
    height: 80,
    href: PARTNER_WEBSITES.cnamIdf,
    linkTitle: 'Site officiel CNAM Entreprises Île-de-France',
  },
  {
    id: 'moniteur-accueil',
    name: 'Le Moniteur Formations',
    alt: ALT_LOGO_MONITEUR_FORMATIONS,
    src: LOGO_MONITEUR_FORMATIONS.src,
    width: LOGO_MONITEUR_FORMATIONS.width,
    height: LOGO_MONITEUR_FORMATIONS.height,
    href: PARTNER_WEBSITES.moniteurFormations,
    linkTitle: 'Site officiel Le Moniteur Formations',
  },
] as const;

export type AccueilCarteProbleme = {
  id: string;
  titre: string;
  description: string;
};

/**
 * Usages IA BTP — cartes visuelles (sans lien) pour éviter les doublons d’URL
 * avec la section formations et les résultats concrets.
 */
export function getAccueilCartesProblemesMetier(): readonly AccueilCarteProbleme[] {
  return [
    {
      id: 'ao',
      titre: 'DCE et appels d’offres',
      description:
        'Analyser et synthétiser les documents d’un dossier de consultation.',
    },
    {
      id: 'chiffrage',
      titre: 'Chiffrage',
      description:
        'Exploiter plus rapidement les informations nécessaires à la préparation d’un chiffrage.',
    },
    {
      id: 'cr',
      titre: 'Comptes rendus de chantier',
      description:
        'Transformer des notes, informations ou retranscriptions en documents structurés.',
    },
    {
      id: 'documents',
      titre: 'Documents chantier',
      description:
        'Préparer courriers, synthèses, procédures et documents professionnels.',
    },
    {
      id: 'admin',
      titre: 'Administratif',
      description: 'Rédiger, reformuler et synthétiser plus rapidement.',
    },
    {
      id: 'communication',
      titre: 'Communication',
      description: 'Créer des contenus adaptés à l’activité de l’entreprise.',
    },
  ] as const;
}

export type AccueilFormationCarte = {
  code?: string;
  titre: string;
  benefice: string;
  niveau?: string;
  duree: string;
  publicCible: string;
  format: string;
  href: string;
};

/** Public court — libellés dédiés (évite troncature du champ catalogue). */
const ACCUEIL_PUBLIC_BY_CODE = {
  'NIV-01': 'Dirigeants, équipes BTP et fonctions support',
  'NIV-02': 'Chargés d’affaires, études de prix, réponse aux AO',
  'NIV-03': 'Conducteurs de travaux et suivi de chantier',
  'NIV-04': 'Profils à l’aise avec l’IA sur documents BTP',
} as const satisfies Record<'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04', string>;

/**
 * Formations prioritaires — usages opérationnels BTP uniquement
 * (NIV-01 à NIV-04). Pas de parcours applications métier (relai BeWork).
 */
export function getAccueilFormationsPrioritaires(): readonly AccueilFormationCarte[] {
  const codes = ['NIV-01', 'NIV-02', 'NIV-03', 'NIV-04'] as const;
  const cartes: AccueilFormationCarte[] = [];

  for (const code of codes) {
    if (!isFormationCataloguePublished(code)) continue;
    const f = getFormationByCode(code);
    if (!f) continue;
    cartes.push({
      code,
      titre: f.titre,
      benefice: f.promesse,
      niveau: catalogueNiveauLabel(code),
      duree: f.duree,
      publicCible: ACCUEIL_PUBLIC_BY_CODE[code],
      format: ACCUEIL_FORMAT_FORMATION,
      href: FORMATION_HREF_BY_CODE[code],
    });
  }

  return cartes;
}

export const ACCUEIL_DOCUMENTS_EXEMPLES = [
  'DCE',
  'CCTP',
  'CCAP',
  'DPGF',
  'Devis',
  'PPSPS',
  'DOE',
  'CR chantier',
  'Mémoire technique',
] as const;

export const ACCUEIL_METHODE_ETAPES = [
  { n: '01', titre: 'Vous apportez vos documents.' },
  { n: '02', titre: 'Nous identifions les tâches chronophages.' },
  {
    n: '03',
    titre: 'Nous construisons les méthodes et assistants IA.',
  },
  { n: '04', titre: 'Vos équipes repartent avec des usages réutilisables.' },
] as const;

/**
 * Cas d’usage « résultats concrets » — liens uniques sur l’accueil
 * (jamais deux fois la même URL sur la page ; destinations déjà utilisées
 * ailleurs sur l’accueil évitées : formationAO, NIV-01, NIV-03 catalogue, iaDevis…).
 */
export const ACCUEIL_CAS_USAGE_RESULTATS = [
  {
    id: 'dce',
    titre: 'Analyser un DCE',
    phrase: 'Synthétiser RC, CCTP et CCAP pour cadrer votre réponse.',
    tags: ['RC', 'CCTP', 'CCAP'] as const,
    href: LINKS.formationIaAppelsOffresBtp,
    ariaLabel: 'Analyser un DCE — découvrir la formation IA appels d’offres BTP',
  },
  {
    id: 'devis',
    titre: 'Préparer un devis',
    phrase: 'Structurer désignations et libellés à partir de vos modèles.',
    tags: ['Désignations', 'Quantitatif'] as const,
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    ariaLabel: 'Préparer un devis — découvrir la formation IA devis et chiffrage BTP',
  },
  {
    id: 'cr',
    titre: 'Rédiger un compte rendu de chantier',
    phrase: 'Transformer vos notes terrain en CR clair, prêt à relire.',
    tags: ['Notes terrain → CR'] as const,
    href: LINKS.formationConducteurTravaux,
    ariaLabel:
      'Rédiger un compte rendu de chantier — découvrir la formation IA conducteur de travaux',
  },
  {
    id: 'memoire',
    titre: 'Structurer un mémoire technique',
    phrase: 'Organiser vos arguments et preuves pour l’appel d’offres.',
    tags: ['Exigences', 'Moyens', 'Preuves'] as const,
    /** Page dédiée mémoire (cluster AO) — évite un 2ᵉ lien vers formationAO / landing AO. */
    href: LINKS.iaMemoireTechnique,
    ariaLabel:
      'Structurer un mémoire technique — découvrir la méthode IA mémoire technique BTP',
  },
  {
    id: 'doe',
    titre: 'Préparer un DOE',
    phrase: 'Assembler et structurer les pièces de fin de chantier.',
    tags: ['Pièces', 'Contrôle', 'Classement'] as const,
    /**
     * Tuto DOE dédié (200).
     * La landing `/formation-ia-conducteur-travaux` redirige en 308 vers
     * `/formation-ia-conducteur-de-travaux` (déjà utilisée par la carte CR) ;
     * le catalogue NIV-03 est déjà lié ailleurs sur l’accueil.
     */
    href: LINKS.tutoDoeDossierOuvragesExecutes,
    ariaLabel: 'Préparer un DOE — découvrir le tuto DOE dossier des ouvrages exécutés',
  },
  {
    id: 'emails',
    titre: 'Rédiger emails et courriers',
    phrase: 'Accélérer relances, courriers et échanges clients.',
    tags: ['Rédaction', 'Relance', 'Synthèse'] as const,
    /**
     * Landing ChatGPT BTP (emails / admin) — NIV-01 déjà lié ailleurs sur l’accueil
     * (problèmes métier + formations prioritaires).
     */
    href: LINKS.formationChatgptBtp,
    ariaLabel:
      'Rédiger emails et courriers — découvrir la formation ChatGPT pour le BTP',
  },
] as const;

export const ACCUEIL_RESSOURCES = [
  {
    titre: 'Guide conducteur de travaux',
    phrase: 'PDF gratuit — skills IA pour DCE, PPSPS, CR et DOE.',
    category: 'Guide',
    href: LINKS.guideConducteurTravauxIaBtp,
  },
  {
    titre: 'Analyser un DCE avec l’IA',
    phrase: 'Méthode et cas d’usage pour décrypter un dossier de consultation.',
    category: 'Méthode',
    href: LINKS.iaAnalyseDce,
  },
  {
    titre: 'Compte rendu de chantier avec l’IA',
    phrase: 'Modèle et bonnes pratiques pour vos CR de chantier.',
    category: 'Tutoriel',
    href: LINKS.iaCompteRenduChantier,
  },
] as const;
