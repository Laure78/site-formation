import type { LucideIcon } from 'lucide-react';
import { Building2, FileText, HardHat } from 'lucide-react';

/** Liens méga-menu — même ordre que le catalogue /formations (niveau puis réf.). */
export type CatalogueFormationNavLink = {
  href: string;
  label: string;
  /** Sous-titre optionnel sous le titre (désactivé dans le menu : infos tarif/durée sur les fiches). */
  description?: string;
  icon: LucideIcon;
};

export const CATALOGUE_FORMATIONS_NAV_LINKS: CatalogueFormationNavLink[] = [
  {
    href: '/formations/ia-batiment-travaux-publics',
    label: "L'IA au service des pros du bâtiment et des travaux publics",
    icon: Building2,
  },
  {
    href: '/formations/ia-appels-offre-btp',
    label: "L'IA appliquée aux appels d'offres BTP",
    icon: FileText,
  },
  {
    href: '/formations/ia-conduite-travaux-suivi-chantier',
    label: "L'IA appliquée à la conduite de travaux",
    icon: HardHat,
  },
];
