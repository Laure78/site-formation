/**
 * Navigation footer — source unique des listes de liens.
 * Une seule ancre par URL sur l’ensemble du footer (pas de doublon entre colonnes).
 */
import { LINKS } from '@/lib/internal-links';
import { formationHref, type Formation } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

export type NavItem = {
  href: string;
  label: string;
  /** Attribut HTML `title` (tooltip), optionnel. */
  title?: string;
};

/** Hub carrière — menu « Notre organisme » + colonne footer « Notre organisme ». */
export const NAV_ITEM_NOUS_REJOINDRE: NavItem = {
  href: LINKS.nousRejoindre,
  label: 'Devenir formateur IA BTP',
  title: 'Recrutement formateurs indépendants IA BTP — Île-de-France',
};

/** URL partage avis Google — footer (lien utilisateur vérifié). */
export const FOOTER_GOOGLE_REVIEWS_URL =
  'https://share.google/gpl7i0IH7c2AManrN' as const;

function sortFormationsFooter(a: Formation, b: Formation): number {
  if (a.niveau !== b.niveau) return a.niveau - b.niveau;
  return a.titre.localeCompare(b.titre, 'fr');
}

/** Colonne footer — Formations (accès synthèse, sans liste catalogue). */
export const NAV_FOOTER_FORMATIONS: readonly NavItem[] = [
  {
    href: LINKS.formations,
    label: 'Catalogue de formations',
    title: 'Catalogue des formations IA BTP — présentiel Île-de-France',
  },
  {
    href: LINKS.parcoursMetiers,
    label: 'Tous les parcours métiers',
    title: 'Parcours métiers IA BTP — hub',
  },
  {
    href: LINKS.formationIaIntraEntrepriseBtp,
    label: 'Formation intra-entreprise',
    title: 'Formation IA intra-entreprise BTP — équipe sur site',
  },
  {
    href: LINKS.financement,
    label: 'Financement',
    title: 'Financement OPCO Constructys — formation IA BTP',
  },
];

/**
 * @deprecated Liste longue (catalogue) — exports / outils uniquement, pas le footer principal.
 */
export function getNavFormationsFooter(at: Date = new Date()): readonly NavItem[] {
  const published = [...getPublishedFormations(at)].sort(sortFormationsFooter);
  return [
    {
      href: LINKS.formations,
      label: 'Catalogue de formations',
      title: 'Catalogue des formations IA BTP — présentiel Île-de-France',
    },
    ...published.map((f) => ({
      href: formationHref(f),
      label: f.titre,
      title: `${f.titre} — ${f.niveauLabel}, ${f.duree}`,
    })),
    {
      href: LINKS.formationIaIntraEntrepriseBtp,
      label: 'Guide : former son équipe BTP à l’IA',
      title: 'Guide pratique — formation IA intra-entreprise BTP',
    },
  ];
}

/** @deprecated Préférer `NAV_FOOTER_FORMATIONS` dans le footer. */
export const NAV_FORMATIONS_FOOTER: readonly NavItem[] = getNavFormationsFooter();

/** Colonne 2 — Parcours métiers (7 parcours catalogue + hub). Ordre = METIERS_CATALOGUE_2027. */
const NAV_FOOTER_PARCOURS_ALL: readonly NavItem[] = [
  {
    href: LINKS.parcoursDirigeantPmeBtp,
    label: 'Dirigeant d’entreprise BTP',
    title: 'Parcours dirigeant PME BTP',
  },
  {
    href: LINKS.parcoursChargeAffairesBtp,
    label: 'Chargé d’affaires',
    title: 'Parcours chargé d’affaires BTP',
  },
  {
    href: LINKS.parcoursConducteurDeTravaux,
    label: 'Conducteur de travaux',
    title: 'Parcours conducteur de travaux',
  },
  {
    href: LINKS.parcoursChefDeChantier,
    label: 'Chef de chantier',
    title: 'Parcours encadrement de chantier',
  },
  {
    href: LINKS.parcoursChefDequipe,
    label: 'Chef d’équipe',
    title: 'Parcours chef d’équipe',
  },
  {
    href: LINKS.parcoursAssistantDeGestionBtp,
    label: 'Administration & travaux',
    title: 'Parcours assistant de gestion BTP',
  },
  {
    href: LINKS.parcoursReferentIaBtp,
    label: 'Référent IA',
    title: 'Parcours référent IA BTP',
  },
  {
    href: LINKS.parcoursMetiers,
    label: 'Tous les parcours',
    title: 'Hub parcours métiers BTP',
  },
];

export function getNavFooterParcours(): readonly NavItem[] {
  return isParcoursMetiers2027Visible() ? NAV_FOOTER_PARCOURS_ALL : [];
}

/** @deprecated Préférer `getNavFooterParcours()` — vide tant que parcours 2027 masqués. */
export const NAV_FOOTER_PARCOURS: readonly NavItem[] = getNavFooterParcours();

