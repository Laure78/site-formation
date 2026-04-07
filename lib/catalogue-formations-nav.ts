import type { LucideIcon } from 'lucide-react';
import { Building2, FileText, HardHat, Layers, MapPin, Sparkles, Users } from 'lucide-react';

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
    description: '4 h · forfait 100 € HT/part. (débutant) — BTP-01.',
    icon: Building2,
  },
  {
    href: '/formations/ia-travaux-publics',
    label: "L'IA au service des Travaux Publics",
    description: '4 h · forfait 100 € HT/part. (débutant) — BTP-04.',
    icon: HardHat,
  },
  {
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    label: "Sensibilisation à l'IA & Assistants IA personnalisés",
    description: '4 h · forfait 100 € HT/part. (débutant) — BTP-05.',
    icon: Sparkles,
  },
  {
    href: '/formations/ia-appels-offre-btp',
    label: "Répondre aux appels d'offre avec l'IA",
    description: '4 h · forfait 175 € HT/part. (avancé) — BTP-02.',
    icon: FileText,
  },
  {
    href: '/formations/ia-rh-btp',
    label: 'Formation IA pour la Fonction RH dans le BTP',
    description: '4 h · forfait 175 € HT/part. (avancé) — BTP-03.',
    icon: Users,
  },
  {
    href: '/formations/ia-architecture-claude-dpgf',
    label: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    description: '4 h · forfait 175 € HT/part. (avancé) — BTP-06.',
    icon: Layers,
  },
  {
    href: '/formation-ia',
    label: 'Hub formation IA (métiers & villes Île-de-France)',
    description: 'Pages locales et par lots : ChatGPT, Claude AI, Paris et départements IDF.',
    icon: MapPin,
  },
];
