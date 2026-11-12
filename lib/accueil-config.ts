/**
 * Données page d'accueil — source unique, valeurs issues du code existant (jamais inventées).
 */
import { getFormationByCode, isFormationSurDevis, libellePrixSessionHt } from '@/data/formations';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import { catalogueNiveauLabel } from '@/lib/formations-catalogue-display';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';
import {
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import {
  TARIF_INTER_DEV_WEB_IA_14H_HT,
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
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';

const FORMATION_HREF_BY_CODE = {
  'NIV-01': LINKS.formationIaBtpNiveau1BatimentTp,
  'NIV-02': LINKS.formationAO,
  'NIV-03': LINKS.formationConduiteTravauxSuiviChantier,
  'NIV-04': LINKS.formationMaitriserClaudeAiBtp,
  'NIV-05': LINKS.formationIaMaitriseOeuvre,
  'NIV-10': LINKS.formationDeveloppementWebIaSansCoder,
  'NIV-11': LINKS.formationIaAssistanceMaitriseOuvrage,
} as const;

/** Format catalogue affiché sur les cartes accueil (présentiel IDF). */
const ACCUEIL_FORMAT_FORMATION = SITE_FORMATION_MODALITE_ENCART;

/** Ligne compacte hero — modalités commerciales (filtre immédiat). */
export function getAccueilHeroModalitesLine(): string {
  return `${SITE_FORMATION_MODALITE_ENCART} · Vos documents réels · Organisme certifié Qualiopi`;
}

/** Ligne tarif NIV-10 accueil — source `data/formations.ts` + tarifs catalogue. */
export function getAccueilDevWebIaEssentialsLine(): string {
  const f = getFormationByCode('NIV-10');
  const tarif = formatTarifHt(f?.tarifParticipantHt ?? TARIF_INTER_DEV_WEB_IA_14H_HT);
  const duree = f?.duree ?? '14 h';
  return `${duree} · ${tarif} € HT / participant (inter) · Présentiel Île-de-France`;
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

/** Méthode pédagogique — 4 étapes (accueil). */
export const ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES = [
  {
    n: '1',
    titre: 'Identifier les besoins et le niveau initial',
    detail: 'Cadrage de vos missions, prérequis et documents adaptés à l’anonymisation si besoin.',
  },
  {
    n: '2',
    titre: 'Choisir la formation et les cas pratiques',
    detail: 'Programme catalogue ou parcours métier — objectifs et livrables définis à l’avance.',
  },
  {
    n: '3',
    titre: 'Pratiquer sur des documents contrôlés',
    detail: 'Exercices guidés avec ChatGPT ou Claude ; validation humaine avant usage ou envoi.',
  },
  {
    n: '4',
    titre: 'Évaluer les acquis et repartir équipé',
    detail: 'Supports réutilisables : trames, prompts, checklists et méthode de relecture.',
  },
] as const;

/** @deprecated Préférer `ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES`. */
export const ACCUEIL_PARCOURS_FORMATION_ETAPES = ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES;

/** Exemples d’exercices en formation — pas des témoignages clients. */
export const ACCUEIL_CAS_EXERCICES_FORMATION = [
  {
    id: 'dce-vigilance',
    titre: 'DCE — appel d’offres',
    badge: 'Exemple pédagogique',
    besoin: 'DCE fictif — repérer les exigences avant chiffrage.',
    travail: 'Synthèse RC, CCTP et CCAP avec ChatGPT ou Claude.',
    livrable: 'Checklist et questions MOE.',
    verification: 'Relire citations, montants et délais avant Go / No Go.',
    apercu:
      '▸ Exigence CCTP §4.2 — étanchéité terrasse\n▸ Point à vérifier — délai d’exécution RC\n▸ Question MOE — variante autorisée ?',
    href: LINKS.formationAO,
  },
  {
    id: 'cr-actions',
    titre: 'Notes de chantier',
    badge: 'Exemple pédagogique',
    besoin: 'Notes de réunion terrain (cas fictif).',
    travail: 'CR structuré et tableau d’actions (qui / quoi / quand).',
    livrable: 'CR + plan d’actions.',
    verification: 'Validation conducteur ou chef de chantier avant envoi.',
    apercu:
      'Action 1 — Fournir plan réseaux | Resp. BE | 22/10\nAction 2 — Levée réservation | Resp. ST élec. | 25/10',
    href: LINKS.formationConduiteTravauxSuiviChantier,
  },
  {
    id: 'admin-suivi',
    titre: 'Suivi administratif',
    badge: 'Exemple pédagogique',
    besoin: 'Relances et pièces sur un dossier type (anonymisé).',
    travail: 'Courriers et relances structurés avec ChatGPT ou Claude.',
    livrable: 'Modèles + tableau de suivi.',
    verification: 'Relire montants, délais et ton avant envoi.',
    apercu:
      'Relance J+15 — Objet : facture n°… — Statut : en attente — Prochaine action : appel le…',
    href: LINKS.formationIaAssistanteBtp,
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
  return `${formatNoteSatisfactionSur5()} de satisfaction · Qualiopi · Île-de-France`;
}

/** Preuves hero — items séparés pour une ligne visuelle premium. */
export function getAccueilHeroProofItems(): readonly { value: string; label: string }[] {
  return [
    { value: formatNoteSatisfactionSur5(), label: 'de satisfaction' },
    { value: 'Qualiopi', label: 'organisme certifié' },
    { value: 'Île-de-France', label: 'interventions' },
  ] as const;
}

/**
 * Afficher le logo Le Moniteur Formations sur la bande partenaires de l’accueil.
 * Passer à `false` pour le retirer sans autre modification de code.
 */
export const showLeMoniteur = true;

const ACCUEIL_LOGO_LE_MONITEUR = {
  id: 'moniteur-accueil',
  name: 'Le Moniteur Formations',
  alt: ALT_LOGO_MONITEUR_FORMATIONS,
  src: LOGO_MONITEUR_FORMATIONS.src,
  width: LOGO_MONITEUR_FORMATIONS.width,
  height: LOGO_MONITEUR_FORMATIONS.height,
  href: PARTNER_WEBSITES.moniteurFormations,
  linkTitle: 'Site officiel Le Moniteur Formations',
} as const;

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
  ...(showLeMoniteur ? [ACCUEIL_LOGO_LE_MONITEUR] : []),
];

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
  'NIV-10': 'Dirigeants, conducteurs de travaux et fonctions support',
} as const satisfies Record<
  'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-10',
  string
>;

/** Aperçu accueil — une formation par niveau pédagogique (sources catalogue). */
const ACCUEIL_FORMATIONS_PRIORITAIRES_CODES = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-10',
] as const;

/** Cartes maquette accueil — prioritaires + cluster MOE / AMO. */
const ACCUEIL_MAQUETTE_FORMATION_CODES = [
  ...ACCUEIL_FORMATIONS_PRIORITAIRES_CODES,
  'NIV-05',
  'NIV-11',
] as const;

/**
 * Formations prioritaires — sélection équilibrée niveaux 1, 2 et 3 (données catalogue).
 */
/** Tarif « à partir de » pour une carte accueil — source catalogue (`data/formations.ts`). */
export function getAccueilFormationTarifApartir(code: string): string | null {
  const f = getFormationByCode(code);
  if (!f || isFormationSurDevis(f)) return null;
  return `À partir de ${libellePrixSessionHt(f)} (inter)`;
}

export function getAccueilFormationsPrioritaires(): readonly AccueilFormationCarte[] {
  const codes = ACCUEIL_FORMATIONS_PRIORITAIRES_CODES;
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
    titre: 'Diagnostic IA BTP',
    phrase: '2 min — maturité, priorités et parcours recommandé.',
    category: 'Outil',
    href: LINKS.diagnostic,
  },
  {
    titre: 'Guide conducteur de travaux',
    phrase: 'Skills IA — DCE, PPSPS, CR, DOE (PDF).',
    category: 'Guide',
    href: LINKS.guideConducteurTravauxIaBtp,
  },
  {
    titre: 'Analyser un DCE avec l’IA',
    phrase: 'Méthode pour lire un DCE et en extraire l’essentiel.',
    category: 'Méthode',
    href: LINKS.iaAnalyseDce,
  },
  {
    titre: 'Compte rendu de chantier avec l’IA',
    phrase: 'Modèle et bonnes pratiques pour vos CR.',
    category: 'Tutoriel',
    href: LINKS.iaCompteRenduChantier,
  },
] as const;

