/**
 * Navigation hub catalogue `/formations` — silos par métier, besoin et outil.
 * URLs depuis LINKS uniquement (pas de duplication de chemins).
 */
import { LINKS } from '@/lib/internal-links';

export type FormationsHubNavItem = {
  href: string;
  label: string;
};

/** Formations par métier — fiches catalogue ou landings confirmées. */
export const FORMATIONS_HUB_PAR_METIER: readonly FormationsHubNavItem[] = [
  { href: LINKS.formationIaDirigeantPmeBtp, label: 'Dirigeant PME BTP' },
  { href: LINKS.formationConduiteTravauxSuiviChantier, label: 'Conducteur de travaux' },
  { href: LINKS.formationChargeAffairesBtp, label: 'Chargé d\'affaires' },
  { href: LINKS.formationIaMetreurEconomisteConstruction, label: 'Études de prix & métré' },
  { href: LINKS.formationIaResponsableAdministratifBtp, label: 'Administratif BTP' },
  { href: LINKS.formationIaMaitriseOeuvre, label: 'Maîtrise d\'œuvre' },
  { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Artisans & équipes terrain' },
];

/** Formations par besoin opérationnel. */
export const FORMATIONS_HUB_PAR_BESOIN: readonly FormationsHubNavItem[] = [
  { href: LINKS.formationAO, label: 'Répondre aux appels d\'offres' },
  { href: LINKS.iaAnalyseDce, label: 'Analyser un DCE (CCTP, CCAP, RC)' },
  { href: LINKS.iaDevis, label: 'Préparer des devis & chiffrages' },
  { href: LINKS.iaMemoireTechnique, label: 'Rédiger un mémoire technique' },
  { href: LINKS.iaCompteRenduChantier, label: 'Produire des comptes rendus' },
  { href: LINKS.formationConduiteTravauxSuiviChantier, label: 'Gérer les documents chantier' },
  { href: LINKS.formationMaitriserClaudeAiBtp, label: 'Automatiser avec Claude AI' },
];

/** Outils IA réellement enseignés — pas de pages doublons ChatGPT/Claude séparées. */
export const FORMATIONS_HUB_PAR_OUTIL: readonly FormationsHubNavItem[] = [
  { href: LINKS.chatgptArtisans, label: 'ChatGPT pour le BTP' },
  { href: LINKS.formationMaitriserClaudeAiBtp, label: 'Claude AI & Cowork' },
];
