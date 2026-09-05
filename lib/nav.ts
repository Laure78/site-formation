/**
 * Navigation footer — source unique des listes de liens.
 * Une seule ancre par URL sur l’ensemble du footer (pas de doublon entre colonnes).
 */
import { BEWORK_APP_PATHS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { formationHref } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';

export type NavItem = {
  href: string;
  label: string;
  /** Attribut HTML `title` (tooltip), optionnel. */
  title?: string;
};

/** Colonne Formations IA BTP — liens stratégiques uniquement (pas de codes NIV). */
export const NAV_FORMATIONS_FOOTER: readonly NavItem[] = [
  { href: LINKS.formations, label: 'Toutes les formations' },
  {
    href: LINKS.iaDevis,
    label: 'IA pour les devis et le chiffrage',
    title: 'Formation et méthode IA — devis et chiffrage bâtiment',
  },
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    label: 'IA pour la conduite de chantier',
    title: 'Formation IA — conduite de travaux et suivi de chantier',
  },
  {
    href: LINKS.formationAO,
    label: 'IA pour les appels d’offres',
    title: 'Formation IA — appels d’offres et DCE BTP',
  },
  {
    href: LINKS.parcoursApplicationsMetierBtp,
    label: 'Applications métier BTP',
    title: 'Parcours — créer ses applications métier BTP avec l’IA',
  },
  {
    href: LINKS.financement,
    label: 'Financement des formations',
    title: 'Financement OPCO Constructys — formation IA BTP',
  },
];

/** Colonne Ressources BTP — max. 7 liens. */
export const NAV_RESSOURCES: readonly NavItem[] = [
  { href: LINKS.blog, label: 'Blog IA BTP' },
  {
    href: `${LINKS.ressources}#guides-pdf`,
    label: 'Guides pratiques',
    title: 'Guides PDF gratuits — formation IA pour le BTP',
  },
  { href: LINKS.diagnostic, label: 'Diagnostic IA BTP' },
  { href: LINKS.casUsage, label: 'Cas d’usage' },
  { href: LINKS.etudesCasHub, label: 'Études de cas' },
  {
    href: BEWORK_APP_PATHS.lexique,
    label: 'Lexique BTP',
    title: 'Lexique BTP — parcours, flashcards et quiz',
  },
  {
    href: LINKS.promptsIaConducteurTravaux,
    label: 'Prompts IA',
    title: '20 prompts IA — conducteur de travaux',
  },
];

/** Colonne Organisme de formation. */
export const NAV_ORGANISME: readonly NavItem[] = [
  { href: LINKS.aPropos, label: 'À propos' },
  { href: LINKS.avisClients, label: 'Avis clients' },
  { href: LINKS.partenaires, label: 'Partenaires' },
  { href: LINKS.contact, label: 'Contact' },
  { href: LINKS.accessibiliteHandicap, label: 'Accessibilité & handicap' },
  { href: LINKS.indicateursResultats, label: 'Indicateurs de résultats' },
  {
    href: LINKS.qualiopi,
    label: 'Certification Qualiopi',
    title: 'Organisme certifié Qualiopi — actions de formation',
  },
];

/** Barre légale inférieure. */
export const NAV_LEGAL_BAR: readonly NavItem[] = [
  { href: LINKS.cgv, label: 'CGV' },
  { href: LINKS.mentionsLegales, label: 'Mentions légales' },
  { href: LINKS.politiqueConfidentialite, label: 'Confidentialité' },
  { href: LINKS.reglementInterieur, label: 'Règlement intérieur' },
  { href: LINKS.reclamations, label: 'Réclamations' },
];

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
    {
      href: LINKS.parcoursApplicationsMetierBtp,
      label: 'Parcours applications métier BTP',
      title: 'Créer ses applications métier BTP avec l’IA — parcours 21 h',
    },
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
  { href: LINKS.chatgptArtisans, label: 'TPE & PME du bâtiment' },
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
