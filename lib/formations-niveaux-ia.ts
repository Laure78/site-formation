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
};

export const FORMATIONS_NIVEAUX_IA: readonly FormationNiveauIaDefinition[] = [
  {
    niveau: 1,
    labelComplet: 'Niveau 1 — Débutant',
    sousTitre: 'Débutant',
    badge: 'Niveau 1 — Débutant',
    publicCible:
      'Personnes qui découvrent l’IA ou l’utilisent occasionnellement sur quelques tâches.',
    objectif:
      'Formuler une demande claire, produire un premier document et vérifier la réponse.',
    descriptionMenu:
      'Découvrir l’IA et réaliser ses premiers usages professionnels.',
    anchorId: 'catalogue-niveau-1',
    sectionHeading: 'Niveau 1 — Débutant',
    accueilAccroche: 'Découvrir l’IA et réaliser ses premiers exercices BTP.',
    accueilDuree: '4 h',
  },
  {
    niveau: 2,
    labelComplet: 'Niveau 2 — Intermédiaire',
    sousTitre: 'Intermédiaire',
    badge: 'Niveau 2 — Intermédiaire',
    publicCible:
      'Personnes disposant des bases et souhaitant structurer leurs usages sur leurs documents métier.',
    objectif:
      'Analyser des documents, comparer des informations et produire des livrables métier avec une méthode de contrôle.',
    descriptionMenu:
      'Approfondir ses usages sur les documents et les tâches du BTP.',
    anchorId: 'catalogue-niveau-2',
    sectionHeading: 'Niveau 2 — Intermédiaire',
    accueilAccroche:
      'Approfondir ses usages et produire des documents métier avec une méthode de contrôle.',
    accueilDuree: '7 h',
  },
  {
    niveau: 3,
    labelComplet: 'Niveau 3 — Avancé',
    sousTitre: 'Avancé',
    badge: 'Niveau 3 — Avancé',
    publicCible:
      'Utilisateurs autonomes souhaitant personnaliser leurs outils et assistants.',
    objectif:
      'Concevoir des assistants ou applications métier et organiser leurs tests et leur utilisation.',
    descriptionMenu:
      'Créer des assistants et des outils adaptés à son activité.',
    anchorId: 'catalogue-niveau-3',
    sectionHeading: 'Niveau 3 — Avancé',
    accueilAccroche: 'Créer des assistants et des outils métier réutilisables.',
    accueilDuree: '7 h ou 14 h selon le programme',
  },
] as const;

export function getFormationNiveauIaDefinition(
  niveau: FormationNiveau,
): FormationNiveauIaDefinition {
  const found = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === niveau);
  if (!found) {
    throw new Error(`Niveau IA inconnu : ${niveau}`);
  }
  return found;
}

export function formationNiveauBadge(niveau: FormationNiveau): string {
  return getFormationNiveauIaDefinition(niveau).badge;
}

export function formationNiveauLabelCourt(niveau: FormationNiveau): string {
  return getFormationNiveauIaDefinition(niveau).labelComplet;
}