/** Colonne footer — Notre organisme. */
export const NAV_FOOTER_ORGANISME: readonly NavItem[] = [
  { href: LINKS.aPropos, label: 'À propos', title: 'Laure Olivié — formatrice IA BTP' },
  { href: LINKS.formateurs, label: 'Nos formateurs', title: 'Équipe de formateurs IA BTP' },
  {
    href: LINKS.qualiopi,
    label: 'Qualité et certification Qualiopi',
    title: 'Certification Qualiopi OFC',
  },
  { href: LINKS.avisClients, label: 'Avis clients', title: 'Avis clients et témoignages' },
  NAV_ITEM_NOUS_REJOINDRE,
];

/** @deprecated Préférer `NAV_FOOTER_ORGANISME` — inclut encore « Nos partenaires » pour exports. */
export const NAV_ORGANISME: readonly NavItem[] = [
  ...NAV_FOOTER_ORGANISME.slice(0, 3),
  { href: LINKS.partenaires, label: 'Nos partenaires', title: 'Partenaires OFC' },
  ...NAV_FOOTER_ORGANISME.slice(3),
];

/** Colonne — Carrière (footer). */
export const NAV_CARRIERE: readonly NavItem[] = [
  NAV_ITEM_NOUS_REJOINDRE,
  {
    href: LINKS.rejoindreEquipe,
    label: 'Rejoindre l’équipe',
    title: 'Devenir formateur IA BTP — rejoindre l’équipe',
  },
  {
    href: LINKS.devenezConsultant,
    label: 'Devenez consultant',
    title: 'Proposer une expertise de consultant-formateur IA BTP',
  },
  {
    href: LINKS.candidaturesSpontanees,
    label: 'Candidature spontanée',
    title: 'Déposer une candidature spontanée',
  },
];

/** Colonne footer — Ressources. */
export const NAV_FOOTER_RESSOURCES: readonly NavItem[] = [
  {
    href: LINKS.ressources,
    label: 'Ressources gratuites',
    title: 'Guides, modèles et outils IA BTP gratuits',
  },
  { href: LINKS.ressourcesTutos, label: 'Tutoriels', title: 'Tutoriels IA BTP pas à pas' },
  { href: LINKS.etudesCasHub, label: 'Études de cas', title: 'Études de cas IA BTP' },
  {
    href: LINKS.prendreRdv,
    label: 'Échanger sur mon besoin',
    title: 'Visio découverte gratuite — cadrage de votre projet IA BTP',
  },
];

/** @deprecated Préférer `NAV_FOOTER_RESSOURCES` — liste étendue pour exports / menu. */
export const NAV_RESSOURCES: readonly NavItem[] = [
  { href: LINKS.ressourcesTutos, label: 'Tutoriels IA BTP', title: 'Tutoriels IA BTP' },
  {
    href: `${LINKS.ressources}#guides-pdf`,
    label: 'Guides et modèles',
    title: 'Guides PDF et modèles IA BTP',
  },
  { href: LINKS.blog, label: 'Articles et conseils', title: 'Articles et conseils IA BTP' },
  { href: LINKS.evenements, label: 'Événements', title: 'Événements IA BTP' },
  {
    href: LINKS.financement,
    label: 'Financement',
    title: 'Financement OPCO Constructys — formation IA BTP',
  },
  {
    href: `${LINKS.authConnexion}?next=${encodeURIComponent(LINKS.espaceApprenant)}`,
    label: 'Espace client',
    title: 'Connexion à l’espace client — plateforme Laure Olivié',
  },
];

/** Barre légale inférieure — liens juridiques principaux. */
export const NAV_LEGAL_BAR: readonly NavItem[] = [
  { href: LINKS.mentionsLegales, label: 'Mentions légales', title: 'Mentions légales du site laureolivie.fr' },
  {
    href: LINKS.politiqueConfidentialite,
    label: 'Confidentialité',
    title: 'Politique de confidentialité et protection des données',
  },
  { href: LINKS.cgv, label: 'CGV', title: 'Conditions générales de vente' },
];

/** Liens réglementaires complémentaires (bandeau inférieur, retour à la ligne mobile). */
export const NAV_LEGAL_SECONDARY: readonly NavItem[] = [
  { href: LINKS.indicateursResultats, label: 'Indicateurs de résultats', title: 'Indicateurs Qualiopi OFC' },
  { href: LINKS.reclamations, label: 'Réclamations', title: 'Procédure de réclamation OFC' },
  {
    href: LINKS.reglementInterieur,
    label: 'Règlement intérieur',
    title: 'Règlement intérieur OFC — discipline, sécurité et réclamations',
  },
  {
    href: LINKS.accessibiliteHandicap,
    label: 'Accessibilité et handicap',
    title: 'Accessibilité et handicap — référente et aménagements OFC',
  },
  {
    href: LINKS.certificatQualiopi,
    label: 'Certificat Qualiopi (PDF)',
    title: 'Certificat Qualiopi OFC Création d’Entreprise — document PDF',
  },
  {
    href: LINKS.annuaireHandicap,
    label: 'Ressources handicap',
    title: 'Annuaire handicap — contacts AGEFIPH, RHF et ressources utiles',
  },
];

