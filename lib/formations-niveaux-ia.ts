/**
 * Niveaux pédagogiques IA BTP — libellés et descriptions uniques (menu, accueil, catalogue, cartes).
 */
import type { FormationNiveau } from '@/data/formations';

export type FormationNiveauIaDefinition = {
  niveau: FormationNiveau;
  /** Ex. « Niveau 1 — Débutant » */
  labelComplet: string;
  /** Ex. « Débutant » */
  sousTitre: string;
  /** Accroche courte — ex. « Prendre en main l’IA » */
  accrocheNiveau: string;
  /** Badge court cartes — même libellé que labelComplet sans le numéro répété inutilement */
  badge: string;
  publicCible: string;
  objectif: string;
  /** Description une ligne — méga-menu */
  descriptionMenu: string;
  anchorId: string;
  sectionHeading: string;
  /** Accroche carte accueil (progression IA). */
  accueilAccroche: string;
  /** Durée typique affichée sur l’accueil (formations IA de la progression). */
  accueilDuree: string;
  /** Prérequis pédagogiques — cartes accueil, catalogue, orientation. */
  prerequis: string;
  /** Exemples de réalisations après formation (2–3). */
  exemplesRealisations: readonly string[];
};

export const FORMATIONS_NIVEAUX_IA: readonly FormationNiveauIaDefinition[] = [
  {
    niveau: 1,
    labelComplet: 'Niveau 1 — Débutant',
    sousTitre: 'Débutant',
    accrocheNiveau: 'Prendre en main l’IA',
    badge: 'Niveau 1 — Débutant',
    publicCible:
      'Personnes qui découvrent l’IA ou l’utilisent occasionnellement sur quelques tâches.',
    objectif:
      'Formuler une demande claire, produire un premier document et vérifier la réponse.',
    descriptionMenu:
      'Découvrir les outils et réaliser ses premières tâches.',
    anchorId: 'catalogue-niveau-1',
    sectionHeading: 'Niveau 1 — Débutant',
    accueilAccroche:
      'Découvrir l’IA et réaliser ses premiers usages professionnels.',
    accueilDuree: '4 h',
    prerequis:
      'Aucun prérequis technique — documents métier BTP (devis, emails, notes de chantier).',
    exemplesRealisations: [
      'Premier devis ou désignation structurée',
      'Compte rendu à partir de notes',
      'Email ou courrier professionnel relu avant envoi',
    ],
  },
  {
    niveau: 2,
    labelComplet: 'Niveau 2 — Intermédiaire',
    sousTitre: 'Intermédiaire',
    accrocheNiveau: 'Appliquer l’IA à son métier',
    badge: 'Niveau 2 — Intermédiaire',
    publicCible:
      'Personnes disposant des bases et souhaitant structurer leurs usages sur leurs documents métier.',
    objectif:
      'Analyser des documents, comparer des informations et produire des livrables métier avec une méthode de contrôle.',
    descriptionMenu:
      'Analyser ses documents, produire et contrôler ses livrables.',
    anchorId: 'catalogue-niveau-2',
    sectionHeading: 'Niveau 2 — Intermédiaire',
    accueilAccroche: 'Utiliser l’IA sur ses documents et ses tâches métier.',
    accueilDuree: '7 h',
    prerequis:
      'Niveau 1 ou pratique régulière de ChatGPT ou Claude sur des documents professionnels.',
    exemplesRealisations: [
      'Checklist d’analyse DCE ou CCTP',
      'Mémoire technique ou CR structuré',
      'Assistant documentaire avec protocole de relecture',
    ],
  },
] as const;

export function getFormationNiveauIaDefinition(
  niveau: FormationNiveau,
): FormationNiveauIaDefinition {
  const found = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === niveau);
  if (found) return found;
  /** Données legacy (ex. parcours app métier) — affichage aligné sur le niveau 2. */
  if (niveau === 3) {
    return getFormationNiveauIaDefinition(2);
  }
  throw new Error(`Niveau IA inconnu : ${niveau}`);
}

export function formationNiveauBadge(niveau: FormationNiveau): string {
  return getFormationNiveauIaDefinition(niveau).badge;
}

export function formationNiveauLabelCourt(niveau: FormationNiveau): string {
  return getFormationNiveauIaDefinition(niveau).labelComplet;
}
