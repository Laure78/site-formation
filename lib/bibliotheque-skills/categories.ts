/** Rubriques d'affichage — bibliothèque skills BTP. */

export const SKILL_LIBRARY_CATEGORIES = [
  { id: 'chantier', label: 'Chantier & suivi' },
  { id: 'marches-publics', label: 'Marchés publics & DCE' },
  { id: 'reception-gpa', label: 'Réception, GPA & livraison' },
  { id: 'financier-admin', label: 'Financier & administratif' },
  { id: 'specialise', label: 'Spécialisé' },
] as const;

export type SkillLibraryCategoryId = (typeof SKILL_LIBRARY_CATEGORIES)[number]['id'];

/** Classement manuel par id skill (source BeWork). */
export const SKILL_CATEGORY_BY_ID: Record<string, SkillLibraryCategoryId> = {
  '3dmanager-cr-chantier': 'chantier',
  'promotech-cr-chantier': 'chantier',
  'promotech-suivi-observations': 'chantier',
  'promotech-courrier-moe': 'chantier',
  'promotech-ordre-de-service': 'chantier',
  'situation-travaux': 'financier-admin',
  'dossier-intervention': 'chantier',
  'moex-pieces-dce': 'marches-publics',
  'promotech-analyse-dce': 'marches-publics',
  'promotech-comparatif-offres': 'marches-publics',
  'promotech-conformite-offre': 'marches-publics',
  'controle-memoire-technique-btp': 'marches-publics',
  'balas-analyser-dce-mh': 'specialise',
  'balas-gonogo-mh': 'specialise',
  'promotech-pv-reserves': 'reception-gpa',
  'moex-suivi-levees-reserves': 'reception-gpa',
  'moex-doe-livraison': 'reception-gpa',
  'promotech-suivi-acquereurs': 'reception-gpa',
  'moex-dc4-sous-traitance': 'financier-admin',
  'assistant-travaux': 'financier-admin',
  'verification-dtu-bework': 'specialise',
};

export function getSkillCategory(skillId: string): SkillLibraryCategoryId {
  return SKILL_CATEGORY_BY_ID[skillId] ?? 'financier-admin';
}

/** Libellés lisibles (catalogue BeWork). */
export const SKILL_DISPLAY_NAMES: Record<string, string> = {
  'verification-dtu-bework': 'Vérification DTU × devis',
  '3dmanager-cr-chantier': 'CR chantier — charte 3D MANAGER',
  'promotech-cr-chantier': 'CR chantier — MOEX PROMOTECH',
  'promotech-suivi-observations': 'Suivi des observations',
  'promotech-courrier-moe': 'Courriers MOA / relances entreprises',
  'promotech-pv-reserves': 'PV de réception & réserves',
  'moex-suivi-levees-reserves': 'Suivi levées de réserves',
  'moex-pieces-dce': 'Pièces écrites DCE & DPGF',
  'moex-dc4-sous-traitance': 'Sous-traitance DC4',
  'moex-doe-livraison': 'Constitution DOE',
  'promotech-ordre-de-service': 'Ordre de service',
  'promotech-analyse-dce': 'Analyse DCE — MOEX',
  'promotech-comparatif-offres': 'Comparatif offres & RAO',
  'promotech-conformite-offre': 'Conformité offre au CCTP',
  'balas-analyser-dce-mh': 'Analyse DCE — Monument Historique',
  'balas-gonogo-mh': 'Go / No Go — AO patrimoine',
  'controle-memoire-technique-btp': 'Contrôle mémoire technique',
  'dossier-intervention': 'Dossier d\'intervention',
  'situation-travaux': 'Situation & attachements',
  'promotech-suivi-acquereurs': 'Suivi acquéreurs & GPA',
  'assistant-travaux': 'Assistant — tâche administrative',
};

export function getSkillDisplayName(skillId: string, fallback: string): string {
  return SKILL_DISPLAY_NAMES[skillId] ?? fallback;
}
