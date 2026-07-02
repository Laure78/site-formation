/** Rubriques d'affichage — bibliothèque skills BTP. */

export const SKILL_LIBRARY_CATEGORIES = [
  { id: 'chantier', label: 'Chantier & suivi' },
  { id: 'marches-publics', label: 'Marchés publics & DCE' },
  { id: 'reception-gpa', label: 'Réception, GPA & livraison' },
  { id: 'financier-admin', label: 'Financier & administratif' },
  { id: 'qse', label: 'Prévention & conformité' },
  { id: 'productivite', label: 'Productivité' },
  { id: 'specialise', label: 'Spécialisé' },
] as const;

export type SkillLibraryCategoryId = (typeof SKILL_LIBRARY_CATEGORIES)[number]['id'];

/** Classement manuel par id skill (source BeWork). */
export const SKILL_CATEGORY_BY_ID: Record<string, SkillLibraryCategoryId> = {
  'verification-dtu-bework': 'specialise',
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
};

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

/** Descriptif court affiché sur les cartes (1 phrase). */
export const SKILL_SHORT_DESCRIPTIONS: Record<string, string> = {
  'verification-dtu-bework': 'Compare un devis aux DTU et signale les écarts à corriger.',
  '3dmanager-cr-chantier': 'Rédige un CR chantier au format .docx charte 3D MANAGER.',
  'promotech-cr-chantier': 'Compte rendu de chantier logements collectifs, format PROMOTECH.',
  'promotech-suivi-observations': 'Tableau de suivi des points ouverts entre deux réunions.',
  'promotech-courrier-moe': 'Relances, courriers MOA et notes de diffusion chantier.',
  'promotech-pv-reserves': 'PV de réception et liste de réserves par lot.',
  'moex-suivi-levees-reserves': 'Suivi des levées de réserves et relances entreprises.',
  'moex-pieces-dce': 'Mise en page CCTP, RC, CCAP et tableaux quantitatifs DPGF.',
  'moex-dc4-sous-traitance': 'DC4, agrément MOA et contrôle des pièces sous-traitants.',
  'moex-doe-livraison': 'Tableau de suivi DOE et relances pour pièces manquantes.',
  'promotech-ordre-de-service': 'OS de prolongation, arrêt ou reprise de travaux.',
  'promotech-analyse-dce': 'Fiche d\'analyse RC, CCAP, CCTP et DPGF en quelques minutes.',
  'promotech-comparatif-offres': 'Comparatif multi-critères et recommandation d\'attribution.',
  'promotech-conformite-offre': 'Vérifie une offre entreprise face au CCTP du marché.',
  'balas-analyser-dce-mh': 'Synthèse DCE pour marchés Monument Historique et patrimoine.',
  'balas-gonogo-mh': 'Grille Go / No Go pour décider de répondre à un AO patrimoine.',
  'controle-memoire-technique-btp': 'Relit un mémoire technique avec l\'œil d\'un évaluateur.',
  'dossier-intervention': 'Checklist DT/DICT et pièces avant intervention sur réseaux.',
  'situation-travaux': 'Structure une situation de travaux et les pièces BPU/DPGF.',
  'promotech-suivi-acquereurs': 'Réponses acquéreurs, GPA et réserves à la livraison.',
  'assistant-travaux': 'Qualifie et traite une demande administrative non listée.',
};

export function getSkillCategory(skillId: string): SkillLibraryCategoryId {
  return SKILL_CATEGORY_BY_ID[skillId] ?? 'financier-admin';
}

export function getSkillDisplayName(skillId: string, fallback: string): string {
  return SKILL_DISPLAY_NAMES[skillId] ?? fallback;
}

export function getSkillShortDescription(skillId: string, fallback = ''): string {
  return SKILL_SHORT_DESCRIPTIONS[skillId] ?? fallback;
}