/** Ressources accueil — cartes maquette (URLs = {@link ACCUEIL_RESSOURCES}). */
export const ACCUEIL_RESSOURCES_MAQUETTE = [
  {
    icon: 'play',
    label: 'Outil gratuit',
    titre: 'Diagnostic IA BTP',
    phrase: ACCUEIL_RESSOURCES[0].phrase,
    href: ACCUEIL_RESSOURCES[0].href,
  },
  {
    icon: 'book',
    label: 'Guide pratique',
    titre: 'L’IA dans les métiers du BTP',
    phrase: ACCUEIL_RESSOURCES[1].phrase,
    href: ACCUEIL_RESSOURCES[1].href,
  },
  {
    icon: 'file',
    label: 'Tutoriel',
    titre: 'Analyse DCE et appels d’offres',
    phrase: ACCUEIL_RESSOURCES[2].phrase,
    href: ACCUEIL_RESSOURCES[2].href,
  },
  {
    icon: 'book',
    label: 'Tutoriel',
    titre: 'Compte rendu de chantier',
    phrase: ACCUEIL_RESSOURCES[3].phrase,
    href: ACCUEIL_RESSOURCES[3].href,
  },
] as const;

/** Sous-titre section méthode — accueil maquette. */
export const ACCUEIL_METHODE_ACCOMPAGNEMENT_LEAD =
  'Un accompagnement simple et efficace, de l’analyse de vos besoins à la mise en pratique.' as const;

