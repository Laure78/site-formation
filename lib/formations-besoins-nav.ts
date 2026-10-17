/**
 * Entrées « par besoin » — méga-menu formations (URLs réelles uniquement).
 */
import { buildCatalogueModulesHref } from '@/lib/catalogue-filter-url';
import { LINKS } from '@/lib/internal-links';

export type FormationBesoinNavItem = {
  label: string;
  href: string;
  description: string;
  title?: string;
};

/** Thématiques représentées par au moins une fiche ou un filtre catalogue. */
export const FORMATIONS_BESOINS_NAV: readonly FormationBesoinNavItem[] = [
  {
    label: 'Devis et chiffrage',
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    description: 'Études de prix, métré et structuration de devis',
    title: 'Formation IA devis et chiffrage BTP',
  },
  {
    label: 'Appels d’offres et DCE',
    href: LINKS.formationAO,
    description: 'DCE, checklist et mémoire technique',
    title: 'Formation IA appels d’offres BTP',
  },
  {
    label: 'Organisation et suivi de chantier',
    href: `${LINKS.formations}#organisation-chantier-ia`,
    description: 'Plannings, CR et documents de suivi',
    title: 'Organisation de chantier avec l’IA',
  },
  {
    label: 'Administration et communication',
    href: buildCatalogueModulesHref({ domaine: 'administration' }),
    description: 'Gestion, facturation et échanges professionnels',
    title: 'Modules administration BTP — catalogue',
  },
  {
    label: 'Assistants IA et applications métier',
    href: LINKS.formationMaitriserClaudeAiBtp,
    description: 'Claude, skills et applications sans coder',
    title: 'Maîtriser Claude AI pour le BTP',
  },
];
