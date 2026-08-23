import { LINKS } from '@/lib/internal-links';
import { RESSOURCES_MINIATURES, type RessourceMiniature } from '@/lib/ressources-miniatures';

/** Fonction métier dans l’organigramme type d’une entreprise BTP. */
export type RessourceGuideFonctionId =
  | 'direction'
  | 'charge-affaires'
  | 'conducteur-travaux'
  | 'chef-chantier'
  | 'assistant-travaux'
  | 'maitrise-oeuvre'
  | 'rh-admin'
  | 'transversal';

export type RessourceGuideFonction = {
  readonly id: RessourceGuideFonctionId;
  readonly label: string;
  readonly description: string;
  readonly order: number;
};

/** Rubriques hub /ressources — ordre organigramme PME BTP. */
export const RESSOURCES_GUIDE_FONCTIONS: readonly RessourceGuideFonction[] = [
  {
    id: 'direction',
    label: 'Direction & pilotage',
    description:
      'Dirigeants et comités de direction — stratégie, rentabilité, arbitrages marchés et pilotage d’entreprise.',
    order: 1,
  },
  {
    id: 'charge-affaires',
    label: 'Chargé d’affaires & appels d’offres',
    description:
      'Réponses aux marchés publics et privés : DCE, mémoires techniques, chiffrage et suivi d’affaires.',
    order: 2,
  },
  {
    id: 'conducteur-travaux',
    label: 'Conducteur de travaux',
    description: 'Coordination multi-lots, planning, dossiers chantier et interfaces maîtrise d’œuvre.',
    order: 3,
  },
  {
    id: 'chef-chantier',
    label: 'Chef de chantier & encadrement terrain',
    description: 'Suivi quotidien, sécurité, rapports et livrables opérationnels sur le terrain.',
    order: 4,
  },
  {
    id: 'assistant-travaux',
    label: 'Assistant(e) travaux & gestion',
    description: 'Administratif marché, situations, DOE, relances et coordination bureau–chantier.',
    order: 5,
  },
  {
    id: 'maitrise-oeuvre',
    label: 'Maîtrise d’œuvre (MOE / MOEX / BET)',
    description: 'Pilotage projet, pièces DCE, réserves et livraison pour les maîtres d’œuvre.',
    order: 6,
  },
  {
    id: 'rh-admin',
    label: 'RH & fonctions support',
    description: 'Recrutement, onboarding, droit social BTP et reporting RH.',
    order: 7,
  },
  {
    id: 'transversal',
    label: 'Toute l’équipe',
    description: 'Outils Claude, prompts et méthodes partagées entre bureau et chantier.',
    order: 8,
  },
] as const;

export type RessourceGuideEntry = {
  href: string;
  pdfHref: string;
  title: string;
  description: string;
  audience: string;
  fonctionId: RessourceGuideFonctionId;
  /** Libellé du bouton téléchargement (défaut : « PDF direct »). */
  downloadLabel?: string;
  /** Miniature carte hub /ressources. */
  thumbnail?: RessourceMiniature;
};

export type RessourceGuidesByFonction = {
  readonly fonction: RessourceGuideFonction;
  readonly guides: readonly RessourceGuideEntry[];
};

/** Guides regroupés par fonction — affichage hub /ressources. */
export function getRessourcesGuidesByFonction(): readonly RessourceGuidesByFonction[] {
  return RESSOURCES_GUIDE_FONCTIONS.map((fonction) => ({
    fonction,
    guides: RESSOURCES_GUIDES.filter((guide) => guide.fonctionId === fonction.id),
  })).filter((group) => group.guides.length > 0);
}