/** Bandeaux formats commerciaux — accueil maquette (catalogue : débutant 4 h · avancé 4 h · approfondi 14 h). */
export const ACCUEIL_FORMATS_FORMATION_IA = [
  {
    id: 'debutant-4h',
    titre: 'Débutant — 4 h',
    description: 'Les bases de l’IA — une demi-journée pour démarrer sur vos documents.',
    icon: 'timer',
  },
  {
    id: 'avance-4h',
    titre: 'Avancé — 4 h',
    description: 'Sessions métier et assistants — pratique sur devis, DCE, chantier ou Claude.',
    icon: 'timer',
  },
  {
    id: 'approfondi-14h',
    titre: 'Approfondi — 14 h',
    description: 'Applications métier BTP avec l’IA — 2 jours pour cadrer et prototyper.',
    icon: 'calendar',
  },
] as const;

/** Quatre livrables — bloc « Ce que vos équipes sauront produire » (accueil maquette). */
export const ACCUEIL_RESULTATS_PRODUITS_MAQUETTE = [
  {
    id: 'dce',
    titre: 'Synthèse d’un DCE',
    phrase: 'Repérer les exigences RC, CCTP et CCAP avant chiffrage et réponse.',
    href: LINKS.formationIaAppelsOffresBtp,
    ariaLabel: 'Synthèse DCE — formation IA appels d’offres BTP',
  },
  {
    id: 'cr',
    titre: 'Compte rendu de chantier',
    phrase: 'Structurer notes terrain, décisions et actions à suivre.',
    href: LINKS.formationConduiteTravauxSuiviChantier,
    ariaLabel: 'Compte rendu de chantier — formation IA conduite de travaux',
  },
  {
    id: 'memoire',
    titre: 'Mémoire technique structuré',
    phrase: 'Organiser moyens, méthodes et preuves pour l’appel d’offres.',
    href: LINKS.iaMemoireTechnique,
    ariaLabel: 'Mémoire technique — méthode IA BTP',
  },
  {
    id: 'suivi',
    titre: 'Tableau de suivi des travaux',
    phrase: 'Piloter actions, réserves et avancement avec une trame réutilisable.',
    href: LINKS.formationConduiteTravauxSuiviChantier,
    ariaLabel: 'Suivi des travaux — formation IA conduite de travaux',
  },
] as const;

/** Métiers — cartes compactes (sans lien, évite doublons d’URL sur l’accueil). */
export const ACCUEIL_METIERS_IA_CARTES = [
  { id: 'devis', titre: 'Devis et chiffrage' },
  { id: 'dce', titre: 'DCE et appels d’offres' },
  { id: 'memoire', titre: 'Mémoire technique' },
  { id: 'cr', titre: 'Comptes rendus de chantier' },
  { id: 'planning', titre: 'Planning et suivi des travaux' },
  { id: 'doc', titre: 'Gestion documentaire' },
] as const;

/** Exemples Avant / Avec l’IA — accueil maquette. */
export const ACCUEIL_EXEMPLES_UTILISATION = [
  {
    id: 'dce',
    titre: 'Analyse de DCE',
    avant:
      'Lecture manuelle des documents, recherche des informations et préparation de la réponse.',
    avecIa:
      'Synthèse des points clés, identification des exigences et préparation des vérifications.',
  },
  {
    id: 'cr',
    titre: 'Compte rendu de chantier',
    avant: 'Notes dispersées et rédaction manuelle.',
    avecIa: 'Compte rendu structuré, décisions et tableau des actions à suivre.',
  },
  {
    id: 'admin',
    titre: 'Gestion administrative',
    avant: 'Classement et recherche manuels des documents.',
    avecIa: 'Structuration de documents, aide à la rédaction et recherche facilitée.',
  },
] as const;

