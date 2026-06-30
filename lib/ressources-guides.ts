import { LINKS } from '@/lib/internal-links';

export type RessourceGuideEntry = {
  href: string;
  title: string;
  description: string;
  audience: string;
};

/** Guides PDF lead magnets — source unique (hero, section page, menu header). */
export const RESSOURCES_GUIDES: readonly RessourceGuideEntry[] = [
  {
    href: LINKS.guideMaitriseOeuvreIa,
    title: "Guide Maître d'Œuvre × IA",
    description: '12 missions MOE classées IA, mixte ou humain — méthode skills Claude.',
    audience: 'Maîtres d\'œuvre, BET, MOEX',
  },
  {
    href: LINKS.guideConducteurTravauxIaBtp,
    title: 'Guide conducteur de travaux',
    description: '6 tutos Claude : DCE, PPSPS, CR chantier, DOE — prompts inclus.',
    audience: 'Conducteurs de travaux, chefs de chantier',
  },
] as const;
