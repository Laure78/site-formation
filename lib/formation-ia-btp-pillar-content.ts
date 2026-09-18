import { LINKS } from '@/lib/internal-links';
import { FORMATION_IA_BTP_DEPT_LANDING_PATHS } from '@/lib/formation-ia-btp-departements-config';

/** Page pilier SEO — `/formation-ia-btp` (formation IA BTP / formation IA bâtiment). */
export const FORMATION_IA_BTP_PILLAR_PATH = '/formation-ia-btp' as const;

/** Title SEO ≤ 65 car. (format projet). */
export const FORMATION_IA_BTP_PILLAR_TITLE =
  'Formation IA BTP : maîtriser l’IA bâtiment | Laure Olivié';

/** Meta description ~155–160 car. — contient « formation IA pour le BTP ». */
export const FORMATION_IA_BTP_PILLAR_DESCRIPTION =
  'Formation IA BTP : Claude et ChatGPT sur devis, DCE et chantier. Formation IA pour le BTP, présentiel IDF, Qualiopi. Financement OPCO selon éligibilité.';

export const FORMATION_IA_BTP_PILLAR_H1 =
  'Formation IA BTP : maîtriser l’intelligence artificielle dans le bâtiment';

export const FORMATION_IA_BTP_PILLAR_EN_BREF =
  'Laure Olivié, formatrice IA spécialisée BTP, propose via OFC Création d’Entreprise (Qualiopi) des formations en présentiel en Île-de-France : Claude et ChatGPT appliqués aux devis, DCE, CCTP, mémoires techniques et comptes rendus de chantier — pour dirigeants, conducteurs de travaux et équipes du bâtiment.';

export const FORMATION_IA_BTP_DEFINITION =
  'Une formation IA BTP (aussi appelée formation IA bâtiment) est une session professionnelle en présentiel, certifiée Qualiopi, où les équipes du bâtiment et des travaux publics apprennent à utiliser Claude AI (outil principal) et ChatGPT (usages administratifs et comparaison) sur leurs documents réels : devis, DCE, CCTP, CCAP, comptes rendus de chantier et courriers. L’objectif est un gain de temps mesurable sur l’administratif, avec relecture humaine et validation terrain — jamais une promesse de financement garanti.';

export const FORMATION_IA_BTP_A_RETENIR = [
  'Qui : Laure Olivié — formatrice IA spécialisée BTP, OFC Création d’Entreprise (Qualiopi).',
  'Quoi : formations pratiques Claude / ChatGPT sur documents métier BTP.',
  'Pour qui : dirigeants, artisans, TPE/PME, conducteurs de travaux, chargés d’affaires, fonctions support.',
  'Où : présentiel uniquement en Île-de-France (intra ou inter-entreprises).',
  'Cas d’usage : devis, appels d’offres (DCE/CCTP/CCAP), mémoire technique, CR chantier.',
] as const;

export const FORMATION_IA_BTP_METIERS = [
  { href: LINKS.formationConducteurTravaux, label: 'Conducteur de travaux' },
  { href: LINKS.formationChargeAffairesBtp, label: "Chargé d'affaires" },
  { href: LINKS.formationIaDirigeantBtp, label: 'Dirigeant de PME BTP' },
  { href: LINKS.formationIaDirigeantPmeBtp, label: 'Chef de TPE du bâtiment' },
  { href: LINKS.formationIaAssistanteBtp, label: 'Assistant(e) administrative' },
  { href: LINKS.formationIaAssistanteGestionBtp, label: 'Assistant(e) de gestion' },
] as const;

const DEPT_LABELS: Record<string, string> = {
  '/formation-ia-btp-paris': 'Paris (75)',
  '/formation-ia-btp-seine-et-marne-77': 'Seine-et-Marne (77)',
  '/formation-ia-btp-yvelines-78': 'Yvelines (78)',
  '/formation-ia-btp-essonne-91': 'Essonne (91)',
  '/formation-ia-btp-hauts-de-seine-92': 'Hauts-de-Seine (92)',
  '/formation-ia-btp-seine-saint-denis-93': 'Seine-Saint-Denis (93)',
  '/formation-ia-btp-val-de-marne-94': 'Val-de-Marne (94)',
  '/formation-ia-btp-val-doise-95': "Val-d'Oise (95)",
};

export const FORMATION_IA_BTP_GEO_LINKS = [
  { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP — Île-de-France (pilier géo)' },
  ...FORMATION_IA_BTP_DEPT_LANDING_PATHS.map((path) => ({
    href: path,
    label: DEPT_LABELS[path] ?? path,
  })),
];
