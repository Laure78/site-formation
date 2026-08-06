/**
 * Navigation footer — source unique des listes de liens.
 * Une seule ancre par URL sur l’ensemble du footer (pas de doublon entre colonnes).
 */
import { BEWORK_APP_PATHS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { SITE_CONFIG } from '@/lib/seo';

export type NavItem = {
  href: string;
  label: string;
  /** Attribut HTML `title` (tooltip), optionnel. */
  title?: string;
};

/** Colonne Entreprise */
export const NAV_ENTREPRISE: readonly NavItem[] = [
  { href: LINKS.aPropos, label: 'À propos' },
  { href: LINKS.partenaires, label: 'Partenaires' },
  {
    href: LINKS.bework,
    label: 'BeWork — assistant travaux BTP',
    title: 'BeWork — relais assistants travaux BTP (présentation)',
  },
  { href: LINKS.contact, label: 'Contact' },
  { href: LINKS.prendreRdv, label: 'Rendez-vous' },
  {
    href: SITE_CONFIG.linkedinProfileUrl,
    label: 'LinkedIn',
    title: 'Profil LinkedIn — Laure Olivié',
  },
];

/**
 * Colonne Services — catalogue & parcours.
 * Conducteur / TPE-PME / Paris : uniquement dans NAV_METIERS / NAV_IDF (une ancre par URL).
 */
export const NAV_SERVICES: readonly NavItem[] = [
  { href: LINKS.formations, label: 'Catalogue' },
  { href: LINKS.formationPlateforme, label: 'Espace apprenant' },
  { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Niveau 1 — bâtiment & TP' },
  { href: LINKS.formationAO, label: "Appels d'offres (niveau 2)" },
  { href: LINKS.formationIaMarchePublicTravaux, label: 'Marché public de travaux' },
  { href: LINKS.financement, label: 'Financement' },
  { href: LINKS.formationClaudeAiBtp, label: 'Formation Claude AI BTP' },
];

/** Colonne Ressources */
export const NAV_RESSOURCES: readonly NavItem[] = [
  { href: LINKS.blog, label: 'Blog' },
  { href: LINKS.diagnostic, label: 'Diagnostic' },
  { href: LINKS.checklist, label: 'Checklist' },
  {
    href: BEWORK_APP_PATHS.lexique,
    label: 'Lexique BTP gratuit',
    title: 'Lexique & apprentissage BTP — parcours, flashcards et quiz (BeWork)',
  },
  { href: LINKS.skillIaConducteurTravaux, label: 'Guide Conducteur de travaux (PDF)' },
  { href: LINKS.etudesCas, label: 'Étude de cas' },
  { href: LINKS.casUsage, label: "Cas d'usage" },
];

/** Colonne Légal — textes / URLs inchangés */
export const NAV_LEGAL: readonly NavItem[] = [
  { href: LINKS.cgv, label: 'CGV' },
  { href: LINKS.mentionsLegales, label: 'Mentions légales' },
  { href: LINKS.politiqueConfidentialite, label: 'Confidentialité' },
  { href: LINKS.reglementInterieur, label: 'Règlement intérieur' },
  { href: LINKS.accessibiliteHandicap, label: 'Accessibilité & handicap' },
  { href: LINKS.annuaireHandicap, label: 'Annuaire handicap' },
  { href: LINKS.indicateursResultats, label: 'Indicateurs de résultats' },
  { href: LINKS.qualiopi, label: 'Certification Qualiopi' },
  { href: LINKS.reclamations, label: 'Réclamations' },
  { href: '/llms.txt', label: 'llms.txt' },
];

/** Bandeau « Formations IA par métier » */
export const NAV_METIERS: readonly NavItem[] = [
  { href: LINKS.formationConducteurTravaux, label: 'Conducteur de travaux' },
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

/** Bandeau « Formations en Île-de-France » */
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
