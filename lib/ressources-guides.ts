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

/** Filtres bibliothèque guides (`#guides-pdf`). */
export type GuideLibraryFilterId =
  | 'direction'
  | 'appels-offres'
  | 'conduite-travaux'
  | 'chantier'
  | 'gestion'
  | 'maitrise-oeuvre'
  | 'rh'
  | 'toute-equipe';

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

export const GUIDE_LIBRARY_FILTERS: readonly {
  id: GuideLibraryFilterId | 'tous';
  label: string;
}[] = [
  { id: 'tous', label: 'Tous' },
  { id: 'direction', label: 'Direction' },
  { id: 'appels-offres', label: 'Appels d’offres' },
  { id: 'conduite-travaux', label: 'Conduite de travaux' },
  { id: 'chantier', label: 'Chantier' },
  { id: 'gestion', label: 'Gestion' },
  { id: 'maitrise-oeuvre', label: 'Maîtrise d’œuvre' },
  { id: 'rh', label: 'Ressources humaines' },
  { id: 'toute-equipe', label: 'Toute l’équipe' },
] as const;

export type RessourceGuideEntry = {
  href: string;
  pdfHref: string;
  title: string;
  /** Promesse courte — carte bibliothèque. */
  promise: string;
  /** Description legacy / SEO longue (pages guide). */
  description: string;
  audience: string;
  fonctionId: RessourceGuideFonctionId;
  /** Catégories de filtre (OU). Un seul badge affiché via `categoryLabel`. */
  categories: readonly GuideLibraryFilterId[];
  categoryLabel: string;
  /** Jusqu’à 3 infos courtes. */
  highlights: readonly string[];
  fileKind: 'pdf' | 'excel';
  /** Libellé du bouton téléchargement. */
  downloadLabel: string;
  primaryActionLabel: string;
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

export function getGuidesLibraryEntries(): readonly RessourceGuideEntry[] {
  return RESSOURCES_GUIDES;
}

export function filterGuidesByCategory(
  guides: readonly RessourceGuideEntry[],
  filterId: GuideLibraryFilterId | 'tous',
): readonly RessourceGuideEntry[] {
  if (filterId === 'tous') return guides;
  return guides.filter((g) => g.categories.includes(filterId));
}

/** Guides / fichiers lead magnets — source unique (hero, section page, menu header). */
export const RESSOURCES_GUIDES: readonly RessourceGuideEntry[] = [
  {
    href: LINKS.guideDirigeantBtpOfc,
    pdfHref: LINKS.pdfGuideDirigeantBtpOfc,
    title: 'Guide du dirigeant BTP',
    promise:
      'Cadrez les arbitrages clés (marchés, rentabilité, litiges, recrutement) avec des prompts Claude à adapter à votre entreprise.',
    description:
      '6 leviers de pilotage (Go/No-Go, clauses, rentabilité, litiges, tableau de bord, recrutement) + 24 prompts Claude.',
    audience: 'Dirigeants · Directions de PME BTP',
    fonctionId: 'direction',
    categories: ['direction'],
    categoryLabel: 'Direction',
    highlights: ['6 leviers de pilotage', '24 prompts Claude', 'Pour dirigeants PME'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideDirigeant,
  },
  {
    href: LINKS.guideRepondreAoBtpOfc2026,
    pdfHref: LINKS.pdfGuideRepondreAoBtpOfc2026,
    title: 'Répondre à un appel d’offres BTP avec l’IA',
    promise:
      'Une méthode en 5 étapes pour analyser le DCE, décider de répondre et préparer une offre complète — avec contrôle humain.',
    description:
      'Édition 2026 : DCE, Go/No-Go, chiffrage, mémoire technique, 4 prompts IA et 6 contrôles sur les sorties IA.',
    audience: 'Chargés d’affaires · Dirigeants · Conducteurs de travaux',
    fonctionId: 'charge-affaires',
    categories: ['appels-offres'],
    categoryLabel: 'Appels d’offres',
    highlights: ['Édition 2026', '4 prompts IA', '6 points de contrôle'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideRepondreAo,
  },
  {
    href: LINKS.guideChargeAffairesOfc,
    pdfHref: LINKS.pdfGuideChargeAffairesOfc,
    title: 'Guide du chargé d’affaires BTP × IA',
    promise:
      'Des cas Claude pour enchaîner DCE, mémoire technique, DPGF, situations et DGD — du dossier au solde.',
    description:
      '12 cas Claude (DCE Go/No-Go, mémoire, DPGF, situations, DGD) — prompts du DCE au solde d’affaire.',
    audience: 'Chargés d’affaires · Conducteurs de travaux · Dirigeants PME',
    fonctionId: 'charge-affaires',
    categories: ['appels-offres'],
    categoryLabel: 'Appels d’offres',
    highlights: ['12 cas Claude', 'Du DCE au solde', 'Prompts métier'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideChargeAffaires,
  },
  {
    href: LINKS.guideConducteurTravauxIaBtp,
    pdfHref: LINKS.pdfPackConducteurTravauxOfc,
    title: 'Guide conducteur de travaux',
    promise:
      'Méthodes et prompts pour DCE, PPSPS, comptes rendus et DOE — à adapter à vos chantiers.',
    description: '6 tutos Claude : DCE, PPSPS, CR chantier, DOE — prompts inclus.',
    audience: 'Conducteurs de travaux · Chefs de chantier',
    fonctionId: 'conducteur-travaux',
    categories: ['conduite-travaux', 'chantier'],
    categoryLabel: 'Conduite de travaux',
    highlights: ['Pack CDT', 'DCE · PPSPS · CR · DOE', 'Prompts inclus'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
  },
  {
    href: LINKS.guideChefDeChantierOfc,
    pdfHref: LINKS.pdfGuideChefDeChantierOfc,
    title: 'Guide du chef de chantier',
    promise:
      'Skills Claude utilisables sur le terrain : sécurité, causerie, rapport journalier et auto-contrôle.',
    description:
      '6 skills Claude mobile (accueil sécurité, mode opératoire, causerie, rapport journalier, appro, auto-contrôle).',
    audience: 'Chefs de chantier · Encadrement terrain',
    fonctionId: 'chef-chantier',
    categories: ['chantier'],
    categoryLabel: 'Chantier',
    highlights: ['6 skills mobile', 'Sécurité & rapports', 'Usage terrain'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideChefChantier,
  },
  {
    href: LINKS.guideAssistantsTravauxOfc,
    pdfHref: LINKS.pdfGuideAssistantsTravauxOfc,
    title: 'Guide des assistants travaux',
    promise:
      'Classez les missions d’un marché (PPSPS, CR, situations, DOE, DGD) : IA, mixte ou humain — avec prompts.',
    description:
      '12 missions d’un marché (PPSPS, CR, situations, DOE, DGD) classées IA / mixte / humain — prompts Claude inclus.',
    audience: 'Assistants travaux · Gestion · Encadrement PME',
    fonctionId: 'assistant-travaux',
    categories: ['gestion', 'chantier'],
    categoryLabel: 'Gestion',
    highlights: ['12 missions marché', 'IA / mixte / humain', 'Prompts inclus'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideAssistantsTravaux,
  },
  {
    href: LINKS.guideMaitriseOeuvreIa,
    pdfHref: LINKS.pdfGuideMoeIa,
    title: 'Guide Maître d’Œuvre × IA',
    promise:
      'Pilotez les missions MOE avec une méthode skills Claude — chaque livrable reste sous validation professionnelle.',
    description: '12 missions MOE classées IA, mixte ou humain — méthode skills Claude.',
    audience: 'Maîtres d’œuvre · BET · MOEX',
    fonctionId: 'maitrise-oeuvre',
    categories: ['maitrise-oeuvre'],
    categoryLabel: 'Maîtrise d’œuvre',
    highlights: ['12 missions MOE', 'Méthode skills', 'Pilotage projet'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
  },
  {
    href: LINKS.guideRhBtpIaOfc,
    pdfHref: LINKS.pdfGuideRhBtpIaOfc,
    title: 'Guide RH du BTP × IA',
    promise:
      'Fiches de poste, offres, scoring CV, onboarding et reporting — à adapter à votre cadre social BTP.',
    description:
      '18 cas d’usage (fiche de poste, offres, scoring CV, onboarding, droit social BTP, reporting) + prompts Claude.',
    audience: 'RH · Responsables admin · Dirigeants PME',
    fonctionId: 'rh-admin',
    categories: ['rh'],
    categoryLabel: 'Ressources humaines',
    highlights: ['18 cas d’usage', 'Recrutement & onboarding', 'Prompts Claude'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideRh,
  },
  {
    href: LINKS.guideClaudeBtpOfc,
    pdfHref: LINKS.pdfGuideClaudeBtpOfc,
    title: 'Guide Claude BTP — Projets, Skills et connecteurs',
    promise:
      'Installez Projets, Skills et connecteurs pour l’administratif chantier — selon les fonctionnalités de votre offre Claude.',
    description:
      'Édition 2026 : installer Projets, Skills, connecteurs MCP, instructions système et Cowork pour l’administratif chantier.',
    audience: 'Dirigeants · CDT · Chargés d’affaires · Équipes admin',
    fonctionId: 'transversal',
    categories: ['toute-equipe'],
    categoryLabel: 'Toute l’équipe',
    highlights: ['Édition 2026', 'Projets & Skills', 'Connecteurs'],
    fileKind: 'pdf',
    downloadLabel: 'Télécharger le PDF',
    primaryActionLabel: 'Consulter le guide',
    thumbnail: RESSOURCES_MINIATURES.guideClaude,
  },
  {
    href: LINKS.bibliothequePromptsBtpParMetier,
    pdfHref: LINKS.xlsxBibliothequePromptsBtpParMetier,
    title: 'Bibliothèque de prompts BTP par métier',
    promise:
      'Un fichier Excel de prompts à copier par métier — bureau et chantier — à personnaliser avant usage.',
    description:
      'Excel : ~50 prompts prêts à copier (dirigeant, assistante travaux, bureau d’études, conducteur de travaux, chef de chantier).',
    audience: 'Toute l’équipe bureau et chantier',
    fonctionId: 'transversal',
    categories: ['toute-equipe', 'gestion'],
    categoryLabel: 'Toute l’équipe',
    highlights: ['~50 prompts', 'Par métier', 'Format Excel'],
    fileKind: 'excel',
    downloadLabel: 'Télécharger le fichier Excel',
    primaryActionLabel: 'Découvrir la bibliothèque',
    thumbnail: RESSOURCES_MINIATURES.prompts50,
  },
] as const;
