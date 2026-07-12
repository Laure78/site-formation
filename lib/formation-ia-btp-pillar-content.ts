import { LINKS } from '@/lib/internal-links';
import { FORMATION_IA_BTP_DEPT_LANDING_PATHS } from '@/lib/formation-ia-btp-departements-config';

/** Canonique catalogue (l’URL `/formation-ia-btp` redirige en 308). */
export const FORMATION_IA_BTP_PILLAR_PATH = '/formations' as const;

export const FORMATION_IA_BTP_PILLAR_TITLE =
  'Formation IA BTP — Qualiopi, Île-de-France | Laure Olivié';

export const FORMATION_IA_BTP_PILLAR_DESCRIPTION =
  'Formation IA BTP en 4 h : devis, appels d\'offres, chantier. Qualiopi, présentiel Île-de-France. Financement Constructys selon éligibilité.';

export const FORMATION_IA_BTP_PILLAR_H1 =
  'Formation IA BTP — devis, appels d\'offres, chantier (Qualiopi, Île-de-France)';

export const FORMATION_IA_BTP_DEFINITION =
  'Une formation IA BTP est une session professionnelle de 4 heures en présentiel, certifiée Qualiopi, où les équipes du bâtiment et des travaux publics apprennent à utiliser ChatGPT, Claude ou Gemini sur leurs documents réels : devis, DCE, CCTP, comptes rendus de chantier et courriers. L\'objectif est un gain de temps mesurable sur l\'administratif, avec relecture humaine et validation terrain — jamais une promesse de financement garanti.';

export const FORMATION_IA_BTP_METIERS = [
  { href: '/formation-ia-conducteur-de-travaux-btp', label: 'Conducteur de travaux' },
  { href: '/formation-ia-charge-affaires-btp', label: 'Chargé d\'affaires' },
  { href: '/formation-ia-dirigeant-btp', label: 'Dirigeant de PME BTP' },
  { href: '/formation-ia-artisans-btp', label: 'TPE & PME du bâtiment' },
  { href: '/formation-ia-assistante-administrative-btp', label: 'Assistant(e) administrative' },
  { href: '/formation-ia-assistante-gestion-btp', label: 'Assistant(e) de gestion' },
] as const;

const DEPT_LABELS: Record<string, string> = {
  '/formation-ia-btp-paris': 'Paris (75)',
  '/formation-ia-btp-seine-et-marne-77': 'Seine-et-Marne (77)',
  '/formation-ia-btp-yvelines-78': 'Yvelines (78)',
  '/formation-ia-btp-essonne-91': 'Essonne (91)',
  '/formation-ia-btp-hauts-de-seine-92': 'Hauts-de-Seine (92)',
  '/formation-ia-btp-seine-saint-denis-93': 'Seine-Saint-Denis (93)',
  '/formation-ia-btp-val-de-marne-94': 'Val-de-Marne (94)',
  '/formation-ia-btp-val-doise-95': 'Val-d\'Oise (95)',
};

export const FORMATION_IA_BTP_GEO_LINKS = [
  { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP — Île-de-France (pilier géo)' },
  ...FORMATION_IA_BTP_DEPT_LANDING_PATHS.map((path) => ({
    href: path,
    label: DEPT_LABELS[path] ?? path,
  })),
];