/**
 * @deprecated Liens réglementaires — alias de `NAV_LEGAL_SECONDARY` (bandeau inférieur).
 */
export const NAV_LIENS_UTILES: readonly NavItem[] = NAV_LEGAL_SECONDARY;

/** @deprecated Alias — préférer `NAV_ORGANISME`. */
export const NAV_ENTREPRISE: readonly NavItem[] = NAV_ORGANISME;

/** @deprecated Alias — préférer `NAV_LEGAL_BAR`. */
export const NAV_LEGAL: readonly NavItem[] = NAV_LEGAL_BAR;

/** @deprecated Conservé pour compat — non affiché dans le footer principal. */
export const NAV_REGLEMENTAIRE: readonly NavItem[] = [
  { href: LINKS.livretAccueilStagiaire, label: "Livret d'accueil du stagiaire" },
  { href: LINKS.reglementInterieur, label: 'Règlement intérieur' },
  { href: LINKS.reclamations, label: 'Réclamations' },
  { href: LINKS.accessibiliteHandicap, label: 'Accessibilité et handicap' },
  {
    href: LINKS.certificatQualiopi,
    label: 'Certificat Qualiopi (PDF)',
    title: 'Télécharger le certificat Qualiopi OFC',
  },
];

/**
 * Catalogue complet — non affiché dans le footer principal (évite le sitemap).
 * Conservé pour exports / outils éventuels.
 */
export function getNavServices(at: Date = new Date()): readonly NavItem[] {
  return [
    { href: LINKS.formations, label: 'Catalogue' },
    { href: LINKS.formationPlateforme, label: 'Espace apprenant' },
    ...getPublishedFormations(at).map((f) => ({
      href: formationHref(f),
      label: f.code === 'NIV-01' ? 'Niveau 1 — bâtiment & TP' : `${f.niveauLabel} — ${shortTitle(f.titre)}`,
      title: f.titre,
    })),
    { href: LINKS.formationIaMarchePublicTravaux, label: 'Marché public de travaux' },
    { href: LINKS.financement, label: 'Financement' },
  ];
}

/** @deprecated Préférer `NAV_FORMATIONS_FOOTER` dans le footer. */
export const NAV_SERVICES: readonly NavItem[] = getNavServices();

function shortTitle(titre: string): string {
  if (titre.length <= 36) return titre;
  return `${titre.slice(0, 34)}…`;
}

/** Bandeau « Formations IA par métier » — hors footer principal. */
export const NAV_METIERS: readonly NavItem[] = [
  { href: LINKS.formationConducteurTravaux, label: 'Conducteur de travaux' },
  { href: LINKS.formationIaMetreurEconomisteConstruction, label: 'Métreur & économiste' },
  { href: LINKS.formationChargeAffairesBtp, label: "Chargé d'affaires" },
  { href: LINKS.formationElectricienBtp, label: 'Électricien' },
  { href: LINKS.formationPlombierBtp, label: 'Plombier' },
  { href: LINKS.formationIaCharpentierMenuisierBtp, label: 'Charpentier & menuisier' },
  { href: LINKS.formationIaMaconBtp, label: 'Maçon & maçonnerie' },
  { href: LINKS.formationIaGrosOeuvreBtp, label: 'Gros œuvre' },
  { href: LINKS.formationIaCouvreurBtp, label: 'Couvreur-zingueur' },
  { href: LINKS.formationIaDirigeantPmeBtp, label: 'TPE & PME du bâtiment' },
  { href: LINKS.formationIaDirigeantBtp, label: 'Dirigeant PME' },
  { href: LINKS.formationIaEtancheur, label: 'Étancheur' },
  { href: LINKS.formationIaAssistanteBtp, label: 'Assistante administrative' },
  { href: LINKS.formationIaAssistanteTravaux, label: 'Assistante travaux' },
];

/** Bandeau « Formations en Île-de-France » — hors footer principal. */
export const NAV_IDF: readonly NavItem[] = [
  { href: LINKS.formationIaBtpYvelines78, label: 'Yvelines (78)' },
  { href: LINKS.formationIaBtpEssonne91, label: 'Essonne (91)' },
  { href: LINKS.formationIaBtpHautsDeSeine92, label: 'Hauts-de-Seine (92)' },
  { href: LINKS.formationIaBtpValDoise95, label: "Val-d'Oise (95)" },
  { href: LINKS.formationIaBtpParis, label: 'Paris (75)' },
  { href: LINKS.formationIaBtpSeineEtMarne77, label: 'Seine-et-Marne (77)' },
  { href: LINKS.formationIaBtpSeineSaintDenis93, label: 'Seine-Saint-Denis (93)' },
  { href: LINKS.formationIaBtpValDeMarne94, label: 'Val-de-Marne (94)' },
  { href: LINKS.formationIleDeFrance, label: 'Toute l’Île-de-France' },
];
