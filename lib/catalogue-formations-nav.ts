import type { LucideIcon } from 'lucide-react';
import { Building2, FileText, HardHat, Layers, Sparkles, Users } from 'lucide-react';

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
    href: '/formations/ia-au-service-du-batiment',
    label: "L'IA au service du bâtiment",
    icon: Building2,
  },
  {
    href: '/formations/ia-travaux-publics',
    label: "L'IA au service des Travaux Publics",
    icon: HardHat,
  },
  {
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    label: "Sensibilisation à l'IA & Assistants IA personnalisés",
    icon: Sparkles,
  },
  {
    href: '/formations/ia-appels-offre-btp',
    label: "Répondre aux appels d'offre avec l'IA",
    icon: FileText,
  },
  {
    href: '/formations/ia-rh-btp',
    label: 'Formation IA pour la Fonction RH dans le BTP',
    icon: Users,
  },
  {
    href: '/formations/ia-architecture-claude-dpgf',
    label: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    icon: Layers,
  },
];
