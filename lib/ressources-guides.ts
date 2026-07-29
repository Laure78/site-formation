import { LINKS } from '@/lib/internal-links';

export type RessourceGuideEntry = {
  href: string;
  pdfHref: string;
  title: string;
  description: string;
  audience: string;
  /** Libellé du bouton téléchargement (défaut : « PDF direct »). */
  downloadLabel?: string;
};

/** Guides / fichiers lead magnets — source unique (hero, section page, menu header). */
export const RESSOURCES_GUIDES: readonly RessourceGuideEntry[] = [
  {
    href: LINKS.guideChargeAffairesOfc,
    pdfHref: LINKS.pdfGuideChargeAffairesOfc,
    title: 'Guide du chargé d’affaires BTP × IA',
    description:
      'PDF gratuit : 12 cas Claude (DCE Go/No-Go, mémoire, DPGF, situations, DGD) — prompts du DCE au solde d’affaire.',
    audience: 'Chargés d’affaires, conducteurs de travaux, dirigeants PME BTP',
  },
  {
    href: LINKS.guideRhBtpIaOfc,
    pdfHref: LINKS.pdfGuideRhBtpIaOfc,
    title: 'Guide RH du BTP × IA',
    description:
      'PDF gratuit : 18 cas d’usage (fiche de poste, offres, scoring CV, onboarding, droit social BTP, reporting) + prompts Claude.',
    audience: 'RH, responsables admin et dirigeants de PME BTP',
  },
  {
    href: LINKS.guideChefDeChantierOfc,
    pdfHref: LINKS.pdfGuideChefDeChantierOfc,
    title: 'Guide du chef de chantier',
    description:
      'PDF gratuit : 6 skills Claude mobile (accueil sécurité, mode opératoire, causerie, rapport journalier, appro, auto-contrôle).',
    audience: 'Chefs de chantier et encadrement terrain BTP',
  },
  {
    href: LINKS.guideDirigeantBtpOfc,
    pdfHref: LINKS.pdfGuideDirigeantBtpOfc,
    title: 'Guide du dirigeant BTP',
    description:
      'PDF gratuit : 6 leviers de pilotage (Go/No-Go, clauses, rentabilité, litiges, tableau de bord, recrutement) + 24 prompts Claude.',
    audience: 'Dirigeants et directions de PME BTP',
  },
  {
    href: LINKS.guideClaudeBtpOfc,
    pdfHref: LINKS.pdfGuideClaudeBtpOfc,
    title: 'Guide Claude BTP — Projets, Skills, MCP',
    description:
      'PDF gratuit (éd. 2026) : installer Projets, Skills, connecteurs MCP, instructions système et Cowork pour l’administratif chantier.',
    audience: 'Dirigeants, CDT, chargés d’affaires, équipes admin PME BTP',
  },
  {
    href: LINKS.bibliothequePromptsBtpParMetier,
    pdfHref: LINKS.xlsxBibliothequePromptsBtpParMetier,
    title: 'Bibliothèque prompts BTP par métier',
    description:
      'Excel gratuit : ~50 prompts prêts à copier (dirigeant, assistante travaux, bureau d’études, conducteur de travaux, chef de chantier).',
    audience: 'Toute l’équipe bureau et chantier',
    downloadLabel: 'Excel direct',
  },
  {
    href: LINKS.guideAssistantsTravauxOfc,
    pdfHref: LINKS.pdfGuideAssistantsTravauxOfc,
    title: 'Guide des Assistants Travaux',
    description:
      '12 missions d’un marché (PPSPS, CR, situations, DOE, DGD) classées IA / mixte / humain — prompts Claude inclus.',
    audience: 'Assistants travaux, gestion, encadrement PME',
  },
  {
    href: LINKS.guideMaitriseOeuvreIa,
    pdfHref: LINKS.pdfGuideMoeIa,
    title: "Guide Maître d'Œuvre × IA",
    description: '12 missions MOE classées IA, mixte ou humain — méthode skills Claude.',
    audience: "Maîtres d'œuvre, BET, MOEX",
  },
  {
    href: LINKS.guideConducteurTravauxIaBtp,
    pdfHref: LINKS.pdfPackConducteurTravauxOfc,
    title: 'Guide conducteur de travaux',
    description: '6 tutos Claude : DCE, PPSPS, CR chantier, DOE — prompts inclus.',
    audience: 'Conducteurs de travaux, chefs de chantier',
  },
] as const;
