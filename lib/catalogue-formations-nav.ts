import type { LucideIcon } from 'lucide-react';
import { Building2, FileText, HardHat, Layers, Sparkles, Users } from 'lucide-react';

/** Liens méga-menu — même ordre que le catalogue /formations (niveau puis réf.). */
export type CatalogueFormationNavLink = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const CATALOGUE_FORMATIONS_NAV_LINKS: CatalogueFormationNavLink[] = [
  {
    href: '/formations/ia-au-service-du-batiment',
    label: "L'IA au service du bâtiment",
    description: '4 h ou 7 h · Devis, administratif, prompts — BTP-01.',
    icon: Building2,
  },
  {
    href: '/formations/ia-travaux-publics',
    label: "L'IA au service des Travaux Publics",
    description: '3 jours (21 h) · Consultations, chantier, industrialisation — BTP-04.',
    icon: HardHat,
  },
  {
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    label: "Sensibilisation à l'IA & Assistants IA personnalisés",
    description: '8 h (parcours LMS) · Assistants sur mesure — BTP-05.',
    icon: Sparkles,
  },
  {
    href: '/formations/ia-appels-offre-btp',
    label: "Répondre aux appels d'offre avec l'IA",
    description: '1 jour (7 h) ou LMS 7 h · DCE, mémoires, marchés — BTP-02.',
    icon: FileText,
  },
  {
    href: '/formations/ia-rh-btp',
    label: 'Formation IA pour la Fonction RH dans le BTP',
    description: '2 jours (14 h) · Recrutement, GEPP — BTP-03.',
    icon: Users,
  },
  {
    href: '/formations/ia-architecture-claude-dpgf',
    label: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    description: '4 h visio · DPGF, métrés, documents — BTP-06.',
    icon: Layers,
  },
];