/** Méthode commerciale — 4 étapes (accueil maquette). */
export const ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES = [
  {
    n: '1',
    titre: 'Échanger sur vos besoins',
    detail: 'Métiers, objectifs et contraintes.',
  },
  {
    n: '2',
    titre: 'Définir la formation',
    detail: 'Contenu, format et cas pratiques.',
  },
  {
    n: '3',
    titre: 'Former vos équipes',
    detail: 'En présentiel, en Île-de-France.',
  },
  {
    n: '4',
    titre: 'Passer à la pratique',
    detail: 'Des usages concrets dans vos projets.',
  },
] as const;

export type AccueilMaquetteFormationCarte = {
  code: (typeof ACCUEIL_MAQUETTE_FORMATION_CODES)[number];
  titre: string;
  description: string;
  badge: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const ACCUEIL_MAQUETTE_FORMATION_COPY: Record<
  AccueilMaquetteFormationCarte['code'],
  { titre: string; description: string; imageSrc: string; imageAlt: string }
> = {
  'NIV-01': {
    titre: 'Les bases de l’IA pour les professionnels du BTP',
    description:
      'Découvrir et utiliser ChatGPT et Claude sur vos documents et tâches du quotidien.',
    imageSrc: '/images/accueil/02-formation-initiation.webp',
    imageAlt: 'Formation initiation IA BTP — ordinateur et usages ChatGPT',
  },
  'NIV-02': {
    titre: 'IA et appels d’offres BTP',
    description: 'Analyser un DCE, structurer une réponse et produire des documents de qualité.',
    imageSrc: '/images/accueil/03-formation-appels-offres.webp',
    imageAlt: 'Formation IA appels d’offres BTP — plans et casque chantier',
  },
  'NIV-03': {
    titre: 'IA et conduite de travaux',
    description:
      'Gagner du temps dans le suivi de chantier, les comptes rendus et la coordination.',
    imageSrc: '/images/accueil/04-formation-conduite-travaux.webp',
    imageAlt: 'Formation IA conduite de travaux — chantier et grue',
  },
  'NIV-10': {
    titre: 'Créer des applications métier BTP avec l’IA',
    description: 'Concevoir et tester un outil ou un assistant métier avec l’IA, sans coder.',
    imageSrc: '/images/accueil/05-formation-applications-metier.webp',
    imageAlt: 'Formation création application métier BTP avec l’IA',
  },
  'NIV-05': {
    titre: 'IA et maîtrise d’œuvre',
    description:
      'CCTP, DPGF, analyse DCE, comptes rendus, ordres de service, réserves et réception avec l’IA.',
    imageSrc: '/images/formation-ia-maitrise-oeuvre-btp.webp',
    imageAlt: 'Formation IA maîtrise d’œuvre BTP — MOE, MOEX et OPC en présentiel Île-de-France',
  },
  'NIV-11': {
    titre: 'IA et assistance à maîtrise d’ouvrage',
    description:
      'Consultations MOE, rapports d’analyse des offres, pilotage des intervenants et reporting MOA.',
    imageSrc: '/images/formations/ia-assistance-maitrise-ouvrage-hero.jpg',
    imageAlt: 'Formation IA assistance maîtrise d’ouvrage — AMO bâtiment, présentiel Île-de-France',
  },
};

/** Cartes formations accueil — données catalogue + présentation maquette. */
export function getAccueilMaquetteFormations(): readonly AccueilMaquetteFormationCarte[] {
  const cartes: AccueilMaquetteFormationCarte[] = [];

  for (const code of ACCUEIL_MAQUETTE_FORMATION_CODES) {
    if (!isFormationCataloguePublished(code)) continue;
    const f = getFormationByCode(code);
    if (!f) continue;
    const copy = ACCUEIL_MAQUETTE_FORMATION_COPY[code];
    const formatLabel =
      code === 'NIV-10' ? `Atelier avancé · ${f.duree}` : f.duree;
    cartes.push({
      code,
      titre: copy.titre,
      description: copy.description,
      badge: formatLabel,
      href: FORMATION_HREF_BY_CODE[code],
      imageSrc: copy.imageSrc,
      imageAlt: copy.imageAlt,
    });
  }

  return cartes;
}