/** Guides / fichiers lead magnets — source unique (hero, section page, menu header). */
export const RESSOURCES_GUIDES: readonly RessourceGuideEntry[] = [
  {
    href: LINKS.guideRepondreAoBtpOfc2026,
    pdfHref: LINKS.pdfGuideRepondreAoBtpOfc2026,
    title: 'Répondre à un AO BTP — méthode 5 étapes',
    description:
      'PDF gratuit (éd. 2026) : DCE, Go/No-Go, chiffrage, mémoire technique, 4 prompts IA et 6 contrôles sur les sorties IA.',
    audience: 'Dirigeants, chargés d’affaires, conducteurs de travaux',
    fonctionId: 'charge-affaires',
    thumbnail: RESSOURCES_MINIATURES.guideRepondreAo,
  },
  {
    href: LINKS.guideChargeAffairesOfc,
    pdfHref: LINKS.pdfGuideChargeAffairesOfc,
    title: 'Guide du chargé d’affaires BTP × IA',
    description:
      'PDF gratuit : 12 cas Claude (DCE Go/No-Go, mémoire, DPGF, situations, DGD) — prompts du DCE au solde d’affaire.',
    audience: 'Chargés d’affaires, conducteurs de travaux, dirigeants PME BTP',
    fonctionId: 'charge-affaires',
    thumbnail: RESSOURCES_MINIATURES.guideChargeAffaires,
  },
  {
    href: LINKS.guideRhBtpIaOfc,
    pdfHref: LINKS.pdfGuideRhBtpIaOfc,
    title: 'Guide RH du BTP × IA',
    description:
      'PDF gratuit : 18 cas d’usage (fiche de poste, offres, scoring CV, onboarding, droit social BTP, reporting) + prompts Claude.',
    audience: 'RH, responsables admin et dirigeants de PME BTP',
    fonctionId: 'rh-admin',
    thumbnail: RESSOURCES_MINIATURES.guideRh,
  },
  {
    href: LINKS.guideChefDeChantierOfc,
    pdfHref: LINKS.pdfGuideChefDeChantierOfc,
    title: 'Guide du chef de chantier',
    description:
      'PDF gratuit : 6 skills Claude mobile (accueil sécurité, mode opératoire, causerie, rapport journalier, appro, auto-contrôle).',
    audience: 'Chefs de chantier et encadrement terrain BTP',
    fonctionId: 'chef-chantier',
    thumbnail: RESSOURCES_MINIATURES.guideChefChantier,
  },
  {
    href: LINKS.guideDirigeantBtpOfc,
    pdfHref: LINKS.pdfGuideDirigeantBtpOfc,
    title: 'Guide du dirigeant BTP',
    description:
      'PDF gratuit : 6 leviers de pilotage (Go/No-Go, clauses, rentabilité, litiges, tableau de bord, recrutement) + 24 prompts Claude.',
    audience: 'Dirigeants et directions de PME BTP',
    fonctionId: 'direction',
    thumbnail: RESSOURCES_MINIATURES.guideDirigeant,
  },
  {
    href: LINKS.guideClaudeBtpOfc,
    pdfHref: LINKS.pdfGuideClaudeBtpOfc,
    title: 'Guide Claude BTP — Projets, Skills, MCP',
    description:
      'PDF gratuit (éd. 2026) : installer Projets, Skills, connecteurs MCP, instructions système et Cowork pour l’administratif chantier.',
    audience: 'Dirigeants, CDT, chargés d’affaires, équipes admin PME BTP',
    fonctionId: 'transversal',
    thumbnail: RESSOURCES_MINIATURES.guideClaude,
  },
  {
    href: LINKS.bibliothequePromptsBtpParMetier,
    pdfHref: LINKS.xlsxBibliothequePromptsBtpParMetier,
    title: 'Bibliothèque prompts BTP par métier',
    description:
      'Excel gratuit : ~50 prompts prêts à copier (dirigeant, assistante travaux, bureau d’études, conducteur de travaux, chef de chantier).',
    audience: 'Toute l’équipe bureau et chantier',
    fonctionId: 'transversal',
    downloadLabel: 'Excel direct',
    thumbnail: RESSOURCES_MINIATURES.prompts50,
  },
  {
    href: LINKS.guideAssistantsTravauxOfc,
    pdfHref: LINKS.pdfGuideAssistantsTravauxOfc,
    title: 'Guide des Assistants Travaux',
    description:
      '12 missions d’un marché (PPSPS, CR, situations, DOE, DGD) classées IA / mixte / humain — prompts Claude inclus.',
    audience: 'Assistants travaux, gestion, encadrement PME',
    fonctionId: 'assistant-travaux',
    thumbnail: RESSOURCES_MINIATURES.guideAssistantsTravaux,
  },
  {
    href: LINKS.guideMaitriseOeuvreIa,
    pdfHref: LINKS.pdfGuideMoeIa,
    title: "Guide Maître d'Œuvre × IA",
    description: '12 missions MOE classées IA, mixte ou humain — méthode skills Claude.',
    audience: "Maîtres d'œuvre, BET, MOEX",
    fonctionId: 'maitrise-oeuvre',
  },
  {
    href: LINKS.guideConducteurTravauxIaBtp,
    pdfHref: LINKS.pdfPackConducteurTravauxOfc,
    title: 'Guide conducteur de travaux',
    description: '6 tutos Claude : DCE, PPSPS, CR chantier, DOE — prompts inclus.',
    audience: 'Conducteurs de travaux, chefs de chantier',
    fonctionId: 'conducteur-travaux',
  },
] as const;
